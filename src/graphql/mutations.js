/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject = `mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
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
export const updateProject = `mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
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
export const deleteProject = `mutation DeleteProject($input: DeleteProjectInput!) {
  deleteProject(input: $input) {
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
export const createSpec = `mutation CreateSpec($input: CreateSpecInput!) {
  createSpec(input: $input) {
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
export const updateSpec = `mutation UpdateSpec($input: UpdateSpecInput!) {
  updateSpec(input: $input) {
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
export const deleteSpec = `mutation DeleteSpec($input: DeleteSpecInput!) {
  deleteSpec(input: $input) {
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
