/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProject = `subscription OnCreateProject {
  onCreateProject {
    id
    owner
    name
    description
    status
    specs {
      items {
        id
        owner
        number
        description
        client
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
export const onUpdateProject = `subscription OnUpdateProject {
  onUpdateProject {
    id
    owner
    name
    description
    status
    specs {
      items {
        id
        owner
        number
        description
        client
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
export const onDeleteProject = `subscription OnDeleteProject {
  onDeleteProject {
    id
    owner
    name
    description
    status
    specs {
      items {
        id
        owner
        number
        description
        client
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
export const onCreateSpec = `subscription OnCreateSpec {
  onCreateSpec {
    id
    owner
    number
    description
    client
    specs {
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
    }
    status
    project {
      id
      owner
      name
      description
      status
      specs {
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
export const onUpdateSpec = `subscription OnUpdateSpec {
  onUpdateSpec {
    id
    owner
    number
    description
    client
    specs {
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
    }
    status
    project {
      id
      owner
      name
      description
      status
      specs {
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
export const onDeleteSpec = `subscription OnDeleteSpec {
  onDeleteSpec {
    id
    owner
    number
    description
    client
    specs {
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
    }
    status
    project {
      id
      owner
      name
      description
      status
      specs {
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
