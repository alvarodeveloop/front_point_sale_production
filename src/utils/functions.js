import axios from 'axios'
import * as moment from 'moment-timezone'

export const setAuthorizationToken = token =>{
  if(token){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+token
  }else{
    delete axios.defaults.headers.common['Authorization']
  }
}

export const formatNumber = (number, decimals, dec_point, thousands_sep) =>{

  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return '' + Math.round(n * k) / k;
      };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);

}

export const renderImage = url => {

  let promise = new Promise((resolved,rejected) => {

    var xhr = new XMLHttpRequest();
    xhr.onload = async function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        resolved(reader.result)
      }

      reader.readAsDataURL(xhr.response);
    };

    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  })

  return promise
}

export const readerImg = file => {
  return new Promise((resolve,reject) => {

      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
  })
}

export const showPriceWithDecimals = (config,price) => {
  if(config){
    if(config.active_price_decimals === "Desactivado" || config.active_price_decimals === undefined){
      return formatNumber(price,0,'','.')
    }else{
      return formatNumber(price,2,',','.')
    }
  }else{
    return formatNumber(price,2,',','.')
  }
}

export const s2ab = s =>{
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export const returnTypePayment = payment => {
  payment = parseInt(payment,10)
  if(payment == 1){
    return 'Efectivo'
  }else if(payment == 2){
    return 'Debito'
  }else if(payment == 3){
    return 'Crédito'
  }
}

export const formatRut = string => {
  if(string){
    let val = string.replace(/-/g,'')
    val = val.substring(0,val.length -1)+'-'+val.substring(val.length -1)
    return val
  }else{
    return ''
  }
}

export const base64ToArrayBuffer = data => {
    var binaryString = window.atob(data);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}


export const displayTotalProduct = (detailProducts,discountGlobal,totalWithIva,tax) => {
  let total = 0
  detailProducts.forEach((item, i) => {

    let item1 = Object.assign({},item)

    if(item1.is_neto){
      item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
      item1.price = discountGlobal ? parseFloat(item1.price) - ((item1.price * discountGlobal) / 100) : item1.price
    }else{
      if(totalWithIva){
        item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
        item1.price = discountGlobal ? parseFloat(item1.price) - ((item1.price * discountGlobal) / 100) : item1.price
      }else{
        item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price
        item1.price = discountGlobal ? parseFloat(item1.price) - ((item1.price * discountGlobal) / 100) : item1.price
        item1.price = parseFloat( (item1.price * tax) / 100) + parseFloat(item1.price) // linea para sumar el iva
      }
    }
    total+= Math.ceil(parseFloat(item1.price)) * item1.quantity;
  })
  return total
}

export const displayTotalIva = (detailProducts,discountGlobal,totalWithIva,tax) => {
  let total = 0
  //console.log(detailProducts,discountGlobal,totalWithIva,tax,"");
  if(!detailProducts){
    return 0;
  }
  detailProducts.forEach((item, i) => {
    let item1 = Object.assign({},item)
    if(!item1.is_neto){
      if(totalWithIva){
        if(item1.method_sale === 3){
          item1.price = item1.quantity * item1.price;
        }
        item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price;
        item1.price = discountGlobal ? parseFloat(item1.price) - ((item1.price * discountGlobal) / 100) : item1.price;
        if(item1.method_sale === 3){
          total+= Math.ceil(parseFloat(((item1.price * tax) / 100)));
        }else{
          total+= Math.ceil(parseFloat(((item1.price * tax) / 100))) * item1.quantity;
        }
      }else{
        total+= 0
      }
    }
  })
  return total
}

export const displayTotalGastos = gastosDetail => {
  let total = 0
  gastosDetail.forEach((item, i) => {
    total += parseFloat(item.amount)
  });

  return total
}


export const displayTotalTotal = (detailProducts,discountGlobal,totalWithIva,tax,sin_gastos = false,gastosDetail) => {
  let total_product = displayTotalProduct(detailProducts,discountGlobal,totalWithIva,tax);
  let total_gastos  = displayTotalGastos(gastosDetail);
  let total_iva = 0
  if(totalWithIva){
    total_iva = displayTotalIva(detailProducts,discountGlobal,totalWithIva,tax);
  }
  if(!sin_gastos){
    return (parseFloat(total_product) + parseFloat(total_iva)) - parseFloat(total_gastos)
  }else{
    return (parseFloat(total_product) + parseFloat(total_iva))
  }
}

export const displayTotalDiscount = (detailProducts,discountGlobal,totalWithIva) => {
  let total = 0
  detailProducts.forEach((item, i) => {

    let item1 = Object.assign({},item)
    let value = 0
    if(item1.is_neto){
      item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price;
      value  = discountGlobal ? ((item1.price * discountGlobal) / 100) : 0;
    }else{
      if(totalWithIva){
        item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price;
        value = discountGlobal ?  ((item1.price * discountGlobal) / 100) : 0;
      }else{
        item1.price = item1.discount ? ( parseFloat(item1.price) - (( parseFloat(item1.price) *  item1.discount) / 100 ) ) : item1.price;
        value = discountGlobal ? ((item1.price * discountGlobal) / 100) : 0;
      }
    }
    total+= Math.ceil(value) * item1.quantity
  })
  return total
}