/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProject = `subscription OnCreateProject {
  onCreateProject {
    id
    name
    description
    status
    specs {
      items {
        id
        number
        description
        client
        items
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
    name
    description
    status
    specs {
      items {
        id
        number
        description
        client
        items
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
    name
    description
    status
    specs {
      items {
        id
        number
        description
        client
        items
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
    number
    description
    client
    items
    status
    project {
      id
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
    number
    description
    client
    items
    status
    project {
      id
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
    number
    description
    client
    items
    status
    project {
      id
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
