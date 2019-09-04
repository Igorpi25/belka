<template>
  <v-container>
    <v-toolbar flat color="transparent">
      <h1>Спецификации</h1>
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
          >Создать проект</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Новый проект</span>
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
                  v-model="createModel.name"
                  label="Name"
                  required
                  :rules="[v => !!v || 'Name is required']"
                />
                <v-textarea
                  v-model="createModel.description"
                  label="Description"
                />
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
              Отмена
            </v-btn>
            <v-btn
              :disabled="!valid"
              :loading="createLoading"
              :ripple="false"
              text
              color="primary"
              @click="createProject"
            >
              Создать
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
                      @click="$router.push({
                        name: 'specs',
                        params: {
                          specId: item.spec.id
                        }
                      })"
                    >
                      <v-hover v-slot:default="{ hover }">
                        <v-card :elevation="hover ? 6 : 2">
                          <v-card-title><h4>{{ item.name }}</h4></v-card-title>
                          <v-divider></v-divider>
                          <v-list dense>
                            <v-list-item>
                              <v-list-item-content>Description:</v-list-item-content>
                              <v-list-item-content class="align-end">{{ item.description }}</v-list-item-content>
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
                        </v-card>
                      </v-hover>
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

export default {
  name: 'Project',
  data () {
    return {
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
    }
  },
  computed: {
    owner () {
      return this.$store.state.user.username
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
        if (this.$refs.form.validate()) {
          const owner = this.owner
          const projectSpecId = await this.createSpec({ owner })
          const input = Object.assign({}, this.createModel, {
            owner,
            status: 'CREATED',
            projectSpecId
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
