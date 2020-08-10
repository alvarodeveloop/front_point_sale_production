import isEmpty from 'lodash/isEmpty';

const initialState = {
  sale: {
    rooms:[
      {
        carts: { registered:[], not_registered:[] },
        product_discount_recharge: [],
        client: {},
        total_recharge_discount: {amount: 0, idCart: 0, type: null},
        totales: {neto: 0, tax: 0, total: 0,total_backup: 0},
      },
    ],
    idCartSelected: 0,
  }
};


function calculateTax(products,config){

    let total = 0
    let result = 0
    let total_each = 0
    products.registered.forEach((v,i) => {
      if(v.is_neto !== undefined && v.is_neto !== true ){
        total_each = parseFloat(v.cantidad) * parseFloat(v.price)
        result = (total_each * parseFloat(config.tax)) / 100
        total = result + total
      }else{
        total+= 0
      }
    })

    products.not_registered.forEach((v,i) => {
      total_each = parseFloat(v.cantidad) * parseFloat(v.price)
      result = 0
      total = result + total
    })

    return total
}

function calculateNeto(products,discountRecharge = null){
  let total = 0
  let total_each = 0

  products.registered.forEach((v,i) => {
    total_each = parseFloat(v.cantidad) * parseFloat(v.price)
    total = total_each + total
  })

  products.not_registered.forEach((v,i) => {

    total_each = parseFloat(v.cantidad) * parseFloat(v.price)
    total = total_each + total
  })

  if(discountRecharge && discountRecharge.type){
    let data = discountRecharge
    if(data.type === "suma"){

      if(data.percentajeFixed === "fijo"){

        total = total + parseFloat(data.amount)
      }else{

        let totalPercentaje = ( total * parseFloat(data.amount) ) / 100
        total = total + totalPercentaje
      }
    }else{
      if(data.percentajeFixed === "fijo"){

        total = total - parseFloat(data.amount)
      }else{

        let totalPercentaje = ( total * parseFloat(data.amount) ) / 100
        total = total - totalPercentaje
      }
    }
  }


  return total
}

function calculateTotal(netoTotal, taxTotal){
  let total = netoTotal + taxTotal

  return total
}

export default (state = initialState, action = {}) => {

  switch(action.type) {
    // Carrito===========================================

      case 'addCart':

        let cartStoreAddCart = [...state.sale.rooms]
        cartStoreAddCart.push(action.cartNew)
        return {
          sale: Object.assign({},state.sale, {
            rooms: cartStoreAddCart
          })
        };

      break;
      case 'removeCart':
        let stateRemoveCart = Object.assign({},state.sale)
        let cartStoreRemoveCart = stateRemoveCart.rooms
        let lengthRooms = cartStoreRemoveCart.length
        let idCartRemoveCart = parseInt(stateRemoveCart.idCartSelected,10)
        let count = 0


        if(lengthRooms > 1){

          cartStoreRemoveCart =  cartStoreRemoveCart.filter(v =>{
            if(count !== idCartRemoveCart){
              count++
              return v
            }else{
              count++
            }
          })

        }else{
          cartStoreRemoveCart = [
            {
              carts: { registered:[], not_registered:[] },
              product_discount_recharge: [],
              client: {},
              total_recharge_discount: {amount: 0, idCart: 0, type: null},
              totales: {neto: 0, tax: 0, total: 0},
            }
          ]
        }



        const saleNewRemoveCart = Object.assign({},state.sale, {
          rooms: cartStoreRemoveCart,
          idCartSelected: 0
        })

        return {
          sale: saleNewRemoveCart
        };

      break;
      case 'resetCart':
        return {
          sale: {
            rooms:[
              {
                carts: { registered:[], not_registered:[] },
                product_discount_recharge: [],
                client: {},
                total_recharge_discount: {amount: 0, idCart: 0, type: null},
                totales: {neto: 0, tax: 0, total: 0, total_backup : 0},
              },
            ],
            idCartSelected: 0,
          }
        }
      break;

      case 'changeCartId':
        return {
          sale: Object.assign({},state.sale,{
            idCartSelected: action.id
          })
        }
      break;

      case 'addProduct':

        action.product.cantidad = 0
        let  stateAdd = Object.assign({},state.sale)
        let idCartAdd = stateAdd.idCartSelected
        let cartStore = stateAdd.rooms[idCartAdd].carts
        let exist = cartStore.registered.find(v => v.id === action.product.id && v.idCart == idCartAdd)

        if(!exist){
          if(action.product.method_sale == 2){
            action.product.cantidad = action.product.pack
          }else{
            action.product.cantidad = 1
          }
          action.product.priceBackup = action.product.price
          action.product.idCart = idCartAdd
        }else{
          if(action.product.method_sale == 2){
            exist.cantidad += action.product.pack
          }else{
            exist.cantidad = exist.cantidad + 1
          }
        }

        const saleNewAddProduct = Object.assign({},state.sale, {
          rooms: state.sale.rooms.map((v,i) => {
            if(i === idCartAdd){
              if(exist){
                  v.carts.registered = v.carts.registered.map((v2,i2) =>{
                    if(v2.id == exist.id) {
                      v2 = exist
                      return v2
                    }else{
                      return v2
                    }
                  })
                  return v
              }else{
                v.carts.registered.push(action.product)
              }
              return v
            }else{
              return v
            }
          }),
        })

        let totalesAdd = null

        let cartAddTotal = saleNewAddProduct.rooms[idCartAdd].carts
        let netoAdd = calculateNeto(cartAddTotal)
        let taxAdd  = calculateTax(cartAddTotal,action.configStore)
        let totalAdd = calculateTotal(netoAdd,taxAdd)

        totalesAdd = Object.assign({},{},{
          total: totalAdd,
          total_backup: totalAdd,
          neto: netoAdd,
          tax: taxAdd
        })

        saleNewAddProduct.rooms[idCartAdd].totales = totalesAdd

        return {
          sale: saleNewAddProduct
        };
      break;

      case 'addProductNotRegistered':
        action.product.cantidad = 0
        let stateNotProduct = Object.assign({},state.sale)
        let idCartAddNotRegistered = stateNotProduct.idCartSelected
        let cartStoreNotRegistered = stateNotProduct.rooms[idCartAddNotRegistered].carts

        action.product.id = cartStoreNotRegistered.not_registered.length + 1
        action.product.priceBackup = action.product.price
        action.product.idCart = idCartAddNotRegistered
        action.product.cantidad =  1
        cartStoreNotRegistered.not_registered.push(action.product)

        let totalesAddNot = null

        let cartAddTotalNot = cartStoreNotRegistered
        let netoAddNot = calculateNeto(cartAddTotalNot)
        let taxAddNot  = calculateTax(cartAddTotalNot,action.configStore)
        let totalAddNot = calculateTotal(netoAddNot,taxAddNot)

        totalesAddNot = Object.assign({},{},{
          total: totalAddNot,
          total_backup: totalAddNot,
          neto: netoAddNot,
          tax: taxAddNot
        })



        const saleNewAddProductNotRegistered = Object.assign({},state.sale,{
          rooms: state.sale.rooms.map((v,i) => {
            if(i === idCartAddNotRegistered){
              v.carts = cartStoreNotRegistered
              v.totales = totalesAddNot
              return v
            }else{
              return v
            }
          }),
        })

        return {
          sale: saleNewAddProductNotRegistered
        };
      break;

      case 'removeProduct':
        let stateRemove = Object.assign({},state.sale)
        let idCartRemove = stateRemove.idCartSelected
        let cartStoreRemove = stateRemove.rooms[idCartRemove].carts
        cartStoreRemove[action.typeProduct] =  cartStoreRemove[action.typeProduct].filter(v => v.id !== action.product.id)

        let netoRemove = calculateNeto(cartStoreRemove)
        let taxRemove  = calculateTax(cartStoreRemove,action.configStore)
        let totalRemove = calculateTotal(netoRemove,taxRemove)

        let totalesRemove = Object.assign({},{},{
          total: totalRemove,
          total_backup: totalRemove,
          neto: netoRemove,
          tax: taxRemove
        })

        const saleNewRemoveProduct = Object.assign({},state.sale, {
          rooms: state.sale.rooms.map((v,i) => {
            if(i === idCartRemove){
              v.carts = cartStoreRemove
              v.totales = totalesRemove
              return v
            }else{
              return v
            }
          }),
        })

        return {
          sale : saleNewRemoveProduct
        };
      break;

      case 'updateProduct':

        let stateUpdate = Object.assign({},state.sale)
        let idCartUpdate = stateUpdate.idCartSelected
        let cartUpdate = stateUpdate.rooms[idCartUpdate].carts


        cartUpdate[action.typeProduct] = cartUpdate[action.typeProduct].map((v,i) => {

          if(v.id === action.id_product && v.idCart == idCartUpdate){
            v.cantidad = action.cantidad
            v.price = action.price
            return v
          }else{
            return v
          }
        })

        let netoUpdate = calculateNeto(cartUpdate)
        let taxUpdate  = calculateTax(cartUpdate,action.configStore)
        let totalUpdate = calculateTotal(netoUpdate,taxUpdate)

        let totalesUpdate = Object.assign({},{},{
          total: totalUpdate,
          total_backup: totalUpdate,
          neto: netoUpdate,
          tax: taxUpdate
        })

        stateUpdate.rooms = stateUpdate.rooms.map((v,i) => {
          if(i === idCartUpdate){
            v.carts = cartUpdate
            v.totales = totalesUpdate
            return v
          }else{
            return v
          }
        })

        return {
          sale: stateUpdate
        };

      break;

      case 'setDescription':
        let stateDescription = Object.assign({},state.sale)
        let idCartDescription = stateDescription.idCartSelected
        let cartDescription = stateDescription.rooms[idCartDescription].carts
        cartDescription[action.typeProduct] = cartDescription[action.typeProduct].map((v,i) => {
          if(v.id === action.id_product){
            v.descriptionSale = action.description
            return v
          }else{
            return v
          }
        })

        const saleNewDescriptionProduct = Object.assign({},state.sale, {
          rooms: state.sale.rooms.map((v,i) => {
            if(i === idCartUpdate){
              v.carts = cartDescription
              return v
            }else{
              return v
            }
          }),
        })
        return {
          sale: saleNewDescriptionProduct
        };

      break;

    // DESCUENTOS Y RECARGOS ================================


    case 'setRecharge':

      let stateRecharge = Object.assign({},state.sale)
      let rechargesAdd = stateRecharge.rooms[stateRecharge.idCartSelected].product_discount_recharge

      if(rechargesAdd.find(v => v.id_product === action.product.id && v.idCart === stateRecharge.idCartSelected && v.typeRegister === action.typeRegister)){
        rechargesAdd = rechargesAdd.map(v => {
          if(v.id_product === action.product.id && v.idCart === stateRecharge.idCartSelected && v.typeRegister === action.typeRegister){
            v.amount = parseFloat(action.discount.amount)
            v.discountOrRecharge = false
            v.type =  action.discount.type
            return v
          }else{
            return v
          }
        })
      }else{
        rechargesAdd = [...rechargesAdd, Object.assign({},{},{
          idCart: stateRecharge.idCartSelected,
          amount: action.discount.amount,
          type: action.discount.type,
          id_product: action.product.id,
          typeRegister: action.typeRegister,
          discountOrRecharge: false,
        })]
      }

      let cartRecharge = stateRecharge.rooms[stateRecharge.idCartSelected].carts

      cartRecharge[action.typeRegister] = cartRecharge[action.typeRegister].map((v,i) => {
        if(v.id === action.product.id){
          v.price = action.discount.type === "fijo" ? parseFloat(v.price) + parseFloat(action.discount.amount) : parseFloat(v.price) + ( (parseFloat(v.price) * parseFloat(action.discount.amount) ) / 100 )
          return v
        }else{
          return v
        }
      })


      let netoRecharge = calculateNeto(cartRecharge)
      let taxRecharge  = calculateTax(cartRecharge,action.configStore)
      let totalRecharge = calculateTotal(netoRecharge,taxRecharge)

      let totalesRecharge = Object.assign({},{},{
        total: totalRecharge,
        total_backup: totalRecharge,
        neto: netoRecharge,
        tax: taxRecharge
      })

      const saleNewRechargeProduct = Object.assign({},state.sale, {
        rooms: state.sale.rooms.map((v,i) => {
          if(i === state.sale.idCartSelected){
            v.carts = cartRecharge
            v.product_discount_recharge = rechargesAdd
            v.totales =  totalesRecharge
            return v
          }else{
            return v
          }
        })
      })

      return {
        sale: saleNewRechargeProduct
      };

    break;

    case 'setDiscount' :

      let stateDiscount = Object.assign({},state.sale)
      let discountAdd = stateDiscount.rooms[stateDiscount.idCartSelected].product_discount_recharge

      if(discountAdd.find(v => v.id_product === action.product.id && v.idCart === stateDiscount.idCartSelected && v.typeRegister === action.typeRegister)){
        discountAdd = discountAdd.map(v => {
          if(v.id_product === action.product.id && v.idCart === stateDiscount.idCartSelected && v.typeRegister === action.typeRegister){
            v.amount = parseFloat(action.discount.amount)
            v.discountOrRecharge = true
            v.type = action.discount.type
            return v
          }else{
            return v
          }
        })
      }else{
        discountAdd = [...discountAdd, Object.assign({},{},{
          idCart: stateDiscount.idCartSelected,
          amount: action.discount.amount,
          type: action.discount.type,
          id_product: action.product.id,
          typeRegister: action.typeRegister,
          discountOrRecharge : true,
        })]
      }

      let cartDiscount = stateDiscount.rooms[stateDiscount.idCartSelected].carts
      cartDiscount[action.typeRegister] = cartDiscount[action.typeRegister].map((v,i) => {
        if(v.id === action.product.id){
          v.price = action.discount.type === "fijo" ? parseFloat(v.price) -  parseFloat(action.discount.amount) : parseFloat(v.price) - ( (parseFloat(v.price) * parseFloat(action.discount.amount) ) / 100 )
          return v
        }else{
          return v
        }
      })

      let netoDiscount = calculateNeto(cartDiscount, null)
      let taxDiscount  = calculateTax(cartDiscount,action.configStore)
      let totalDiscount = calculateTotal(netoDiscount,taxDiscount)

       let totalesDiscount = Object.assign({},{},{
        total: totalDiscount,
        total_backup: totalDiscount,
        neto: netoDiscount,
        tax: taxDiscount
      })

      const saleNewDiscountProduct = Object.assign({},state.sale, {
        rooms: state.sale.rooms.map((v,i) => {
          if(i === state.sale.idCartSelected){
            v.product_discount_recharge = discountAdd
            v.carts =  cartDiscount
            v.totales = totalesDiscount
            return v
          }else{
            return v
          }
        })
      })

      return {
        sale: saleNewDiscountProduct
      };
    break;

    case 'resetDiscountRecharge':

      let stateDiscountReset = Object.assign({},state.sale)
      let discountAddReset = stateDiscountReset.rooms[stateDiscountReset.idCartSelected].product_discount_recharge

      if(discountAddReset.find(v => v.id_product === action.product.id && v.idCart === stateDiscountReset.idCartSelected && v.typeRegister === action.typeRegister)){
        discountAddReset = discountAddReset.filter(v => {
          if(v.id_product !== action.product.id && v.typeRegister === action.typeRegister){
            return v
          }
        })
      }

      let cartDiscountReset = stateDiscountReset.rooms[stateDiscountReset.idCartSelected].carts
      cartDiscountReset[action.typeRegister] = cartDiscountReset[action.typeRegister].map((v,i) => {
        if(v.id === action.product.id){
          v.price = v.priceBackup
          return v
        }else{
          return v
        }
      })

      let netoDiscountReset = calculateNeto(cartDiscountReset, null)
      let taxDiscountReset  = calculateTax(cartDiscountReset,action.configStore)
      let totalDiscountReset = calculateTotal(netoDiscountReset,taxDiscountReset)

       let totalesDiscountReset = Object.assign({},{},{
        total: totalDiscountReset,
        total_backup: totalDiscountReset,
        neto: netoDiscountReset,
        tax: taxDiscountReset
      })

      const saleNewDiscountProductReset = Object.assign({},state.sale, {
        rooms: state.sale.rooms.map((v,i) => {
          if(i === state.sale.idCartSelected){
            v.product_discount_recharge = discountAddReset
            v.carts =  cartDiscountReset
            v.totales = totalesDiscountReset
            return v
          }else{
            return v
          }
        })
      })

      return {
        sale: saleNewDiscountProductReset
      };

    break;

    case 'setDiscountTotal' :
      let stateDiscountTotal = Object.assign({},state.sale)
      let discountTotal = stateDiscountTotal.rooms[stateDiscountTotal.idCartSelected].total_recharge_discount

      discountTotal.amount = parseFloat(action.discount.amount)
      discountTotal.type = 'resta'
      discountTotal.percentajeFixed = action.discount.type

      let netoDiscountTotal = calculateNeto(stateDiscountTotal.rooms[stateDiscountTotal.idCartSelected].carts,discountTotal)
      let taxDiscountTotal  = calculateTax(stateDiscountTotal.rooms[stateDiscountTotal.idCartSelected].carts,action.configStore)
      let totalDiscountTotal = netoDiscountTotal + taxDiscountTotal

      let totalesDiscountTotal = Object.assign({},stateDiscountTotal.rooms[stateDiscountTotal.idCartSelected].totales,{
        total: totalDiscountTotal,
        neto: netoDiscountTotal,
        tax: taxDiscountTotal
      })

      const saleNewDiscountTotal = Object.assign({},state.sale, {
        rooms: state.sale.rooms.map((v,i) => {
          if(i === state.sale.idCartSelected){
            v.total_recharge_discount = discountTotal
            v.totales =  totalesDiscountTotal
            return v
          }else{
            return v
          }
        })
      })

      return {
        sale: saleNewDiscountTotal
      };
    break;

    case 'setRechargeTotal' :
      let stateRechargeTotal = Object.assign({},state.sale)
      let rechargeTotal = stateRechargeTotal.rooms[stateRechargeTotal.idCartSelected].total_recharge_discount
      rechargeTotal = Object.assign({},rechargeTotal,{
        idCart: stateRechargeTotal.idCartSelected,
        amount: parseFloat(action.recharge.amount),
        percentajeFixed: action.recharge.type,
        type: 'suma',
      })

      let netoRechargeTotal = calculateNeto(stateRechargeTotal.rooms[stateRechargeTotal.idCartSelected].carts,rechargeTotal)
      let taxRechargeTotal  = calculateTax(stateRechargeTotal.rooms[stateRechargeTotal.idCartSelected].carts,action.configStore)
      let totalRechargeTotal = netoRechargeTotal + taxRechargeTotal

      let totalesRechargeTotal = Object.assign({},stateRechargeTotal.rooms[stateRechargeTotal.idCartSelected].totales,{
        total: totalRechargeTotal,
        neto: netoRechargeTotal,
        tax: taxRechargeTotal
      })

      const saleNewRechargeTotal = Object.assign({},state.sale, {
        rooms: state.sale.rooms.map((v,i) => {
          if(i === state.sale.idCartSelected){
            v.total_recharge_discount =  rechargeTotal
            v.totales =  totalesRechargeTotal
            return v
          }else{
            return v
          }
        })
      })

      return {
        sale: saleNewRechargeTotal
      };
    break;

    case 'resetTotal' :
      let stateResetTotal = Object.assign({},state.sale)
      stateResetTotal.rooms[stateResetTotal.idCartSelected].total_recharge_discount = {amount: 0, idCart: 0, type: null}

      let netoResetTotal = calculateNeto(stateResetTotal.rooms[stateResetTotal.idCartSelected].carts)
      let taxResetTotal  = calculateTax(stateResetTotal.rooms[stateResetTotal.idCartSelected].carts,action.configStore)
      let totalResetTotal = netoResetTotal + taxResetTotal

      let totalesResetTotal = Object.assign({},{},{
        total: totalResetTotal,
        neto: netoResetTotal,
        tax: taxResetTotal
      })

      stateResetTotal.rooms[stateResetTotal.idCartSelected].totales = totalesResetTotal

      return {
        sale: stateResetTotal
      }
    break;

    // CLIENTES===========================================
      case 'setBuyer':
      let saleClientAdd = Object.assign({},state.sale,{
        rooms: state.sale.rooms.map((v,i) => {
          if(i === state.sale.idCartSelected){
            v.client = action.client
            return v
          }else{
            return v
          }
        })
      })
        return {
          sale: saleClientAdd
        }
      break;

      case 'deleteBuyer':
        let stateDeleteBuyer = Object.assign({},state.sale)
        stateDeleteBuyer.rooms[stateDeleteBuyer.idCartSelected].client = {}
        return {sale  : stateDeleteBuyer}
      break;

      default: return state;

    // PAYMENT =============================================

  }
}
