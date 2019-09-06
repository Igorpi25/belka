<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card :elevation="hover ? 6 : 2">
        <v-card-title>
          <h4>
            <Editable
              :value="item.name"
              placeholder="Name"
              @input="updateProject({ id: item.id, name: $event })"
            />
          </h4>
        </v-card-title>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>Description:</v-list-item-content>
            <v-list-item-content class="align-end">
              <Editable
                :value="item.description"
                placeholder="Description"
                @input="updateProject({ id: item.id, description: $event })"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>Status:</v-list-item-content>
            <v-list-item-content class="align-end">{{ item.status }}</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>Created:</v-list-item-content>
            <v-list-item-content class="align-end">{{ item.createdAt | localDate }}</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>Updated:</v-list-item-content>
            <v-list-item-content class="align-end">{{ item.updatedAt | localDate }}</v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn
            :ripple="false"
            text
            color="primary"
            @click="$router.push({
              name: 'specs',
              params: {
                specId: item.spec.id
              }
            })"
          >
            Открыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
    <v-snackbar
      v-model="error"
      :timeout="10000"
      color="error"
      top
    >
      {{ errorMessage }}
      <v-btn
        dark
        text
        @click="error = false"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Editable from '@/components/Editable.vue'
import { updateProject } from '@/graphql/mutations'
import { onUpdateProject } from '@/graphql/subscriptions'

export default {
  name: 'ProjectItem',
  components: {
    Editable
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    error: false,
    errorMessage: ''
  }),
  computed: {
    owner () {
      return this.$store.getters.username
    },
    updateProjectSubscription () {
      return this.$Amplify.graphqlOperation(onUpdateProject, {
        owner: this.owner,
        id: this.item.id
      })
    },
  },
  created () {
    this.subscription = this.$Amplify.API.graphql(this.updateProjectSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          console.log(this.item.id, 'update subscribtion', data)
        }
      })
  },
  beforeDestroy () {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  },
  methods: {
    async updateProject (input) {
      try {
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(updateProject, { input })
        )
        if (response && response.errors && response.errors.length > 0) {
          throw new Error(response.errors.join('\n'))
        }
        // eslint-disable-next-line
        console.log('Update Data: ', response.data)
      } catch (error) {
        this.error = true
        this.errorMessage = error
        // eslint-disable-next-line
        console.log('Error: ', error)
        // Analytics.record({
        //   name: 'UpdateProjectError',
        //   attributes: {
        //     error: e.message
        //   }
        // })
      }
    },
  }
}
</script>
