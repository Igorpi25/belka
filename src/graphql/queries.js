/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProject = `query GetProject($id: ID!) {
  getProject(id: $id) {
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
export const listProjects = `query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      name
      description
      client
      status
      managers
      freelancers
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
