/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProject = `subscription OnCreateProject($owner: ID!) {
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
          spec {
            id
            owner
            team
            version
          }
          waybillSpecId
          products {
            nextToken
          }
          status
          createdAt
          updatedAt
          version
        }
        nextToken
      }
      version
    }
    createdAt
    updatedAt
    version
  }
}
`;
export const onUpdateProject = `subscription OnUpdateProject($owner: ID!) {
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
          spec {
            id
            owner
            team
            version
          }
          waybillSpecId
          products {
            nextToken
          }
          status
          createdAt
          updatedAt
          version
        }
        nextToken
      }
      version
    }
    createdAt
    updatedAt
    version
  }
}
`;
export const onDeleteProject = `subscription OnDeleteProject($owner: ID!) {
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
          spec {
            id
            owner
            team
            version
          }
          waybillSpecId
          products {
            nextToken
          }
          status
          createdAt
          updatedAt
          version
        }
        nextToken
      }
      version
    }
    createdAt
    updatedAt
    version
  }
}
`;
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
          spec {
            id
            owner
            team
            version
          }
          waybillSpecId
          products {
            nextToken
          }
          status
          createdAt
          updatedAt
          version
        }
        nextToken
      }
      version
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
        costs {
          purchasePrice
          clientPrice
          price
          amount
          total
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
            version
          }
          waybillSpecId
          products {
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
          spec {
            id
            owner
            team
            version
          }
          waybillSpecId
          products {
            nextToken
          }
          status
          createdAt
          updatedAt
          version
        }
        nextToken
      }
      version
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
        costs {
          purchasePrice
          clientPrice
          price
          amount
          total
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
            version
          }
          waybillSpecId
          products {
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
          spec {
            id
            owner
            team
            version
          }
          waybillSpecId
          products {
            nextToken
          }
          status
          createdAt
          updatedAt
          version
        }
        nextToken
      }
      version
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
        costs {
          purchasePrice
          clientPrice
          price
          amount
          total
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
            version
          }
          waybillSpecId
          products {
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
    costs {
      purchasePrice
      clientPrice
      price
      amount
      total
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
        version
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
          costs {
            purchasePrice
            clientPrice
            price
            amount
            total
          }
          store {
            net
            gross
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
    costs {
      purchasePrice
      clientPrice
      price
      amount
      total
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
        version
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
          costs {
            purchasePrice
            clientPrice
            price
            amount
            total
          }
          store {
            net
            gross
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
    costs {
      purchasePrice
      clientPrice
      price
      amount
      total
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
        version
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
          costs {
            purchasePrice
            clientPrice
            price
            amount
            total
          }
          store {
            net
            gross
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
    productWaybillId
    createdAt
    updatedAt
    version
  }
}
`;
