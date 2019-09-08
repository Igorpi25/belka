<template>
  <div>
    <div v-if="errors.length > 0">
      <ErrorMessages :items.sync="errors" />
    </div>
    <v-hover v-else v-slot:default="{ hover }">
      <v-card :elevation="hover ? 6 : 2">
        <v-card-title class="flex">
          <h4 class="flex-grow-1">
            <Editable
              :value="item.name"
              :version="item.version"
              placeholder="Name"
              @input="updateProject({ name: $event })"
            />
          </h4>
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                class="ml-2"
                v-on="on"
              >
                <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                @click="deleteProject"
              >
                <v-list-item-title>Удалить</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>Описание:</v-list-item-content>
            <v-list-item-content class="align-end">
              <Editable
                :value="item.description"
                :version="item.version"
                placeholder="Description"
                @input="updateProject({ description: $event })"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>Статус:</v-list-item-content>
            <v-list-item-content class="align-end pl-5 pr-2">{{ item.status }}</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>Создан:</v-list-item-content>
            <v-list-item-content class="align-end pl-5 pr-2">{{ item.createdAt | localDate }}</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>Обновлен:</v-list-item-content>
            <v-list-item-content class="align-end pl-5 pr-2">{{ item.updatedAt | localDate }}</v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn
            :ripple="false"
            text
            color="primary"
            @click="$router.push({
              name: 'spec',
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
  </div>
</template>

<script>
import { mdiDotsVertical } from '@mdi/js'

import { updateProject, deleteProject } from '@/graphql/mutations'

import ErrorMessages from '@/components/ErrorMessages.vue'
import Editable from '@/components/Editable.vue'

import { errorMessage, confirmDialog } from '@/utils/helpers'

export default {
  name: 'ProjectItem',
  components: {
    ErrorMessages,
    Editable,
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    icons: {
      mdiDotsVertical
    },
    errors: [],
  }),
  computed: {
    owner () {
      return this.$store.getters.username
    },
  },
  methods: {
    async updateProject (value) {
      try {
        const input = Object.assign(value, {
          id: this.item.id,
          expectedVersion: this.item.version
        })
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(updateProject, { input })
        )
        if (response && response.errors && response.errors.length > 0) {
          throw response
        }
      } catch (error) {
        this.errors = error.errors || []
        const message = errorMessage(error)
        // eslint-disable-next-line
        console.log('Error: ', message)
        // Analytics.record({
        //   name: 'UpdateProjectError',
        //   attributes: {
        //     error: message
        //   }
        // })
      }
    },
    async deleteProject () {
      try {
        const msg = 'Вы действительно хотите удалить проект?'
        const confirm = await confirmDialog(msg)
        if (confirm === 'not_confirmed') {
          return
        }
        const input = {
          id: this.item.id,
          expectedVersion: this.item.version
        }
        const response = await this.$Amplify.API.graphql(
          this.$Amplify.graphqlOperation(deleteProject, { input })
        )
        if (response && response.errors && response.errors.length > 0) {
          throw response
        }
      } catch (error) {
        if (error === 'not_confirmed') return
        this.errors = error.errors || []
        const message = errorMessage(error)
        // eslint-disable-next-line
        console.log('Error: ', message)
        // Analytics.record({
        //   name: 'DeleteProjectError',
        //   attributes: {
        //     error: message
        //   }
        // })
      }
    },
  }
}
</script>
