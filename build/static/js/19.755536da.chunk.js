(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[19],{654:function(e,t,a){"use strict";var n=a(45),r=a(659),c=a(1),o=a.n(c),l=a(661),i=a(660),s=a(664),u=a(319);function m(){var e=Object(r.a)(["\n  padding: 1rem;\n\n  .button-pagination{\n    margin-right: 10px;\n  }\n\n  .inputPage{\n    display: inline-block;\n    width: 150px;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .inputPageFilter{\n    display: inline-block;\n    width: 80%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .pagination {\n    padding: 0.5rem;\n    display: flex;\n    justify-content: center;\n  }\n\n  .tr_cabecera{\n    background-color: rgb(218, 236, 242);\n    color: black;\n  }\n"]);return m=function(){return e},e}var d=l.a.div(m());function p(e){var t=e.column,a=t.filterValue,n=t.preFilteredRows,r=t.setFilter,c=n.length;return o.a.createElement("input",{value:a||"",onChange:function(e){r(e.target.value||void 0)},placeholder:"Buscar en ".concat(c," registros..."),className:"inputPageFilter"})}function g(e,t,a){return Object(s.a)(e,a,{keys:[function(e){return e.values[t]}]})}function b(e){var t=e.columns,a=e.data,r=o.a.useMemo((function(){return{fuzzyText:g,text:function(e,t,a){return e.filter((function(e){var n=e.values[t];return void 0===n||String(n).toLowerCase().startsWith(String(a).toLowerCase())}))}}}),[]),c=o.a.useMemo((function(){return{Filter:p}}),[]),l=Object(i.useTable)({columns:t,data:a,defaultColumn:c,filterTypes:r,initialState:{pageIndex:0}},i.useFilters,i.useSortBy,i.usePagination),s=l.getTableProps,m=l.getTableBodyProps,d=l.headerGroups,b=l.page,_=l.prepareRow,E=l.canPreviousPage,f=l.canNextPage,h=l.pageOptions,v=l.pageCount,y=l.gotoPage,j=l.nextPage,O=l.previousPage,x=l.setPageSize,C=l.state,w=C.pageIndex,k=C.pageSize;return o.a.createElement("div",{className:"table-responsive"},o.a.createElement("table",Object.assign({},s(),{className:"table table-bordered"}),o.a.createElement("thead",null,d.map((function(e){return o.a.createElement("tr",Object.assign({},e.getHeaderGroupProps(),{className:"text-center"}),e.headers.map((function(e){return o.a.createElement("th",Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{className:"tr_cabecera"}),e.render("Header"),o.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""),o.a.createElement("div",null,e.canFilter?e.render("Filter"):null))})))}))),o.a.createElement("tbody",Object.assign({},m(),{className:"text-center"}),b.map((function(e,t){return _(e)||o.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return o.a.createElement("td",e.getCellProps(),e.render("Cell"))})))})))),o.a.createElement("div",{className:"pagination"},o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return y(0)},disabled:!E},"<<")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return O()},disabled:!E},"<")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return j()},disabled:!f},">")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return y(v-1)},disabled:!f},">>")," ",o.a.createElement("span",null,"P\xe1gina"," ",o.a.createElement("strong",null,w+1," de ",h.length)," "),o.a.createElement("span",{className:"ml-3"},"| ",o.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),o.a.createElement("input",Object(n.a)({type:"number",defaultValue:w+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;y(t)},className:"inputPage"},"onChange",(function(e){e.target.value>h.length&&(e.target.value=1)}))))," ",o.a.createElement("select",{value:k,onChange:function(e){x(Number(e.target.value))},className:"inputPage"},[10,20,30,40,50].map((function(e){return o.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))))}g.autoRemove=function(e){return!e};t.a=function(e){var t=e.data,a=e.columns;return o.a.createElement(d,null,o.a.createElement(b,{data:t,columns:a}))}},657:function(e,t,a){},675:function(e,t,a){"use strict";var n=a(45),r=a(23),c=a(61),o=a(1),l=a.n(o),i=a(836),s=a(50),u=a(627),m=a(318),d=a(319),p=a(32),g=a(31),b=(a(657),a(21)),_=a.n(b),E=a(15),f=a(170),h=function(e){var t=Object(o.useState)(!1),a=Object(c.a)(t,2),b=a[0],h=a[1],v=Object(o.useState)({name_client:"",email:"",type_document:"",data_document:"",phone:"",address:"",observation:"",picture:""}),y=Object(c.a)(v,2),j=y[0],O=y[1];Object(o.useEffect)((function(){if(e.dataModify){var t=Object.assign({},e.dataModify);O({name_client:t.name_client,email:t.email,type_document:t.type_document,data_document:t.data_document,phone:t.phone,address:t.address,observation:t.observation,picture:t.picture,id:t.id})}}),[e.dataModify]);var x=function(e){O(Object(r.a)(Object(r.a)({},j),{},Object(n.a)({},e.target.name,e.target.value)))},C=function(){O({name_client:"",email:"",type_document:"",data_document:"",phone:"",address:"",observation:"",picture:""}),e.onHide()};return l.a.createElement(i.a,{show:e.isShow,onHide:C,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},l.a.createElement(i.a.Header,{closeButton:!0,className:"header_dark"},l.a.createElement(i.a.Title,{id:"contained-modal-title-vcenter"},"Formulario de Clientes ",l.a.createElement(p.w,null))),l.a.createElement(s.a,{onSubmit:function(t){var a=t.currentTarget;if(t.preventDefault(),!1===a.checkValidity())return t.stopPropagation(),void h(!0);var n=Object.assign({},j);e.dataModify?_.a.put(g.a+"client/"+n.id,n).then((function(e){E.b.success("Cliente Modificado"),C()})).catch((function(e){e.response?E.b.error(e.response.data.message):E.b.error("Error, contacte con soporte")})):_.a.post(g.a+"client",j).then((function(e){E.b.success("Cliente Registrado"),C()})).catch((function(e){e.response?E.b.error(e.response.data.message):E.b.error("Error, contacte con soporte")}))},noValidate:!0,validated:b},l.a.createElement(i.a.Body,null,l.a.createElement(u.a,null,l.a.createElement(m.a,{sm:12,md:12,lg:12,xs:12},l.a.createElement(u.a,null,l.a.createElement(f.a,Object.assign({},e.inputName,{handleChange:x,value:j.name_client})),l.a.createElement(f.a,Object.assign({},e.inputEmail,{handleChange:x,value:j.email}))),l.a.createElement(u.a,null,l.a.createElement(f.a,Object.assign({},e.inputTypeDocument,{handleChange:x,value:j.type_document}),l.a.createElement("option",{value:""},"--Seleccione--"),l.a.createElement("option",{value:"Rut"},"Rut"),l.a.createElement("option",{value:"Id"},"Id"),l.a.createElement("option",{value:"Nro pasaporte"},"N\xb0 pasaporte")),l.a.createElement(f.a,Object.assign({},e.inputDataDocument,{handleChange:x,value:j.data_document}))),l.a.createElement(u.a,null,l.a.createElement(f.a,Object.assign({},e.inputPhone,{handleChange:x,value:j.phone})),l.a.createElement(f.a,Object.assign({},e.inputAddress,{handleChange:x,value:j.address}))),l.a.createElement(u.a,null,l.a.createElement(f.a,Object.assign({},e.inputObservation,{handleChange:x,value:j.observation})))))),l.a.createElement(i.a.Footer,null,l.a.createElement(d.a,{size:"sm",variant:"success",type:"submit"},"Guardar"),l.a.createElement(d.a,{size:"sm",onClick:C},"Cerrar"))))};h.defaultProps={inputName:{type:"text",required:!0,name:"name_client",label:"Nombre Cliente",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:["Requerido*"]},inputEmail:{type:"email",required:!1,name:"email",label:"Email",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:["Requerido*, ","Formato Tipo Email*"]},inputPhone:{type:"phone",required:!1,name:"phone",label:"Tel\xe9fono",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:[]},inputAddress:{type:"textarea",required:!1,name:"address",label:"Direcci\xf3n",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",rows:3,messageErrors:[]},inputTypeDocument:{type:"select",required:!1,name:"type_document",label:"Tipo de Documento",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:["Requerido*"]},inputDataDocument:{type:"text",required:!1,name:"data_document",label:"Informaci\xf3n Identidad",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",placeholder:"Introduzca su rut, id o su n\xb0 de pasaporte",messageErrors:["Requerido*"]},inputObservation:{type:"textarea",required:!1,name:"observation",label:"Observaci\xf3n",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",rows:3,messageErrors:[]}},t.a=h},686:function(e,t,a){},705:function(e,t,a){"use strict";var n=a(61),r=a(1),c=a.n(r),o=a(685),l=a.n(o),i=a(32),s=(a(686),a(663)),u=a(662);t.a=function(e){var t=Object(r.useState)(""),a=Object(n.a)(t,2),o=a[0],m=a[1];return Object(r.useEffect)((function(){e.resetValue&&(m(""),e.handleResetValueClient())}),[e.resetValue]),c.a.createElement(c.a.Fragment,null,c.a.createElement(s.a,{placement:"top",overlay:c.a.createElement(u.a,{id:"tooltip-disabled3"},"Buscar Cliente")},c.a.createElement("div",{className:"input-search"},c.a.createElement(i.r,null),c.a.createElement(l.a,{getItemValue:function(e){return e.name_client+"-"+e.data_document},items:e.items,shouldItemRender:function(e,t){return!e.name_client.toLowerCase().indexOf(t.toString().toLowerCase())||!e.data_document.toLowerCase().indexOf(t.toString().toLowerCase())},renderItem:function(e,t){return c.a.createElement("div",{style:{background:t?"lightgray":"white"},key:e.name_client+"-"+e.data_document},e.name_client)},value:o,onChange:function(e){return m(e.target.value)},onClick:function(t){console.log("aqui perro"),m(t),e.returnValue(t)},onSelect:function(t){m(t),e.returnValue(t)}}))))}},840:function(e,t,a){"use strict";a.r(t);var n,r=a(129),c=a(45),o=a(61),l=a(1),i=a.n(l),s=a(21),u=a.n(s),m=a(15),d=a(319),p=a(626),g=a(627),b=a(318),_=a(671),E=a(618),f=a(31),h=a(32),v=a(53),y=a(654),j=a(705),O=a(675),x=a(836),C=a(708),w=a(709),k=a(50),S=a(170),N=null,q=function(e){var t=Object(l.useState)(!1),a=Object(o.a)(t,2),n=a[0],r=a[1],c=Object(l.useState)(""),s=Object(o.a)(c,2),u=s[0],_=s[1],E=Object(l.useState)(null),f=Object(o.a)(E,2),h=f[0],v=f[1],j=Object(l.useState)({name_product:"",is_neto:!0,tax_additional:"",quantity:"",unity:1,concept:"",description:"",price:"",unit_price_with_tax:"",amount_discount_recharge:"",type_discount_recharge:"",type_amount_discount_recharge:"",price_total:"",price_backup_unit:"",price_total_with_tax:"",not_registered:!0}),O=Object(o.a)(j,2),q=O[0],P=O[1],z=Object(l.useState)(!1),T=Object(o.a)(z,2),F=T[0],D=T[1],R=Object(l.useRef)("");Object(l.useMemo)((function(){N=[{Header:"Producto",accessor:"name_product"},{Header:"Precio",accessor:"price"},{Header:"Acciones",Cell:function(e){e.cell.row.original.id;return i.a.createElement(d.a,{size:"sm",variant:"primary",block:!0,onClick:function(){return M(e.cell.row.original)}},"Agregar")}}]}),[]);var H=function(e){var t=parseFloat(e.price)*e.quantity,a=parseFloat(e.price)*parseFloat(e.tax_additional)/100,n=t+a;return{total_price_unit_with_tax:a+parseFloat(e.price),total_price:t,total_price_with_tax:n}},G=function(e){var t=null;if(t="Descuento"===e.type_amount_discount_recharge?"Porcentaje"===e.type_discount_recharge?parseFloat(e.price)-parseFloat(e.price)*parseFloat(e.amount_discount_recharge)/100:parseFloat(e.price)-parseFloat(e.amount_discount_recharge):"Porcentaje"===e.type_discount_recharge?parseFloat(e.price)+parseFloat(e.price)*parseFloat(e.amount_discount_recharge)/100:parseFloat(e.price)+parseFloat(e.amount_discount_recharge),e.tax_additional){var a=parseFloat(t)*e.quantity,n=parseFloat(t)*parseFloat(e.tax_additional)/100,r=a+n;return{price_new:t,total_price_unit_with_tax:n+parseFloat(t),total_price:a,total_price_with_tax:r}}return{price_new:t,total_price:parseFloat(t)*e.quantity,total_price_unit_with_tax:e.total_price_unit_with_tax,total_price_with_tax:e.total_price_with_tax}},A=function(){P({name_product:"",is_neto:!0,tax_additional:"",quantity:"",unity:1,concept:"",description:"",price:"",unit_price_with_tax:"",amount_discount_recharge:"",type_discount_recharge:"",type_amount_discount_recharge:"",price_total:"",price_backup_unit:"",price_total_with_tax:"",not_registered:!0}),v(null),r(!1),_("")},I=function(e){e.persist();var t=Object.assign({},q),a=t.unit_price_with_tax,n=t.total_price,r=t.total_price_with_tax;t.price;if("quantity"===e.target.name&&q.price)if(q.tax_additional){t.quantity=e.target.value;var c=H(t);a=c.total_price_unit_with_tax,n=c.total_price,r=c.total_price_with_tax}else{n=parseFloat(t.price)*e.target.value}if("price"===e.target.name){if(t.quantity)if(t.tax_additional){t.price=e.target.value;var o=H(t);a=o.total_price_unit_with_tax,n=o.total_price,r=o.total_price_with_tax}else{n=parseFloat(e.target.value)*t.quantity}else if(t.tax_additional){a=parseFloat(e.target.value)*parseFloat(t.tax_additional)/100+parseFloat(e.target.value)}t.price_backup_unit=e.target.value}if("type_amount_discount_recharge"===e.target.name&&t.amount_discount_recharge&&t.type_discount_recharge){t.type_amount_discount_recharge=e.target.value;var l=G(t);a=l.total_price_unit_with_tax,n=l.total_price,r=l.price_total_with_tax,t.price=l.price_new}else if("amount_discount_recharge"===e.target.name&&t.type_amount_discount_recharge&&t.type_discount_recharge){t.amount_discount_recharge=e.target.value;var i=G(t);a=i.total_price_unit_with_tax,n=i.total_price,r=i.price_total_with_tax,t.price=i.price_new}else if("type_discount_recharge"===e.target.name&&t.type_amount_discount_recharge&&t.amount_discount_recharge){t.type_discount_recharge=e.target.value;var s=G(t);a=s.total_price_unit_with_tax,n=s.total_price,r=s.price_total_with_tax,t.price=s.price_new}"concept"===e.target.name&&e.target.value.length>15&&(e.target.value=e.target.value.substring(0,e.target.value.length-1)),t.unit_price_with_tax=a,t.price_total=n,t.price_total_with_tax=r,t[e.target.name]=e.target.value,P(t)},M=function(e){v(Object.assign({},e)),r(!0),setTimeout((function(){R.current&&R.current.focus()}),300)};return i.a.createElement(x.a,{show:e.isShow,onHide:e.onHide,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0,backdrop:"static"},i.a.createElement(x.a.Header,{closeButton:!0,style:{backgroundColor:"black",color:"white"}},i.a.createElement(x.a.Title,{id:"contained-modal-title-vcenter"},"Productos")),i.a.createElement(x.a.Body,null,i.a.createElement(p.a,null,i.a.createElement(g.a,null,i.a.createElement(b.a,{sm:12,md:12,lg:12,xs:12,className:""},i.a.createElement(C.a,{defaultActiveKey:"inventary",id:"uncontrolled-tab-example"},i.a.createElement(w.a,{eventKey:"inventary",title:"Inventario"},n?i.a.createElement(i.a.Fragment,null,i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(g.a,{className:"justify-content-center"},i.a.createElement(b.a,{sm:6,md:6,lg:6},i.a.createElement("label",{className:"form-control-label"},"Cantidad"),i.a.createElement("input",{ref:R,onChange:function(e){_(e.target.value)},className:"form-control",value:u}))),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(g.a,{className:"justify-content-center"},i.a.createElement(b.a,{sm:6,md:6,lg:6},i.a.createElement(d.a,{size:"sm",variant:"primary",block:!0,onClick:function(){u?(h.quantity=u,e.handleSelectProduct(h),A()):m.b.error("La cantidad no puede estar vacia")}},"Aceptar")))):i.a.createElement(y.a,{data:e.products,columns:N})),i.a.createElement(w.a,{eventKey:"new",title:"Nuevo Producto"},i.a.createElement("br",null),i.a.createElement(p.a,null,i.a.createElement(g.a,null,i.a.createElement(b.a,{sm:12,md:12,lg:12},i.a.createElement(k.a,{onSubmit:function(t){var a=t.currentTarget;if(t.preventDefault(),!1===a.checkValidity())return t.stopPropagation(),void D(!0);e.handleSelectProduct(Object.assign({},q)),A(),D(!1)},noValidate:!0,validated:F},i.a.createElement("br",null),i.a.createElement(g.a,null,i.a.createElement(b.a,{sm:12,md:12,lg:12},i.a.createElement("label",{className:"form-control-label"},"Es Neto?")),i.a.createElement(b.a,{sm:1,md:1,lg:1},i.a.createElement("label",{className:"checkbox-inline"},i.a.createElement("input",{type:"radio",value:!1,checked:!q.is_neto,name:"is_neto",onChange:I}),"No")),i.a.createElement(b.a,{sm:1,md:1,lg:1},i.a.createElement("label",{className:"checkbox-inline"},i.a.createElement("input",{type:"radio",value:!0,checked:q.is_neto,name:"is_neto",onChange:I}),"Si")),i.a.createElement(S.a,Object.assign({},e.inputNameProduct,{value:q.name_product,handleChange:I})),i.a.createElement(S.a,Object.assign({},e.inputTaxAditional,{handleChange:I,value:q.tax_additional}),i.a.createElement("option",{value:""},"--Seleccione"))),i.a.createElement(g.a,null,i.a.createElement(S.a,Object.assign({},e.inputQuantity,{handleChange:I,value:q.quantity})),i.a.createElement(S.a,Object.assign({},e.inputUnity,{handleChange:I,value:q.unity}),i.a.createElement("option",{value:1},"Unidad"),i.a.createElement("option",{value:2},"Mayorista"),i.a.createElement("option",{value:3},"(Kilos,Litros,Metros,Entre Otros...)")),i.a.createElement(S.a,Object.assign({},e.inputConcept,{handleChange:I,value:q.concept}))),i.a.createElement(g.a,null,i.a.createElement(S.a,Object.assign({},e.inputDescription,{handleChange:I,value:q.description})),i.a.createElement(S.a,Object.assign({},e.inputUnitPrice,{handleChange:I,value:q.price})),i.a.createElement(S.a,Object.assign({},e.inputUnitPriceTax,{handleChange:I,value:q.unit_price_with_tax}))),i.a.createElement(g.a,null,i.a.createElement(b.a,{sm:12,md:12,lg:12},i.a.createElement("h4",{className:"text-center"},"Descuentos y Recargos"),i.a.createElement("br",null))),i.a.createElement(g.a,null,i.a.createElement(S.a,Object.assign({},e.inputTypeAmountRechargeDiscount,{handleChange:I,value:q.type_amount_discount_recharge}),i.a.createElement("option",{value:""},"--Seleccione--"),i.a.createElement("option",{value:"Descuento"},"Descuento"),i.a.createElement("option",{value:"Recargo"},"Recargo")),i.a.createElement(S.a,Object.assign({},e.inputAmountDiscountRecharge,{handleChange:I,value:q.amount_discount_recharge})),i.a.createElement(S.a,Object.assign({},e.inputTypeRechargeDiscount,{handleChange:I,value:q.type_discount_recharge}),i.a.createElement("option",{value:""},"--Seleccione--"),i.a.createElement("option",{value:"Fijo"},"Fijo"),i.a.createElement("option",{vale:"Porcentaje"},"Porcentaje"))),i.a.createElement(g.a,{className:"justify-content-center"},i.a.createElement(S.a,Object.assign({},e.inputPriceTotal,{handleChange:I,value:q.price_total})),i.a.createElement(S.a,Object.assign({},e.inputPriceTotalTax,{handleChange:I,value:q.price_total_with_tax}))),i.a.createElement(g.a,{className:"justify-content-center"},i.a.createElement(b.a,{sm:4,md:4,lg:4},i.a.createElement(d.a,{size:"sm",type:"submit",variant:"primary",block:!0},"Enviar")),i.a.createElement(b.a,{sm:4,md:4,lg:4},i.a.createElement(d.a,{size:"sm",type:"button",variant:"danger",block:!0,onClick:function(){var e=Object.assign({},q);e.price=e.price_backup_unit;var t=H(e);e.unit_price_with_tax=t.total_price_unit_with_tax,e.price_total=t.total_price,e.price_total_with_tax=t.total_price_with_tax,e.type_amount_discount_recharge="",e.amount_discount_recharge="",e.type_discount_recharge="",P(e)}},"Remover Descuento o Recargo"))))))))))))),i.a.createElement(x.a.Footer,null,i.a.createElement(d.a,{size:"sm",variant:"secondary",onClick:function(){A(),e.onHide()}},"Cerrar")))};q.defaultProps=(n={inputNameProduct:{type:"text",required:!1,name:"name_product",label:"Nombre Producto",messageErrors:[],cols:"col-sm-5 col-md-5 col-lg-5 col-xs-5"},inputTaxAditional:{type:"select",required:!1,name:"tax_additional",label:"Impuesto Adicional",messageErrors:[],cols:"col-sm-5 col-md-5 col-lg-5 col-xs-5"},inputQuantity:{type:"number",required:!0,name:"quantity",label:"Cantidad",messageErrors:["Requerido*"],cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"},inputUnity:{type:"select",required:!0,name:"unity",label:"Unidad",messageErrors:["Requerido*"],cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"},inputConcept:{type:"textarea",required:!0,name:"concept",label:"Concepto",rows:2,messageErrors:["Requerido*"],cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"},inputDescription:{type:"textarea",required:!1,name:"description",label:"Descripci\xf3n",rows:2,messageErrors:[],cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"},inputUnitPrice:{type:"number",required:!0,name:"price",label:"Precio Unitario",messageErrors:["Requerido*"],cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"},inputUnitPriceTax:{type:"number",required:!1,name:"unit_price_with_tax",label:"Precio Unitario con Impuesto",messageErrors:[],cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",readonly:!0},inputAmountDiscountRecharge:{type:"number",required:!1,name:"amount_discount_recharge",label:"Monto Recargo o Descuento",messageErrors:[],cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"},inputTypeDiscountRecharge:{type:"select",required:!1,name:"type_discount_recharge",label:"Tipo de Descuento o Recargo",messageErrors:[],cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"}},Object(c.a)(n,"inputAmountDiscountRecharge",{type:"number",required:!1,name:"amount_discount_recharge",label:"Monto Recargo o Descuento",messageErrors:[],cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"}),Object(c.a)(n,"inputPriceTotal",{type:"number",required:!1,name:"price_total",label:"Precio Total",messageErrors:[],cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",readonly:!0}),Object(c.a)(n,"inputPriceTotalTax",{type:"number",required:!1,name:"price_total_with_tax",label:"Precio Total con Impuesto",messageErrors:[],cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4",readonly:!0}),Object(c.a)(n,"inputTypeAmountRechargeDiscount",{type:"select",required:!1,name:"type_amount_discount_recharge",label:"Tipo de Acci\xf3n",messageErrors:[],cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"}),Object(c.a)(n,"inputTypeRechargeDiscount",{type:"select",required:!1,name:"type_discount_recharge",label:"Porcetaje o Fijo",messageErrors:[],cols:"col-sm-4 col-md-4 col-lg-4 col-xs-4"}),n);var P=q,z=a(23),T=function(e){var t=Object(l.useState)({description:"",amount:""}),a=Object(o.a)(t,2),n=a[0],r=a[1],s=Object(l.useState)(!1),u=Object(o.a)(s,2),p=u[0],_=u[1],E=Object(l.useRef)();Object(l.useEffect)((function(){e.isShow&&setTimeout((function(){E.current.focus()}),300)}),[e.isShow]);var f=function(e){r(Object(z.a)(Object(z.a)({},n),{},Object(c.a)({},e.target.name,e.target.value)))};return i.a.createElement(x.a,{show:e.isShow,onHide:e.onHide,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0,backdrop:"static"},i.a.createElement(x.a.Header,{closeButton:!0,style:{backgroundColor:"black",color:"white"}},i.a.createElement(x.a.Title,{id:"contained-modal-title-vcenter"},"Gastos de la Cotizaci\xf3n")),i.a.createElement(x.a.Body,null,i.a.createElement(k.a,{onSubmit:function(t){var a=t.currentTarget;if(t.preventDefault(),!1===a.checkValidity())return t.stopPropagation(),void _(!0);var c=Object.assign({},n);e.handleGastoSubmit(c),r({description:"",amount:""}),E.current.focus(),m.b.success("Gasto Agregado, agregue otro si desea"),_(!1)},noValidate:!0,validated:p},i.a.createElement(g.a,null,i.a.createElement(b.a,{sm:6,md:6,lg:6},i.a.createElement("label",{className:"form-control-label"},"Descripci\xf3n"),i.a.createElement("input",Object.assign({className:"form-control"},e.inputDescription,{value:n.description,onChange:f,ref:E})),i.a.createElement(k.a.Control.Feedback,{type:"invalid"},i.a.createElement("span",{className:"error-input"},"'Requerido*'"))),i.a.createElement(S.a,Object.assign({},e.inputAmount,{value:n.amount,handleChange:f}))),i.a.createElement(g.a,{className:"justify-content-center"},i.a.createElement(b.a,{sm:12,md:12,lg:12},i.a.createElement(d.a,{size:"sm",type:"submit",variant:"primary",block:!0},"Agregar"))))),i.a.createElement(x.a.Footer,null,i.a.createElement(d.a,{size:"sm",variant:"secondary",onClick:function(){r({description:"",amount:""}),_(!1),e.onHide()}},"Cerrar")))};T.defaultProps={inputDescription:{type:"text",required:!0,name:"description"},inputAmount:{type:"number",required:!0,name:"amount",label:"Monto",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}};var F=T,D=a(29),R=[{Header:"Descripci\xf3n",accessor:"description"},{Header:"Monto",accessor:"amount"}],H=null,G=function(e){var t=Object(l.useState)([]),a=Object(o.a)(t,2),n=a[0],c=a[1],s=Object(l.useState)(!1),u=Object(o.a)(s,2),p=u[0],g=u[1];Object(l.useEffect)((function(){return function(){H=null}}),[]),Object(l.useMemo)((function(){H=[{Header:"Nombre Cliente",accessor:"name_client"},{Header:"Email",accessor:"email"},{Header:"Documento",accessor:function(e){return[e.type_document+" "+e.data_document]},Cell:function(e){return e.cell.row.original.type_document+"\n"+e.cell.row.original.data_document}},{Header:"Seleccione",Cell:function(e){return i.a.createElement("input",{type:"checkbox",value:e.cell.row.original.email,onChange:b,className:"checkTable"})}}]}),[]);var b=function(e){e.persist(),e.target.checked?c((function(t){return[].concat(Object(r.a)(t),[e.target.value])})):c((function(t){return t.filter((function(t){return t!==e.target.value}))}))},_=function(){e.onHide()};return i.a.createElement(x.a,{show:e.isShow,onHide:_,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},i.a.createElement(x.a.Header,{closeButton:!0,className:"header_dark"},i.a.createElement(x.a.Title,{id:"contained-modal-title-vcenter"},"Clientes registrados")),i.a.createElement(x.a.Body,null,i.a.createElement(y.a,{data:e.clients,columns:H})),i.a.createElement(x.a.Footer,null,i.a.createElement(d.a,{size:"sm",variant:"primary",onClick:function(){e.handleClientSubmit(Object(r.a)(n)),n.length>0?(c([]),document.querySelectorAll(".checkTable").forEach((function(e,t){e.checked=!1})),g(!0),setTimeout((function(){g(!1)}),5e3)):m.b.error("Debe seleccionar al menos 1 cliente")},disabled:p},"Enviar"),i.a.createElement(d.a,{size:"sm",variant:"secondary",onClick:_,disabled:p},"cerrar")))},A=null,I=function(e){var t,a,n,s,x,C,w,k=Object(l.useState)([]),S=Object(o.a)(k,2),N=S[0],q=S[1],z=Object(l.useState)({}),T=Object(o.a)(z,2),H=T[0],I=T[1],M=Object(l.useState)([]),V=Object(o.a)(M,2),B=V[0],U=V[1],L=Object(l.useState)(!1),J=Object(o.a)(L,2),K=J[0],Q=J[1],W=Object(l.useState)(!1),X=Object(o.a)(W,2),Y=X[0],Z=X[1],$=Object(l.useState)(!1),ee=Object(o.a)($,2),te=ee[0],ae=ee[1],ne=Object(l.useState)([]),re=Object(o.a)(ne,2),ce=re[0],oe=re[1],le=Object(l.useState)(!1),ie=Object(o.a)(le,2),se=ie[0],ue=ie[1],me=Object(l.useState)([]),de=Object(o.a)(me,2),pe=de[0],ge=de[1],be=Object(l.useState)(!1),_e=Object(o.a)(be,2),Ee=_e[0],fe=_e[1],he=Object(l.useState)(!1),ve=Object(o.a)(he,2),ye=ve[0],je=ve[1],Oe=Object(l.useState)(""),xe=Object(o.a)(Oe,2),Ce=xe[0],we=xe[1];Object(l.useEffect)((function(){return Fe(),De(),e.match.params.id&&Se(),function(){A=null}}),[]),Object(l.useMemo)((function(){A=[{Header:"Producto",accessor:"name_product"},{Header:"Precio",accessor:function(t){if(t.is_neto)return[Object(D.f)(e.configGeneral,t.price)];var a=t.price*e.configStore.tax/100,n=t.price+a;return[Object(D.f)(e.configGeneral,n)]}},{Header:"Cantidad",accessor:"quantity"},{Header:"Total",accessor:function(t){if(t.is_neto)return[Object(D.f)(e.configGeneral,t.price*t.quantity)];var a=t.price*e.configStore.tax/100,n=t.price+a;return[Object(D.f)(e.configGeneral,n*t.quantity)]}},{Header:"Acciones",Cell:function(e){var t;e.cell.row.original;return i.a.createElement(d.a,(t={size:"sm"},Object(c.a)(t,"size","sm"),Object(c.a)(t,"variant","primary"),Object(c.a)(t,"block",!0),Object(c.a)(t,"onClick",(function(){return He(e.cell.row.original)})),t),"Remover")}}],R.length>2&&R.pop(),R.push({Header:"Acciones",Cell:function(e){var t;e.cell.row.original.id;return i.a.createElement(d.a,(t={size:"sm"},Object(c.a)(t,"size","sm"),Object(c.a)(t,"variant","primary"),Object(c.a)(t,"block",!0),Object(c.a)(t,"onClick",(function(){return Ge(e.cell.row.original)})),t),"Remover")}})}),[]);var ke=function(){U([]),ge([]),I({}),ue(!0),we(""),setTimeout((function(){ue(!1)}),300)},Se=function(){u.a.get(f.a+"cotizacion/"+e.match.params.id).then((function(e){ge(e.data.gastos);var t=[];e.data.products_not_registered.forEach((function(e,a){t.push(e)})),e.data.products.forEach((function(e,a){e.products.quantity=e.quantity,t.push(e.products)})),U(t),I((function(t){return e.data.client?e.data.client:{}})),we(e.data.comment)})).catch((function(e){e.response?m.b.error(e.response.data.message):m.b.error("Error, contacte con soporte")}))},Ne=function(){e.history.replace("/quotitation/search_quotitation")},qe=function(){e.history.replace("/facturation/dashboard")},Pe=function(t){var a={comment:Ce,products:Object.assign({},B),gastos:Object.assign({},pe),client:Object.assign({},H),status:t};je(!0),e.match.params.id?u.a.put(f.a+"cotizacion/"+e.match.params.id,a).then((function(e){m.b.success("Operaci\xf3n realizada con \xe9xito"),je(!1),ke(),4===t?setTimeout((function(){qe()}),1300):setTimeout((function(){Ne()}),1300)})).catch((function(e){ke(),je(!1),e.response?m.b.error(e.response.data.message):m.b.error("Error, contacte con soporte")})):u.a.post(f.a+"cotizacion",a).then((function(e){m.b.success("Operaci\xf3n realizada con \xe9xito"),je(!1),ke(),4===t&&qe()})).catch((function(e){ke(),je(!1),e.response?m.b.error(e.response.data.message):m.b.error("Error, contacte con soporte")}))},ze=function(){var t=0;return B.forEach((function(a,n){if(a.not_registered)if(a.tax_additional)if(a.is_neto)t+=a.unit_price_with_tax*a.quantity;else{var r=a.price*e.configStore.tax/100;t+=(a.unit_price_with_tax+r)*a.quantity}else t+=a.price*a.quantity;else if(a.is_neto)t+=a.price*a.quantity;else{var c=a.price*e.configStore.tax/100;t+=(a.price+c)*a.quantity}})),t},Te=function(){var e=0;return pe.forEach((function(t,a){e+=parseFloat(t.amount)})),e},Fe=function(){u.a.get(f.a+"client").then((function(e){q(e.data)})).catch((function(e){e.response?m.b.error(e.response.data.message):m.b.error("Error, contacte con soporte")}))},De=function(){u.a.get(f.a+"product").then((function(e){oe(e.data)})).catch((function(e){e.response?m.b.error(e.response.data.message):m.b.error("Error, contacte con soporte")}))},Re=function(){ue(!se)},He=function(e){U((function(t){return t.filter((function(t){return t.name_product!==e.name_product}))}))},Ge=function(e){ge((function(t){return t.filter((function(t){return t.description!==e.description}))}))},Ae=function(e){if(1===e&&H)return m.b.error("Debe seleccionar al menos 1 cliente"),!1;Pe(e)};return i.a.createElement(p.a,{className:"containerDiv"},i.a.createElement(g.a,null,i.a.createElement(b.a,{sm:4,md:4,lg:4},i.a.createElement("h4",{className:"text-center"},"Cliente"),Object.keys(H).length>0?i.a.createElement(i.a.Fragment,null,i.a.createElement("ul",{className:"list-group"},i.a.createElement("li",{className:"list-group-item"},i.a.createElement("b",null,"Nombre:")," ",H.name_client," ",i.a.createElement("br",null),i.a.createElement("b",null,"Tipo de Documento:")," ",H.type_document),i.a.createElement("li",{className:"list-group-item"},i.a.createElement("b",null,"Documento:")," ",H.data_document," ",i.a.createElement("br",null)," ",i.a.createElement("b",null,"Tel\xe9fono:")," ",H.phone))):i.a.createElement(i.a.Fragment,null,i.a.createElement("br",null),i.a.createElement("h5",{className:"text-center"},"No hay cliente seleccionado"))),i.a.createElement(b.a,{sm:4,md:4,lg:4},i.a.createElement(j.a,{items:N,returnValue:function(e){var t=e.split("-")[1],a=N.find((function(e){return e.data_document===t}));I(a)},handleResetValueClient:Re,resetValue:se}),i.a.createElement("br",null),Object.keys(H).length>0?i.a.createElement(g.a,null,i.a.createElement(b.a,{sm:12,md:12,lg:12,className:"text-center"},i.a.createElement(d.a,(t={size:"sm"},Object(c.a)(t,"size","sm"),Object(c.a)(t,"variant","danger text-center"),Object(c.a)(t,"onClick",(function(){I({}),Re()})),t),i.a.createElement(h.v,null)))):""),i.a.createElement(b.a,{sm:4,md:4,lg:4},i.a.createElement(d.a,(a={size:"sm"},Object(c.a)(a,"size","sm"),Object(c.a)(a,"variant","secondary"),Object(c.a)(a,"block",!0),Object(c.a)(a,"onClick",(function(){return Q(!0)})),a),"Crear Cliente"))),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(g.a,{className:"justify-content-center"},i.a.createElement(b.a,{sm:6,md:6,lg:6,xs:12},i.a.createElement(d.a,(n={size:"sm"},Object(c.a)(n,"size","sm"),Object(c.a)(n,"variant","info"),Object(c.a)(n,"block",!0),Object(c.a)(n,"onClick",(function(){return ae(!0)})),n),"Agregar Producto a la Cotizaci\xf3n"))),i.a.createElement(g.a,null,i.a.createElement(b.a,{sm:12,md:12,lg:12},i.a.createElement(y.a,{data:B,columns:A}))),i.a.createElement("hr",null),i.a.createElement(g.a,{className:"justify-content-center"},i.a.createElement(b.a,{sm:6,md:6,lg:6,xs:12},i.a.createElement(d.a,(s={size:"sm"},Object(c.a)(s,"size","sm"),Object(c.a)(s,"variant","info"),Object(c.a)(s,"block",!0),Object(c.a)(s,"onClick",(function(){return Z(!0)})),s),"Agregar Gastos a la Cotizaci\xf3n"))),i.a.createElement(g.a,null,i.a.createElement(b.a,{sm:12,md:12,lg:12},i.a.createElement(y.a,{data:pe,columns:R}))),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(g.a,null,i.a.createElement(b.a,{sm:12,md:12,lg:12},i.a.createElement("h3",{className:"text-center"},"Resumen y Totales"),i.a.createElement("br",null),i.a.createElement("table",{className:"table table-bordered"},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",{className:"text-center"},"Productos"),i.a.createElement("th",{className:"text-center"},"Gastos"),i.a.createElement("th",{className:"text-center"},"Balance Total"))),i.a.createElement("tbody",{className:"text-center"},i.a.createElement("tr",null,i.a.createElement("td",null,Object(D.f)(e.configGeneral,ze())),i.a.createElement("td",null,Object(D.f)(e.configGeneral,Te())),i.a.createElement("td",null,Object(D.f)(e.configGeneral,ze()-Te()))))))),i.a.createElement("br",null),i.a.createElement(g.a,null,i.a.createElement(b.a,{sm:12,md:12,lg:12},i.a.createElement("label",{for:""},"Comentario de la cotizaci\xf3n (Opcional)"),i.a.createElement("textarea",{rows:3,className:"form-control",onChange:function(e){we(e.target.value)},value:Ce}))),i.a.createElement("br",null),i.a.createElement(g.a,null,i.a.createElement(b.a,{sm:4,md:4,lg:4},i.a.createElement(d.a,(x={size:"sm"},Object(c.a)(x,"size","sm"),Object(c.a)(x,"variant","primary"),Object(c.a)(x,"disabled",ye),Object(c.a)(x,"block",!0),Object(c.a)(x,"onClick",(function(){return Ae(1)})),x),ye?"Guardando...":"Guardar y Enviar por Mail"," ",i.a.createElement(h.n,null))),i.a.createElement(b.a,{sm:4,md:4,lg:4},i.a.createElement(d.a,(C={size:"sm"},Object(c.a)(C,"size","sm"),Object(c.a)(C,"variant","primary"),Object(c.a)(C,"disabled",ye),Object(c.a)(C,"block",!0),Object(c.a)(C,"onClick",(function(){return Ae(4)})),C),ye?"Guardando...":"Guardar y Facturar"," ",i.a.createElement(v.g,null))),i.a.createElement(b.a,{sm:4,md:4,lg:4},i.a.createElement(d.a,(w={size:"sm"},Object(c.a)(w,"size","sm"),Object(c.a)(w,"variant","primary"),Object(c.a)(w,"disabled",ye),Object(c.a)(w,"block",!0),Object(c.a)(w,"onClick",(function(){return Ae(2)})),w),ye?"Guardando...":"Guardar"," ",i.a.createElement(h.m,null)))),i.a.createElement("br",null),i.a.createElement(g.a,{className:"justify-content-center"},i.a.createElement(b.a,{sm:3,md:3,lg:3},i.a.createElement(_.a,{size:"sm",id:"drop",title:ye?"Guardando":"Compartir",className:"dropdown_block",disabled:ye,variant:"secondary"},i.a.createElement(E.a.Item,{onClick:function(){return fe(!0)}},"Enviar por Mail"),i.a.createElement(E.a.Item,{onClick:function(){navigator.clipboard.writeText("http://localhost:3000/quotitation/create_quotitation").then((function(){m.b.success("Url Copiada y Guardando..."),Pe(2)}),(function(){console.log("error")}))}},"Copiar Link"))),i.a.createElement(b.a,{sm:3,md:3,lg:3},i.a.createElement(d.a,{variant:"danger",size:"sm",block:!0,type:"button",onClick:Ne},"Volver a la Tabla"))),i.a.createElement(O.a,{isShow:K,onHide:function(){Q(!1),Fe()}}),i.a.createElement(P,{isShow:te,onHide:function(){ae(!1)},products:ce,handleSelectProduct:function(e){U([].concat(Object(r.a)(B),[e])),ae(!1)}}),i.a.createElement(F,{isShow:Y,onHide:function(){return Z(!1)},handleGastoSubmit:function(e){ge([].concat(Object(r.a)(pe),[e]))}}),i.a.createElement(G,{clients:N,isShow:Ee,onHide:function(){return fe(!1)},handleClientSubmit:function(t){var a={comment:Ce,products:Object.assign({},B),gastos:Object.assign({},pe),client:Object.assign({},H),client_mail:t,status:3};je(!0),e.match.params.id?u.a.put(f.a+"cotizacion/"+e.match.params.id,a).then((function(e){m.b.success("Operaci\xf3n realizada con \xe9xito"),fe(!1),je(!1),ke(),Ne()})).catch((function(e){ke(),je(!1),e.response?m.b.error(e.response.data.message):m.b.error("Error, contacte con soporte")})):u.a.post(f.a+"cotizacion",a).then((function(e){m.b.success("Operaci\xf3n realizada con \xe9xito"),fe(!1),je(!1),ke()})).catch((function(e){ke(),je(!1),e.response?m.b.error(e.response.data.message):m.b.error("Error, contacte con soporte")}))}}))};I.defaultProps={configStore:JSON.parse(localStorage.getItem("configStore")),configGeneral:JSON.parse(localStorage.getItem("configGeneral"))};t.default=I}}]);
//# sourceMappingURL=19.755536da.chunk.js.map