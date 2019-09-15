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
    profitType
    profitPercent
    profitForAll
    discount
    prepayment
    prepaymentDate
    residue
    residueDate
    customerDebt
    customerDebtDate
    createdAt
    updatedAt
    version
  }
}
`;
export const updateProductQuantity = `mutation UpdateProductQuantity($input: UpdateProductQuantityInput!) {
  updateProductQuantity(input: $input) {
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
    profitType
    profitPercent
    profitForAll
    discount
    prepayment
    prepaymentDate
    residue
    residueDate
    customerDebt
    customerDebtDate
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
    profitType
    profitPercent
    profitForAll
    discount
    prepayment
    prepaymentDate
    residue
    residueDate
    customerDebt
    customerDebtDate
    createdAt
    updatedAt
    version
  }
}
`;
export const updateProductStore = `mutation UpdateProductStore($input: UpdateProductStoreInput!) {
  updateProductStore(input: $input) {
    id
    owner
    team
    article
    name
    quantity
    unit
    cost {
      owner
      team
      price
      amount
      clientPrice
      clientAmount
    }
    store {
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
    }
    info {
      owner
      team
      images
      description
    }
    link {
      owner
      team
      url
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
      waybillSpecId
      products {
        nextToken
      }
      status
      profitType
      profitPercent
      profitForAll
      discount
      prepayment
      prepaymentDate
      residue
      residueDate
      customerDebt
      customerDebtDate
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
export const updateProductInfo = `mutation UpdateProductInfo($input: UpdateProductInfoInput!) {
  updateProductInfo(input: $input) {
    id
    owner
    team
    article
    name
    quantity
    unit
    cost {
      owner
      team
      price
      amount
      clientPrice
      clientAmount
    }
    store {
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
    }
    info {
      owner
      team
      images
      description
    }
    link {
      owner
      team
      url
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
      waybillSpecId
      products {
        nextToken
      }
      status
      profitType
      profitPercent
      profitForAll
      discount
      prepayment
      prepaymentDate
      residue
      residueDate
      customerDebt
      customerDebtDate
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
export const updateProductLink = `mutation UpdateProductLink($input: UpdateProductLinkInput!) {
  updateProductLink(input: $input) {
    id
    owner
    team
    article
    name
    quantity
    unit
    cost {
      owner
      team
      price
      amount
      clientPrice
      clientAmount
    }
    store {
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
    }
    info {
      owner
      team
      images
      description
    }
    link {
      owner
      team
      url
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
      waybillSpecId
      products {
        nextToken
      }
      status
      profitType
      profitPercent
      profitForAll
      discount
      prepayment
      prepaymentDate
      residue
      residueDate
      customerDebt
      customerDebtDate
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
        nextToken
      }
    }
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
    profitType
    profitPercent
    profitForAll
    discount
    prepayment
    prepaymentDate
    residue
    residueDate
    customerDebt
    customerDebtDate
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
    profitType
    profitPercent
    profitForAll
    discount
    prepayment
    prepaymentDate
    residue
    residueDate
    customerDebt
    customerDebtDate
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
      owner
      team
      price
      amount
      clientPrice
      clientAmount
    }
    store {
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
    }
    info {
      owner
      team
      images
      description
    }
    link {
      owner
      team
      url
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
      waybillSpecId
      products {
        nextToken
      }
      status
      profitType
      profitPercent
      profitForAll
      discount
      prepayment
      prepaymentDate
      residue
      residueDate
      customerDebt
      customerDebtDate
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
    cost {
      owner
      team
      price
      amount
      clientPrice
      clientAmount
    }
    store {
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
    }
    info {
      owner
      team
      images
      description
    }
    link {
      owner
      team
      url
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
      waybillSpecId
      products {
        nextToken
      }
      status
      profitType
      profitPercent
      profitForAll
      discount
      prepayment
      prepaymentDate
      residue
      residueDate
      customerDebt
      customerDebtDate
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
      owner
      team
      price
      amount
      clientPrice
      clientAmount
    }
    store {
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
    }
    info {
      owner
      team
      images
      description
    }
    link {
      owner
      team
      url
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
      waybillSpecId
      products {
        nextToken
      }
      status
      profitType
      profitPercent
      profitForAll
      discount
      prepayment
      prepaymentDate
      residue
      residueDate
      customerDebt
      customerDebtDate
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
