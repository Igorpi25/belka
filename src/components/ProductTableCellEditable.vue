<template>
  <td>
    <Editable
      :value="item[updateProp]"
      :version="item.version"
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
      const input = {
        id: this.item.id,
        [this.updateProp]: value,
        expectedVersion: this.item.version
      }
      this.$emit('update', input)
    }
  }
}
</script>
