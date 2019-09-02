/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProject = `subscription OnCreateProject($owner: String!) {
  onCreateProject(owner: $owner) {
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
export const onUpdateProject = `subscription OnUpdateProject($owner: String!) {
  onUpdateProject(owner: $owner) {
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
export const onDeleteProject = `subscription OnDeleteProject($owner: String!) {
  onDeleteProject(owner: $owner) {
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
export const onCreateSpec = `subscription OnCreateSpec($owner: String!) {
  onCreateSpec(owner: $owner) {
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
export const onUpdateSpec = `subscription OnUpdateSpec($owner: String!) {
  onUpdateSpec(owner: $owner) {
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
export const onDeleteSpec = `subscription OnDeleteSpec($owner: String!) {
  onDeleteSpec(owner: $owner) {
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
export const onCreateWaybill = `subscription OnCreateWaybill($owner: String!) {
  onCreateWaybill(owner: $owner) {
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
export const onUpdateWaybill = `subscription OnUpdateWaybill($owner: String!) {
  onUpdateWaybill(owner: $owner) {
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
export const onDeleteWaybill = `subscription OnDeleteWaybill($owner: String!) {
  onDeleteWaybill(owner: $owner) {
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
export const onCreateItem = `subscription OnCreateItem($owner: String!) {
  onCreateItem(owner: $owner) {
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
export const onUpdateItem = `subscription OnUpdateItem($owner: String!) {
  onUpdateItem(owner: $owner) {
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
export const onDeleteItem = `subscription OnDeleteItem($owner: String!) {
  onDeleteItem(owner: $owner) {
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
