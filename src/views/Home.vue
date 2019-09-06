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
        <amplify-connect
          :query="listProjectsQuery"
          :subscription="createProjectSubscription"
          :onSubscriptionMsg="onCreateProject"
        >
          <template slot-scope="{ loading, data, errors }">
            <div v-if="loading">Загрузка...</div>

            <div v-else-if="errors.length > 0">
              {{ errors }}
            </div>

            <div v-else-if="data">
              <v-data-iterator
                :items="data.listProjects.items"
                :items-per-page.sync="itemsPerPage"
                :footer-props="{ itemsPerPageOptions }"
              >
                <template v-slot:default="props">
                  <v-row>
                    <v-col
                      v-for="item in props.items"
                      :key="item.name"
                      cols="12"
                      sm="12"
                      md="6"
                    >
                      <ProjectItem :item="item" />
                    </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
            </div>
          </template>
        </amplify-connect>
      </v-flex>
    </v-layout>

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
  </v-container>
</template>

<script>
import { listProjects } from '@/graphql/queries'
import { createProject, createSpec } from '@/graphql/mutations'
import { onCreateProject } from '@/graphql/subscriptions'

import ProjectItem from '@/components/ProjectItem.vue'

export default {
  name: 'Project',
  components: {
    ProjectItem
  },
  data: () => ({
    itemsPerPageOptions: [4, 8],
    itemsPerPage: 4,
    createLoading: false,
    error: false,
    errorMessage: '',
    createError: false,
    createErrorMessage: '',
    dialog: false,
    valid: false,
    createModel: {
      name: null,
      description: null
    },
    headers: [
      { text: 'Id', value: 'id' },
      { text: 'Owner', value: 'owner' },
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description' },
      { text: 'Status', value: 'status' },
      { text: 'Created', value: 'createdAt' },
      { text: 'Updated', value: 'updatedAt' },
    ],
    projects: []
  }),
  computed: {
    owner () {
      return this.$store.getters.username
    },
    listProjectsQuery () {
      return this.$Amplify.graphqlOperation(listProjects)
    },
    createProjectSubscription () {
      return this.$Amplify.graphqlOperation(onCreateProject, {
        owner: this.owner
      })
    },
  },
  methods: {
    onCreateProject (prevData, newData) {
      // eslint-disable-next-line
      console.log('New project from subscription...')
      const newItem = newData.onCreateProject
      prevData.data.listProjects.items.push(newItem)
      return prevData.data
    },
    async createSpec (input) {
      try {
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(createSpec, {
            input
          })
        )
        if (response && response.errors && response.errors.length > 0) {
          throw new Error(response.errors.join('\n'))
        }
        return response.data.createSpec.id
      } catch (error) {
        throw error
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
          throw new Error(response.errors.join('\n'))
        }
        // eslint-disable-next-line
        console.log('Create Data: ', response.data)
      } catch (error) {
        this.createError = true
        this.createErrorMessage = error
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
