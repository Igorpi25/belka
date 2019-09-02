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
    spec {
      id
      owner
      waybills {
        nextToken
      }
    }
    managers
    accauntants
    warehousemans
    freelancers
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
      spec {
        id
        owner
      }
      managers
      accauntants
      warehousemans
      freelancers
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
    number
    description
    contractor
    purchaseDate
    deliveryDate
    spec {
      id
      owner
      waybills {
        nextToken
      }
    }
    items {
      items {
        id
        article
        name
        status
        createdAt
        updatedAt
        owner
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
      number
      description
      contractor
      purchaseDate
      deliveryDate
      spec {
        id
        owner
      }
      items {
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
export const getItem = `query GetItem($id: ID!) {
  getItem(id: $id) {
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
      number
      description
      contractor
      purchaseDate
      deliveryDate
      spec {
        id
        owner
      }
      items {
        nextToken
      }
      status
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    owner
  }
}
`;
export const listItems = `query ListItems(
  $filter: ModelItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      waybill {
        id
        owner
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
      owner
    }
    nextToken
  }
}
`;
