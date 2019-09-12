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
export const createProduct = `mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
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
export const updateProduct = `mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
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
export const deleteProduct = `mutation DeleteProduct($input: DeleteProductInput!) {
  deleteProduct(input: $input) {
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
export const updateProductCost = `mutation UpdateProductCost($input: UpdateProductCostInput!) {
  updateProductCost(input: $input) {
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
export const updateProductStore = `mutation UpdateProductStore($input: UpdateProductStoreInput!) {
  updateProductStore(input: $input) {
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
export const updateProductInfo = `mutation UpdateProductInfo($input: UpdateProductInfoInput!) {
  updateProductInfo(input: $input) {
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
export const updateProductLink = `mutation UpdateProductLink($input: UpdateProductLinkInput!) {
  updateProductLink(input: $input) {
    id
    owner
    team
    url
    waybillId
    version
  }
}
`;
