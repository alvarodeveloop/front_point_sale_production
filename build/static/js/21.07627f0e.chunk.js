(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[21],{661:function(e,t,a){"use strict";var n=a(47),r=a(665),l=a(1),o=a.n(l),c=a(666),s=a(667),i=a(668),u=a(320);function m(){var e=Object(r.a)(["\n  padding: 1rem;\n\n  .button-pagination{\n    margin-right: 10px;\n  }\n\n  .inputPage{\n    display: inline-block;\n    width: 150px;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .inputPageFilter{\n    display: inline-block;\n    width: 80%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .pagination {\n    padding: 0.5rem;\n    display: flex;\n    justify-content: center;\n  }\n\n  .tr_cabecera{\n    background-color: rgb(218, 236, 242);\n    color: black;\n  }\n"]);return m=function(){return e},e}var d=c.a.div(m());function p(e){var t=e.column,a=t.filterValue,n=t.preFilteredRows,r=t.setFilter,l=n.length;return o.a.createElement("input",{value:a||"",onChange:function(e){r(e.target.value||void 0)},placeholder:"Buscar en ".concat(l," registros..."),className:"inputPageFilter"})}function f(e,t,a){return Object(i.a)(e,a,{keys:[function(e){return e.values[t]}]})}function b(e){var t=e.columns,a=e.data,r=o.a.useMemo((function(){return{fuzzyText:f,text:function(e,t,a){return e.filter((function(e){var n=e.values[t];return void 0===n||String(n).toLowerCase().startsWith(String(a).toLowerCase())}))}}}),[]),l=o.a.useMemo((function(){return{Filter:p}}),[]),c=Object(s.useTable)({columns:t,data:a,defaultColumn:l,filterTypes:r,initialState:{pageIndex:0}},s.useFilters,s.useSortBy,s.usePagination),i=c.getTableProps,m=c.getTableBodyProps,d=c.headerGroups,b=c.page,g=c.prepareRow,E=c.canPreviousPage,h=c.canNextPage,v=c.pageOptions,y=c.pageCount,C=c.gotoPage,O=c.nextPage,k=c.previousPage,j=c.setPageSize,w=c.state,_=w.pageIndex,x=w.pageSize;return o.a.createElement("div",{className:"table-responsive"},o.a.createElement("table",Object.assign({},i(),{className:"table table-bordered"}),o.a.createElement("thead",null,d.map((function(e){return o.a.createElement("tr",Object.assign({},e.getHeaderGroupProps(),{className:"text-center"}),e.headers.map((function(e){return o.a.createElement("th",Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{className:"tr_cabecera"}),e.render("Header"),o.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""),o.a.createElement("div",null,e.canFilter?e.render("Filter"):null))})))}))),o.a.createElement("tbody",Object.assign({},m(),{className:"text-center"}),b.map((function(e,t){return g(e)||o.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return o.a.createElement("td",e.getCellProps(),e.render("Cell"))})))})))),o.a.createElement("div",{className:"pagination"},o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return C(0)},disabled:!E},"<<")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return k()},disabled:!E},"<")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return O()},disabled:!h},">")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return C(y-1)},disabled:!h},">>")," ",o.a.createElement("span",null,"P\xe1gina"," ",o.a.createElement("strong",null,_+1," de ",v.length)," "),o.a.createElement("span",{className:"ml-3"},"| ",o.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),o.a.createElement("input",Object(n.a)({type:"number",defaultValue:_+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;C(t)},className:"inputPage"},"onChange",(function(e){e.target.value>v.length&&(e.target.value=1)}))))," ",o.a.createElement("select",{value:x,onChange:function(e){j(Number(e.target.value))},className:"inputPage"},[10,20,30,40,50].map((function(e){return o.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))))}f.autoRemove=function(e){return!e};t.a=function(e){var t=e.data,a=e.columns;return o.a.createElement(d,null,o.a.createElement(b,{data:t,columns:a}))}},662:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,r,l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();t.confirmAlert=function(e){document.body.classList.add("react-confirm-alert-body-element"),function(){if(document.getElementById("react-confirm-alert-firm-svg"))return;var e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"feGaussianBlur");t.setAttribute("stdDeviation","0.3");var a=document.createElementNS(e,"filter");a.setAttribute("id","gaussian-blur"),a.appendChild(t);var n=document.createElementNS(e,"svg");n.setAttribute("id","react-confirm-alert-firm-svg"),n.setAttribute("class","react-confirm-alert-svg"),n.appendChild(a),document.body.appendChild(n)}(),function(e){var t=document.getElementById("react-confirm-alert");t||(document.body.children[0].classList.add("react-confirm-alert-blur"),(t=document.createElement("div")).id="react-confirm-alert",document.body.appendChild(t)),(0,i.render)(c.default.createElement(p,e),t)}(e)};var o=a(1),c=u(o),s=u(a(2)),i=a(34);function u(e){return e&&e.__esModule?e:{default:e}}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var p=(r=n=function(e){function t(){var e,a,n;m(this,t);for(var r=arguments.length,l=Array(r),o=0;o<r;o++)l[o]=arguments[o];return a=n=d(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),n.handleClickButton=function(e){e.onClick&&e.onClick(),n.close()},n.handleClickOverlay=function(e){var t=n.props,a=t.closeOnClickOutside,r=t.onClickOutside,l=e.target===n.overlay;a&&l&&(r(),n.close())},n.close=function(){var e=n.props.afterClose;g(),b(),f(e)},n.keyboardClose=function(e){var t=n.props,a=t.closeOnEscape,r=t.onKeypressEscape,l=27===e.keyCode;a&&l&&(r(e),n.close())},n.componentDidMount=function(){document.addEventListener("keydown",n.keyboardClose,!1)},n.componentWillUnmount=function(){document.removeEventListener("keydown",n.keyboardClose,!1),n.props.willUnmount()},n.renderCustomUI=function(){var e=n.props,t=e.title,a=e.message,r=e.buttons;return(0,e.customUI)({title:t,message:a,buttons:r,onClose:n.close})},d(n,a)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.title,n=t.message,r=t.buttons,l=t.childrenElement,o=t.customUI;return c.default.createElement("div",{className:"react-confirm-alert-overlay",ref:function(t){return e.overlay=t},onClick:this.handleClickOverlay},c.default.createElement("div",{className:"react-confirm-alert"},o?this.renderCustomUI():c.default.createElement("div",{className:"react-confirm-alert-body"},a&&c.default.createElement("h1",null,a),n,l(),c.default.createElement("div",{className:"react-confirm-alert-button-group"},r.map((function(t,a){return c.default.createElement("button",{key:a,onClick:function(){return e.handleClickButton(t)},className:t.className},t.label)}))))))}}]),t}(o.Component),n.propTypes={title:s.default.string,message:s.default.string,buttons:s.default.array.isRequired,childrenElement:s.default.func,customUI:s.default.func,closeOnClickOutside:s.default.bool,closeOnEscape:s.default.bool,willUnmount:s.default.func,afterClose:s.default.func,onClickOutside:s.default.func,onKeypressEscape:s.default.func},n.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null},className:null},{label:"Confirm",onClick:function(){return null},className:null}],childrenElement:function(){return null},closeOnClickOutside:!0,closeOnEscape:!0,willUnmount:function(){return null},afterClose:function(){return null},onClickOutside:function(){return null},onKeypressEscape:function(){return null}},r);function f(e){var t=document.getElementById("react-confirm-alert-firm-svg");t.parentNode.removeChild(t),document.body.children[0].classList.remove("react-confirm-alert-blur"),e()}function b(){var e=document.getElementById("react-confirm-alert");e&&((0,i.unmountComponentAtNode)(e),e.parentNode.removeChild(e))}function g(){document.body.classList.remove("react-confirm-alert-body-element")}t.default=p},663:function(e,t,a){},664:function(e,t,a){},673:function(e,t,a){"use strict";var n=a(3),r=a(4),l=a(1),o=a.n(l),c=a(2),s=a.n(c),i=a(623),u=a(213),m=a(212),d={id:s.a.any,href:s.a.string,onClick:s.a.func,title:s.a.node.isRequired,disabled:s.a.bool,menuRole:s.a.string,renderMenuOnMount:s.a.bool,rootCloseEvent:s.a.string,bsPrefix:s.a.string,variant:s.a.string,size:s.a.string},p=o.a.forwardRef((function(e,t){var a=e.title,l=e.children,c=e.bsPrefix,s=e.rootCloseEvent,d=e.variant,p=e.size,f=e.menuRole,b=e.renderMenuOnMount,g=e.disabled,E=e.href,h=e.id,v=Object(r.a)(e,["title","children","bsPrefix","rootCloseEvent","variant","size","menuRole","renderMenuOnMount","disabled","href","id"]);return o.a.createElement(i.a,Object(n.a)({ref:t},v),o.a.createElement(u.a,{id:h,href:E,size:p,variant:d,disabled:g,childBsPrefix:c},a),o.a.createElement(m.a,{role:f,renderOnMount:b,rootCloseEvent:s},l))}));p.displayName="DropdownButton",p.propTypes=d,t.a=p},842:function(e,t,a){"use strict";a.r(t);var n=a(47),r=a(26),l=a(41),o=a(1),c=a.n(o),s=a(25),i=a(17),u=a.n(i),m=a(631),d=a(632),p=a(319),f=a(320),b=a(656),g=a(657),E=a(673),h=a(623),v=a(844),y=a(52),C=a(15),O=a(170),k=a(18);a(661),a(664),a(662),a(663);t.default=function(e){var t=Object(o.useState)([]),i=Object(l.a)(t,2),j=(i[0],i[1],Object(o.useState)(!1)),w=Object(l.a)(j,2),_=w[0],x=w[1],N=Object(o.useState)([]),P=Object(l.a)(N,2),S=(P[0],P[1],Object(o.useState)(!1)),z=Object(l.a)(S,2),R=z[0],M=z[1],q=Object(o.useState)(""),B=Object(l.a)(q,2),I=B[0],T=B[1],A=Object(o.useState)({name:"",is_open:!0,id:""}),F=Object(l.a)(A,2),U=F[0],L=F[1],D=Object(o.useState)({email:"",password:"",password_repeat:"",rut:"",name:"",phone:"",id:"",id_rol:3}),G=Object(l.a)(D,2),H=G[0],V=G[1],K=Object(o.useState)([]),J=Object(l.a)(K,2),W=J[0],Q=J[1],X=Object(o.useState)(!0),Y=Object(l.a)(X,2),Z=Y[0],$=Y[1];Object(o.useEffect)((function(){ee()}),[]);var ee=function(){var e=[u.a.get(k.a+"branch_office")];Promise.all(e).then((function(e){Q(e[0].data)})).catch((function(e){e.response?C.b.error(e.response.data.message):(console.log(e),C.b.error("Error, contacte con soporte"))}))},te=function(){x(!_)},ae=function(e){"is_open"===e.target.name?L(Object(r.a)(Object(r.a)({},U),{},Object(n.a)({},e.target.name,e.target.checked))):L(Object(r.a)(Object(r.a)({},U),{},Object(n.a)({},e.target.name,e.target.value)))},ne=function(e){V(Object(r.a)(Object(r.a)({},H),{},Object(n.a)({},e.target.name,e.target.value)))},re=function(){V({email:"",password:"",password_repeat:"",rut:"",name:"",phone:"",id:"",id_rol:3}),L({name:"",id:"",is_open:!0}),$(!0),M(!1)};return c.a.createElement(m.a,{fluid:!0},c.a.createElement(d.a,null,c.a.createElement(p.a,{sm:6,md:6,lg:6},c.a.createElement("h4",{className:"title_principal"},"Sucursales")),c.a.createElement(p.a,{sm:6,md:6,lg:6},c.a.createElement(f.a,{variant:"success",block:!0,onClick:function(){T("Crear Sucursal"),re(),te()},size:"sm"},"Agregar Sucursal ",c.a.createElement(s.p,null)))),c.a.createElement("hr",null),c.a.createElement(d.a,{className:"justify-content-center"},W.map((function(e,t){return c.a.createElement(p.a,{sm:3,lg:3,md:3,className:"text-center",key:t},c.a.createElement("h5",{style:{color:"rgb(180, 55, 33)"}},e.name),c.a.createElement(b.a,{src:a(344),style:{width:"100%"}}),"Estado : ",e.is_open?c.a.createElement(g.a,{variant:"success",className:"font_badge"},"Abierta"):c.a.createElement(g.a,{variant:"danger",className:"font_badge"},"Cerrada"),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement(E.a,{size:"md",id:"fila"+t,title:"Acciones",style:{width:"100%"},variant:"primary"},c.a.createElement(h.a.Item,{onClick:function(){return L({name:(t=e).name,is_open:t.is_open,id:t.id}),V({email:t.user[0].email,password:"",password_repeat:"",rut:t.user[0].rut,name:t.user[0].name,phone:t.user[0].phone,id:t.user[0].id,id_rol:t.user[0].id_rol}),T("Modificar Sucursal "+t.name),$(!1),void te();var t}},"Modificar"),c.a.createElement(h.a.Item,{onClick:function(){}},"Eliminar")))}))),c.a.createElement(v.a,{show:_,onHide:te,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},c.a.createElement(v.a.Header,{className:"header_dark"},c.a.createElement(v.a.Title,{id:"contained-modal-title-vcenter"},I,"\xa0\xa0",c.a.createElement(b.a,{src:a(344),style:{width:"50px"}}))),c.a.createElement(y.a,{onSubmit:function(e){var t=e.currentTarget;if(e.preventDefault(),!1===t.checkValidity())return e.stopPropagation(),void M(!0);var a=Object.assign({},U),n=Object.assign({},H);if(n.password!==n.password_repeat)return C.b.error("Error, las contrase\xf1as no coinciden"),!1;a.id?u.a.put(k.a+"branch_office/"+a.id,a).then((function(e){u.a.put(k.a+"user_by_branch_office/"+n.id,n).then((function(e){C.b.success("Sucursal Modificada"),re(),te(),ee()})).catch((function(e){var t=e.response;t?C.b.error(t.data.message):C.b.error("Error, contacte con soporte")}))})).catch((function(e){var t=e.response;t?C.b.error(t.data.message):C.b.error("Error, contacte con soporte")})):(n.branch=a,u.a.post(k.a+"user_by_brach_office",n).then((function(e){C.b.success("Sucursal Creada con \xe9xito"),re(),te(),ee(!0)})).catch((function(e){var t=e.response;t?C.b.error(t.data.message):C.b.error("Error, contacte con soporte")})))},noValidate:!0,validated:R},c.a.createElement(v.a.Body,null,c.a.createElement(d.a,null,c.a.createElement(p.a,{sm:12,md:12,lg:12},c.a.createElement("h4",{className:"title_principal"},"Datos del Administrador de la Sucursal"))),c.a.createElement("hr",null),c.a.createElement(d.a,null,c.a.createElement(O.a,{type:"text",label:"Nombre Completo",name:"name",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:H.name,handleChange:ne}),c.a.createElement(O.a,{type:"text",label:"Rut",name:"rut",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:H.rut,handleChange:ne}),c.a.createElement(O.a,{type:"email",label:"Email",name:"email",required:!0,messageErrors:["Requerido* ","Formato Tipo Email*"],cols:"col-md-4 col-lg-4 col-sm-4",value:H.email,handleChange:ne})),c.a.createElement(d.a,null,c.a.createElement(O.a,{type:"number",label:"Fono",name:"phone",required:!1,messageErrors:[],cols:"col-md-4 col-lg-4 col-sm-4",value:H.phone,handleChange:ne}),c.a.createElement(O.a,{type:"password",label:"Contrase\xf1a",name:"password",required:Z,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:H.password,handleChange:ne}),c.a.createElement(O.a,{type:"password",label:"Repita Contrase\xf1a",name:"password_repeat",required:Z,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:H.password_repeat,handleChange:ne})),c.a.createElement(d.a,null,c.a.createElement(p.a,{sm:12,md:12,lg:12},c.a.createElement("h4",{className:"title_principal"},"Datos de la Sucursal"))),c.a.createElement("hr",null),c.a.createElement(d.a,null,c.a.createElement(O.a,{type:"text",label:"Nombre Sucursal",name:"name",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:U.name,handleChange:ae}),c.a.createElement(p.a,{sm:4,md:4,lg:4},c.a.createElement("br",null),c.a.createElement(y.a.Group,null,c.a.createElement(y.a.Check,{type:"checkbox",custom:!0,id:"is_open",name:"is_open",label:"Activa",value:U.is_open,checked:U.is_open,onChange:ae})))),c.a.createElement("hr",null),c.a.createElement(d.a,{className:"justify-content-center"},c.a.createElement(p.a,{sm:4,md:4,lg:4},c.a.createElement(f.a,{block:!0,variant:"primary",size:"sm",type:"submit"},"Guardar")),c.a.createElement(p.a,{sm:4,md:4,lg:4},c.a.createElement(f.a,{block:!0,variant:"danger",size:"sm",onClick:te,type:"button"},"Cerrar")))))))}}}]);
//# sourceMappingURL=21.07627f0e.chunk.js.map