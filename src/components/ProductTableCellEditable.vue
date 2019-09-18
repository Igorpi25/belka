<template>
  <td>
    <Editable
      :value="value"
      :type="type"
      :min="min"
      :placeholder="compPlaceholder"
      arrow-move
      @input="update"
    />
  </td>
</template>

<script>
import Editable from '@/components/Editable.vue'

export default {
  name: 'ProductTableCellEditable',
  components: {
    Editable
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    updateProp: {
      type: String,
      required: true
    },
    objectProp: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
  },
  computed: {
    value () {
      return this.objectProp
        ? this.item[this.objectProp][this.updateProp]
        : this.item[this.updateProp]
    },
    isNumberType () {
      return this.type === 'number'
    },
    min () {
      return this.isNumberType ? '0' : null
    },
    compPlaceholder () {
      return this.placeholder
        ? this.placeholder : this.isNumberType
          ? '-' : '----'
    }
  },
  methods: {
    update (value) {
      let input = {
        id: this.item.id,
        expectedVersion: this.item.version
      }
      if (this.objectProp) {
        input[this.objectProp] = { [this.updateProp]: value }
      } else {
        input[this.updateProp] = value
      }
      this.$emit('update', input)
    }
  }
}
</script>
