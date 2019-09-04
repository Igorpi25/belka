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
export const onUpdateProject = `subscription OnUpdateProject($owner: String!) {
  onUpdateProject(owner: $owner) {
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
export const onDeleteProject = `subscription OnDeleteProject($owner: String!) {
  onDeleteProject(owner: $owner) {
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
export const onCreateSpec = `subscription OnCreateSpec($owner: String!) {
  onCreateSpec(owner: $owner) {
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
export const onUpdateSpec = `subscription OnUpdateSpec($owner: String!) {
  onUpdateSpec(owner: $owner) {
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
export const onDeleteSpec = `subscription OnDeleteSpec($owner: String!) {
  onDeleteSpec(owner: $owner) {
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
export const onCreateWaybill = `subscription OnCreateWaybill($owner: String!) {
  onCreateWaybill(owner: $owner) {
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
export const onUpdateWaybill = `subscription OnUpdateWaybill($owner: String!) {
  onUpdateWaybill(owner: $owner) {
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
export const onDeleteWaybill = `subscription OnDeleteWaybill($owner: String!) {
  onDeleteWaybill(owner: $owner) {
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
export const onCreateProduct = `subscription OnCreateProduct($owner: String!) {
  onCreateProduct(owner: $owner) {
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
export const onUpdateProduct = `subscription OnUpdateProduct($owner: String!) {
  onUpdateProduct(owner: $owner) {
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
export const onDeleteProduct = `subscription OnDeleteProduct($owner: String!) {
  onDeleteProduct(owner: $owner) {
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
