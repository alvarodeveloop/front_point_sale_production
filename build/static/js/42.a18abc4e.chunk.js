(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[42],{690:function(e,t,a){"use strict";var n=a(34),r=a(136),l=a(1),c=a.n(l),o=a(135),s=a(702),i=a(704),u=a(132);function m(){var e=Object(r.a)(["\n  padding: 1rem;\n\n  .button-pagination{\n    margin-right: 10px;\n  }\n\n  .inputPage{\n    display: inline-block;\n    width: 150px;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .inputPageFilter{\n    display: inline-block;\n    width: 80%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .pagination {\n    padding: 0.5rem;\n    display: flex;\n    justify-content: center;\n  }\n\n  .table_responsive_eddit{\n    overflow-x: auto;\n  }\n"]);return m=function(){return e},e}var d=o.a.div(m());function p(e){var t=e.column,a=t.filterValue,n=t.preFilteredRows,r=t.setFilter,l=n.length;return c.a.createElement("input",{value:a||"",onChange:function(e){r(e.target.value||void 0)},placeholder:"Buscar en ".concat(l," registros..."),className:"inputPageFilter"})}function g(e,t,a){return Object(i.a)(e,a,{keys:[function(e){return e.values[t]}]})}function b(e){var t=e.columns,a=e.data,r=e.menuTop,l=e.headerColor,o=e.headerFontColor,i=c.a.useMemo((function(){return{fuzzyText:g,text:function(e,t,a){return e.filter((function(e){var n=e.values[t];return void 0===n||String(n).toLowerCase().startsWith(String(a).toLowerCase())}))}}}),[]),m=c.a.useMemo((function(){return{Filter:p}}),[]),d=Object(s.useTable)({columns:t,data:a,defaultColumn:m,filterTypes:i,initialState:{pageIndex:0}},s.useFilters,s.useSortBy,s.usePagination),b=d.getTableProps,E=d.getTableBodyProps,h=d.headerGroups,f=d.page,v=d.prepareRow,y=d.canPreviousPage,_=d.canNextPage,x=d.pageOptions,j=d.pageCount,N=d.gotoPage,O=d.nextPage,C=d.previousPage,k=d.setPageSize,S=d.state,P=S.pageIndex,T=S.pageSize;return c.a.createElement("div",{className:"table-responsive"},r?c.a.createElement("div",{className:"pagination"},c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return N(0)},disabled:!y},"<<")," ",c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return C()},disabled:!y},"<")," ",c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return O()},disabled:!_},">")," ",c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return N(j-1)},disabled:!_},">>")," ",c.a.createElement("span",null,"P\xe1gina"," ",c.a.createElement("strong",null,P+1," de ",x.length)," "),c.a.createElement("span",{className:"ml-3"},"| ",c.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),c.a.createElement("input",Object(n.a)({type:"number",defaultValue:P+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;N(t)},className:"inputPage"},"onChange",(function(e){e.target.value>x.length&&(e.target.value=1)}))))," ",c.a.createElement("select",{value:T,onChange:function(e){k(Number(e.target.value))},className:"inputPage"},[10,20,30,40,50].map((function(e){return c.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))):"",c.a.createElement("table",Object.assign({},b(),{className:"table table-bordered"}),c.a.createElement("thead",null,h.map((function(e){return c.a.createElement("tr",Object.assign({},e.getHeaderGroupProps(),{className:"text-center"}),e.headers.map((function(e){return c.a.createElement("th",Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{style:{backgroundColor:l||"rgb(218, 236, 242)",color:o||"black"}}),e.render("Header"),c.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""),c.a.createElement("div",null,e.canFilter?e.render("Filter"):null))})))}))),c.a.createElement("tbody",Object.assign({},E(),{className:"text-center"}),f.map((function(e,t){return v(e)||c.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return c.a.createElement("td",e.getCellProps(),e.render("Cell"))})))})))),c.a.createElement("div",{className:"pagination"},c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return N(0)},disabled:!y},"<<")," ",c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return C()},disabled:!y},"<")," ",c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return O()},disabled:!_},">")," ",c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return N(j-1)},disabled:!_},">>")," ",c.a.createElement("span",null,"P\xe1gina"," ",c.a.createElement("strong",null,P+1," de ",x.length)," "),c.a.createElement("span",{className:"ml-3"},"| ",c.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),c.a.createElement("input",Object(n.a)({type:"number",defaultValue:P+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;N(t)},className:"inputPage"},"onChange",(function(e){e.target.value>x.length&&(e.target.value=1)}))))," ",c.a.createElement("select",{value:T,onChange:function(e){k(Number(e.target.value))},className:"inputPage"},[10,20,30,40,50].map((function(e){return c.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))))}g.autoRemove=function(e){return!e};t.a=function(e){var t=e.data,a=e.columns,n=e.menuTop,r=e.headerColor,l=e.headerFontColor;return c.a.createElement(d,null,c.a.createElement(b,{data:t,columns:a,menuTop:n,headerFontColor:l,headerColor:r}))}},691:function(e,t,a){},764:function(e,t,a){"use strict";var n=a(34),r=a(22),l=a(20),c=a(18),o=a(1),s=a.n(o),i=a(909),u=a(87),m=a(134),d=a(687),p=a(49),g=a(132),b=a(23),E=a(9),h=a(15),f=a(88),v=a(12),y=a.n(v),_=function(e){var t=e.dataToPay,a=Object(c.a)(e,["dataToPay"]),v=Object(o.useState)({payment:"",turned:"",type:1,multiple_payment:{efectivo:0,tarjeta:0,sumup:0,cheque:0,otros:0,status:!1},voucher:!1}),_=Object(l.a)(v,2),x=_[0],j=_[1],N=Object(o.useState)(!1),O=Object(l.a)(N,2),C=O[0],k=O[1],S=Object(o.useState)(!1),P=Object(l.a)(S,2),T=P[0],D=P[1],F=function(){a.onHide()},z=function(e){var a=Object.assign({},x).turned,n=Object.assign({},x).payment;6===e?(k(!0),D(!0)):([2,3,4].includes(e)&&(a=0,n=t.total),D(!1)),j(Object(r.a)(Object(r.a)({},x),{},{turned:a,payment:n,type:e,multiple_payment:{efectivo:0,tarjeta:0,sumup:0,cheque:0,otros:0,status:!1}}))},w=function(e){var t=Object.assign({},x.multiple_payment);t[e.target.name]=e.target.value,j(Object(r.a)(Object(r.a)({},x),{},{multiple_payment:t}))},q=function(e){if("voucherCheckbox"===e.target.id)j(Object(r.a)(Object(r.a)({},x),{},{voucher:e.target.checked}));else if("type_delivery"===e.target.name){var t="true"===e.target.value;j(Object(r.a)(Object(r.a)({},x),{},Object(n.a)({},e.target.name,t)))}else j(Object(r.a)(Object(r.a)({},x),{},Object(n.a)({},e.target.name,e.target.value)))};return s.a.createElement(i.a,{show:a.isShow,onHide:F,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},s.a.createElement(i.a.Header,{closeButton:!0,className:"header_dark"},s.a.createElement(i.a.Title,{id:"contained-modal-title-vcenter"},"Pagar Factura")),s.a.createElement(i.a.Body,null,C?s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"containerDiv"},s.a.createElement(u.a,{sm:12,md:12,lg:12,xs:12},s.a.createElement(m.a,null,s.a.createElement(f.a,Object.assign({},a.inputEfectivo,{value:x.multiple_payment.efectivo,handleChange:w})),s.a.createElement(f.a,Object.assign({},a.inputTarjeta,{value:x.multiple_payment.tarjeta,handleChange:w}))),s.a.createElement(m.a,null,s.a.createElement(f.a,Object.assign({},a.inputSumup,{value:x.multiple_payment.sumup,handleChange:w})),s.a.createElement(f.a,Object.assign({},a.inputCheque,{value:x.multiple_payment.cheque,handleChange:w}))),s.a.createElement(m.a,null,s.a.createElement(f.a,Object.assign({},a.inputOtros,{value:x.multiple_payment.otros,handleChange:w}))),s.a.createElement(m.a,{className:"justify-content-center"},s.a.createElement(u.a,{sm:4,md:4,lg:4},s.a.createElement(g.a,{size:"md",variant:"secondary",block:!0,onClick:function(){var e=parseFloat(x.multiple_payment.efectivo)+parseFloat(x.multiple_payment.tarjeta)+parseFloat(x.multiple_payment.sumup)+parseFloat(x.multiple_payment.cheque)+parseFloat(x.multiple_payment.otros),a=e-t.total;a<0&&(a=0),j(Object(r.a)(Object(r.a)({},x),{},{turned:a,payment:e})),k(!1)}},"Procesar")),s.a.createElement(u.a,{sm:4,md:4,lg:4},s.a.createElement(g.a,{size:"md",variant:"danger",block:!0,onClick:function(){return k(!1)}},"Mostrar Secci\xf3n de Pagos")))))):s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"containerDiv",style:{marginLeft:"-8px"}},s.a.createElement(u.a,{sm:12,md:12,lg:12,xs:12},s.a.createElement("h4",{className:"text-center"},"Factura N\xb0 ",t.ref),s.a.createElement(m.a,null,s.a.createElement(u.a,{sm:4,md:4,lg:4,xs:12,className:"text-center"},s.a.createElement("h4",null,"Sub Total: ",s.a.createElement(d.a,{variant:"primary",style:{fontSize:"18px"}},Object(b.g)(a.config,t.sub_total)," "))),s.a.createElement(u.a,{sm:4,md:4,lg:4,xs:12,className:"text-center"},s.a.createElement("h4",null,"Tax: ",s.a.createElement(d.a,{variant:"primary",style:{fontSize:"18px"}},Object(b.g)(a.config,t.tax)))),s.a.createElement(u.a,{sm:4,md:4,lg:4,xs:12,className:"text-center"},s.a.createElement("h4",null,"Total: ",s.a.createElement(d.a,{variant:"primary",style:{fontSize:"18px"}},Object(b.g)(a.config,t.total))))))),s.a.createElement("div",{className:"containerDiv",style:{marginLeft:"-8px"}},s.a.createElement(m.a,{className:"justify-content-center"},s.a.createElement(f.a,Object.assign({},a.inputPayment,{handleChange:q,value:x.payment,handleKeyUp:function(e){var a=parseFloat(e.target.value)-parseFloat(t.total);j(a>0?Object(r.a)(Object(r.a)({},x),{},{turned:[2,3,4].includes(x.type)?0:a}):Object(r.a)(Object(r.a)({},x),{},{turned:0}))},readonly:T}))),s.a.createElement(m.a,{className:"justify-content-center"},s.a.createElement(f.a,Object.assign({},a.inputTurned,{handleChange:q,value:x.turned})))),s.a.createElement(m.a,{className:"justify-content-center"},s.a.createElement(u.a,{sm:4,md:4,lg:4},s.a.createElement(p.a.Group,null,s.a.createElement(p.a.Check,{type:"checkbox",custom:!0,id:"voucherCheckbox",label:"Venta sin Boleta",value:x.voucher,checked:x.voucher,onChange:q}))),s.a.createElement(u.a,{sm:4,md:4,lg:4},s.a.createElement("b",null,"Metodo de Pago: "),1===x.type?s.a.createElement(d.a,{variant:"danger",className:"font-badge"},"Efectivo"):2===x.type?s.a.createElement(d.a,{variant:"danger",className:"font-badge"},"D\xe9bito"):s.a.createElement(d.a,{variant:"danger",className:"font-badge"},"Cr\xe9dito"))),s.a.createElement(m.a,{className:"containerDiv justify-content-center",style:{marginLeft:"-8px"}},s.a.createElement(u.a,{sm:4,md:4,lg:4,xs:12},s.a.createElement(g.a,{size:"sm",onClick:function(){return z(1)},variant:"dark",block:"true"},"Efectivo")),s.a.createElement(u.a,{sm:4,md:4,lg:4,xs:12},s.a.createElement(g.a,{size:"sm",onClick:function(){return z(2)},variant:"dark",block:"true"},"Tarjeta Debito")),s.a.createElement(u.a,{sm:4,md:4,lg:4,xs:12},s.a.createElement(g.a,{size:"sm",onClick:function(){return z(3)},variant:"dark",block:"true"},"Tarjeta Cr\xe9dito")),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement(u.a,{sm:6,md:6,lg:6,xs:12},s.a.createElement(g.a,{size:"sm",variant:"secondary",block:"true",onClick:function(){if(x.type)if(x.payment){var e=parseFloat(t.total);if(parseFloat(x.payment)<e)E.b.error("El monto pagado es inferior al total por pagar");else{var n=Object.assign({},t,{payment:x}),r=a.isDispatch?"sale_dispatch_payment":"sale_fiao";y.a.post(h.b+r,n).then((function(e){E.b.success("Proceso Completado"),a.onHide()})).catch((function(e){e.response?E.b.error(e.response.data.message):(console.log(e),E.b.error("Error, contacte con soporte"))}))}}else E.b.error("Debe ingresar un monto a pagar");else E.b.error("Debe escoger un m\xe9todo de pago")}},"Finalizar"))))),s.a.createElement(i.a.Footer,null,s.a.createElement(g.a,{size:"md",onClick:F},"Cerrar")))};_.defaultProps={inputPayment:{type:"number",required:!0,name:"payment",label:"",placeholder:"Cantidad Recibida",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",step:"any",messageErrors:["Requerido*"]},inputTurned:{type:"number",required:!0,name:"turned",label:"",placeholder:"Vuelto",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",step:"any",readonly:!0,messageErrors:["Requerido*"]},inputEfectivo:{type:"number",required:!1,name:"efectivo",label:"Efectivo",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:[]},inputTarjeta:{type:"number",required:!1,name:"tarjeta",label:"Tarjeta",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:[]},inputSumup:{type:"number",required:!1,name:"sumup",label:"Sumup",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:[]},inputCheque:{type:"number",required:!1,name:"cheque",label:"Cheque",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:[]},inputOtros:{type:"number",required:!1,name:"otros",label:"Otros",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:[]}},t.a=_},765:function(e,t,a){"use strict";var n=a(18),r=a(1),l=a.n(r),c=a(909),o=a(687),s=a(132),i=(a(15),a(176),a(23));a(12);t.a=function(e){var t=e.dataSale,a=Object(n.a)(e,["dataSale"]);return l.a.createElement(c.a,{show:a.isShow,onHide:a.onHide,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},l.a.createElement(c.a.Header,{closeButton:!0,style:{backgroundColor:"black",color:"white"}},l.a.createElement(c.a.Title,{id:"contained-modal-title-vcenter"},"Detalle ",a.isDispatch?"del despacho ":"de la compra "," ",t.ref)),l.a.createElement(c.a.Body,null,l.a.createElement("h3",{className:"title_principal text-center"},"Cliente"),l.a.createElement("table",{className:"table table-bordered"},l.a.createElement("thead",null,l.a.createElement("tr",{style:{backgroundColor:"lightblue",color:"black"}},l.a.createElement("th",{className:"text-center"},"Nombre"),l.a.createElement("th",{className:"text-center"},"Fono"),l.a.createElement("th",{className:"text-center"},"Direcci\xf3n"),l.a.createElement("th",{className:"text-center"},"Documento"))),l.a.createElement("tbody",{className:"text-center"},l.a.createElement("tr",null,l.a.createElement("td",null,t.client?t.client.name_client:""),l.a.createElement("td",null,t.client?t.client.phone:""),l.a.createElement("td",null,t.client?t.client.address:""),l.a.createElement("td",null,t.client?t.client.type_document:""," ",l.a.createElement("br",null)," ",t.data_document)))),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("h3",{className:"title_principal text-center"},"Productos"),l.a.createElement("table",{className:"table table-bordered"},l.a.createElement("thead",null,l.a.createElement("tr",{style:{backgroundColor:"lightblue",color:"black"}},l.a.createElement("th",{className:"text-center"},"Nombre"),l.a.createElement("th",{className:"text-center"},"Precio"),l.a.createElement("th",{className:"text-center"},"Cantidad"),l.a.createElement("th",{className:"text-center"},"Descripci\xf3n"),l.a.createElement("th",{className:"text-center"},"M\xe9todo de Venta"),l.a.createElement("th",{className:"text-center"},"Descuento o Recargo"),l.a.createElement("th",{className:"text-center"},"Monto"))),l.a.createElement("tbody",{className:"text-center"},t.products?t.products.map((function(e,t){return l.a.createElement("tr",{key:t},l.a.createElement("td",null,e.product.name_product),l.a.createElement("td",null,a.config.simbolo_moneda+Object(i.g)(a.config,e.price)),l.a.createElement("td",null,e.quantity),l.a.createElement("td",null,e.description),l.a.createElement("td",null,function(e){switch(parseInt(e,10)){case 1:return l.a.createElement("span",null,"Unidad");case 2:return l.a.createElement("span",null,"Mayorista");case 3:return l.a.createElement("span",null,"Kilos,Litros u Otros")}}(e.method_sale)),l.a.createElement("td",null,e.discount_recharge.length>0?e.discount_recharge[0].discount_or_recharge?"Descuento":"Recargo":"No posee"),l.a.createElement("td",null,l.a.createElement(o.a,{variant:"danger",className:"font-badge"},a.config.simbolo_moneda+function(e){var t=e.discount_recharge.length>0?parseFloat(e.discount_recharge[0].amount):0,n=parseFloat(e.price)*e.quantity-t;return Object(i.g)(a.config,n)}(e))))})):"")),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("h3",{className:"title_principal text-center"},"Descuento o Recargo del Monto Total"),l.a.createElement("table",{className:"table table-bordered"},l.a.createElement("thead",null,l.a.createElement("tr",{style:{backgroundColor:"lightblue",color:"black"}},l.a.createElement("th",{className:"text-center"},"Monto"),l.a.createElement("th",{className:"text-center"},"Descuento o Recargo"),l.a.createElement("th",{className:"text-center"},"Tipo de Operaci\xf3n"))),l.a.createElement("tbody",{className:"text-center"},l.a.createElement("tr",null,l.a.createElement("td",null,a.config.simbolo_moneda+" "+Object(i.g)(a.config,t.total_discount_recharge)),l.a.createElement("td",null,t.type_discount_recharge?t.type_discount_recharge:"Ninguno"),l.a.createElement("td",null,t.type_percentaje_fixed_discount_recharge?t.type_percentaje_fixed_discount_recharge:"Ninguno")))),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("h3",{className:"title_principal text-center"},"Totales"),l.a.createElement("table",{className:"table table-bordered"},l.a.createElement("thead",null,l.a.createElement("tr",{style:{backgroundColor:"lightblue",color:"black"}},l.a.createElement("th",{className:"text-center"},"Total"),l.a.createElement("th",{className:"text-center"},"Tax"),l.a.createElement("th",{className:"text-center"},"Subtotal"),l.a.createElement("th",{className:"text-center"},"Monto Pagado"),l.a.createElement("th",{className:"text-center"},"Vuelto"))),l.a.createElement("tbody",{className:"text-center"},l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement(o.a,{variant:"danger",className:"font-badge"},a.config.simbolo_moneda+Object(i.g)(a.config,t.total))),l.a.createElement("td",null,l.a.createElement(o.a,{variant:"danger",className:"font-badge"},a.config.simbolo_moneda+t.tax)),l.a.createElement("td",null,l.a.createElement(o.a,{variant:"danger",className:"font-badge"},a.config.simbolo_moneda+t.sub_total)),l.a.createElement("td",null,l.a.createElement(o.a,{variant:"danger",className:"font-badge"},a.config.simbolo_moneda+Object(i.g)(a.config,t.payment))),l.a.createElement("td",null,l.a.createElement(o.a,{variant:"danger",className:"font-badge"},a.config.simbolo_moneda+Object(i.g)(a.config,t.turned)))))),l.a.createElement("table",{className:"table table-bordered"},l.a.createElement("thead",null,l.a.createElement("tr",{style:{backgroundColor:"lightblue",color:"black"}},l.a.createElement("th",{className:"text-center"},"Tax Configurado Al:"),l.a.createElement("th",{className:"text-center"},"M\xe9todo de Pago:"),l.a.createElement("th",{className:"text-center"},"Status"),l.a.createElement("th",{className:"text-center"},"Vendedor"))),l.a.createElement("tbody",{className:"text-center"},l.a.createElement("tr",null,l.a.createElement("td",null,t.tax_configuration),l.a.createElement("td",null,Object(i.d)(t.type_sale)),l.a.createElement("td",null,function(e){switch(parseInt(e,10)){case 1:return l.a.createElement("span",null,"Pagado");case 2:return l.a.createElement("span",null,"En espera");case 3:return l.a.createElement("span",null,"Anulado")}}(t.status)),l.a.createElement("td",null,t.user?t.user.email:""," - ",t.user?t.user.name:""))))),l.a.createElement(c.a.Footer,null,l.a.createElement(s.a,{size:"md",variant:"secondary",onClick:a.onHide},"Cerrar")))}},885:function(e,t,a){"use strict";a.r(t);var n=a(34),r=a(22),l=a(20),c=a(1),o=a.n(c),s=a(12),i=a.n(s),u=a(132),m=a(687),d=a(714),p=a(655),g=a(654),b=a(134),E=a(87),h=a(909),f=a(49),v=a(9),y=a(15),_=a(690),x=(a(694),a(23)),j=a(764),N=a(765),O=a(176),C=a(88),k=(a(691),a(740)),S=a(29),P=a(59),T=a(692),D=a(693),F=a(109),z=[],w={responsive:!0,maintainAspectRatio:!1,animation:{duration:0},hover:{animationDuration:0},responsiveAnimationDuration:0},q={labels:[],datasets:[{data:[],backgroundColor:[],hoverBackgroundColor:[]}]};t.default=Object(S.b)((function(e){return{id_branch_office:e.enterpriseSucursal.id_branch_office,id_enterprise:e.enterpriseSucursal.id_enterprise,config:e.configs.config,configStore:e.configs.configStore}}),{})((function(e){var t=Object(c.useState)(!0),a=Object(l.a)(t,2),s=a[0],S=a[1],H=Object(c.useState)([]),M=Object(l.a)(H,2),R=M[0],B=M[1],I=Object(c.useState)(!1),A=Object(l.a)(I,2),V=A[0],L=A[1],G=Object(c.useState)({}),Y=Object(l.a)(G,2),J=Y[0],K=Y[1],U=Object(c.useState)(!1),W=Object(l.a)(U,2),Q=W[0],X=W[1],Z=Object(c.useState)(!1),$=Object(l.a)(Z,2),ee=$[0],te=$[1],ae=Object(c.useState)({status_dispatch:"",description_dispatch:"",dispatch:{}}),ne=Object(l.a)(ae,2),re=ne[0],le=ne[1],ce=Object(c.useState)(!1),oe=Object(l.a)(ce,2),se=oe[0],ie=oe[1],ue=Object(c.useState)(!1),me=Object(l.a)(ue,2),de=me[0],pe=me[1],ge=Object(c.useState)([]),be=Object(l.a)(ge,2),Ee=be[0],he=be[1];Object(c.useEffect)((function(){return Oe(),P.a.toggleCollapsed(),function(){P.a.toggleCollapsed(),z=[],Se()}}),[e.id_branch_office]),Object(c.useEffect)((function(){fe(),setTimeout((function(){pe(!1)}),3e3)}),[Ee]),Object(c.useMemo)((function(){z=[{Header:"Referencia",accessor:"ref",Cell:function(e){var t=e.cell.row.original;return o.a.createElement(D.a,{placement:"bottom",overlay:o.a.createElement(T.a,{id:"tooltip-disabled2"},"Hacer click para cambiar el status")},o.a.createElement(u.a,{variant:"link",size:"sm",onClick:function(){return ye(t)}},t.ref))}},{Header:"Cliente",accessor:function(e){return e.client?[e.client.name_client+" "+e.client.data_document]:[]}},{Header:"Total",accessor:"total",Cell:function(e){return Object(x.g)(e.config,e.cell.row.original.total)}},{Header:"Status de Entrega",accessor:function(e){return 1==e.status_dispatch?["Sin entregar"]:2==e.status_dispatch?["Entregado"]:3==e.status_dispatch?["Se llevo sin recepci\xf3n"]:4==e.status_dispatch?["Retiro en Local"]:5==e.status_dispatch?["Anulado"]:["Otro"]},Cell:function(e){var t=e.cell.row.original,a="";return a=1==t.status_dispatch?"Sin entregar":2==t.status_dispatch?"Entregado":3==t.status_dispatch?"Se llevo sin recepci\xf3n":4==t.status_dispatch?"Retiro en Local":5==t.status_dispatch?"Anulado":"Otro",t.status_dispatch>=5?o.a.createElement(o.a.Fragment,null,o.a.createElement(m.a,{variant:"danger",className:"font-badge"},a),o.a.createElement("br",null),o.a.createElement("b",null,"Motivo:")," ",t.description_dispatch):o.a.createElement(m.a,{variant:"danger",className:"font-badge"},a)}},{Header:"Status de Pago",accessor:function(e){return 1==e.status_payment_dispatch?["En espera"]:2==e.status_payment_dispatch?["Pedido Guardado"]:3==e.status_payment_dispatch?["Pagado"]:4==e.status_payment_dispatch?["Anulado"]:void 0},Cell:function(e){var t=e.cell.row.original,a="";return 1==t.status_payment_dispatch?a="En espera":2==t.status_payment_dispatch?a="Pedido Guardado":3==t.status_payment_dispatch?a="Pagado":4==t.status_payment_dispatch&&(a="Anulado"),o.a.createElement(m.a,{variant:"secondary",className:"font-badge"},a)}},{Header:"Fecha",accessor:function(t){return[O(e.createdAt).format("DD-MM-YYYY")]}},{Header:"Acciones",Cell:function(e){var t=e.cell.row.original;return o.a.createElement(d.a,{size:"sm",id:"drop"+t.id,title:"Seleccione",block:"true"},o.a.createElement(p.a.Item,{onClick:function(){return ye(t)}},"Cambiar Status de Entrega"),5!=t.status_dispatch&&3!=t.status_payment_dispatch?o.a.createElement(p.a.Item,{onClick:function(){return je(t)}},"Pagar Despacho"):"",5!=t.status_dispatch&&1==t.status_payment_dispatch?o.a.createElement(p.a.Item,{onClick:function(){return ve(t)}},"Guardar Despacho"):"",3==t.status_payment_dispatch?o.a.createElement(p.a.Item,{onClick:function(){return xe(t)}},"Imprimir Factura"):"",o.a.createElement(p.a.Item,{onClick:function(){return Ne(t)}},"Ver Detalle"))}}]}));var fe=function(){Ee.forEach((function(e,t){q.labels.push(e.name),q.datasets[0].data.push(parseFloat(e.total)),q.datasets[0].backgroundColor.push(y.c[t]),q.datasets[0].hoverBackgroundColor.push(y.c[t])})),setTimeout((function(){pe(!0)}),1500)},ve=function(t){S(!0),i.a.put(y.b+"sale_storage_dispatch/"+t.id).then((function(e){v.b.success("Despacho Guardado"),Se(),Oe()})).catch((function(t){S(!1),e.tokenExpired(t)}))},ye=function(e){Ce(),le(Object(r.a)(Object(r.a)({},re),{},{dispatch:e}))},_e=function(e){var t;parseInt(e.target.value,10)<5?le(Object(r.a)(Object(r.a)({},re),{},(t={},Object(n.a)(t,e.target.name,e.target.value),Object(n.a)(t,"description_dispatch",""),t))):le(Object(r.a)(Object(r.a)({},re),{},Object(n.a)({},e.target.name,e.target.value)))},xe=function(e){window.open("/invoicePrintPage/"+e.id,"_blank")},je=function(e){K(e),L(!0)},Ne=function(e){K(e),X(!0)},Oe=function(){var t=[i.a.get(y.b+"sale_by_dispatch"),i.a.get(y.b+"sale_dispatch_stadistics")];Promise.all(t).then((function(e){console.log(e[0].data,"aqui flaco malvado"),B(e[0].data),he(e[1].data.delivery),S(!1)})).catch((function(t){S(!1),e.tokenExpired(t)}))},Ce=function(){te(!ee)},ke=function(){le({status_dispatch:"",description_dispatch:"",dispatch:{}})},Se=function(){q={labels:[],datasets:[{data:[],backgroundColor:[],hoverBackgroundColor:[]}]}};return o.a.createElement(g.a,null,o.a.createElement(b.a,null,o.a.createElement(E.a,{sm:6,md:6,lg:6}),o.a.createElement(E.a,{sm:6,md:6,lg:6},o.a.createElement("h5",null,"Totales por Status de Entrega"))),o.a.createElement(b.a,null,o.a.createElement(E.a,{sm:4,md:4,lg:4},o.a.createElement("h4",{className:"title_principal"},"Tabla de Despachos")),o.a.createElement(E.a,{sm:8,md:8,lg:8},o.a.createElement(k.b,{data:q,redraw:de,options:w}))),o.a.createElement("hr",null),s?o.a.createElement(F.a,null):o.a.createElement(b.a,null,o.a.createElement(E.a,{sm:12,md:12,lg:12,xs:12,className:"containerDiv"},o.a.createElement(_.a,{columns:z,data:R}))),o.a.createElement(j.a,{isShow:V,onHide:function(){L(!1),Se(),Oe()},config:e.config,configStore:e.configStore,dataToPay:J,isDispatch:!0}),e.config&&e.configStore?o.a.createElement(N.a,{isShow:Q,onHide:function(){return X(!1)},config:e.config,configStore:e.configStore,dataSale:J,isDispatch:!0}):"",o.a.createElement(h.a,{show:ee,onHide:Ce,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},o.a.createElement(h.a.Header,{closeButton:!0,className:"header_dark"},o.a.createElement(h.a.Title,{id:"contained-modal-title-vcenter"},"Cambiar Status del Despacho ",Object.keys(re.dispatch).length>0?re.dispatch.ref:"")),o.a.createElement(f.a,{onSubmit:function(t){var a=t.currentTarget;if(t.preventDefault(),!1===a.checkValidity())return t.stopPropagation(),void ie(!0);var n=Object.assign({},re);S(!0),i.a.put(y.b+"sale_dispatch_status_delivery/"+n.dispatch.id,n).then((function(e){v.b.success("Status Modificado"),ke(),Ce(),Se(),Oe()})).catch((function(t){S(!1),e.tokenExpired(t)}))},noValidate:!0,validated:se},o.a.createElement(h.a.Body,null,o.a.createElement(b.a,{className:"justify-content-center"},o.a.createElement(C.a,{type:"select",name:"status_dispatch",required:!0,label:"Status del Despacho",cols:"col-md-6 col-sm-6 col-lg-6",value:re.status_dispatch,handleChange:_e,messageErrors:["Requerido*"]},o.a.createElement("option",{value:""},"--Seleccione--"),o.a.createElement("option",{value:"1"},"Sin Entregar"),o.a.createElement("option",{value:"2"},"Entregado"),o.a.createElement("option",{value:"3"},"Se llevo sin Recepci\xf3n"),o.a.createElement("option",{value:"4"},"Retiro  en el Local"),o.a.createElement("option",{value:"5"},"Anulado"),o.a.createElement("option",{value:"6"},"Otro"))),6==re.status_dispatch||5==re.status_dispatch?o.a.createElement(b.a,{className:"justify-content-center"},o.a.createElement(C.a,{type:"textarea",name:"description_dispatch",required:!0,label:"Ingrese una Descripci\xf3n o Motivo",cols:"col-md-6 col-sm-6 col-lg-6",value:re.description_dispatch,handleChange:_e,messageErrors:[]})):""),o.a.createElement(h.a.Footer,null,o.a.createElement(u.a,{size:"sm",variant:"primary",type:"submit"},"Guardar"),o.a.createElement(u.a,{size:"sm",variant:"danger",onClick:Ce},"Cerrar")))))}))}}]);
//# sourceMappingURL=42.a18abc4e.chunk.js.map