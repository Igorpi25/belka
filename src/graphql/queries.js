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
        totalAmount
        totalClientAmount
        totalNet
        totalGross
        totalCapacity
        totalCargoPlaceCount
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
          totalAmount
          totalClientAmount
          totalNet
          totalGross
          totalCapacity
          totalCargoPlaceCount
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
        customProfit
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
          capacity
          inStock
          cargoPlaceCount
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
          totalAmount
          totalClientAmount
          totalNet
          totalGross
          totalCapacity
          totalCargoPlaceCount
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
    totalAmount
    totalClientAmount
    totalNet
    totalGross
    totalCapacity
    totalCargoPlaceCount
    createdAt
    updatedAt
    version
  }
}
`;
