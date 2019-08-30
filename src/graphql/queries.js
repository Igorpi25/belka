/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProject = `query GetProject($id: ID!) {
  getProject(id: $id) {
    id
    name
    description
    status
    specs {
      items {
        id
        number
        description
        client
        items
        status
        projectId
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const listProjects = `query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      status
      specs {
        nextToken
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getSpec = `query GetSpec($id: ID!) {
  getSpec(id: $id) {
    id
    number
    description
    client
    items
    status
    project {
      id
      name
      description
      status
      specs {
        nextToken
      }
      createdAt
      updatedAt
    }
    projectId
    createdAt
    updatedAt
  }
}
`;
export const listSpecs = `query ListSpecs(
  $filter: ModelSpecFilterInput
  $limit: Int
  $nextToken: String
) {
  listSpecs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      number
      description
      client
      items
      status
      project {
        id
        name
        description
        status
        createdAt
        updatedAt
      }
      projectId
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
