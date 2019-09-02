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
        projectId
        createdAt
        updatedAt
      }
      nextToken
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
    name
    description
    client
    status
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
        projectId
        createdAt
        updatedAt
      }
      nextToken
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
    name
    description
    client
    status
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
        projectId
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
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
    items {
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
      }
      additional {
        images
        description
      }
      status
      createdAt
      updatedAt
    }
    status
    project {
      id
      owner
      name
      description
      client
      status
      waybills {
        nextToken
      }
      createdAt
      updatedAt
    }
    projectId
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
    items {
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
      }
      additional {
        images
        description
      }
      status
      createdAt
      updatedAt
    }
    status
    project {
      id
      owner
      name
      description
      client
      status
      waybills {
        nextToken
      }
      createdAt
      updatedAt
    }
    projectId
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
    items {
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
      }
      additional {
        images
        description
      }
      status
      createdAt
      updatedAt
    }
    status
    project {
      id
      owner
      name
      description
      client
      status
      waybills {
        nextToken
      }
      createdAt
      updatedAt
    }
    projectId
    createdAt
    updatedAt
  }
}
`;
