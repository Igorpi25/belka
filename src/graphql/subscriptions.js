/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProject = `subscription OnCreateProject($owner: String!) {
  onCreateProject(owner: $owner) {
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
export const onUpdateProject = `subscription OnUpdateProject($owner: String!, $id: ID!) {
  onUpdateProject(owner: $owner, id: $id) {
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
export const onCreateWaybill = `subscription OnCreateWaybill($owner: String!, $waybillSpecId: ID!) {
  onCreateWaybill(owner: $owner, waybillSpecId: $waybillSpecId) {
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
        quantity
        unit
        link
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
export const onUpdateWaybill = `subscription OnUpdateWaybill($owner: String!, $id: ID!) {
  onUpdateWaybill(owner: $owner, id: $id) {
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
        quantity
        unit
        link
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
export const onCreateProduct = `subscription OnCreateProduct($owner: String!, $productWaybillId: ID!) {
  onCreateProduct(owner: $owner, productWaybillId: $productWaybillId) {
    id
    owner
    team
    article
    name
    quantity
    unit
    costs {
      purchasePrice
      clientPrice
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
      inStock
      dimension
      cargoPlaceNumber
    }
    info {
      images
      description
    }
    link
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
export const onUpdateProduct = `subscription OnUpdateProduct($owner: String!, $id: ID!) {
  onUpdateProduct(owner: $owner, id: $id) {
    id
    owner
    team
    article
    name
    quantity
    unit
    costs {
      purchasePrice
      clientPrice
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
      inStock
      dimension
      cargoPlaceNumber
    }
    info {
      images
      description
    }
    link
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
