export let userColumns = [

      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Rol',
        accessor: props => props.roles.name_role,
      },
]
