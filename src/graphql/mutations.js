/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject = `mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
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
export const updateProject = `mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
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
export const deleteProject = `mutation DeleteProject($input: DeleteProjectInput!) {
  deleteProject(input: $input) {
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
export const createSpec = `mutation CreateSpec($input: CreateSpecInput!) {
  createSpec(input: $input) {
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
          waybills {
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
            link
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
      nextToken
    }
    version
  }
}
`;
export const createWaybill = `mutation CreateWaybill($input: CreateWaybillInput!) {
  createWaybill(input: $input) {
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
export const updateWaybill = `mutation UpdateWaybill($input: UpdateWaybillInput!) {
  updateWaybill(input: $input) {
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
export const deleteWaybill = `mutation DeleteWaybill($input: DeleteWaybillInput!) {
  deleteWaybill(input: $input) {
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
export const createProduct = `mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
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
export const updateProduct = `mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
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
export const deleteProduct = `mutation DeleteProduct($input: DeleteProductInput!) {
  deleteProduct(input: $input) {
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
