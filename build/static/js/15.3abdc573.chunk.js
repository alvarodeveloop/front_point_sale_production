(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[15],{654:function(e,t,n){"use strict";var a=n(45),r=n(658),o=n(1),l=n.n(o),c=n(660),i=n(659),s=n(665),u=n(319);function d(){var e=Object(r.a)(["\n  padding: 1rem;\n\n  .button-pagination{\n    margin-right: 10px;\n  }\n\n  .inputPage{\n    display: inline-block;\n    width: 150px;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .inputPageFilter{\n    display: inline-block;\n    width: 80%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .pagination {\n    padding: 0.5rem;\n    display: flex;\n    justify-content: center;\n  }\n\n  .tr_cabecera{\n    background-color: rgb(218, 236, 242);\n    color: black;\n  }\n"]);return d=function(){return e},e}var m=c.a.div(d());function p(e){var t=e.column,n=t.filterValue,a=t.preFilteredRows,r=t.setFilter,o=a.length;return l.a.createElement("input",{value:n||"",onChange:function(e){r(e.target.value||void 0)},placeholder:"Buscar en ".concat(o," registros..."),className:"inputPageFilter"})}function f(e,t,n){return Object(s.a)(e,n,{keys:[function(e){return e.values[t]}]})}function b(e){var t=e.columns,n=e.data,r=l.a.useMemo((function(){return{fuzzyText:f,text:function(e,t,n){return e.filter((function(e){var a=e.values[t];return void 0===a||String(a).toLowerCase().startsWith(String(n).toLowerCase())}))}}}),[]),o=l.a.useMemo((function(){return{Filter:p}}),[]),c=Object(i.useTable)({columns:t,data:n,defaultColumn:o,filterTypes:r,initialState:{pageIndex:0}},i.useFilters,i.useSortBy,i.usePagination),s=c.getTableProps,d=c.getTableBodyProps,m=c.headerGroups,b=c.page,g=c.prepareRow,v=c.canPreviousPage,E=c.canNextPage,h=c.pageOptions,y=c.pageCount,C=c.gotoPage,O=c.nextPage,k=c.previousPage,N=c.setPageSize,x=c.state,j=x.pageIndex,w=x.pageSize;return l.a.createElement("div",{className:"table-responsive"},l.a.createElement("table",Object.assign({},s(),{className:"table table-bordered"}),l.a.createElement("thead",null,m.map((function(e){return l.a.createElement("tr",Object.assign({},e.getHeaderGroupProps(),{className:"text-center"}),e.headers.map((function(e){return l.a.createElement("th",Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{className:"tr_cabecera"}),e.render("Header"),l.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""),l.a.createElement("div",null,e.canFilter?e.render("Filter"):null))})))}))),l.a.createElement("tbody",Object.assign({},d(),{className:"text-center"}),b.map((function(e,t){return g(e)||l.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return l.a.createElement("td",e.getCellProps(),e.render("Cell"))})))})))),l.a.createElement("div",{className:"pagination"},l.a.createElement(u.a,{size:"sm",className:"button-pagination",variant:"secondary",onClick:function(){return C(0)},disabled:!v},"<<")," ",l.a.createElement(u.a,{size:"sm",className:"button-pagination",variant:"secondary",onClick:function(){return k()},disabled:!v},"<")," ",l.a.createElement(u.a,{size:"sm",className:"button-pagination",variant:"secondary",onClick:function(){return O()},disabled:!E},">")," ",l.a.createElement(u.a,{size:"sm",className:"button-pagination",variant:"secondary",onClick:function(){return C(y-1)},disabled:!E},">>")," ",l.a.createElement("span",null,"P\xe1gina"," ",l.a.createElement("strong",null,j+1," de ",h.length)," "),l.a.createElement("span",{className:"ml-3"},"| ",l.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),l.a.createElement("input",Object(a.a)({type:"number",defaultValue:j+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;C(t)},className:"inputPage"},"onChange",(function(e){e.target.value>h.length&&(e.target.value=1)}))))," ",l.a.createElement("select",{value:w,onChange:function(e){N(Number(e.target.value))},className:"inputPage"},[10,20,30,40,50].map((function(e){return l.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))))}f.autoRemove=function(e){return!e};t.a=function(e){var t=e.data,n=e.columns;return l.a.createElement(m,null,l.a.createElement(b,{data:t,columns:n}))}},655:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();t.confirmAlert=function(e){document.body.classList.add("react-confirm-alert-body-element"),function(){if(document.getElementById("react-confirm-alert-firm-svg"))return;var e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"feGaussianBlur");t.setAttribute("stdDeviation","0.3");var n=document.createElementNS(e,"filter");n.setAttribute("id","gaussian-blur"),n.appendChild(t);var a=document.createElementNS(e,"svg");a.setAttribute("id","react-confirm-alert-firm-svg"),a.setAttribute("class","react-confirm-alert-svg"),a.appendChild(n),document.body.appendChild(a)}(),function(e){var t=document.getElementById("react-confirm-alert");t||(document.body.children[0].classList.add("react-confirm-alert-blur"),(t=document.createElement("div")).id="react-confirm-alert",document.body.appendChild(t)),(0,s.render)(c.default.createElement(p,e),t)}(e)};var l=n(1),c=u(l),i=u(n(2)),s=n(33);function u(e){return e&&e.__esModule?e:{default:e}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var p=(r=a=function(e){function t(){var e,n,a;d(this,t);for(var r=arguments.length,o=Array(r),l=0;l<r;l++)o[l]=arguments[l];return n=a=m(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),a.handleClickButton=function(e){e.onClick&&e.onClick(),a.close()},a.handleClickOverlay=function(e){var t=a.props,n=t.closeOnClickOutside,r=t.onClickOutside,o=e.target===a.overlay;n&&o&&(r(),a.close())},a.close=function(){var e=a.props.afterClose;g(),b(),f(e)},a.keyboardClose=function(e){var t=a.props,n=t.closeOnEscape,r=t.onKeypressEscape,o=27===e.keyCode;n&&o&&(r(e),a.close())},a.componentDidMount=function(){document.addEventListener("keydown",a.keyboardClose,!1)},a.componentWillUnmount=function(){document.removeEventListener("keydown",a.keyboardClose,!1),a.props.willUnmount()},a.renderCustomUI=function(){var e=a.props,t=e.title,n=e.message,r=e.buttons;return(0,e.customUI)({title:t,message:n,buttons:r,onClose:a.close})},m(a,n)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.title,a=t.message,r=t.buttons,o=t.childrenElement,l=t.customUI;return c.default.createElement("div",{className:"react-confirm-alert-overlay",ref:function(t){return e.overlay=t},onClick:this.handleClickOverlay},c.default.createElement("div",{className:"react-confirm-alert"},l?this.renderCustomUI():c.default.createElement("div",{className:"react-confirm-alert-body"},n&&c.default.createElement("h1",null,n),a,o(),c.default.createElement("div",{className:"react-confirm-alert-button-group"},r.map((function(t,n){return c.default.createElement("button",{key:n,onClick:function(){return e.handleClickButton(t)},className:t.className},t.label)}))))))}}]),t}(l.Component),a.propTypes={title:i.default.string,message:i.default.string,buttons:i.default.array.isRequired,childrenElement:i.default.func,customUI:i.default.func,closeOnClickOutside:i.default.bool,closeOnEscape:i.default.bool,willUnmount:i.default.func,afterClose:i.default.func,onClickOutside:i.default.func,onKeypressEscape:i.default.func},a.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null},className:null},{label:"Confirm",onClick:function(){return null},className:null}],childrenElement:function(){return null},closeOnClickOutside:!0,closeOnEscape:!0,willUnmount:function(){return null},afterClose:function(){return null},onClickOutside:function(){return null},onKeypressEscape:function(){return null}},r);function f(e){var t=document.getElementById("react-confirm-alert-firm-svg");t.parentNode.removeChild(t),document.body.children[0].classList.remove("react-confirm-alert-blur"),e()}function b(){var e=document.getElementById("react-confirm-alert");e&&((0,s.unmountComponentAtNode)(e),e.parentNode.removeChild(e))}function g(){document.body.classList.remove("react-confirm-alert-body-element")}t.default=p},656:function(e,t,n){},657:function(e,t,n){},671:function(e,t,n){"use strict";var a=n(3),r=n(4),o=n(1),l=n.n(o),c=n(2),i=n.n(c),s=n(618),u=n(214),d=n(213),m={id:i.a.any,href:i.a.string,onClick:i.a.func,title:i.a.node.isRequired,disabled:i.a.bool,menuRole:i.a.string,renderMenuOnMount:i.a.bool,rootCloseEvent:i.a.string,bsPrefix:i.a.string,variant:i.a.string,size:i.a.string},p=l.a.forwardRef((function(e,t){var n=e.title,o=e.children,c=e.bsPrefix,i=e.rootCloseEvent,m=e.variant,p=e.size,f=e.menuRole,b=e.renderMenuOnMount,g=e.disabled,v=e.href,E=e.id,h=Object(r.a)(e,["title","children","bsPrefix","rootCloseEvent","variant","size","menuRole","renderMenuOnMount","disabled","href","id"]);return l.a.createElement(s.a,Object(a.a)({ref:t},h),l.a.createElement(u.a,{id:E,href:v,size:p,variant:m,disabled:g,childBsPrefix:c},n),l.a.createElement(d.a,{role:f,renderOnMount:b,rootCloseEvent:i},o))}));p.displayName="DropdownButton",p.propTypes=m,t.a=p},674:function(e,t,n){"use strict";var a=n(45),r=n(23),o=n(61),l=n(1),c=n.n(l),i=n(739),s=n(50),u=n(627),d=n(318),m=n(319),p=n(29),f=n(32),b=(n(657),n(21)),g=n.n(b),v=n(15),E=n(171),h=function(e){var t=Object(l.useState)(!1),n=Object(o.a)(t,2),b=n[0],h=n[1],y=Object(l.useState)({name_client:"",email:"",type_document:"",data_document:"",phone:"",address:"",observation:"",picture:""}),C=Object(o.a)(y,2),O=C[0],k=C[1];Object(l.useEffect)((function(){if(e.dataModify){var t=Object.assign({},e.dataModify);k({name_client:t.name_client,email:t.email,type_document:t.type_document,data_document:t.data_document,phone:t.phone,address:t.address,observation:t.observation,picture:t.picture,id:t.id})}}),[e.dataModify]);var N=function(e){k(Object(r.a)(Object(r.a)({},O),{},Object(a.a)({},e.target.name,e.target.value)))},x=function(){k({name_client:"",email:"",type_document:"",data_document:"",phone:"",address:"",observation:"",picture:""}),e.onHide()};return c.a.createElement(i.a,{show:e.isShow,onHide:x,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},c.a.createElement(i.a.Header,{closeButton:!0,className:"header_dark"},c.a.createElement(i.a.Title,{id:"contained-modal-title-vcenter"},"Formulario de Clientes ",c.a.createElement(p.w,null))),c.a.createElement(s.a,{onSubmit:function(t){var n=t.currentTarget;if(t.preventDefault(),!1===n.checkValidity())return t.stopPropagation(),void h(!0);var a=Object.assign({},O);e.dataModify?g.a.put(f.a+"client/"+a.id,a).then((function(e){v.b.success("Cliente Modificado"),x()})).catch((function(e){e.response?v.b.error(e.response.data.message):v.b.error("Error, contacte con soporte")})):g.a.post(f.a+"client",O).then((function(e){v.b.success("Cliente Registrado"),x()})).catch((function(e){e.response?v.b.error(e.response.data.message):v.b.error("Error, contacte con soporte")}))},noValidate:!0,validated:b},c.a.createElement(i.a.Body,null,c.a.createElement(u.a,null,c.a.createElement(d.a,{sm:12,md:12,lg:12,xs:12},c.a.createElement(u.a,null,c.a.createElement(E.a,Object.assign({},e.inputName,{handleChange:N,value:O.name_client})),c.a.createElement(E.a,Object.assign({},e.inputEmail,{handleChange:N,value:O.email}))),c.a.createElement(u.a,null,c.a.createElement(E.a,Object.assign({},e.inputTypeDocument,{handleChange:N,value:O.type_document}),c.a.createElement("option",{value:""},"--Seleccione--"),c.a.createElement("option",{value:"Rut"},"Rut"),c.a.createElement("option",{value:"Id"},"Id"),c.a.createElement("option",{value:"Nro pasaporte"},"N\xb0 pasaporte")),c.a.createElement(E.a,Object.assign({},e.inputDataDocument,{handleChange:N,value:O.data_document}))),c.a.createElement(u.a,null,c.a.createElement(E.a,Object.assign({},e.inputPhone,{handleChange:N,value:O.phone})),c.a.createElement(E.a,Object.assign({},e.inputAddress,{handleChange:N,value:O.address}))),c.a.createElement(u.a,null,c.a.createElement(E.a,Object.assign({},e.inputObservation,{handleChange:N,value:O.observation})))))),c.a.createElement(i.a.Footer,null,c.a.createElement(m.a,{size:"sm",variant:"success",type:"submit"},"Enviar"),c.a.createElement(m.a,{size:"sm",onClick:x},"Cerrar"))))};h.defaultProps={inputName:{type:"text",required:!0,name:"name_client",label:"Nombre Cliente",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:["Requerido*"]},inputEmail:{type:"email",required:!1,name:"email",label:"Email",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:["Requerido*, ","Formato Tipo Email*"]},inputPhone:{type:"phone",required:!1,name:"phone",label:"Tel\xe9fono",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:[]},inputAddress:{type:"textarea",required:!1,name:"address",label:"Direcci\xf3n",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",rows:3,messageErrors:[]},inputTypeDocument:{type:"select",required:!1,name:"type_document",label:"Tipo de Documento",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:["Requerido*"]},inputDataDocument:{type:"text",required:!1,name:"data_document",label:"Informaci\xf3n Identidad",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",placeholder:"Introduzca su rut, id o su n\xb0 de pasaporte",messageErrors:["Requerido*"]},inputObservation:{type:"textarea",required:!1,name:"observation",label:"Observaci\xf3n",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",rows:3,messageErrors:[]}},t.a=h},727:function(e,t,n){"use strict";n.r(t);var a=n(61),r=n(1),o=n.n(r),l=n(671),c=n(618),i=n(626),s=n(627),u=n(318),d=n(21),m=n.n(d),p=n(32),f=n(15),b=n(654),g=n(674),v=n(655),E=(n(656),[]);t.default=function(e){var t=Object(r.useState)([]),n=Object(a.a)(t,2),d=n[0],h=n[1],y=Object(r.useState)(null),C=Object(a.a)(y,2),O=C[0],k=C[1],N=Object(r.useState)(!1),x=Object(a.a)(N,2),j=x[0],w=x[1];Object(r.useEffect)((function(){return P(),function(){E=[]}}),[]),Object(r.useMemo)((function(){E=[{Header:"Clientes Registrados",columns:[{Header:"Nombre",accessor:"name_client"},{Header:"Email",accessor:"email"},{Header:"Tel\xe9fono",accessor:"phone"},{Header:"Direcci\xf3n",accessor:"address"},{Header:"Id",accessor:function(e){return[e.type_document+" "+e.data_document]}},{Header:"Observaci\xf3n",accessor:"observation"},{Header:"Acciones",Cell:function(e){var t=e.cell.row.original.id;return o.a.createElement(l.a,{size:"sm",id:"drop"+t,title:"Seleccione",block:"true"},o.a.createElement(c.a.Item,{onClick:function(){return S(e.cell.row.original)}},"Modificar"),o.a.createElement(c.a.Item,{onClick:function(){return I(t)}},"Eliminar"))}}]}]}),[]);var P=function(){m.a.get(p.a+"client").then((function(e){h(e.data)})).catch((function(e){e.response?f.b.error(e.response.data.message):f.b.error("Error, contacte con soporte")}))},_=function(){w(!j),O&&(k(null),P())},S=function(e){k(e),_()},I=function(e){Object(v.confirmAlert)({customUI:function(t){var n=t.onClose;return o.a.createElement("div",{className:"custom-ui-edit"},o.a.createElement("h1",null,"\xbfEsta seguro?"),o.a.createElement("p",{className:"font-alert"},"\xbfDesea realmente borrar este registro?"),o.a.createElement("button",{className:"button-alert",onClick:function(){M(e),n()}},"Si, Aceptar"),o.a.createElement("button",{className:"button-alert",onClick:n},"No"))}})},M=function(e){m.a.delete(p.a+"client/"+e).then((function(e){f.b.success("Proceso completado"),P()})).catch((function(e){e.response?f.b.error(e.response.data.message):f.b.error("Error, contacte con soporte")}))};return o.a.createElement(i.a,{fluid:!0},o.a.createElement(s.a,{className:""},o.a.createElement(u.a,{sm:12,md:12,lg:12},o.a.createElement("h4",{className:"title_principal"},"Clientes"),o.a.createElement("hr",null)),o.a.createElement(u.a,{sm:12,md:12,lg:12},o.a.createElement(b.a,{data:d,columns:E}))),o.a.createElement(g.a,{isShow:j,onHide:_,dataModify:O}))}}}]);
//# sourceMappingURL=15.3abdc573.chunk.js.map