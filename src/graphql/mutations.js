/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject = `mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    owner
    name
    description
    status
    specs {
      items {
        id
        owner
        number
        description
        client
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
    owner
    name
    description
    status
    specs {
      items {
        id
        owner
        number
        description
        client
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
    owner
    name
    description
    status
    specs {
      items {
        id
        owner
        number
        description
        client
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
    owner
    number
    description
    client
    specs {
      id
      article
      name
      count {
        count
      }
      price {
        purchasePrice
        price
        amount
      }
      store {
        net
        gross
      }
      additional {
        images
        description
      }
      status
    }
    status
    project {
      id
      owner
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
    owner
    number
    description
    client
    specs {
      id
      article
      name
      count {
        count
      }
      price {
        purchasePrice
        price
        amount
      }
      store {
        net
        gross
      }
      additional {
        images
        description
      }
      status
    }
    status
    project {
      id
      owner
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
    owner
    number
    description
    client
    specs {
      id
      article
      name
      count {
        count
      }
      price {
        purchasePrice
        price
        amount
      }
      store {
        net
        gross
      }
      additional {
        images
        description
      }
      status
    }
    status
    project {
      id
      owner
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
