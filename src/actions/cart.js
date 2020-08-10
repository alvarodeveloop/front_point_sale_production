
// ====================CARTS ===============================

export const addCart = data => {
  return {
    type: 'addCart',
    cartNew: {
      carts: { registered:[], not_registered:[] },
      product_discount_recharge: [],
      client: {},
      total_recharge_discount: {amount: 0, idCart: 0, type: null},
      totales: {neto: 0, tax: 0, total: 0},
    }
  }
}

export const removeCart = data => {
    return {
      type: 'removeCart',
    }
}

export const resetCart = () => {
  return{
    type: 'resetCart',
  }
}

export const changeCartId = id => {
  return{
    type: 'changeCartId',
    id
  }
}

// ============== Products =====================

export const addProduct = data => {
    return {
      type: 'addProduct',
      product: data.product,
      configStore: data.configStore
    }
}

export const addProductNotRegistered = data => {
    return {
      type: 'addProductNotRegistered',
      product: data.product,
      configStore: data.configStore
    }
}

export const updateProduct = data => {
    return {
      type: 'updateProduct',
      cantidad: data.cantidad,
      price: data.price,
      name_product: data.name_product,
      id_product: data.id_product,
      typeProduct: data.typeProduct,
      configStore: data.configStore
    }
}

export const setDescription = data => {
    return {
      type: 'setDescription',
      description: data.description,
      id_product: data.id_product,
      typeProduct: data.typeProduct

    }
}

export const removeProduct = data => {
    return {
      type: 'removeProduct',
      product: data.product,
      typeProduct: data.typeProduct
    }
}

export const setRecharge = data => {
    return {
      type: 'setRecharge',
      discount: data.discount,
      product: data.product,
      configStore: data.configStore,
      typeRegister: data.isRegistered
    }
}

export const setDiscount = data => {
    return {
      type: 'setDiscount',
      discount: data.discount,
      product: data.product,
      configStore: data.configStore,
      typeRegister: data.isRegistered
    }
}

export const setRechargeTotal = data => {
    return {
      type: 'setRechargeTotal',
      recharge: data.recharge,
      configStore: data.configStore,
    }
}

export const setDiscountTotal = data => {
    return {
      type: 'setDiscountTotal',
      discount: data.discount,
      configStore: data.configStore,
    }
}

export const resetDiscountRecharge = data => {
  return {
    type: 'resetDiscountRecharge',
    product: data.product,
    configStore: data.configStore,
    typeRegister: data.typeRegister
  }
}

export const handleResetTotal = data => {
  return {
    type: 'resetTotal',
    configStore: data.configStore
  }

}

// =================== CLIENTES ===============================

export const setBuyer = data => {
  return{
    type: 'setBuyer',
    client: data
  }
}


export const deleteBuyer = data => {
  return{
    type: 'deleteBuyer',
  }
}
