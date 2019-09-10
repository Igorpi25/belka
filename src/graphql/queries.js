/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listProjects = `query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
        version
      }
      createdAt
      updatedAt
      version
    }
    nextToken
  }
}
`;
export const getSpec = `query GetSpec($id: ID!) {
  getSpec(id: $id) {
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
        spec {
          id
          owner
          team
          version
        }
        waybillSpecId
        products {
          nextToken
        }
        status
        createdAt
        updatedAt
        version
      }
      nextToken
    }
    version
  }
}
`;
export const getWaybill = `query GetWaybill($id: ID!) {
  getWaybill(id: $id) {
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
      version
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
        costs {
          id
          owner
          team
          purchasePrice
          clientPrice
          price
          amount
          total
          productId
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
          productId
          version
        }
        info {
          id
          owner
          team
          images
          description
          productId
          version
        }
        link {
          id
          owner
          team
          url
          productId
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
