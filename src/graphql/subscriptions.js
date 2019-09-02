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
    spec {
      waybills {
        id
        number
        description
        contractor
        purchaseDate
        deliveryDate
        status
        createdAt
        updatedAt
      }
    }
    managers
    freelancers
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
    spec {
      waybills {
        id
        number
        description
        contractor
        purchaseDate
        deliveryDate
        status
        createdAt
        updatedAt
      }
    }
    managers
    freelancers
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
    spec {
      waybills {
        id
        number
        description
        contractor
        purchaseDate
        deliveryDate
        status
        createdAt
        updatedAt
      }
    }
    managers
    freelancers
    createdAt
    updatedAt
  }
}
`;
