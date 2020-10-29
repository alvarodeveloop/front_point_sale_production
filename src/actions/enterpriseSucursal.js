export const setEnterprises = data => {
    return {
      type: 'setEnterprises',
      enterprises: data
    }
}

export const setBranchOffices = data => {
    return {
      type: 'setBranchOffices',
      branchOffices: data
    }
}

export const setIdBranchOffice = data => {
    return {
      type: 'setIdBranchOffice',
      id_branch_office: data
    }
}

export const setIdEnterprise = data => {
    return {
      type: 'setIdEnterprise',
      id_enterprise: data
    }
}

export const removeData = () => {
    return {
      type: 'removeData',
    }
}
