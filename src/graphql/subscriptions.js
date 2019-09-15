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
    version
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
export const onUpdateWaybillProduct = `subscription OnUpdateWaybillProduct($owner: ID!) {
  onUpdateWaybillProduct(owner: $owner) {
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
export const onUpdateProductRelation = `subscription OnUpdateProductRelation($owner: ID!) {
  onUpdateProductRelation(owner: $owner) {
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
        nextToken
      }
    }
    createdAt
    updatedAt
    version
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
export const onCreateProduct = `subscription OnCreateProduct($owner: String!) {
  onCreateProduct(owner: $owner) {
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
export const onUpdateProduct = `subscription OnUpdateProduct($owner: String!) {
  onUpdateProduct(owner: $owner) {
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
export const onDeleteProduct = `subscription OnDeleteProduct($owner: String!) {
  onDeleteProduct(owner: $owner) {
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
