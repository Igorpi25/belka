<template>
  <div>
    <!-- <amplify-connect
      :query="getWaybillQuery"
      :subscription="createProductSubscription"
      :onSubscriptionMsg="onCreateProduct"
    >
      <template slot-scope="props">
        <div v-if="props.loading">Загрузка...</div>

        <div v-else-if="props.errors.length > 0">
          {{ errors }}
        </div>

        <div v-if="props.data.getWaybill">
          <v-data-table
            :headers="headers"
            :items="props.data.getWaybill.products.items"
            hide-default-header
            hide-default-footer
          />
        </div>
      </template>
    </amplify-connect> -->

    <div v-if="loading">Загрузка...</div>

    <div v-else-if="errors.length > 0">
      {{ errorMessage }}
    </div>

    <div v-else-if="data">
      <v-data-table
        :headers="headers"
        :items="data.getWaybill.products.items"
        hide-default-header
        hide-default-footer
      >
        <template v-slot:item.name="props">
          <v-edit-dialog
            :return-value.sync="props.item.name"
            large
            @save="updateProduct({ id: props.item.id, name: props.item.name })"
          >
            <div>{{ props.item.name || 'name' }}</div>
            <template v-slot:input>
              <div class="mt-4 title">Update Name</div>
            </template>
            <template v-slot:input>
              <v-text-field
                v-model="props.item.name"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.createdAt="{ item }">
          {{ item.createdAt | localDate }}
        </template>
        <template v-slot:item.updatedAt="{ item }">
          {{ item.updatedAt | localDate }}
        </template>
      </v-data-table>
      <v-btn
        :ripple="false"
        :loading="createLoading"
        outlined
        rounded
        color="primary"
        class="mt-2"
        small
        @click="createProduct"
      >
        <v-icon left>mdi-plus</v-icon>
        Добавить продукт
      </v-btn>
    </div>
  </div>
</template>

<script>
import { getWaybill } from '@/graphql/queries'
import { createProduct, updateProduct } from '@/graphql/mutations'
import { onCreateProduct, onUpdateProduct } from '@/graphql/subscriptions'

export default {
  name: 'Waybill',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      createLoading: false,
      loading: false,
      data: {},
      errors: [],
      error: false,
      errorMessage: '',
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Article', value: 'article' },
        { text: 'Name', value: 'name' },
        { text: 'Status', value: 'status' },
        { text: 'Created', value: 'createdAt' },
        { text: 'Updated', value: 'updatedAt' },
      ],
    }
  },
  computed: {
    owner () {
      return this.$store.state.user.username
    },
    getWaybillQuery () {
      return this.$Amplify.graphqlOperation(getWaybill, {
        id: this.id
      })
    },
    createProductSubscription () {
      return this.$Amplify.graphqlOperation(onCreateProduct, {
        owner: this.owner
      })
    },
    updateProductSubscription () {
      return this.$Amplify.graphqlOperation(onUpdateProduct, {
        owner: this.owner
      })
    },
  },
  created () {
    this.fetchData()
    // this.createSubscription = this.$Amplify.API.graphql(this.createProductSubscription)
    //   .subscribe({
    //     next: ({ value: { data } }) => {
    //       const newItem = data.onCreateProduct
    //       const waybillId = newItem.waybill.id
    //       if (waybillId !== this.id) return
    //       this.data.getWaybill.products.items.push(newItem)
    //       console.log(this.id, 'create subscribtion', data)
    //     }
    //   })
  },
  beforeDestroy () {
    console.log('beforeDestroy', this.createSubscription)
    if (this.createSubscription) {
      this.createSubscription.unsubscribe()
    }
  },
  methods: {
    async updateProduct (input) {
      try {
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(updateProduct, {
            input
          })
        )
        if (response && response.errors && response.errors.length > 0) {
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
        // eslint-disable-next-line
        console.log('Data: ', response.data)
        const updatedItem = response.data.updateProduct
        const index = this.data.getWaybill.products.items
          .findIndex(el => el.id === updatedItem.id)
        this.data.getWaybill.products.items.splice(index, 1, updatedItem)
      } catch (error) {
        this.error = true
        this.errorMessage = error
        // eslint-disable-next-line
        console.log('Error: ', error)
      }
    },
    async fetchData () {
      try {
        this.loading = true
        const response = await this.$Amplify.API.graphql(this.getWaybillQuery)
        if (response && response.errors && response.errors.length > 0) {
          this.errors = response.errors
          throw new Error(response.errors.join('\n'))
        }
        this.data = response.data
      } catch (error) {
        this.error = true
        this.errorMessage = error
        // eslint-disable-next-line
        console.log('Error: ', error)
      } finally {
        this.loading = false
      }
    },
    onCreateProduct (prevData, newData) {
      if (prevData.data.getWaybill.id !== this.id) return
      // eslint-disable-next-line
      console.log('New product from subscription...', prevData, newData)
      const newItem = newData.onCreateProduct
      prevData.data.getWaybill.products.items.push(newItem)
      // const index = prevData.data.getWaybill.products.items
      //   .findIndex(el => el.id === newItem.id)
      // prevData.data.getWaybill.products.items.splice(index, 1, newItem)
      return prevData.data
    },
    async createProduct () {
      try {
        this.createLoading = true
        const input = {
          status: 'CREATED',
          owner: this.owner,
          productWaybillId: this.id
        }
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(createProduct, { input })
        )
        if (response && response.errors && response.errors.length > 0) {
          throw new Error(response.errors.join('\n'))
        }
        // eslint-disable-next-line
        console.log('Data: ', response.data)
        const newItem = response.data.createProduct
        // TODO create subscrubtion on every waybill?
        this.data.getWaybill.products.items.push(newItem)
        return response.data.createProduct
      } catch (error) {
        this.error = true
        this.errorMessage = error
        // eslint-disable-next-line
        console.log('Error: ', error)
        // Analytics.record({
        //   name: 'CreateProductError',
        //   attributes: {
        //     error: e.message
        //   }
        // })
      } finally {
        this.createLoading = null
      }
    }
  }
}
</script>
