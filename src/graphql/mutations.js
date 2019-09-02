/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject = `mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
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
export const updateProject = `mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
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
export const deleteProject = `mutation DeleteProject($input: DeleteProjectInput!) {
  deleteProject(input: $input) {
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
