<template>
  <v-container>
    <v-toolbar flat color="transparent">
      <h1>Накладные</h1>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-layout>
      <v-flex>
        <amplify-connect
          :query="getWaybillsQuery"
          :subscription="createWaybillSubscription"
          :onSubscriptionMsg="onCreateWaybill"
        >
          <template slot-scope="{ loading, data, errors }">
            <div v-if="loading">Загрузка...</div>

            <div v-else-if="errors.length > 0">
              {{ errors }}
            </div>

            <div v-else-if="data">
              <v-data-table
                :headers="headers"
                :items="data.listWaybills.items"
                class="elevation-1"
              ></v-data-table>
              <v-dialog
                v-model="dialog"
                persistent 
                max-width="500px"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    :ripple="false"
                    outlined
                    rounded
                    color="primary"
                    class="mt-2"
                    v-on="on"
                  >
                    <v-icon left>mdi-plus</v-icon>
                    Создать накладную
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Новая накладная</span>
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
                          v-model="createModel.number"
                          label="Number"
                          required
                          :rules="[v => !!v || 'Number is required']"
                        />
                        <v-textarea
                          v-model="createModel.description"
                          label="Description"
                        ></v-textarea>
                        <v-text-field
                          v-model="createModel.contractor"
                          label="Contractor"
                        />
                        <v-text-field
                          v-model="createModel.purchaseDate"
                          label="Purchase Date"
                        />
                        <v-text-field
                          v-model="createModel.deliveryDate"
                          label="Delivery Date"
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
                      @click="createWaybill"
                    >
                      Создать
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
import { listWaybills, getProject } from '@/graphql/queries'
import { createWaybill} from '@/graphql/mutations'
import { onCreateWaybill } from '@/graphql/subscriptions'

export default {
  name: 'Project',
  data () {
    return {
      getProjectLoading: false,
      error: false,
      errorMessage: '',
      createError: false,
      createErrorMessage: '',
      createLoading: false,
      createModel: {
        number: '',
        description: '',
        contractor: '',
        purchaseDate: '',
        deliveryDate: ''
      },
      dialog: false,
      valid: false,
      project: {},
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Owner', value: 'owner' },
        { text: 'Number', value: 'number' },
        { text: 'Description', value: 'description' },
        { text: 'Purchase Date', value: 'purchaseDate' },
        { text: 'Contractor', value: 'contractor' },
        { text: 'Delivery Date', value: 'deliveryDate' },
        { text: 'Status', value: 'status' },
        { text: 'Created', value: 'createdAt' },
        { text: 'Updated', value: 'updatedAt' },
      ],
      projects: []
    }
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
  computed: {
    owner () {
      return this.$store.state.user.username
    },
    projectId () {
      return this.$route.params.projectId
    },
    specId () {
      return this.$route.params.specId
    },
    getWaybillsQuery () {
      return this.$Amplify.graphqlOperation(listWaybills, {
        id: this.projectId
      })
    },
    createWaybillSubscription () {
      return this.$Amplify.graphqlOperation(onCreateWaybill, {
        owner: this.owner
      })
    },
  },
  methods: {
    showError (message) {
      this.error = true
      this.errorMessage = message
    },
    onCreateWaybill (prevData, newData) {
      // eslint-disable-next-line
      console.log('New waybill from subscription...')
      const newItem = newData.onCreateWaybill
      prevData.data.listWaybills.items.push(newItem)
      // const index = prevData.data.listWaybills.items
      //   .findIndex(el => el.id === newItem.id)
      // prevData.data.listWaybills.items.splice(index, 1, newItem)
      return prevData.data
    },
    closeDialog () {
      this.dialog = false
      setTimeout(() => {
        if (this.$refs.form) {
          this.$refs.form.reset()
        }
      }, 300)
    },
    async getProject () {
      try {
        this.getProjectLoading = true
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(getProject, { id: this.projectId })
        )
        if (response && response.errors && response.errors.length > 0) {
          throw new Error(response.errors.join('\n'))
        }
        this.project = response.data.getProject
      } catch (error) {
        this.showError(error)
        // eslint-disable-next-line
        console.log('Error: ', error)
        // Analytics.record({
        //   name: 'GetProjectError',
        //   attributes: {
        //     error: e.message
        //   }
        // })
      } finally {
        this.getProjectLoading = false
      }
    },
    async createWaybill () {
      try {
        const waybillSpecId = this.specId
        this.createLoading = true
        if (this.$refs.form.validate()) {
          const input = Object.assign({}, this.createModel, {
            status: 'CREATED',
            owner: this.owner,
            waybillSpecId
          })
          const response = await this.$Amplify.API.graphql(
            this.$Amplify.graphqlOperation(createWaybill, { input })
          )
          if (response && response.errors && response.errors.length > 0) {
            throw new Error(response.errors.join('\n'))
          }
          // eslint-disable-next-line
          console.log('Data: ', response.data)
          this.closeDialog()
          return response.data.createWaybill
        }
      } catch (error) {
        this.createError = true
        this.createErrorMessage = error
        // eslint-disable-next-line
        console.log('Error: ', error)
        // Analytics.record({
        //   name: 'CreateWaybillError',
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
