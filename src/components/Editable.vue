<template>
  <div>
    <input
      v-if="type === 'number'"
      ref="editable"
      :id="id"
      :placeholder="placeholder"
      :class="['editable', { 'editable--focused': isFocused, 'editable--outlined': outlined }]"
      :min="min"
      :max="max"
      type="number"
      v-on="listeners"
      @keydown="onKeyDown"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div
      v-else
      ref="editable"
      :id="id"
      :placeholder="placeholder"
      :class="['editable', { 'editable--focused': isFocused, 'editable--outlined': outlined }]"
      contenteditable
      spellcheck
      v-on="listeners"
      @keydown="onKeyDown"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import {
  uuid,
  setCaretPosition,
  getCaretPosition,
  setCaretToEnd
} from '@/utils/helpers'

// this undefined on debounce, if use arrow function, this on function undefined
const DEBOUNCE = 70

const STATUSES = {
  NONE: 'NONE', // call update method on this status
  WAITING: 'WAITING', // status after update method called
  WAITING_EDIT: 'WAITING_EDIT' // status after value update on WAITING status, to call update method on VERSION update
}

export default {
  name: 'Editable',

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    version: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    min: {
      type: String,
      default: null
    },
    max: {
      type: String,
      default: null
    },
    outlined: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    debounce: {
      type: Number,
      default: 300
    },
    arrowMove: {
      type: Boolean,
      default: false
    },
    arrowMoveMode: {
      type: String,
      default: 'table'
    },
    // if arrowMove is not 'table'
    siblingItemSelector: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      id: uuid(),
      status: STATUSES.NONE,
      lazyValue: this.value,
      isFocused: false,
    }
  },

  computed: {
    listeners () {
      return { ...this.$listeners, input: this.input }
    },
    internalValue: {
      get () {
        return this.lazyValue
      },
       set (val) {
         this.lazyValue = val
       }
    }
  },

  watch: {
    value (val) {
      if (this.status === STATUSES.NONE) {
        this.setValue(val, this.isFocused)
      } else if (this.status === STATUSES.WAITING) {
        this.status = STATUSES.NONE
        this.setValue(val, this.isFocused)
      } else if (this.status === STATUSES.WAITING_EDIT) {
        this.status = STATUSES.WAITING
        this.$emit('input', this.internalValue)
      }
    },
  },

  mounted () {
    this.setValue(this.value, false)
  },

  methods: {
    input (e) {
      if (this.status === STATUSES.WAITING) {
        this.status = STATUSES.WAITING_EDIT
      }
      const val = this.type === 'number'
        ? e.target.value : e.target.innerText
      const value = val || null
      this.internalValue = value
      this.debounceInput(value)
    },

    debounceInput: debounce(function (val) {
      if (this.status === STATUSES.NONE) {
        this.$emit('input', val)
        this.status = STATUSES.WAITING
      }
    }, DEBOUNCE),

    onFocus () {
      this.isFocused = true
    },

    onBlur () {
      this.isFocused = false
    },

    onKeyDown (e) {
      if (!this.arrowMove) return
      const position = getCaretPosition(this.$refs.editable)
      if (e.key === 'ArrowLeft' || e.key === 'Left') { // 'Left' IE/Edge specific value
        if (this.arrowMoveMode !== 'table' && !this.siblingItemSelector) return
        if (this.isPositionStart(position)) {
          e.preventDefault()
          this.focusPrevious(null, true)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'Up') { // 'Up' IE/Edge specific value
        if (this.arrowMoveMode !== 'table') return
        e.preventDefault()
        this.focusPreviousRow(position)
      } else if (e.key === 'ArrowRight' || e.key === 'Right') { // 'Right' IE/Edge specific value
        if (this.arrowMoveMode !== 'table' && !this.siblingItemSelector) return
        if (this.isPositionEnd(position)) {
          e.preventDefault()
          this.focusNext()
        }
      } else if (e.key === 'ArrowDown' || e.key === 'Down') { // 'Down' IE/Edge specific value
        if (this.arrowMoveMode !== 'table') return
        e.preventDefault()
        this.focusNextRow(position)
      }
    },

    setValue (value, setPosition) {
      const position = setPosition
        ? getCaretPosition(this.$refs.editable)
        : 0
      if (this.type === 'number') {
        this.$refs.editable.value = value
      } else {
        this.$refs.editable.innerText = value
      }
      if (setPosition) {
        setCaretPosition(this.$refs.editable, position)
      }
    },

    focusNextRow (position) {
      const active = document.activeElement
      const siblingRow = active.closest('tr')
      if (siblingRow) {
        const nextRow = siblingRow.nextElementSibling
        if (nextRow) {
          const currentTD = active.closest('td')
          const cell = nextRow.cells[currentTD.cellIndex]
          const target = cell.querySelector('.editable')
          this.setFocus(target, position)
        }
      }
    },

    focusPreviousRow (position) {
      const active = document.activeElement
      const siblingRow = active.closest('tr')
      if (siblingRow) {
        const previousRow = siblingRow.previousElementSibling
        if (previousRow) {
          const currentTD = active.closest('td')
          const cell = previousRow.cells[currentTD.cellIndex]
          const target = cell.querySelector('.editable')
          this.setFocus(target, position)
        }
      }
    },

    focusNext (position, toEnd) {
      const target = this.getSibling()
      if (target) {
        this.setFocus(target, position, toEnd)
      }
    },

    focusPrevious (position, toEnd) {
      const target = this.getSibling(true)
      if (target) {
        this.setFocus(target, position, toEnd)
      }
    },

    getSibling (previous) {
      const active = document.activeElement
      const selector = this.arrowMoveMode === 'table'
        ? 'td' : this.siblingItemSelector
      const sibling = active.closest(selector)
      if (sibling) {
        const target = previous
          ? sibling.previousElementSibling
          : sibling.nextElementSibling
        return target && target.querySelector('.editable')
      }
      return null
    },

    setFocus (target, position, toEnd) {
      target.focus()
      if (position) {
        const range = document.createRange()
        range.selectNodeContents(target)
        const targetLength = range.toString().length
        if (position < targetLength) {
          setCaretPosition(target, position)
        } else {
          setCaretToEnd(target)
        }
      } else if (toEnd) {
        setCaretToEnd(target)
      }
    },

    isPositionStart (position) {
      const value = position || getCaretPosition(this.$refs.editable)
      return value === 0
    },

    isPositionEnd (position) {
      const value = position || getCaretPosition(this.$refs.editable)
      const range = document.createRange()
      range.selectNodeContents(this.$refs.editable)
      const length = range.toString().length
      return value === length
    },
  }
}
</script>

<style scoped>
div[contenteditable=true]:empty::before {
  color: #9E9E9E; /* grey */
  content: attr(placeholder);
  display: block; /* For Firefox */
  line-height: 1.5;
  min-height: 1.5em;
}

.editable {
  outline: none;
  padding: 4px 8px;
  line-height: 1.5;
  min-height: 1.5em;
  color: #1565C0;
  width: 100%;
  border-radius: 4px;
}

.editable--focused {
  background-color: #f5f5f5;
  color: #000000;
}
.editable--outlined {
  border: 1px solid #E0E0E0;
}
.editable--outlined.editable--focused {
  border: 1px solid #1E88E5;
}
</style>
