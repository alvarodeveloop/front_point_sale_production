export const ColumnsCotization = [

      {
        Header: 'Nro Cotización',
        accessor: 'correlative'
      },
      {
        Header: 'Cliente',
        accessor: props => props.client.name_client
      },
      {
        Header: 'Estado',
        accessor: 'status'
      },
]

export const GastosCotizacion = [
  {
    Header: 'Descripción',
    accessor: 'description'
  },
  {
    Header: 'Monto',
    accessor: 'amount'
  }
]
