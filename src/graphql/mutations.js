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
export const deleteSpec = `mutation DeleteSpec($input: DeleteSpecInput!) {
  deleteSpec(input: $input) {
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
export const createProduct = `mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
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
export const updateProduct = `mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
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
export const deleteProduct = `mutation DeleteProduct($input: DeleteProductInput!) {
  deleteProduct(input: $input) {
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
