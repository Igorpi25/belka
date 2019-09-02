/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject = `mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    owner
    name
    description
    client
    status
    waybills {
      items {
        id
        owner
        number
        description
        contractor
        purchaseDate
        deliveryDate
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
    client
    status
    waybills {
      items {
        id
        owner
        number
        description
        contractor
        purchaseDate
        deliveryDate
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
    client
    status
    waybills {
      items {
        id
        owner
        number
        description
        contractor
        purchaseDate
        deliveryDate
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
export const createWaybill = `mutation CreateWaybill($input: CreateWaybillInput!) {
  createWaybill(input: $input) {
    id
    owner
    number
    description
    contractor
    purchaseDate
    deliveryDate
    items {
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
      createdAt
      updatedAt
    }
    status
    project {
      id
      owner
      name
      description
      client
      status
      waybills {
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
export const updateWaybill = `mutation UpdateWaybill($input: UpdateWaybillInput!) {
  updateWaybill(input: $input) {
    id
    owner
    number
    description
    contractor
    purchaseDate
    deliveryDate
    items {
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
      createdAt
      updatedAt
    }
    status
    project {
      id
      owner
      name
      description
      client
      status
      waybills {
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
export const deleteWaybill = `mutation DeleteWaybill($input: DeleteWaybillInput!) {
  deleteWaybill(input: $input) {
    id
    owner
    number
    description
    contractor
    purchaseDate
    deliveryDate
    items {
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
      createdAt
      updatedAt
    }
    status
    project {
      id
      owner
      name
      description
      client
      status
      waybills {
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
