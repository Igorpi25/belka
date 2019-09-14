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
      nextToken
    }
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
        cost {
          id
          owner
          team
          price
          amount
          clientPrice
          clientAmount
          waybillId
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
          waybillId
          version
        }
        info {
          id
          owner
          team
          images
          description
          waybillId
          version
        }
        link {
          id
          owner
          team
          url
          waybillId
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
