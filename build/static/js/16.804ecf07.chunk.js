(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[16],{661:function(e,t,a){"use strict";var n=a(47),r=a(665),c=a(1),l=a.n(c),o=a(666),i=a(667),s=a(668),u=a(320);function d(){var e=Object(r.a)(["\n  padding: 1rem;\n\n  .button-pagination{\n    margin-right: 10px;\n  }\n\n  .inputPage{\n    display: inline-block;\n    width: 150px;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .inputPageFilter{\n    display: inline-block;\n    width: 80%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .pagination {\n    padding: 0.5rem;\n    display: flex;\n    justify-content: center;\n  }\n\n  .tr_cabecera{\n    background-color: rgb(218, 236, 242);\n    color: black;\n  }\n"]);return d=function(){return e},e}var m=o.a.div(d());function f(e){var t=e.column,a=t.filterValue,n=t.preFilteredRows,r=t.setFilter,c=n.length;return l.a.createElement("input",{value:a||"",onChange:function(e){r(e.target.value||void 0)},placeholder:"Buscar en ".concat(c," registros..."),className:"inputPageFilter"})}function p(e,t,a){return Object(s.a)(e,a,{keys:[function(e){return e.values[t]}]})}function g(e){var t=e.columns,a=e.data,r=l.a.useMemo((function(){return{fuzzyText:p,text:function(e,t,a){return e.filter((function(e){var n=e.values[t];return void 0===n||String(n).toLowerCase().startsWith(String(a).toLowerCase())}))}}}),[]),c=l.a.useMemo((function(){return{Filter:f}}),[]),o=Object(i.useTable)({columns:t,data:a,defaultColumn:c,filterTypes:r,initialState:{pageIndex:0}},i.useFilters,i.useSortBy,i.usePagination),s=o.getTableProps,d=o.getTableBodyProps,m=o.headerGroups,g=o.page,b=o.prepareRow,h=o.canPreviousPage,v=o.canNextPage,E=o.pageOptions,y=o.pageCount,C=o.gotoPage,_=o.nextPage,O=o.previousPage,j=o.setPageSize,k=o.state,N=k.pageIndex,x=k.pageSize;return l.a.createElement("div",{className:"table-responsive"},l.a.createElement("table",Object.assign({},s(),{className:"table table-bordered"}),l.a.createElement("thead",null,m.map((function(e){return l.a.createElement("tr",Object.assign({},e.getHeaderGroupProps(),{className:"text-center"}),e.headers.map((function(e){return l.a.createElement("th",Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{className:"tr_cabecera"}),e.render("Header"),l.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""),l.a.createElement("div",null,e.canFilter?e.render("Filter"):null))})))}))),l.a.createElement("tbody",Object.assign({},d(),{className:"text-center"}),g.map((function(e,t){return b(e)||l.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return l.a.createElement("td",e.getCellProps(),e.render("Cell"))})))})))),l.a.createElement("div",{className:"pagination"},l.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return C(0)},disabled:!h},"<<")," ",l.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return O()},disabled:!h},"<")," ",l.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return _()},disabled:!v},">")," ",l.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return C(y-1)},disabled:!v},">>")," ",l.a.createElement("span",null,"P\xe1gina"," ",l.a.createElement("strong",null,N+1," de ",E.length)," "),l.a.createElement("span",{className:"ml-3"},"| ",l.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),l.a.createElement("input",Object(n.a)({type:"number",defaultValue:N+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;C(t)},className:"inputPage"},"onChange",(function(e){e.target.value>E.length&&(e.target.value=1)}))))," ",l.a.createElement("select",{value:x,onChange:function(e){j(Number(e.target.value))},className:"inputPage"},[10,20,30,40,50].map((function(e){return l.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))))}p.autoRemove=function(e){return!e};t.a=function(e){var t=e.data,a=e.columns;return l.a.createElement(m,null,l.a.createElement(g,{data:t,columns:a}))}},662:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,r,c=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();t.confirmAlert=function(e){document.body.classList.add("react-confirm-alert-body-element"),function(){if(document.getElementById("react-confirm-alert-firm-svg"))return;var e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"feGaussianBlur");t.setAttribute("stdDeviation","0.3");var a=document.createElementNS(e,"filter");a.setAttribute("id","gaussian-blur"),a.appendChild(t);var n=document.createElementNS(e,"svg");n.setAttribute("id","react-confirm-alert-firm-svg"),n.setAttribute("class","react-confirm-alert-svg"),n.appendChild(a),document.body.appendChild(n)}(),function(e){var t=document.getElementById("react-confirm-alert");t||(document.body.children[0].classList.add("react-confirm-alert-blur"),(t=document.createElement("div")).id="react-confirm-alert",document.body.appendChild(t)),(0,s.render)(o.default.createElement(f,e),t)}(e)};var l=a(1),o=u(l),i=u(a(2)),s=a(34);function u(e){return e&&e.__esModule?e:{default:e}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var f=(r=n=function(e){function t(){var e,a,n;d(this,t);for(var r=arguments.length,c=Array(r),l=0;l<r;l++)c[l]=arguments[l];return a=n=m(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),n.handleClickButton=function(e){e.onClick&&e.onClick(),n.close()},n.handleClickOverlay=function(e){var t=n.props,a=t.closeOnClickOutside,r=t.onClickOutside,c=e.target===n.overlay;a&&c&&(r(),n.close())},n.close=function(){var e=n.props.afterClose;b(),g(),p(e)},n.keyboardClose=function(e){var t=n.props,a=t.closeOnEscape,r=t.onKeypressEscape,c=27===e.keyCode;a&&c&&(r(e),n.close())},n.componentDidMount=function(){document.addEventListener("keydown",n.keyboardClose,!1)},n.componentWillUnmount=function(){document.removeEventListener("keydown",n.keyboardClose,!1),n.props.willUnmount()},n.renderCustomUI=function(){var e=n.props,t=e.title,a=e.message,r=e.buttons;return(0,e.customUI)({title:t,message:a,buttons:r,onClose:n.close})},m(n,a)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),c(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.title,n=t.message,r=t.buttons,c=t.childrenElement,l=t.customUI;return o.default.createElement("div",{className:"react-confirm-alert-overlay",ref:function(t){return e.overlay=t},onClick:this.handleClickOverlay},o.default.createElement("div",{className:"react-confirm-alert"},l?this.renderCustomUI():o.default.createElement("div",{className:"react-confirm-alert-body"},a&&o.default.createElement("h1",null,a),n,c(),o.default.createElement("div",{className:"react-confirm-alert-button-group"},r.map((function(t,a){return o.default.createElement("button",{key:a,onClick:function(){return e.handleClickButton(t)},className:t.className},t.label)}))))))}}]),t}(l.Component),n.propTypes={title:i.default.string,message:i.default.string,buttons:i.default.array.isRequired,childrenElement:i.default.func,customUI:i.default.func,closeOnClickOutside:i.default.bool,closeOnEscape:i.default.bool,willUnmount:i.default.func,afterClose:i.default.func,onClickOutside:i.default.func,onKeypressEscape:i.default.func},n.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null},className:null},{label:"Confirm",onClick:function(){return null},className:null}],childrenElement:function(){return null},closeOnClickOutside:!0,closeOnEscape:!0,willUnmount:function(){return null},afterClose:function(){return null},onClickOutside:function(){return null},onKeypressEscape:function(){return null}},r);function p(e){var t=document.getElementById("react-confirm-alert-firm-svg");t.parentNode.removeChild(t),document.body.children[0].classList.remove("react-confirm-alert-blur"),e()}function g(){var e=document.getElementById("react-confirm-alert");e&&((0,s.unmountComponentAtNode)(e),e.parentNode.removeChild(e))}function b(){document.body.classList.remove("react-confirm-alert-body-element")}t.default=f},663:function(e,t,a){},664:function(e,t,a){},673:function(e,t,a){"use strict";var n=a(3),r=a(4),c=a(1),l=a.n(c),o=a(2),i=a.n(o),s=a(623),u=a(213),d=a(212),m={id:i.a.any,href:i.a.string,onClick:i.a.func,title:i.a.node.isRequired,disabled:i.a.bool,menuRole:i.a.string,renderMenuOnMount:i.a.bool,rootCloseEvent:i.a.string,bsPrefix:i.a.string,variant:i.a.string,size:i.a.string},f=l.a.forwardRef((function(e,t){var a=e.title,c=e.children,o=e.bsPrefix,i=e.rootCloseEvent,m=e.variant,f=e.size,p=e.menuRole,g=e.renderMenuOnMount,b=e.disabled,h=e.href,v=e.id,E=Object(r.a)(e,["title","children","bsPrefix","rootCloseEvent","variant","size","menuRole","renderMenuOnMount","disabled","href","id"]);return l.a.createElement(s.a,Object(n.a)({ref:t},E),l.a.createElement(u.a,{id:v,href:h,size:f,variant:m,disabled:b,childBsPrefix:o},a),l.a.createElement(d.a,{role:p,renderOnMount:g,rootCloseEvent:i},c))}));f.displayName="DropdownButton",f.propTypes=m,t.a=f},703:function(e,t,a){e.exports=a.p+"static/media/caja_registradora.ea9aa4e7.jpg"},841:function(e,t,a){"use strict";a.r(t);var n=a(47),r=a(26),c=a(41),l=a(1),o=a.n(l),i=a(25),s=a(17),u=a.n(s),d=a(631),m=a(632),f=a(319),p=a(320),g=a(656),b=a(657),h=a(673),v=a(623),E=a(844),y=a(52),C=a(15),_=a(170),O=a(18);a(661),a(664),a(662),a(663);t.default=function(e){var t=Object(l.useState)([]),s=Object(c.a)(t,2),j=s[0],k=s[1],N=Object(l.useState)({}),x=Object(c.a)(N,2),w=x[0],P=x[1],S=Object(l.useState)(!1),z=Object(c.a)(S,2),R=z[0],I=z[1],M=Object(l.useState)([]),B=Object(c.a)(M,2),T=B[0],A=B[1],U=Object(l.useState)(!1),F=Object(c.a)(U,2),L=F[0],D=F[1],q=Object(l.useState)(""),G=Object(c.a)(q,2),H=G[0],V=G[1],J=Object(l.useState)({id_user:"",default_cash:!1,amount_cash_default:"",nro_caja:"",id:""}),K=Object(c.a)(J,2),W=K[0],Q=K[1];Object(l.useEffect)((function(){X(!0)}),[]);var X=function(t){var a=[u.a.get(O.a+"cash_register")];t&&(a.push(u.a.get(O.a+"config_store")),a.push(u.a.get(O.a+"user"))),Promise.all(a).then((function(a){k(a[0].data),t&&(a[1].data?(P(a[1].data),A(a[2].data)):(C.b.error("Debe hacer la configuraci\xf3n de Tiendas primero"),setTimeout((function(){e.history.replace("/config/config_store_form")}),1500)))})).catch((function(e){e.response?C.b.error(e.response.data.message):(console.log(e),C.b.error("Error, contacte con soporte"))}))},Y=function(){I(!R)},Z=function(e){var t;"default_cash"===e.target.name?Q(Object(r.a)(Object(r.a)({},W),{},(t={},Object(n.a)(t,e.target.name,e.target.checked),Object(n.a)(t,"amount_cash_default",""),t))):Q(Object(r.a)(Object(r.a)({},W),{},Object(n.a)({},e.target.name,e.target.value)))},$=function(){Q({id_user:"",default_cash:!1,amount_cash_default:"",nro_caja:"",id:""}),D(!1)};return o.a.createElement(d.a,{fluid:!0},o.a.createElement(m.a,null,o.a.createElement(f.a,{sm:6,md:6,lg:6},o.a.createElement("h4",{className:"title_principal"},"Caja Registradoras")),o.a.createElement(f.a,{sm:6,md:6,lg:6},o.a.createElement(p.a,{variant:"success",block:!0,onClick:function(){var e=w&&Object.keys(w).length>0?w.ref_cash_register:"";V("Crear Caja Registradora N\xb0"+e),$(),Y()},size:"sm"},"Agregar Caja ",o.a.createElement(i.p,null)))),o.a.createElement("hr",null),o.a.createElement(m.a,{className:"justify-content-center"},j.map((function(e,t){return o.a.createElement(f.a,{sm:3,lg:3,md:3,className:"text-center",key:t},o.a.createElement("h5",{style:{color:"rgb(180, 55, 33)"}},"CAJA N\xb0 ",e.nro_caja),o.a.createElement(g.a,{src:a(703),style:{width:"100%"}}),"Estado : ",e.status?o.a.createElement(b.a,{variant:"success",className:"font_badge"},"Abierta"):o.a.createElement(b.a,{variant:"danger",className:"font_badge"},"Cerrada"),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement(h.a,{size:"md",id:"fila"+t,title:"Acciones",style:{width:"100%"},variant:"primary"},o.a.createElement(v.a.Item,{onClick:function(){return Q({id_user:(t=e).id_user,default_cash:t.default_cash,amount_cash_default:t.amount_cash_default,nro_caja:t.nro_caja,id:t.id}),V("Modificar Caja Registradora "+t.nro_caja),void Y();var t}},"Modificar"),o.a.createElement(v.a.Item,{onClick:function(){}},"Eliminar")))}))),o.a.createElement(E.a,{show:R,onHide:Y,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},o.a.createElement(E.a.Header,{className:"header_dark"},o.a.createElement(E.a.Title,{id:"contained-modal-title-vcenter"},H,"\xa0\xa0",o.a.createElement(g.a,{src:a(703),style:{width:"50px"}}))),o.a.createElement(y.a,{onSubmit:function(e){var t=e.currentTarget;if(e.preventDefault(),!1===t.checkValidity())return e.stopPropagation(),void D(!0);var a=Object.assign({},W);a.id?u.a.put(O.a+"cash_register/"+a.id,a).then((function(e){C.b.success("Caja Registradora Modificada"),$(),Y(),X()})).catch((function(e){var t=e.response;t?C.b.error(t.data.message):C.b.error("Error, contacte con soporte")})):(a.nro_caja=w.ref_cash_register,u.a.post(O.a+"cash_register",a).then((function(e){C.b.success("Caja Registradora Creada"),$(),Y(),X(!0)})).catch((function(e){var t=e.response;t?C.b.error(t.data.message):C.b.error("Error, contacte con soporte")})))},noValidate:!0,validated:L},o.a.createElement(E.a.Body,null,o.a.createElement(m.a,null,o.a.createElement(_.a,{type:"select",label:"Usuario a Asociar",name:"id_user",required:!1,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:W.id_user,handleChange:Z},o.a.createElement("option",{value:""},"--Seleccione--"),T.map((function(e,t){return o.a.createElement("option",{value:e.id,key:t},e.name," - ",e.email)}))),o.a.createElement(f.a,{sm:4,md:4,lg:4},o.a.createElement("br",null),o.a.createElement(y.a.Group,null,o.a.createElement(y.a.Check,{type:"checkbox",custom:!0,id:"default_cash",name:"default_cash",label:"Saldo Inicial por Default",value:W.default_cash,checked:W.default_cash,onChange:Z}))),W.default_cash?o.a.createElement(_.a,{type:"number",label:"Saldo Inicial",name:"amount_cash_default",step:"any",required:!1,messageErrors:[],cols:"col-md-4 col-lg-4 col-sm-4",value:W.amount_cash_default,handleChange:Z}):""),o.a.createElement("hr",null),o.a.createElement(m.a,{className:"justify-content-center"},o.a.createElement(f.a,{sm:4,md:4,lg:4},o.a.createElement(p.a,{block:!0,variant:"primary",size:"sm",type:"submit"},"Guardar")),o.a.createElement(f.a,{sm:4,md:4,lg:4},o.a.createElement(p.a,{variant:"danger",size:"sm",onClick:Y,type:"button"},"Cerrar")))))))}}}]);
//# sourceMappingURL=16.804ecf07.chunk.js.map