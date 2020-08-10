export const flowCashAccountModal = [
  {
    Header: 'Descripción',
    accessor: 'description'
  },
  {
    Header: 'Monto',
    accessor: 'amount',
    Cell : props1 => {
      return props1.cell.row.original.amount
    }
  },
  {
    Header: 'Centro de Costros',
    accessor: props1 => [props1.centerCoste.name]
  },
]

export const flowCashCenterModal = [
  {
    Header: 'Descripción',
    accessor: 'description'
  },
  {
    Header: 'Monto',
    accessor: 'amount',
    Cell : props1 => {
      return props1.cell.row.original.amount
    }
  },
  {
    Header: 'Cuenta',
    accessor: props1 => [props1.account.account_name]
  },
]
