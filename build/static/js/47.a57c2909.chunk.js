(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[47],{690:function(e,a,t){"use strict";var n=t(34),r=t(136),l=t(1),c=t.n(l),o=t(135),i=t(702),s=t(704),u=t(132);function m(){var e=Object(r.a)(["\n  padding: 1rem;\n\n  .button-pagination{\n    margin-right: 10px;\n  }\n\n  .inputPage{\n    display: inline-block;\n    width: 150px;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .inputPageFilter{\n    display: inline-block;\n    width: 80%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .pagination {\n    padding: 0.5rem;\n    display: flex;\n    justify-content: center;\n  }\n\n  .table_responsive_eddit{\n    overflow-x: auto;\n  }\n"]);return m=function(){return e},e}var d=o.a.div(m());function p(e){var a=e.column,t=a.filterValue,n=a.preFilteredRows,r=a.setFilter,l=n.length;return c.a.createElement("input",{value:t||"",onChange:function(e){r(e.target.value||void 0)},placeholder:"Buscar en ".concat(l," registros..."),className:"inputPageFilter"})}function g(e,a,t){return Object(s.a)(e,t,{keys:[function(e){return e.values[a]}]})}function b(e){var a=e.columns,t=e.data,r=e.menuTop,l=e.headerColor,o=e.headerFontColor,s=c.a.useMemo((function(){return{fuzzyText:g,text:function(e,a,t){return e.filter((function(e){var n=e.values[a];return void 0===n||String(n).toLowerCase().startsWith(String(t).toLowerCase())}))}}}),[]),m=c.a.useMemo((function(){return{Filter:p}}),[]),d=Object(i.useTable)({columns:a,data:t,defaultColumn:m,filterTypes:s,initialState:{pageIndex:0}},i.useFilters,i.useSortBy,i.usePagination),b=d.getTableProps,E=d.getTableBodyProps,f=d.headerGroups,h=d.page,v=d.prepareRow,y=d.canPreviousPage,C=d.canNextPage,O=d.pageOptions,x=d.pageCount,j=d.gotoPage,_=d.nextPage,N=d.previousPage,k=d.setPageSize,P=d.state,S=P.pageIndex,z=P.pageSize;return c.a.createElement("div",{className:"table-responsive"},r?c.a.createElement("div",{className:"pagination"},c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return j(0)},disabled:!y},"<<")," ",c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return N()},disabled:!y},"<")," ",c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return _()},disabled:!C},">")," ",c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return j(x-1)},disabled:!C},">>")," ",c.a.createElement("span",null,"P\xe1gina"," ",c.a.createElement("strong",null,S+1," de ",O.length)," "),c.a.createElement("span",{className:"ml-3"},"| ",c.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),c.a.createElement("input",Object(n.a)({type:"number",defaultValue:S+1,onChange:function(e){var a=e.target.value?Number(e.target.value)-1:0;j(a)},className:"inputPage"},"onChange",(function(e){e.target.value>O.length&&(e.target.value=1)}))))," ",c.a.createElement("select",{value:z,onChange:function(e){k(Number(e.target.value))},className:"inputPage"},[10,20,30,40,50].map((function(e){return c.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))):"",c.a.createElement("table",Object.assign({},b(),{className:"table table-bordered"}),c.a.createElement("thead",null,f.map((function(e){return c.a.createElement("tr",Object.assign({},e.getHeaderGroupProps(),{className:"text-center"}),e.headers.map((function(e){return c.a.createElement("th",Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{style:{backgroundColor:l||"rgb(218, 236, 242)",color:o||"black"}}),e.render("Header"),c.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""),c.a.createElement("div",null,e.canFilter?e.render("Filter"):null))})))}))),c.a.createElement("tbody",Object.assign({},E(),{className:"text-center"}),h.map((function(e,a){return v(e)||c.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return c.a.createElement("td",e.getCellProps(),e.render("Cell"))})))})))),c.a.createElement("div",{className:"pagination"},c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return j(0)},disabled:!y},"<<")," ",c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return N()},disabled:!y},"<")," ",c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return _()},disabled:!C},">")," ",c.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return j(x-1)},disabled:!C},">>")," ",c.a.createElement("span",null,"P\xe1gina"," ",c.a.createElement("strong",null,S+1," de ",O.length)," "),c.a.createElement("span",{className:"ml-3"},"| ",c.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),c.a.createElement("input",Object(n.a)({type:"number",defaultValue:S+1,onChange:function(e){var a=e.target.value?Number(e.target.value)-1:0;j(a)},className:"inputPage"},"onChange",(function(e){e.target.value>O.length&&(e.target.value=1)}))))," ",c.a.createElement("select",{value:z,onChange:function(e){k(Number(e.target.value))},className:"inputPage"},[10,20,30,40,50].map((function(e){return c.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))))}g.autoRemove=function(e){return!e};a.a=function(e){var a=e.data,t=e.columns,n=e.menuTop,r=e.headerColor,l=e.headerFontColor;return c.a.createElement(d,null,c.a.createElement(b,{data:a,columns:t,menuTop:n,headerFontColor:l,headerColor:r}))}},691:function(e,a,t){},715:function(e,a,t){"use strict";var n=t(34),r=t(22),l=t(20),c=t(1),o=t.n(c),i=t(909),s=t(49),u=t(134),m=t(87),d=t(132),p=t(19),g=t(15),b=(t(691),t(12)),E=t.n(b),f=t(9),h=t(88),v=t(23),y=t(109),C=function(e){var a=Object(c.useState)(!1),t=Object(l.a)(a,2),b=t[0],C=t[1],O=Object(c.useState)(!1),x=Object(l.a)(O,2),j=x[0],_=x[1],N=Object(c.useState)({name_client:"",email:"",type_document:"",data_document:"",phone:"",address:"",observation:"",picture:"",city:"",comunda:"",spin:"",actividad_economica:""}),k=Object(l.a)(N,2),P=k[0],S=k[1],z=Object(c.useRef)(null);Object(c.useEffect)((function(){if(e.dataModify){var a=Object.assign({},e.dataModify);S({name_client:a.name_client,email:a.email,type_document:a.type_document,data_document:a.data_document+"-"+a.dv,phone:a.phone,address:a.address,observation:a.observation,picture:a.picture,city:a.city,comuna:a.comuna,spin:a.spin,actividad_economica:a.actividad_economica,id:a.id})}}),[e.dataModify]);var w=function(e){if("type_document"===e.target.name){var a,t="Rut"===e.target.value?Object(v.b)(Object.assign({},P).data_document):Object.assign({},P).data_document.replace(/-/g,"");S(Object(r.a)(Object(r.a)({},P),{},(a={},Object(n.a)(a,e.target.name,e.target.value),Object(n.a)(a,"data_document",t),a)))}else"data_document"===e.target.name&&"Rut"===P.type_document?S(Object(r.a)(Object(r.a)({},P),{},Object(n.a)({},e.target.name,Object(v.b)(e.target.value)))):S(Object(r.a)(Object(r.a)({},P),{},Object(n.a)({},e.target.name,e.target.value)))},q=function(){var a=arguments.length>0&&void 0!==arguments[0]&&arguments[0];S({name_client:"",email:"",type_document:"",data_document:"",phone:"",address:"",observation:"",picture:"",city:"",comuna:"",spin:"",actividad_economica:""}),e.onHide(a)};return o.a.createElement(i.a,{show:e.isShow,onHide:q,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},o.a.createElement(i.a.Header,{closeButton:!0,className:"header_dark"},o.a.createElement(i.a.Title,{id:"contained-modal-title-vcenter"},"Formulario de Clientes ",o.a.createElement(p.U,null))),o.a.createElement(s.a,{onSubmit:function(){},noValidate:!0,validated:b,ref:z},j?o.a.createElement(i.a.Body,null,o.a.createElement(y.a,null)):o.a.createElement(i.a.Body,null,o.a.createElement(u.a,null,o.a.createElement(m.a,{sm:12,md:12,lg:12,xs:12},o.a.createElement(u.a,null,o.a.createElement(h.a,Object.assign({},e.inputName,{handleChange:w,value:P.name_client})),o.a.createElement(h.a,Object.assign({},e.inputEmail,{handleChange:w,value:P.email})),o.a.createElement(h.a,Object.assign({},e.inputTypeDocument,{handleChange:w,value:P.type_document}),o.a.createElement("option",{value:""},"--Seleccione--"),o.a.createElement("option",{value:"Rut"},"Rut"),o.a.createElement("option",{value:"Id"},"Id"),o.a.createElement("option",{value:"Nro pasaporte"},"N\xb0 pasaporte"))),o.a.createElement(u.a,null,o.a.createElement(h.a,Object.assign({},e.inputDataDocument,{handleChange:w,value:P.data_document})),o.a.createElement(h.a,Object.assign({},e.inputPhone,{handleChange:w,placeholder:"opcional",value:P.phone})),o.a.createElement(h.a,Object.assign({},e.inputAddress,{placeholder:"opcional",handleChange:w,value:P.address}))),o.a.createElement(u.a,null,o.a.createElement(h.a,{type:"text",label:"Ciudad",name:"city",required:!1,placeholder:"opcional",messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:P.city,handleChange:w}),o.a.createElement(h.a,{type:"text",label:"Comuna",name:"comuna",required:!1,placeholder:"opcional",messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:P.comuna,handleChange:w}),o.a.createElement(h.a,{type:"text",label:"Giro",name:"spin",required:!1,placeholder:"opcional",messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:P.spin,handleChange:w})),o.a.createElement(u.a,null,o.a.createElement(h.a,Object.assign({},e.inputObservation,{handleChange:w,placeholder:"opcional",value:P.observation})),o.a.createElement(h.a,{type:"text",label:"Actividad Econ\xf3mica",placeholder:"opcional",name:"actividad_economica",required:!1,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:P.actividad_economica,handleChange:w}))))),o.a.createElement(i.a.Footer,null,o.a.createElement(d.a,{size:"md",variant:"success",type:"button",onClick:function(){if(!1!==z.current.checkValidity()){var a=Object.assign({},P);_(!0),e.dataModify?E.a.put(g.b+"client/"+a.id,a).then((function(e){f.b.success("Cliente Modificado"),q(),_(!1)})).catch((function(e){_(!1),e.response?f.b.error(e.response.data.message):f.b.error("Error, contacte con soporte")})):E.a.post(g.b+"client",P).then((function(e){f.b.success("Cliente Registrado"),q(!0),_(!1)})).catch((function(e){_(!1),e.response?f.b.error(e.response.data.message):f.b.error("Error, contacte con soporte")}))}else C(!0)}},"Guardar ",o.a.createElement(p.J,null)),o.a.createElement(d.a,{size:"md",onClick:q},"Cerrar"))))};C.defaultProps={inputName:{type:"text",required:!0,name:"name_client",label:"Nombre Cliente",cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",messageErrors:["Requerido*"]},inputEmail:{type:"email",required:!1,name:"email",label:"Email",cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",messageErrors:["Requerido*, ","Formato Tipo Email*"]},inputPhone:{type:"number",required:!1,name:"phone",label:"Tel\xe9fono",cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",messageErrors:[]},inputAddress:{type:"textarea",required:!1,name:"address",label:"Direcci\xf3n",cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",rows:2,messageErrors:[]},inputTypeDocument:{type:"select",required:!1,name:"type_document",label:"Tipo de Documento",cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",messageErrors:["Requerido*"]},inputDataDocument:{type:"text",required:!1,name:"data_document",label:"Informaci\xf3n Identidad",cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",placeholder:"Introduzca su rut, id o su n\xb0 de pasaporte",messageErrors:["Requerido*"]},inputObservation:{type:"textarea",required:!1,name:"observation",label:"Observaci\xf3n",cols:"col-sm-4 col-md-4 col-lg-4 col-xs-6",rows:2,messageErrors:[]}},a.a=C},874:function(e,a,t){"use strict";t.r(a);var n=t(20),r=t(1),l=t.n(r),c=t(132),o=t(714),i=t(655),s=t(654),u=t(134),m=t(87),d=t(687),p=t(12),g=t.n(p),b=t(15),E=t(9),f=t(690),h=t(715),v=t(694),y=t(19),C=t(59),O=t(693),x=t(692),j=t(109),_=t(29),N=[];a.default=Object(_.b)((function(e){return{id_branch_office:e.enterpriseSucursal.id_branch_office,id_enterprise:e.enterpriseSucursal.id_enterprise}}),{})((function(e){var a=Object(r.useState)([]),t=Object(n.a)(a,2),p=t[0],_=t[1],k=Object(r.useState)(null),P=Object(n.a)(k,2),S=P[0],z=P[1],w=Object(r.useState)(!1),q=Object(n.a)(w,2),R=q[0],T=q[1],F=Object(r.useState)(!0),H=Object(n.a)(F,2),I=H[0],M=H[1];Object(r.useEffect)((function(){D()}),[e.id_branch_office]),Object(r.useEffect)((function(){return C.a.toggleCollapsed(),function(){C.a.toggleCollapsed(),N=[]}}),[]),Object(r.useMemo)((function(){N=[{Header:"Nombre",accessor:"name_client",Cell:function(e){var a=e.cell.row.original;return l.a.createElement(O.a,{placement:"bottom",overlay:l.a.createElement(x.a,{id:"tooltip-disabled2"},"Hacer click para modificar al cliente")},l.a.createElement(c.a,{variant:"link",block:!0,type:"button",size:"sm",onClick:function(){return A(a)}},a.name_client))}},{Header:"Email",accessor:"email"},{Header:"Tel\xe9fono",accessor:"phone"},{Header:"Direcci\xf3n",accessor:"address"},{Header:"Id",accessor:function(e){return[e.type_document+" "+e.data_document]}},{Header:"Observaci\xf3n",accessor:"observation"},{Header:"Acciones",Cell:function(e){var a=e.cell.row.original.id;return l.a.createElement(o.a,{size:"sm",id:"drop"+a,title:"Seleccione",block:"true"},l.a.createElement(i.a.Item,{onClick:function(){return A(e.cell.row.original)}},"Modificar"),l.a.createElement(i.a.Item,{onClick:function(){return V(a)}},"Eliminar"))}}]}),[]);var D=function(){g.a.get(b.b+"client").then((function(e){_(e.data),M(!1)})).catch((function(a){M(!1),e.tokenExpired(a)}))},B=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];T(!R),S?(z(null),D()):e&&D()},A=function(e){z(e),B()},V=function(e){Object(v.confirmAlert)({customUI:function(a){var t=a.onClose;return l.a.createElement("div",{className:"custom-ui-edit"},l.a.createElement("h1",null,"\xbfEsta seguro?"),l.a.createElement("p",{className:"font-alert"},"\xbfDesea realmente borrar este registro?"),l.a.createElement("button",{className:"button-alert",onClick:function(){G(e),t()}},"Si, Aceptar"),l.a.createElement("button",{className:"button-alert",onClick:t},"No"))}})},G=function(a){M(!0),g.a.delete(b.b+"client/"+a).then((function(e){E.b.success("Proceso completado"),D()})).catch((function(a){M(!1),e.tokenExpired(a)}))};return l.a.createElement(l.a.Fragment,null,I?l.a.createElement(s.a,null,l.a.createElement(j.a,null)):l.a.createElement(s.a,{fluid:!0},l.a.createElement(u.a,{className:""},l.a.createElement(m.a,{sm:6,md:6,lg:6},l.a.createElement("h4",{className:"title_principal"},"Tabla de Clientes")),l.a.createElement(m.a,{sm:6,md:6,lg:6,className:"text-center"},l.a.createElement("h4",{className:"title_principal"},"Total Clientes"),l.a.createElement(d.a,{variant:"danger"},p.length))),l.a.createElement(u.a,null,l.a.createElement(m.a,{sm:6,md:6,lg:6},l.a.createElement(c.a,{variant:"success",block:!0,size:"sm",onClick:B,type:"button"},"Crear Cliente ",l.a.createElement(y.C,null)))),l.a.createElement("hr",null),l.a.createElement(u.a,{className:""},l.a.createElement(m.a,{sm:12,md:12,lg:12},l.a.createElement(f.a,{data:p,columns:N}))),l.a.createElement(h.a,{isShow:R,onHide:B,dataModify:S})))}))}}]);
//# sourceMappingURL=47.a57c2909.chunk.js.map