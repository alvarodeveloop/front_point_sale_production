(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[9],{618:function(e,t,a){"use strict";var n=a(51),l=a(126),r=a(1),c=a.n(r),o=a(127),s=a(626),m=a(627),i=a(305);function u(){var e=Object(l.a)(["\n  padding: 1rem;\n\n  .button-pagination{\n    margin-right: 10px;\n  }\n\n  .inputPage{\n    display: inline-block;\n    width: 150px;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .inputPageFilter{\n    display: inline-block;\n    width: 80%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .pagination {\n    padding: 0.5rem;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .table_responsive_eddit{\n    overflow-x: auto;\n  }\n"]);return u=function(){return e},e}var d=o.a.div(u());function p(e){var t=e.column,a=t.filterValue,n=t.preFilteredRows,l=t.setFilter,r=n.length;return c.a.createElement("input",{value:a||"",onChange:function(e){l(e.target.value||void 0)},placeholder:"Buscar en ".concat(r," registros..."),className:"inputPageFilter"})}function g(e,t,a){return Object(m.a)(e,a,{keys:[function(e){return e.values[t]}]})}function b(e){var t=e.columns,a=e.data,l=e.menuTop,r=e.headerColor,o=e.headerFontColor,m=e.pageSizeHandler,u=c.a.useMemo((function(){return{fuzzyText:g,text:function(e,t,a){return e.filter((function(e){var n=e.values[t];return void 0===n||String(n).toLowerCase().startsWith(String(a).toLowerCase())}))}}}),[]),d=c.a.useMemo((function(){return{Filter:p}}),[]),b=Object(s.useTable)({columns:t,data:a,defaultColumn:d,filterTypes:u,initialState:{pageIndex:0,pageSize:m[0]}},s.useFilters,s.useSortBy,s.usePagination),E=b.getTableProps,h=b.getTableBodyProps,f=b.headerGroups,y=b.page,v=b.prepareRow,x=b.canPreviousPage,N=b.canNextPage,j=b.pageOptions,_=b.pageCount,O=b.gotoPage,k=b.nextPage,C=b.previousPage,P=b.setPageSize,z=b.state,S=z.pageIndex,F=z.pageSize;return c.a.createElement("div",{className:"table_responsive_eddit"},l?c.a.createElement("div",{className:"pagination"},c.a.createElement(i.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return O(0)},disabled:!x},"<<")," ",c.a.createElement(i.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return C()},disabled:!x},"<")," ",c.a.createElement(i.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return k()},disabled:!N},">")," ",c.a.createElement(i.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return O(_-1)},disabled:!N},">>")," ",c.a.createElement("span",null,"P\xe1gina"," ",c.a.createElement("strong",null,S+1," de ",j.length)," "),c.a.createElement("span",{className:"ml-3"},"| ",c.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),c.a.createElement("input",Object(n.a)({type:"number",defaultValue:S+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;O(t)},className:"inputPage"},"onChange",(function(e){e.target.value>j.length&&(e.target.value=1)}))))," ",c.a.createElement("select",{value:F,onChange:function(e){P(Number(e.target.value))},className:"inputPage"},m.map((function(e){return c.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))):"",c.a.createElement("table",Object.assign({},E(),{className:"table table-bordered"}),c.a.createElement("thead",null,f.map((function(e){return c.a.createElement("tr",Object.assign({},e.getHeaderGroupProps(),{className:"text-center"}),e.headers.map((function(e){return c.a.createElement("th",Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{style:{backgroundColor:r||"rgb(218, 236, 242)",color:o||"black"}}),e.render("Header"),c.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""),c.a.createElement("div",null,e.canFilter?e.render("Filter"):null))})))}))),c.a.createElement("tbody",Object.assign({},h(),{className:"text-center"}),y.map((function(e,t){return v(e)||c.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return c.a.createElement("td",Object.assign({style:{position:"relative"}},e.getCellProps()),e.render("Cell"))})))})))),c.a.createElement("div",{className:"pagination"},c.a.createElement(i.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return O(0)},disabled:!x},"<<")," ",c.a.createElement(i.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return C()},disabled:!x},"<")," ",c.a.createElement(i.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return k()},disabled:!N},">")," ",c.a.createElement(i.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return O(_-1)},disabled:!N},">>")," ",c.a.createElement("span",null,"P\xe1gina"," ",c.a.createElement("strong",null,S+1," de ",j.length)," "),c.a.createElement("span",{className:"ml-3"},"| ",c.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),c.a.createElement("input",Object(n.a)({type:"number",defaultValue:S+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;O(t)},className:"inputPage"},"onChange",(function(e){e.target.value>j.length&&(e.target.value=1)}))))," ",c.a.createElement("select",{value:F,onChange:function(e){P(Number(e.target.value))},className:"inputPage"},m.map((function(e){return c.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))))}g.autoRemove=function(e){return!e};t.a=function(e){var t=e.data,a=e.columns,n=e.menuTop,l=e.headerColor,r=e.headerFontColor,o=e.pageSizeHandler;return o=o||[10,20,30,40,50],c.a.createElement(d,null,c.a.createElement(b,{pageSizeHandler:o,data:t,columns:a,menuTop:n,headerFontColor:r,headerColor:l}))}},672:function(e,t,a){"use strict";var n=a(37),l=a(1),r=a.n(l),c=a(616),o=a(615),s=a(305),m=a(18);t.a=function(e){var t=e.dataSale,a=Object(n.a)(e,["dataSale"]);return r.a.createElement(c.a,{show:a.isShow,onHide:a.onHide,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(c.a.Header,{closeButton:!0,style:{backgroundColor:"black",color:"white"}},r.a.createElement(c.a.Title,{id:"contained-modal-title-vcenter"},"Detalle ",a.isDispatch?"del despacho ":"de la compra "," ",t.ref)),r.a.createElement(c.a.Body,null,r.a.createElement("h3",{className:"title_principal text-center"},"Cliente"),r.a.createElement("table",{className:"table table-bordered"},r.a.createElement("thead",null,r.a.createElement("tr",{style:{backgroundColor:"lightblue",color:"black"}},r.a.createElement("th",{className:"text-center"},"Nombre"),r.a.createElement("th",{className:"text-center"},"Raz\xf3n Social"),r.a.createElement("th",{className:"text-center"},"Fono"),r.a.createElement("th",{className:"text-center"},"Direcci\xf3n"),r.a.createElement("th",{className:"text-center"},"Documento"))),r.a.createElement("tbody",{className:"text-center"},r.a.createElement("tr",null,r.a.createElement("td",null,t.client?t.client.name_client:""),r.a.createElement("td",null,t.client?t.client.bussines_name:""),r.a.createElement("td",null,t.client?t.client.phone:""),r.a.createElement("td",null,t.client?t.client.address:""),r.a.createElement("td",null,t.client?r.a.createElement(r.a.Fragment,null,t.client.type_document," ",r.a.createElement("br",null)," ",t.client.data_document):"")))),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("h3",{className:"title_principal text-center"},"Productos"),r.a.createElement("table",{className:"table table-bordered"},r.a.createElement("thead",null,r.a.createElement("tr",{style:{backgroundColor:"lightblue",color:"black"}},r.a.createElement("th",{className:"text-center"},"Nombre"),r.a.createElement("th",{className:"text-center"},"Precio"),r.a.createElement("th",{className:"text-center"},"Cantidad"),r.a.createElement("th",{className:"text-center"},"Descripci\xf3n"),r.a.createElement("th",{className:"text-center"},"M\xe9todo de Venta"),r.a.createElement("th",{className:"text-center"},"Descuento o Recargo"),r.a.createElement("th",{className:"text-center"},"Monto"))),r.a.createElement("tbody",{className:"text-center"},t.products?t.products.map((function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",null,e.product.name_product),r.a.createElement("td",null,a.config.simbolo_moneda+Object(m.g)(a.config,e.price)),r.a.createElement("td",null,e.quantity),r.a.createElement("td",null,e.description),r.a.createElement("td",null,function(e){switch(parseInt(e,10)){case 1:return r.a.createElement("span",null,"Unidad");case 2:return r.a.createElement("span",null,"Mayorista");case 3:return r.a.createElement("span",null,"Kilos,Litros u Otros")}}(e.method_sale)),r.a.createElement("td",null,e.discount_recharge.length>0?e.discount_recharge[0].discount_or_recharge?r.a.createElement(r.a.Fragment,null,"Descuento",r.a.createElement("br",null),a.config.simbolo_moneda+e.discount_recharge[0].amount_calculate):r.a.createElement(r.a.Fragment,null,"Recargo",r.a.createElement("br",null),a.config.simbolo_moneda+e.discount_recharge[0].amount_calculate):"No posee"),r.a.createElement("td",null,r.a.createElement(o.a,{variant:"danger",className:"font-badge"},a.config.simbolo_moneda+Object(m.g)(a.config,e.price*e.quantity))))})):"")),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("h3",{className:"title_principal text-center"},"Descuento o Recargo del Monto Total"),r.a.createElement("table",{className:"table table-bordered"},r.a.createElement("thead",null,r.a.createElement("tr",{style:{backgroundColor:"lightblue",color:"black"}},r.a.createElement("th",{className:"text-center"},"Monto"),r.a.createElement("th",{className:"text-center"},"Descuento o Recargo"),r.a.createElement("th",{className:"text-center"},"Tipo de Operaci\xf3n"))),r.a.createElement("tbody",{className:"text-center"},r.a.createElement("tr",null,r.a.createElement("td",null,a.config.simbolo_moneda+" "+Object(m.g)(a.config,t.total_discount_recharge)),r.a.createElement("td",null,t.type_discount_recharge?t.type_discount_recharge:"Ninguno"),r.a.createElement("td",null,t.type_percentaje_fixed_discount_recharge?t.type_percentaje_fixed_discount_recharge:"Ninguno")))),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("h3",{className:"title_principal text-center"},"Totales"),r.a.createElement("table",{className:"table table-bordered"},r.a.createElement("thead",null,r.a.createElement("tr",{style:{backgroundColor:"lightblue",color:"black"}},r.a.createElement("th",{className:"text-center"},"Subtotal"),r.a.createElement("th",{className:"text-center"},"Tax"),r.a.createElement("th",{className:"text-center"},"Total"),r.a.createElement("th",{className:"text-center"},"Monto Pagado"),r.a.createElement("th",{className:"text-center"},"Vuelto"))),r.a.createElement("tbody",{className:"text-center"},r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement(o.a,{variant:"danger",className:"font-badge"},a.config.simbolo_moneda+Object(m.g)(a.config,t.sub_total))),r.a.createElement("td",null,r.a.createElement(o.a,{variant:"danger",className:"font-badge"},a.config.simbolo_moneda+Object(m.g)(a.config,t.tax))),r.a.createElement("td",null,r.a.createElement(o.a,{variant:"danger",className:"font-badge"},a.config.simbolo_moneda+Object(m.g)(a.config,t.total))),r.a.createElement("td",null,r.a.createElement(o.a,{variant:"danger",className:"font-badge"},a.config.simbolo_moneda+Object(m.g)(a.config,t.payment))),r.a.createElement("td",null,r.a.createElement(o.a,{variant:"danger",className:"font-badge"},a.config.simbolo_moneda+Object(m.g)(a.config,t.turned)))))),r.a.createElement("table",{className:"table table-bordered"},r.a.createElement("thead",null,r.a.createElement("tr",{style:{backgroundColor:"lightblue",color:"black"}},r.a.createElement("th",{className:"text-center"},"Tax Configurado Al:"),r.a.createElement("th",{className:"text-center"},"M\xe9todo de Pago:"),r.a.createElement("th",{className:"text-center"},"Status"),r.a.createElement("th",{className:"text-center"},"Vendedor"))),r.a.createElement("tbody",{className:"text-center"},r.a.createElement("tr",null,r.a.createElement("td",null,t.tax_configuration),r.a.createElement("td",null,Object(m.d)(t.type_sale)),r.a.createElement("td",null,function(e){switch(parseInt(e,10)){case 1:return r.a.createElement("span",null,"Pagado");case 2:return r.a.createElement("span",null,"En espera");case 3:return r.a.createElement("span",null,"Anulado")}}(t.status)),r.a.createElement("td",null,t.user?t.user.email:""," - ",t.user?t.user.name:""))))),r.a.createElement(c.a.Footer,null,r.a.createElement(s.a,{size:"md",variant:"secondary",onClick:a.onHide},"Cerrar")))}},692:function(e,t,a){"use strict";var n=a(51),l=a(17),r=a.n(l),c=a(34),o=a(20),s=a(16),m=a(37),i=a(1),u=a.n(i),d=a(616),p=a(205),g=a(604),b=a(615),E=a(50),h=a(305),f=a(18),y=a(8),v=a(10),x=a(82),N=a(9),j=a.n(N),_=a(83),O=function(e){var t=e.dataToPay,a=Object(m.a)(e,["dataToPay"]),l=Object(i.useState)({payment:"",turned:"",type:1,multiple_payment:{efectivo:0,tarjeta:0,sumup:0,cheque:0,otros:0,status:!1},voucher:!1}),N=Object(s.a)(l,2),O=N[0],k=N[1],C=Object(i.useState)(!1),P=Object(s.a)(C,2),z=P[0],S=P[1],F=Object(i.useState)(!1),T=Object(s.a)(F,2),w=T[0],q=T[1],D=Object(i.useState)(!1),H=Object(s.a)(D,2),M=H[0],R=H[1],B=function(){a.onHide()},V=function(e){var n=Object.assign({},O).turned,l=Object.assign({},O).payment;6===e?(S(!0),q(!0)):([2,3,4].includes(e)&&(n=0,l=Object(f.g)(a.config,t.total)),q(!1)),k(Object(o.a)(Object(o.a)({},O),{},{turned:n,payment:l,type:e,multiple_payment:{efectivo:0,tarjeta:0,sumup:0,cheque:0,otros:0,status:!1}}))},I=function(e){var t=Object.assign({},O.multiple_payment);t[e.target.name]=e.target.value,k(Object(o.a)(Object(o.a)({},O),{},{multiple_payment:t}))},L=function(e){if("voucherCheckbox"===e.target.id)k(Object(o.a)(Object(o.a)({},O),{},{voucher:e.target.checked}));else if("type_delivery"===e.target.name){var t="true"===e.target.value;k(Object(o.a)(Object(o.a)({},O),{},Object(n.a)({},e.target.name,t)))}else k(Object(o.a)(Object(o.a)({},O),{},Object(n.a)({},e.target.name,e.target.value)))};return u.a.createElement(d.a,{show:a.isShow,onHide:B,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},u.a.createElement(d.a.Header,{closeButton:!0,className:"header_dark"},u.a.createElement(d.a.Title,{id:"contained-modal-title-vcenter"},"Pagar Factura")),M?u.a.createElement(d.a.Body,null,u.a.createElement(_.a,null)):u.a.createElement(d.a.Body,null,z?u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{className:"containerDiv"},u.a.createElement(p.a,{sm:12,md:12,lg:12,xs:12},u.a.createElement(g.a,null,u.a.createElement(x.a,Object.assign({},a.inputEfectivo,{value:O.multiple_payment.efectivo,handleChange:I})),u.a.createElement(x.a,Object.assign({},a.inputTarjeta,{value:O.multiple_payment.tarjeta,handleChange:I}))),u.a.createElement(g.a,null,u.a.createElement(x.a,Object.assign({},a.inputSumup,{value:O.multiple_payment.sumup,handleChange:I})),u.a.createElement(x.a,Object.assign({},a.inputCheque,{value:O.multiple_payment.cheque,handleChange:I}))),u.a.createElement(g.a,null,u.a.createElement(x.a,Object.assign({},a.inputOtros,{value:O.multiple_payment.otros,handleChange:I}))),u.a.createElement(g.a,{className:"justify-content-center"},u.a.createElement(p.a,{sm:4,md:4,lg:4},u.a.createElement(h.a,{size:"md",variant:"secondary",block:!0,onClick:function(){var e=parseFloat(O.multiple_payment.efectivo)+parseFloat(O.multiple_payment.tarjeta)+parseFloat(O.multiple_payment.sumup)+parseFloat(O.multiple_payment.cheque)+parseFloat(O.multiple_payment.otros),a=e-t.total;a<0&&(a=0),k(Object(o.a)(Object(o.a)({},O),{},{turned:a,payment:e})),S(!1)}},"Procesar")),u.a.createElement(p.a,{sm:4,md:4,lg:4},u.a.createElement(h.a,{size:"md",variant:"danger",block:!0,onClick:function(){return S(!1)}},"Mostrar Secci\xf3n de Pagos")))))):u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{className:"containerDiv",style:{marginLeft:"-8px"}},u.a.createElement(p.a,{sm:12,md:12,lg:12,xs:12},u.a.createElement("h4",{className:"text-center"},"Factura N\xb0 ",t.ref),u.a.createElement(g.a,null,u.a.createElement(p.a,{sm:4,md:4,lg:4,xs:12,className:"text-center"},u.a.createElement("h4",null,"Sub Total: ",u.a.createElement(b.a,{variant:"primary",style:{fontSize:"18px"}},Object(f.g)(a.config,t.sub_total)," "))),u.a.createElement(p.a,{sm:4,md:4,lg:4,xs:12,className:"text-center"},u.a.createElement("h4",null,"Tax: ",u.a.createElement(b.a,{variant:"primary",style:{fontSize:"18px"}},Object(f.g)(a.config,t.tax)))),u.a.createElement(p.a,{sm:4,md:4,lg:4,xs:12,className:"text-center"},u.a.createElement("h4",null,"Total: ",u.a.createElement(b.a,{variant:"primary",style:{fontSize:"18px"}},Object(f.g)(a.config,t.total))))))),u.a.createElement("div",{className:"containerDiv",style:{marginLeft:"-8px"}},u.a.createElement(g.a,{className:"justify-content-center"},u.a.createElement(x.a,Object.assign({},a.inputPayment,{handleChange:L,value:O.payment,handleKeyUp:function(e){var a=parseFloat(e.target.value)-parseFloat(t.total);k(a>0?Object(o.a)(Object(o.a)({},O),{},{turned:[2,3,4].includes(O.type)?0:a}):Object(o.a)(Object(o.a)({},O),{},{turned:0}))},readonly:w}))),u.a.createElement(g.a,{className:"justify-content-center"},u.a.createElement(x.a,Object.assign({},a.inputTurned,{handleChange:L,value:Object(f.g)(a.config,O.turned)})))),u.a.createElement(g.a,{className:"justify-content-center"},u.a.createElement(p.a,{sm:4,md:4,lg:4},u.a.createElement(E.a.Group,null,u.a.createElement(E.a.Check,{type:"checkbox",custom:!0,id:"voucherCheckbox",label:"Venta sin Boleta",value:O.voucher,checked:O.voucher,onChange:L}))),u.a.createElement(p.a,{sm:4,md:4,lg:4},u.a.createElement("b",null,"Metodo de Pago: "),1===O.type?u.a.createElement(b.a,{variant:"danger",className:"font-badge"},"Efectivo"):2===O.type?u.a.createElement(b.a,{variant:"danger",className:"font-badge"},"D\xe9bito"):u.a.createElement(b.a,{variant:"danger",className:"font-badge"},"Cr\xe9dito"))),u.a.createElement(g.a,{className:"containerDiv justify-content-center",style:{marginLeft:"-8px"}},u.a.createElement(p.a,{sm:4,md:4,lg:4,xs:12},u.a.createElement(h.a,{size:"sm",onClick:function(){return V(1)},variant:"dark",block:"true"},"Efectivo")),u.a.createElement(p.a,{sm:4,md:4,lg:4,xs:12},u.a.createElement(h.a,{size:"sm",onClick:function(){return V(2)},variant:"dark",block:"true"},"Tarjeta Debito")),u.a.createElement(p.a,{sm:4,md:4,lg:4,xs:12},u.a.createElement(h.a,{size:"sm",onClick:function(){return V(3)},variant:"dark",block:"true"},"Tarjeta Cr\xe9dito")),u.a.createElement("br",null),u.a.createElement("br",null),u.a.createElement("br",null),u.a.createElement("br",null),u.a.createElement(p.a,{sm:6,md:6,lg:6,xs:12},u.a.createElement(h.a,{size:"sm",variant:"secondary",block:"true",onClick:function(){if(O.type)if(O.payment){var e=parseFloat(t.total);if(parseFloat(O.payment.toString().replace(/[^0-9]/g,""))<e)y.b.error("El monto pagado es inferior al total por pagar");else{R(!0);var n=Object.assign({},t,{payment:O}),l=a.isDispatch?"sale_dispatch_payment":"sale_fiao";j.a.post(v.b+l,n).then(function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y.b.success("Proceso Completado"),!n.payment.voucher){e.next=7;break}return y.b.success("Proceso completado, espere mientras se genera el documento de factura"),e.next=5,Promise.all(t.data.map(function(){var e=Object(c.a)(r.a.mark((function e(t,a){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.get(v.b+"invoice_print/"+t.id+"/3/2");case 2:n=e.sent,window.open(v.b+"documents/sale_note/files_pdf/"+n.data.name);case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()));case 5:e.next=9;break;case 7:y.b.success("Proceso completado, espere mientras se genera el documento de factura"),t.data.forEach((function(e,t){window.open(e.url,"_blank")}));case 9:R(!1),a.onHide(!0);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){R(!1),e.response?y.b.error(e.response.data.message):(console.log(e),y.b.error("Error, contacte con soporte"))}))}}else y.b.error("Debe ingresar un monto a pagar");else y.b.error("Debe escoger un m\xe9todo de pago")}},"Finalizar"))))),u.a.createElement(d.a.Footer,null,u.a.createElement(h.a,{size:"md",onClick:B},"Cerrar")))};O.defaultProps={inputPayment:{type:"number",required:!0,name:"payment",label:"",placeholder:"Cantidad Recibida",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",step:"any",messageErrors:["Requerido*"]},inputTurned:{type:"text",required:!0,name:"turned",label:"",placeholder:"Vuelto",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",step:"any",readonly:!0,messageErrors:["Requerido*"]},inputEfectivo:{type:"number",required:!1,name:"efectivo",label:"Efectivo",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:[]},inputTarjeta:{type:"number",required:!1,name:"tarjeta",label:"Tarjeta",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:[]},inputSumup:{type:"number",required:!1,name:"sumup",label:"Sumup",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:[]},inputCheque:{type:"number",required:!1,name:"cheque",label:"Cheque",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:[]},inputOtros:{type:"number",required:!1,name:"otros",label:"Otros",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:[]}},t.a=O}}]);