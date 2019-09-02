/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProject = `query GetProject($id: ID!) {
  getProject(id: $id) {
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
export const listProjects = `query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getWaybill = `query GetWaybill($id: ID!) {
  getWaybill(id: $id) {
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
export const listWaybills = `query ListWaybills(
  $filter: ModelWaybillFilterInput
  $limit: Int
  $nextToken: String
) {
  listWaybills(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
