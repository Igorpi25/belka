/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWaybill = `subscription OnCreateWaybill($owner: ID!, $waybillSpecId: ID!) {
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
        items {
          id
          owner
          team
          number
          description
          contractor
          purchaseDate
          deliveryDate
          waybillSpecId
          status
          createdAt
          updatedAt
          version
        }
        nextToken
      }
    }
    waybillSpecId
    products {
      items {
        id
        owner
        team
        article
        name
        quantity
        unit
        cost {
          id
          owner
          team
          purchasePrice
          clientPrice
          price
          amount
          total
          waybillId
          version
        }
        store {
          id
          owner
          team
          net
          gross
          width
          height
          length
          inStock
          dimension
          cargoPlaceNumber
          waybillId
          version
        }
        info {
          id
          owner
          team
          images
          description
          waybillId
          version
        }
        link {
          id
          owner
          team
          url
          waybillId
          version
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
          waybillSpecId
          status
          createdAt
          updatedAt
          version
        }
        productWaybillId
        createdAt
        updatedAt
        version
      }
      nextToken
    }
    status
    createdAt
    updatedAt
    version
  }
}
`;
export const onUpdateWaybill = `subscription OnUpdateWaybill($owner: ID!, $waybillSpecId: ID!) {
  onUpdateWaybill(owner: $owner, waybillSpecId: $waybillSpecId) {
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
        items {
          id
          owner
          team
          number
          description
          contractor
          purchaseDate
          deliveryDate
          waybillSpecId
          status
          createdAt
          updatedAt
          version
        }
        nextToken
      }
    }
    waybillSpecId
    products {
      items {
        id
        owner
        team
        article
        name
        quantity
        unit
        cost {
          id
          owner
          team
          purchasePrice
          clientPrice
          price
          amount
          total
          waybillId
          version
        }
        store {
          id
          owner
          team
          net
          gross
          width
          height
          length
          inStock
          dimension
          cargoPlaceNumber
          waybillId
          version
        }
        info {
          id
          owner
          team
          images
          description
          waybillId
          version
        }
        link {
          id
          owner
          team
          url
          waybillId
          version
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
          waybillSpecId
          status
          createdAt
          updatedAt
          version
        }
        productWaybillId
        createdAt
        updatedAt
        version
      }
      nextToken
    }
    status
    createdAt
    updatedAt
    version
  }
}
`;
export const onDeleteWaybill = `subscription OnDeleteWaybill($owner: ID!, $waybillSpecId: ID!) {
  onDeleteWaybill(owner: $owner, waybillSpecId: $waybillSpecId) {
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
        items {
          id
          owner
          team
          number
          description
          contractor
          purchaseDate
          deliveryDate
          waybillSpecId
          status
          createdAt
          updatedAt
          version
        }
        nextToken
      }
    }
    waybillSpecId
    products {
      items {
        id
        owner
        team
        article
        name
        quantity
        unit
        cost {
          id
          owner
          team
          purchasePrice
          clientPrice
          price
          amount
          total
          waybillId
          version
        }
        store {
          id
          owner
          team
          net
          gross
          width
          height
          length
          inStock
          dimension
          cargoPlaceNumber
          waybillId
          version
        }
        info {
          id
          owner
          team
          images
          description
          waybillId
          version
        }
        link {
          id
          owner
          team
          url
          waybillId
          version
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
          waybillSpecId
          status
          createdAt
          updatedAt
          version
        }
        productWaybillId
        createdAt
        updatedAt
        version
      }
      nextToken
    }
    status
    createdAt
    updatedAt
    version
  }
}
`;
export const onCreateProduct = `subscription OnCreateProduct($owner: ID!, $productWaybillId: ID!) {
  onCreateProduct(owner: $owner, productWaybillId: $productWaybillId) {
    id
    owner
    team
    article
    name
    quantity
    unit
    cost {
      id
      owner
      team
      purchasePrice
      clientPrice
      price
      amount
      total
      waybillId
      version
    }
    store {
      id
      owner
      team
      net
      gross
      width
      height
      length
      inStock
      dimension
      cargoPlaceNumber
      waybillId
      version
    }
    info {
      id
      owner
      team
      images
      description
      waybillId
      version
    }
    link {
      id
      owner
      team
      url
      waybillId
      version
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
        waybills {
          nextToken
        }
      }
      waybillSpecId
      products {
        items {
          id
          owner
          team
          article
          name
          quantity
          unit
          status
          productWaybillId
          createdAt
          updatedAt
          version
        }
        nextToken
      }
      status
      createdAt
      updatedAt
      version
    }
    productWaybillId
    createdAt
    updatedAt
    version
  }
}
`;
export const onUpdateProduct = `subscription OnUpdateProduct($owner: ID!, $productWaybillId: ID!) {
  onUpdateProduct(owner: $owner, productWaybillId: $productWaybillId) {
    id
    owner
    team
    article
    name
    quantity
    unit
    cost {
      id
      owner
      team
      purchasePrice
      clientPrice
      price
      amount
      total
      waybillId
      version
    }
    store {
      id
      owner
      team
      net
      gross
      width
      height
      length
      inStock
      dimension
      cargoPlaceNumber
      waybillId
      version
    }
    info {
      id
      owner
      team
      images
      description
      waybillId
      version
    }
    link {
      id
      owner
      team
      url
      waybillId
      version
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
        waybills {
          nextToken
        }
      }
      waybillSpecId
      products {
        items {
          id
          owner
          team
          article
          name
          quantity
          unit
          status
          productWaybillId
          createdAt
          updatedAt
          version
        }
        nextToken
      }
      status
      createdAt
      updatedAt
      version
    }
    productWaybillId
    createdAt
    updatedAt
    version
  }
}
`;
export const onDeleteProduct = `subscription OnDeleteProduct($owner: ID!, $productWaybillId: ID!) {
  onDeleteProduct(owner: $owner, productWaybillId: $productWaybillId) {
    id
    owner
    team
    article
    name
    quantity
    unit
    cost {
      id
      owner
      team
      purchasePrice
      clientPrice
      price
      amount
      total
      waybillId
      version
    }
    store {
      id
      owner
      team
      net
      gross
      width
      height
      length
      inStock
      dimension
      cargoPlaceNumber
      waybillId
      version
    }
    info {
      id
      owner
      team
      images
      description
      waybillId
      version
    }
    link {
      id
      owner
      team
      url
      waybillId
      version
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
        waybills {
          nextToken
        }
      }
      waybillSpecId
      products {
        items {
          id
          owner
          team
          article
          name
          quantity
          unit
          status
          productWaybillId
          createdAt
          updatedAt
          version
        }
        nextToken
      }
      status
      createdAt
      updatedAt
      version
    }
    productWaybillId
    createdAt
    updatedAt
    version
  }
}
`;
export const onUpdateProductCost = `subscription OnUpdateProductCost($owner: ID!, $waybillId: ID!) {
  onUpdateProductCost(owner: $owner, waybillId: $waybillId) {
    id
    owner
    team
    purchasePrice
    clientPrice
    price
    amount
    total
    waybillId
    version
  }
}
`;
export const onUpdateProductStore = `subscription OnUpdateProductStore($owner: ID!, $waybillId: ID!) {
  onUpdateProductStore(owner: $owner, waybillId: $waybillId) {
    id
    owner
    team
    net
    gross
    width
    height
    length
    inStock
    dimension
    cargoPlaceNumber
    waybillId
    version
  }
}
`;
export const onUpdateProductInfo = `subscription OnUpdateProductInfo($owner: ID!, $waybillId: ID!) {
  onUpdateProductInfo(owner: $owner, waybillId: $waybillId) {
    id
    owner
    team
    images
    description
    waybillId
    version
  }
}
`;
export const onUpdateProductLink = `subscription OnUpdateProductLink($owner: ID!, $waybillId: ID!) {
  onUpdateProductLink(owner: $owner, waybillId: $waybillId) {
    id
    owner
    team
    url
    waybillId
    version
  }
}
`;
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
        items {
          id
          owner
          team
          number
          description
          contractor
          purchaseDate
          deliveryDate
          waybillSpecId
          status
          createdAt
          updatedAt
          version
        }
        nextToken
      }
    }
    createdAt
    updatedAt
    version
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
        items {
          id
          owner
          team
          number
          description
          contractor
          purchaseDate
          deliveryDate
          waybillSpecId
          status
          createdAt
          updatedAt
          version
        }
        nextToken
      }
    }
    createdAt
    updatedAt
    version
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
        items {
          id
          owner
          team
          number
          description
          contractor
          purchaseDate
          deliveryDate
          waybillSpecId
          status
          createdAt
          updatedAt
          version
        }
        nextToken
      }
    }
    createdAt
    updatedAt
    version
  }
}
`;
