<template>
  <div>
    <div
      ref="editable"
      :id="id"
      :placeholder="placeholder"
      :class="{ 'editable--focused': isFocused }"
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
const DEBOUNCE = 300

export default {
  name: 'Editable',

  props: {
    value: {
      type: String,
      default: ''
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
    colIndex: {
      type: Number,
      default: 0
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
      lazyValue: this.value,
      isFocused: false
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
      if (val !== this.internalValue) {
        this.setValue(val, true)
      }
    },
  },

  mounted () {
    this.setValue(this.value, false)
  },

  methods: {
    input: debounce(function (e) {
      const text = e.target.innerText
      this.internalValue = text
      this.$emit('input', text)
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
        if (!this.siblingItemSelector) return
        if (this.isPositionStart(position)) {
          e.preventDefault()
          this.focusPrevious(null, true)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'Up') { // 'Up' IE/Edge specific value
        if (this.arrowMoveMode !== 'table') return
        e.preventDefault()
        this.focusPreviousRow(position)
      } else if (e.key === 'ArrowRight' || e.key === 'Right') { // 'Right' IE/Edge specific value
        if (!this.siblingItemSelector) return
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
      this.$refs.editable.innerText = value
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
          console.log('nextRow', nextRow, nextRow.cells, position)
        }
      }
    },

    focusPreviousRow (position) {
      const active = document.activeElement
      const siblingRow = active.closest('tr')
      if (siblingRow) {
        const previousRow = siblingRow.previousElementSibling
        if (previousRow) {
          console.log('previousRow', previousRow, previousRow.cells, position)
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
      const sibling = active.closest(this.siblingItemSelector)
      if (sibling) {
        const target = previous
          ? sibling.previousElementSibling
          : sibling.nextElementSibling
        return target && target.querySelector('div[contenteditable=true]')
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
div[contenteditable=true] {
  outline: none;
  padding: 0 2px;
  line-height: 1.5;
  min-height: 1.5em;
  color: #1565C0;
}
div[contenteditable=true].editable--focused {
  background-color: #f5f5f5;
  border-radius: 4px;
  color: #000000;
}
</style>
