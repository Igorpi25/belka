<template>
  <div class="home">
    <h1>Home</h1>
    <div>
      <input v-model="project.name" type="text" placeholder="Name">
      <input v-model="project.description" type="text" placeholder="Description">
      <button type="submit">
        Create
      </button>
    </div>
    <div>
      <table>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.id }}</td>
            <td>{{ project.name }}</td>
            <td>{{ project.createdAt }}</td>
            <td>{{ project.updatedAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { graphqlOperation } from '@aws-amplify/core'
import API from '@aws-amplify/api'
import * as mutations from '@/graphql/mutations'
import * as queries from '@/graphql/queries'

export default {
  name: 'home',
  data () {
    return {
      project: {
        name: '',
        description: '',
        status: ''
      },
      projects: []
    }
  },
  created () {

  },
  methods: {
    async listProjects () {
      try {
        const response = await API.graphql(
          graphqlOperation(queries.listProjects)
        )
        if (response && response.errors && response.errors.length > 0) {
          throw new Error(response.errors.join('\n'))
        }
        // eslint-disable-next-line
        console.log('Data: ', response.data)
        this.projects = response.data.listProjects
      } catch (error) {
        // eslint-disable-next-line
        console.log('Error: ', error)
        // Analytics.record({
        //   name: 'ListProjectsError',
        //   attributes: {
        //     error: e.message
        //   }
        // })
      }
    },
    async createProject () {
      try {
        const response = await API.graphql(
          graphqlOperation(mutations.createProject, { project: this.project })
        )
        if (response && response.errors && response.errors.length > 0) {
          throw new Error(response.errors.join('\n'))
        }
        // eslint-disable-next-line
        console.log('Data: ', response.data)
        return response.data.createProject
      } catch (error) {
        // eslint-disable-next-line
        console.log('Error: ', error)
        // Analytics.record({
        //   name: 'CreateProjectError',
        //   attributes: {
        //     error: e.message
        //   }
        // })
      }
    }
  }
}
</script>
