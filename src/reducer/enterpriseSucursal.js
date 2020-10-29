const initialState = {
  enterprises: [],
  branchOffices: [],
  id_branch_office : '',
  id_enterprise: ''
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'setEnterprises':
      return Object.assign({},state,{
        enterprises: action.enterprises,
      })
    break;
    case 'setBranchOffices':
      return Object.assign({},state,{
        branchOffices: action.branchOffices
      })
    break;
    case 'setIdEnterprise':
      return Object.assign({},state,{
        id_enterprise: action.id_enterprise
      })
    break;
    case 'setIdBranchOffice':
      return Object.assign({},state,{
        id_branch_office: action.id_branch_office
      })
    break;
    case 'removeData':
      return Object.assign({},{},{
        enterprises: [],
        branchOffices: []
      })
    break;
    default: return state;
  }
}
