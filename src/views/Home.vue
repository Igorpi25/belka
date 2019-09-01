<template>
  <v-container>
    <v-toolbar flat color="transparent">
      <h1>Projects</h1>
      <div class="flex-grow-1"></div>
      <v-dialog
        v-model="dialog"
        persistent 
        max-width="500px"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            :ripple="false"
            color="primary"
            class="mb-2"
            v-on="on"
          >New Project</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New Project</span>
          </v-card-title>

          <v-card-text>
            <v-slide-y-transition>
              <v-alert
                v-if="createError"
                type="error"
                color="red"
                dismissible
              >
                {{ createErrorMessage }}
              </v-alert>
            </v-slide-y-transition>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-container>
                <v-text-field
                  ref="projectName"
                  v-model="project.name"
                  label="Name"
                  required
                  :rules="[v => !!v || 'Name is required']"
                ></v-text-field>
                <v-textarea
                  v-model="project.description"
                  label="Description"
                  required
                  :rules="[v => !!v || 'Description is required']"
                ></v-textarea>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn
              :ripple="false"
              text
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              :disabled="!valid"
              :loading="createLoading"
              :ripple="false"
              text
              color="primary"
              @click="createProject"
            >
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-layout>
      <v-flex>
        <amplify-connect
          :query="listProjectsQuery"
          :subscription="createProjectSubscription"
          :onSubscriptionMsg="onCreateProject"
        >
          <template slot-scope="{ loading, data, errors }">
            <div v-if="loading">Loading...</div>

            <div v-else-if="errors.length > 0">
              {{ errors }}
            </div>

            <div v-else-if="data">
              <v-data-table
                :headers="headers"
                :items="data.listProjects.items"
                class="elevation-1"
              ></v-data-table>
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
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { listProjects } from '@/graphql/queries'
import { createProject } from '@/graphql/mutations'
import { onCreateProject } from '@/graphql/subscriptions'

export default {
  name: 'Home',
  data () {
    return {
      createLoading: false,
      error: false,
      errorMessage: '',
      createError: false,
      createErrorMessage: '',
      dialog: false,
      valid: false,
      project: {
        name: '',
        description: ''
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
    }
  },
  computed: {
    listProjectsQuery () {
      return this.$Amplify.graphqlOperation(listProjects)
    },
    createProjectSubscription () {
      return this.$Amplify.graphqlOperation(onCreateProject, {
        owner: this.$store.state.user.username
      })
    },
  },
  watch: {
    dialog (val) {
      if (val) {
        this.$nextTick(() => { this.$refs.projectName.focus() })
      } else {
        this.closeDialog()
      }
    },
  },
  methods: {
    closeDialog () {
      this.dialog = false
      setTimeout(() => {
        if (this.$refs.form) {
          this.$refs.form.reset()
        }
      }, 300)
    },
    onCreateProject (prevData, newData) {
      // eslint-disable-next-line
      console.log('New project from subscription...')
      const newProject = newData.onCreateProject
      prevData.data.listProjects.items.push(newProject)
      return prevData.data
    },
    async createProject () {
      try {
        this.createLoading = true
        if (this.$refs.form.validate()) {
          const input = Object.assign({}, this.project, {
            owner: this.$store.state.user.username
          })
          const response = await this.$Amplify.API.graphql(
            this.$Amplify.graphqlOperation(createProject, { input })
          )
          if (response && response.errors && response.errors.length > 0) {
            throw new Error(response.errors.join('\n'))
          }
          // eslint-disable-next-line
          console.log('Data: ', response.data)
          this.closeDialog()
          return response.data.createProject
        }
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
    }
  }
}
</script>
