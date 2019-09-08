<template>
  <div>
    <v-alert
      v-for="(error, index) in items"
      :key="index"
      :value="true"
      dismissible
      type="error"
      class="mb-4"
      @input="$emit('close', index)"
    >
      <div>
        {{ error.message }}
      </div>
      <v-divider
        class="my-2 red"
        style="opacity: 0.22"
      ></v-divider>
      <div class="caption">
        <div v-if="error.locations">
          <span>Locations: </span>
          <span
            v-for="(location, locationIndex) in error.locations"
            :key="locationIndex"
            class="mr-2"
          >{{ location }}</span>
        </div>
        <div v-if="error.path">
          <span>Path: {{ error.path }}</span>
        </div>
      </div>
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessages',
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
