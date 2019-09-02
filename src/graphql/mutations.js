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
export const updateProject = `mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
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
export const deleteProject = `mutation DeleteProject($input: DeleteProjectInput!) {
  deleteProject(input: $input) {
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
export const createSpec = `mutation CreateSpec($input: CreateSpecInput!) {
  createSpec(input: $input) {
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
export const updateSpec = `mutation UpdateSpec($input: UpdateSpecInput!) {
  updateSpec(input: $input) {
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
export const deleteSpec = `mutation DeleteSpec($input: DeleteSpecInput!) {
  deleteSpec(input: $input) {
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
export const createWaybill = `mutation CreateWaybill($input: CreateWaybillInput!) {
  createWaybill(input: $input) {
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
export const updateWaybill = `mutation UpdateWaybill($input: UpdateWaybillInput!) {
  updateWaybill(input: $input) {
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
export const deleteWaybill = `mutation DeleteWaybill($input: DeleteWaybillInput!) {
  deleteWaybill(input: $input) {
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
export const createItem = `mutation CreateItem($input: CreateItemInput!) {
  createItem(input: $input) {
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
export const updateItem = `mutation UpdateItem($input: UpdateItemInput!) {
  updateItem(input: $input) {
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
export const deleteItem = `mutation DeleteItem($input: DeleteItemInput!) {
  deleteItem(input: $input) {
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
