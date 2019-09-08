<template>
  <v-container>
    <v-toolbar flat color="transparent">
      <h1>Спецификации</h1>
      <div class="flex-grow-1"></div>
      <v-btn
        :loading="createLoading"
        :ripple="false"
        color="primary"
        class="mb-2"
        @click="createProject"
      >Создать</v-btn>
    </v-toolbar>

    <v-layout>
      <v-flex>
        <div v-if="loading">Загрузка...</div>

        <div v-else-if="errors.length > 0">
          <ErrorMessages
            :items="errors"
            @close="i => errors.splice(i, 1)"
          />
        </div>

        <v-row v-else-if="items">
          <v-col
            v-for="item in items"
            :key="item.name"
            cols="12"
            sm="12"
            md="6"
          >
            <ProjectItem :item="item" />
          </v-col>
        </v-row>

      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { listProjects } from '@/graphql/queries'
import { createProject, createSpec } from '@/graphql/mutations'
import { onCreateProject, onUpdateProject, onDeleteProject } from '@/graphql/subscriptions'

import ProjectItem from '@/components/ProjectItem.vue'
import ErrorMessages from '@/components/ErrorMessages.vue'

export default {
  name: 'Project',
  components: {
    ProjectItem,
    ErrorMessages,
  },
  data: () => ({
    loading: false,
    createLoading: false,
    items: [],
    errors: [],
    headers: [
      { text: 'Id', value: 'id' },
      { text: 'Owner', value: 'owner' },
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description' },
      { text: 'Status', value: 'status' },
      { text: 'Created', value: 'createdAt' },
      { text: 'Updated', value: 'updatedAt' },
    ],
  }),
  computed: {
    owner () {
      return this.$store.getters.username
    },
    listProjectsQuery () {
      return this.$Amplify.graphqlOperation(listProjects, {
        owner: this.owner
      })
    },
    createProjectSubscription () {
      return this.$Amplify.graphqlOperation(onCreateProject, {
        owner: this.owner
      })
    },
    updateProjectSubscription () {
      return this.$Amplify.graphqlOperation(onUpdateProject, {
        owner: this.owner
      })
    },
    deleteProjectSubscription () {
      return this.$Amplify.graphqlOperation(onDeleteProject, {
        owner: this.owner
      })
    },
  },
  created () {
    this.listProjects()
    this.createSubscription = this.$Amplify.API.graphql(this.createProjectSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onCreateProject(data)
        }
      })
    this.updateSubscription = this.$Amplify.API.graphql(this.updateProjectSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onUpdateProject(data)
        }
      })
    this.deleteSubscription = this.$Amplify.API.graphql(this.deleteProjectSubscription)
      .subscribe({
        next: ({ value: { data } }) => {
          this.onDeleteProject(data)
        }
      })
  },
  beforeDestroy () {
    if (this.createSubscription) {
      this.createSubscription.unsubscribe()
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe()
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe()
    }
  },
  methods: {
    onCreateProject (newData) {
      // eslint-disable-next-line
      console.log('New project from subscription...', newData)
      const newItem = newData.onCreateProject
      this.items.push(newItem)
    },
    onUpdateProject (newData) {
      // eslint-disable-next-line
      console.log('Update project from subscription...', newData)
      const newItem = newData.onUpdateProject
      const index = this.items.findIndex(el => el.id === newItem.id)
      if (index !== -1) {
        this.items.splice(index, 1, newItem)
      }
    },
    onDeleteProject (newData) {
      // eslint-disable-next-line
      console.log('Delete project from subscription...', newData)
      const newItem = newData.onDeleteProject
      const index = this.items.findIndex(el => el.id === newItem.id)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
    async listProjects () {
      try {
        this.loading = true
        const response = await this.$Amplify.API.graphql(this.listProjectsQuery)
        if (response && response.errors && response.errors.length > 0) {
          this.items = null
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
        this.items = response.data.listProjects.items || []
      } catch (error) {
        // eslint-disable-next-line
        console.log('Error: ', error)
        // Analytics.record({
        //   name: 'ListProjectError',
        //   attributes: {
        //     error: e.message
        //   }
        // })
      } finally {
        this.loading = false
      }
    },
    async createSpec (input) {
      try {
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(createSpec, {
            input
          })
        )
        if (response && response.errors && response.errors.length > 0) {
          this.items = null
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
        return response.data.createSpec.id
      } catch (error) {
        // eslint-disable-next-line
        console.log('Error: ', error)
        // Analytics.record({
        //   name: 'CreateSpecError',
        //   attributes: {
        //     error: e.message
        //   }
        // })
      }
    },
    async createProject () {
      try {
        this.createLoading = true
        const owner = this.owner
        const projectSpecId = await this.createSpec({ owner })
        const input = {
          owner,
          status: 'CREATED',
          projectSpecId
        }
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(createProject, { input })
        )
        if (response && response.errors && response.errors.length > 0) {
          this.items = null
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log('Error: ', error)
        // Analytics.record({
        //   name: 'CreateProjectError',
        //   attributes: {
        //     error: e.message
        //   }
        // })
      } finally {
        this.createLoading = false
      }
    },
  }
}
</script>
