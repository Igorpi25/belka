/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProject = `query GetProject($id: ID!) {
  getProject(id: $id) {
    id
    owner
    team
    managers
    accauntants
    warehousemans
    freelancers
    name
    description
    client
    status
    spec {
      id
      owner
      team
      waybills {
        nextToken
      }
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
      team
      managers
      accauntants
      warehousemans
      freelancers
      name
      description
      client
      status
      spec {
        id
        owner
        team
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
    owner
    team
    waybills {
      items {
        id
        owner
        team
        number
        description
        contractor
        purchaseDate
        deliveryDate
        status
        createdAt
        updatedAt
      }
      nextToken
    }
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
      owner
      team
      waybills {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getWaybill = `query GetWaybill($id: ID!) {
  getWaybill(id: $id) {
    id
    owner
    team
    number
    description
    contractor
    purchaseDate
    deliveryDate
    spec {
      id
      owner
      team
      waybills {
        nextToken
      }
    }
    products {
      items {
        id
        owner
        team
        article
        name
        status
        createdAt
        updatedAt
      }
      nextToken
    }
    status
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
      team
      number
      description
      contractor
      purchaseDate
      deliveryDate
      spec {
        id
        owner
        team
      }
      products {
        nextToken
      }
      status
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getProduct = `query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    owner
    team
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
      size {
        w
        l
        h
      }
    }
    additional {
      images
      description
    }
    status
    waybill {
      id
      owner
      team
      number
      description
      contractor
      purchaseDate
      deliveryDate
      spec {
        id
        owner
        team
      }
      products {
        nextToken
      }
      status
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`;
export const listProducts = `query ListProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      team
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
      waybill {
        id
        owner
        team
        number
        description
        contractor
        purchaseDate
        deliveryDate
        status
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
