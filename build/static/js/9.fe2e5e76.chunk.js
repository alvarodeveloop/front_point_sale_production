(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[9],{654:function(e,t,a){"use strict";var n=a(45),r=a(658),o=a(1),c=a.n(o),l=a(660),i=a(659),s=a(665),u=a(319);function m(){var e=Object(r.a)(["\n  padding: 1rem;\n\n  .button-pagination{\n    margin-right: 10px;\n  }\n\n  .inputPage{\n    display: inline-block;\n    width: 150px;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .inputPageFilter{\n    display: inline-block;\n    width: 80%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .pagination {\n    padding: 0.5rem;\n    display: flex;\n    justify-content: center;\n  }\n\n  .tr_cabecera{\n    background-color: rgb(218, 236, 242);\n    color: black;\n  }\n"]);return m=function(){return e},e}var d=l.a.div(m());function f(e){var t=e.column,a=t.filterValue,n=t.preFilteredRows,r=t.setFilter,o=n.length;return c.a.createElement("input",{value:a||"",onChange:function(e){r(e.target.value||void 0)},placeholder:"Buscar en ".concat(o," registros..."),className:"inputPageFilter"})}function p(e,t,a){return Object(s.a)(e,a,{keys:[function(e){return e.values[t]}]})}function b(e){var t=e.columns,a=e.data,r=c.a.useMemo((function(){return{fuzzyText:p,text:function(e,t,a){return e.filter((function(e){var n=e.values[t];return void 0===n||String(n).toLowerCase().startsWith(String(a).toLowerCase())}))}}}),[]),o=c.a.useMemo((function(){return{Filter:f}}),[]),l=Object(i.useTable)({columns:t,data:a,defaultColumn:o,filterTypes:r,initialState:{pageIndex:0}},i.useFilters,i.useSortBy,i.usePagination),s=l.getTableProps,m=l.getTableBodyProps,d=l.headerGroups,b=l.page,g=l.prepareRow,E=l.canPreviousPage,v=l.canNextPage,y=l.pageOptions,h=l.pageCount,O=l.gotoPage,C=l.nextPage,k=l.previousPage,j=l.setPageSize,N=l.state,x=N.pageIndex,_=N.pageSize;return c.a.createElement("div",{className:"table-responsive"},c.a.createElement("table",Object.assign({},s(),{className:"table table-bordered"}),c.a.createElement("thead",null,d.map((function(e){return c.a.createElement("tr",Object.assign({},e.getHeaderGroupProps(),{className:"text-center"}),e.headers.map((function(e){return c.a.createElement("th",Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{className:"tr_cabecera"}),e.render("Header"),c.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""),c.a.createElement("div",null,e.canFilter?e.render("Filter"):null))})))}))),c.a.createElement("tbody",Object.assign({},m(),{className:"text-center"}),b.map((function(e,t){return g(e)||c.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return c.a.createElement("td",e.getCellProps(),e.render("Cell"))})))})))),c.a.createElement("div",{className:"pagination"},c.a.createElement(u.a,{size:"sm",className:"button-pagination",variant:"secondary",onClick:function(){return O(0)},disabled:!E},"<<")," ",c.a.createElement(u.a,{size:"sm",className:"button-pagination",variant:"secondary",onClick:function(){return k()},disabled:!E},"<")," ",c.a.createElement(u.a,{size:"sm",className:"button-pagination",variant:"secondary",onClick:function(){return C()},disabled:!v},">")," ",c.a.createElement(u.a,{size:"sm",className:"button-pagination",variant:"secondary",onClick:function(){return O(h-1)},disabled:!v},">>")," ",c.a.createElement("span",null,"P\xe1gina"," ",c.a.createElement("strong",null,x+1," de ",y.length)," "),c.a.createElement("span",{className:"ml-3"},"| ",c.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),c.a.createElement("input",Object(n.a)({type:"number",defaultValue:x+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;O(t)},className:"inputPage"},"onChange",(function(e){e.target.value>y.length&&(e.target.value=1)}))))," ",c.a.createElement("select",{value:_,onChange:function(e){j(Number(e.target.value))},className:"inputPage"},[10,20,30,40,50].map((function(e){return c.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))))}p.autoRemove=function(e){return!e};t.a=function(e){var t=e.data,a=e.columns;return c.a.createElement(d,null,c.a.createElement(b,{data:t,columns:a}))}},655:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,r,o=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();t.confirmAlert=function(e){document.body.classList.add("react-confirm-alert-body-element"),function(){if(document.getElementById("react-confirm-alert-firm-svg"))return;var e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"feGaussianBlur");t.setAttribute("stdDeviation","0.3");var a=document.createElementNS(e,"filter");a.setAttribute("id","gaussian-blur"),a.appendChild(t);var n=document.createElementNS(e,"svg");n.setAttribute("id","react-confirm-alert-firm-svg"),n.setAttribute("class","react-confirm-alert-svg"),n.appendChild(a),document.body.appendChild(n)}(),function(e){var t=document.getElementById("react-confirm-alert");t||(document.body.children[0].classList.add("react-confirm-alert-blur"),(t=document.createElement("div")).id="react-confirm-alert",document.body.appendChild(t)),(0,s.render)(l.default.createElement(f,e),t)}(e)};var c=a(1),l=u(c),i=u(a(2)),s=a(33);function u(e){return e&&e.__esModule?e:{default:e}}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var f=(r=n=function(e){function t(){var e,a,n;m(this,t);for(var r=arguments.length,o=Array(r),c=0;c<r;c++)o[c]=arguments[c];return a=n=d(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),n.handleClickButton=function(e){e.onClick&&e.onClick(),n.close()},n.handleClickOverlay=function(e){var t=n.props,a=t.closeOnClickOutside,r=t.onClickOutside,o=e.target===n.overlay;a&&o&&(r(),n.close())},n.close=function(){var e=n.props.afterClose;g(),b(),p(e)},n.keyboardClose=function(e){var t=n.props,a=t.closeOnEscape,r=t.onKeypressEscape,o=27===e.keyCode;a&&o&&(r(e),n.close())},n.componentDidMount=function(){document.addEventListener("keydown",n.keyboardClose,!1)},n.componentWillUnmount=function(){document.removeEventListener("keydown",n.keyboardClose,!1),n.props.willUnmount()},n.renderCustomUI=function(){var e=n.props,t=e.title,a=e.message,r=e.buttons;return(0,e.customUI)({title:t,message:a,buttons:r,onClose:n.close})},d(n,a)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.title,n=t.message,r=t.buttons,o=t.childrenElement,c=t.customUI;return l.default.createElement("div",{className:"react-confirm-alert-overlay",ref:function(t){return e.overlay=t},onClick:this.handleClickOverlay},l.default.createElement("div",{className:"react-confirm-alert"},c?this.renderCustomUI():l.default.createElement("div",{className:"react-confirm-alert-body"},a&&l.default.createElement("h1",null,a),n,o(),l.default.createElement("div",{className:"react-confirm-alert-button-group"},r.map((function(t,a){return l.default.createElement("button",{key:a,onClick:function(){return e.handleClickButton(t)},className:t.className},t.label)}))))))}}]),t}(c.Component),n.propTypes={title:i.default.string,message:i.default.string,buttons:i.default.array.isRequired,childrenElement:i.default.func,customUI:i.default.func,closeOnClickOutside:i.default.bool,closeOnEscape:i.default.bool,willUnmount:i.default.func,afterClose:i.default.func,onClickOutside:i.default.func,onKeypressEscape:i.default.func},n.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null},className:null},{label:"Confirm",onClick:function(){return null},className:null}],childrenElement:function(){return null},closeOnClickOutside:!0,closeOnEscape:!0,willUnmount:function(){return null},afterClose:function(){return null},onClickOutside:function(){return null},onKeypressEscape:function(){return null}},r);function p(e){var t=document.getElementById("react-confirm-alert-firm-svg");t.parentNode.removeChild(t),document.body.children[0].classList.remove("react-confirm-alert-blur"),e()}function b(){var e=document.getElementById("react-confirm-alert");e&&((0,s.unmountComponentAtNode)(e),e.parentNode.removeChild(e))}function g(){document.body.classList.remove("react-confirm-alert-body-element")}t.default=f},656:function(e,t,a){},657:function(e,t,a){},667:function(e,t,a){"use strict";var n=a(1),r=a.n(n),o=a(56),c=a(215),l=a(35);t.a=function(e){var t=Object(o.a)(e,{activeKey:"onSelect"}),a=t.id,i=t.generateChildId,s=t.onSelect,u=t.activeKey,m=t.transition,d=t.mountOnEnter,f=t.unmountOnExit,p=t.children,b=Object(n.useMemo)((function(){return i||function(e,t){return a?a+"-"+t+"-"+e:null}}),[a,i]),g=Object(n.useMemo)((function(){return{onSelect:s,activeKey:u,transition:m,mountOnEnter:d||!1,unmountOnExit:f||!1,getControlledId:function(e){return b(e,"tabpane")},getControllerId:function(e){return b(e,"tab")}}}),[s,u,m,d,f,b]);return r.a.createElement(c.a.Provider,{value:g},r.a.createElement(l.a.Provider,{value:s||null},p))}},668:function(e,t,a){"use strict";var n=a(3),r=a(4),o=a(5),c=a.n(o),l=a(1),i=a.n(l),s=a(8),u=i.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.as,l=void 0===o?"div":o,u=e.className,m=Object(r.a)(e,["bsPrefix","as","className"]),d=Object(s.a)(a,"tab-content");return i.a.createElement(l,Object(n.a)({ref:t},m,{className:c()(u,d)}))}));t.a=u},669:function(e,t,a){"use strict";var n=a(3),r=a(4),o=a(5),c=a.n(o),l=a(1),i=a.n(l),s=a(8),u=a(215),m=a(35),d=a(661);var f=i.a.forwardRef((function(e,t){var a=function(e){var t=Object(l.useContext)(u.a);if(!t)return e;var a=t.activeKey,o=t.getControlledId,c=t.getControllerId,i=Object(r.a)(t,["activeKey","getControlledId","getControllerId"]),s=!1!==e.transition&&!1!==i.transition,f=Object(m.b)(e.eventKey);return Object(n.a)({},e,{active:null==e.active&&null!=f?Object(m.b)(a)===f:e.active,id:o(e.eventKey),"aria-labelledby":c(e.eventKey),transition:s&&(e.transition||i.transition||d.a),mountOnEnter:null!=e.mountOnEnter?e.mountOnEnter:i.mountOnEnter,unmountOnExit:null!=e.unmountOnExit?e.unmountOnExit:i.unmountOnExit})}(e),o=a.bsPrefix,f=a.className,p=a.active,b=a.onEnter,g=a.onEntering,E=a.onEntered,v=a.onExit,y=a.onExiting,h=a.onExited,O=a.mountOnEnter,C=a.unmountOnExit,k=a.transition,j=a.as,N=void 0===j?"div":j,x=(a.eventKey,Object(r.a)(a,["bsPrefix","className","active","onEnter","onEntering","onEntered","onExit","onExiting","onExited","mountOnEnter","unmountOnExit","transition","as","eventKey"])),_=Object(s.a)(o,"tab-pane");if(!p&&!k&&C)return null;var P=i.a.createElement(N,Object(n.a)({},x,{ref:t,role:"tabpanel","aria-hidden":!p,className:c()(f,_,{active:p})}));return k&&(P=i.a.createElement(k,{in:p,onEnter:b,onEntering:g,onEntered:E,onExit:v,onExiting:y,onExited:h,mountOnEnter:O,unmountOnExit:C},P)),i.a.createElement(u.a.Provider,{value:null},i.a.createElement(m.a.Provider,{value:null},P))}));f.displayName="TabPane",t.a=f},671:function(e,t,a){"use strict";var n=a(3),r=a(4),o=a(1),c=a.n(o),l=a(2),i=a.n(l),s=a(618),u=a(214),m=a(213),d={id:i.a.any,href:i.a.string,onClick:i.a.func,title:i.a.node.isRequired,disabled:i.a.bool,menuRole:i.a.string,renderMenuOnMount:i.a.bool,rootCloseEvent:i.a.string,bsPrefix:i.a.string,variant:i.a.string,size:i.a.string},f=c.a.forwardRef((function(e,t){var a=e.title,o=e.children,l=e.bsPrefix,i=e.rootCloseEvent,d=e.variant,f=e.size,p=e.menuRole,b=e.renderMenuOnMount,g=e.disabled,E=e.href,v=e.id,y=Object(r.a)(e,["title","children","bsPrefix","rootCloseEvent","variant","size","menuRole","renderMenuOnMount","disabled","href","id"]);return c.a.createElement(s.a,Object(n.a)({ref:t},y),c.a.createElement(u.a,{id:v,href:E,size:f,variant:d,disabled:g,childBsPrefix:l},a),c.a.createElement(m.a,{role:p,renderOnMount:b,rootCloseEvent:i},o))}));f.displayName="DropdownButton",f.propTypes=d,t.a=f},673:function(e,t,a){},676:function(e,t,a){"use strict";var n=a(3),r=a(4),o=a(5),c=a.n(o),l=a(1),i=a.n(l),s=a(2),u=a.n(s),m=a(8),d=(u.a.string,u.a.bool,u.a.bool,u.a.bool,u.a.bool,i.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.className,l=e.fluid,s=e.rounded,u=e.roundedCircle,d=e.thumbnail,f=Object(r.a)(e,["bsPrefix","className","fluid","rounded","roundedCircle","thumbnail"]);a=Object(m.a)(a,"img");var p=c()(l&&a+"-fluid",s&&"rounded",u&&"rounded-circle",d&&a+"-thumbnail");return i.a.createElement("img",Object(n.a)({ref:t},f,{className:c()(o,p)}))})));d.displayName="Image",d.defaultProps={fluid:!1,rounded:!1,roundedCircle:!1,thumbnail:!1},t.a=d},685:function(e,t,a){"use strict";var n=a(3),r=a(4),o=a(5),c=a.n(o),l=a(1),i=a.n(l),s=a(8),u=i.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.variant,l=e.pill,u=e.className,m=e.as,d=void 0===m?"span":m,f=Object(r.a)(e,["bsPrefix","variant","pill","className","as"]),p=Object(s.a)(a,"badge");return i.a.createElement(d,Object(n.a)({ref:t},f,{className:c()(u,p,l&&p+"-pill",o&&p+"-"+o)}))}));u.displayName="Badge",u.defaultProps={pill:!1},t.a=u},694:function(e,t,a){"use strict";var n=a(3),r=a(4),o=a(1),c=a.n(o),l=(a(333),a(56)),i=a(619),s=a(224),u=a(223),m=a(667),d=a(668),f=a(669),p=a(172);function b(e){var t=e.props,a=t.title,n=t.eventKey,r=t.disabled,o=t.tabClassName,l=t.id;return null==a?null:c.a.createElement(u.a,{as:s.a,eventKey:n,disabled:r,id:l,className:o},a)}var g=function(e){var t=Object(l.a)(e,{activeKey:"onSelect"}),a=t.id,o=t.onSelect,s=t.transition,u=t.mountOnEnter,g=t.unmountOnExit,E=t.children,v=t.activeKey,y=void 0===v?function(e){var t;return Object(p.a)(e,(function(e){null==t&&(t=e.props.eventKey)})),t}(E):v,h=Object(r.a)(t,["id","onSelect","transition","mountOnEnter","unmountOnExit","children","activeKey"]);return c.a.createElement(m.a,{id:a,activeKey:y,onSelect:o,transition:s,mountOnEnter:u,unmountOnExit:g},c.a.createElement(i.a,Object(n.a)({},h,{role:"tablist",as:"nav"}),Object(p.b)(E,b)),c.a.createElement(d.a,null,Object(p.b)(E,(function(e){var t=Object(n.a)({},e.props);return delete t.title,delete t.disabled,delete t.tabClassName,c.a.createElement(f.a,t)}))))};g.defaultProps={variant:"tabs",mountOnEnter:!1,unmountOnExit:!1},g.displayName="Tabs",t.a=g},695:function(e,t,a){"use strict";var n=a(13),r=a(1),o=a.n(r),c=a(667),l=a(668),i=a(669),s=function(e){function t(){return e.apply(this,arguments)||this}return Object(n.a)(t,e),t.prototype.render=function(){throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")},t}(o.a.Component);s.Container=c.a,s.Content=l.a,s.Pane=i.a,t.a=s},740:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(21),c=a.n(o),l=a(626),i=a(627),s=a(318),u=a(694),m=a(695),d=a(32),f=a(86),p=a.n(f),b=a(45),g=a(23),E=a(125),v=a(61),y=a(29),h=a(671),O=a(618),C=a(50),k=a(319),j=a(15),N=a(171),x=[{Header:"Nombre Categoria",accessor:"name_category"}],_=a(654),P=a(655),S=(a(656),function(e){var t=Object(n.useState)(!1),a=Object(v.a)(t,2),o=a[0],u=a[1],m=Object(n.useState)(!1),f=Object(v.a)(m,2),S=f[0],w=f[1],H=Object(n.useState)([]),I=Object(v.a)(H,2),M=I[0],z=I[1],T=Object(n.useState)({name_category:""}),K=Object(v.a)(T,2),R=K[0],B=K[1];Object(n.useEffect)((function(){q()}),[]),Object(n.useMemo)((function(){x.length>1&&x.pop(),x.push({Header:"Acciones",Cell:function(e){var t=e.cell.row.original.id;return r.a.createElement(h.a,{size:"sm",id:"drop"+e.cell.row.original.id,title:"Seleccione",block:"true"},r.a.createElement(O.a.Item,{onClick:function(){return F(e.cell.row.original)}},"Modificar"),r.a.createElement(O.a.Item,{onClick:function(){return A(t)}},"Eliminar"))}})}),[]);var A=function(e){Object(P.confirmAlert)({customUI:function(t){var a=t.onClose;return r.a.createElement("div",{className:"custom-ui-edit"},r.a.createElement("h1",null,"\xbfEsta seguro?"),r.a.createElement("p",{className:"font-alert"},"\xbfDesea realmente borrar este registro?"),r.a.createElement("button",{className:"button-alert",onClick:function(){D(e),a()}},"Si, Aceptar"),r.a.createElement("button",{className:"button-alert",onClick:a},"No"))}})},D=function(e){c.a.delete(d.a+"category/"+e).then((function(e){j.b.success("Registro eliminado con \xe9xito"),q()})).catch((function(e){var t=e.response;t?j.b.error(t.data.message):j.b.error("Error, contacte con soporte")}))},F=function(e){var t=Object.assign({},R,{name_category:e.name_category,id:e.id});w(!0),B(t),document.getElementById("name_category").focus()},q=function(){c.a.get(d.a+"category").then((function(e){z(e.data)})).catch((function(e){var t=e.response;console.log(e,t),t?j.b.error(t.data.message):j.b.error("Error, contacte con soporte")}))},U=function(){var e=Object(E.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B(Object(g.a)(Object(g.a)({},R),{},Object(b.a)({},t.target.name,t.target.value)));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),V=function(){w(!1),u(!1),B({name_category:""})};return r.a.createElement(l.a,null,r.a.createElement(i.a,{className:"justify-content-center"},r.a.createElement(s.a,{sm:12,md:12,lg:12,xs:12,className:"containerDivSeparated"},r.a.createElement("br",null),r.a.createElement("h3",{className:"text-center font-title"},"Formulario De Categorias"),r.a.createElement("br",null),r.a.createElement(C.a,{onSubmit:function(e){var t=e.currentTarget;if(e.preventDefault(),!1===t.checkValidity())return e.stopPropagation(),void u(!0);var a=Object.assign({},R);S?c.a.put(d.a+"category/"+a.id,a).then((function(e){j.b.success("Categoria Modificada"),V(),q()})).catch((function(e){var t=e.response;t?j.b.error(t.data.message):j.b.error("Error, contacte con soporte")})):c.a.post(d.a+"category",a).then((function(e){j.b.success("Categoria Creada"),q(),V()})).catch((function(e){var t=e.response;t?j.b.error(t.data.message):j.b.error("Error, contacte con soporte")}))},noValidate:!0,validated:o},r.a.createElement(i.a,{className:"justify-content-center"},r.a.createElement(N.a,Object.assign({},e.inputName,{handleChange:U,value:R.name_category}))),r.a.createElement(i.a,{className:"justify-content-center"},r.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6},r.a.createElement(k.a,{size:"sm",type:"submit",variant:"primary",block:"true"},"Guardar ",r.a.createElement(y.o,null)))),S?r.a.createElement(i.a,{className:"justify-content-center"},r.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6},r.a.createElement("br",null),r.a.createElement(k.a,{size:"sm",type:"button",onClick:function(){V()},variant:"secondary",block:"true"},"Cancelar Modificaci\xf3n"))):""))),r.a.createElement(i.a,null,r.a.createElement(s.a,{sm:12,md:12,lg:12,xs:12,className:"containerDivSeparated"},r.a.createElement(_.a,{columns:x,data:M}))))});S.defaultProps={inputName:{type:"text",required:!0,name:"name_category",label:"Nombre Categoria",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}};var w=S,H=a(739),I=a(676),M=(a(30),a(685)),z=a(662),T=[{Header:"Nombre Producto",accessor:"name_product"},{Header:"P.Venta",accessor:"price"},{Header:"P.Compra",accessor:"cost"},{Header:"Categoria",accessor:function(e){return e.categories.map((function(e){return e.categories?e.categories.name_category:""}))},Cell:function(e){return r.a.createElement("ul",{className:"list-group"},e.cell.row.original.categories.map((function(e,t){return r.a.createElement("li",{key:t,className:"list-group-item"},e.categories?e.categories.name_category:"")})))}},{Header:"Tipo de Venta",accessor:"method_sale_format"}],K=[{Header:"Nombre Producto",accessor:function(e){return e.products.name_product}},{Header:"Proveedor",accessor:function(e){return e.products.providers?e.products.providers.name_fantasy:"Sin Proveedor"}},{Header:"Categor\xeda",accessor:function(e){return e.products.categories.map((function(e){return e.categories?e.categories.name_category:""}))},Cell:function(e){return r.a.createElement("ul",{className:"list-group"},e.cell.row.original.products.categories.map((function(e,t){return r.a.createElement("li",{key:t,className:"list-group-item"},e.categories?e.categories.name_category:"")})))}},{Header:"Stock M\xednimo",accessor:"minimun_stock"},{Header:"Stock Actual",accessor:"stock"},{Header:"Estado",accessor:"estado",Cell:function(e){return"Normal"===e.cell.row.original.estado?r.a.createElement(M.a,{variant:"success",className:"font-badge"},e.cell.row.original.estado):r.a.createElement(M.a,{variant:"danger",className:"font-badge"},e.cell.row.original.estado)}}],R=[{Header:"Motivo",accessor:function(e){return e.reason.name_reason},Cell:function(e){return e.cell.row.original.reason.name_reason}},{Header:"Usuario",accessor:function(e){return e.user.email},Cell:function(e){return e.cell.row.original.user.email}},{Header:"Tipo de Operaci\xf3n",accessor:"type_operation",Cell:function(e){return"Resta"===e.cell.row.original.type_operation?r.a.createElement(M.a,{variant:"danger",style:{fontSize:"18px"}},"Resta"):r.a.createElement(M.a,{variant:"success",style:{fontSize:"18px"}},"Suma")}},{Header:"Moficaci\xf3n de Stock",accessor:"stock"},{Header:"Stock Minimo",accessor:"minimun_stock"},{Header:"Fecha",accessor:function(e){return e.createdAt},Cell:function(e){return z.tz(e.cell.row.original.createdAt,"America/Santiago").format("DD-MM-YYYY HH:mm:ss")}}],B=(a(657),a(673),function(e){var t=Object(n.useState)([]),a=Object(v.a)(t,2),o=a[0],u=a[1],m=Object(n.useState)(!1),f=Object(v.a)(m,2),p=f[0],b=f[1],g=Object(n.useState)({}),E=Object(v.a)(g,2),C=E[0],N=E[1];Object(n.useEffect)((function(){z()}),[]),Object(n.useMemo)((function(){T.length>5&&T.pop(),T.push({Header:"Acciones",Cell:function(e){var t=e.cell.row.original.id;return r.a.createElement(h.a,{size:"sm",id:"drop"+e.cell.row.original.id,title:"Seleccione",block:"true"},r.a.createElement(O.a.Item,{onClick:function(){return S(e.cell.row.original)}},"Ver Detalle"),r.a.createElement(O.a.Item,{onClick:function(){return M(t)}},"Modificar"),r.a.createElement(O.a.Item,{onClick:function(){return x(t)}},"Eliminar"))}})}),[]);var x=function(e){Object(P.confirmAlert)({customUI:function(t){var a=t.onClose;return r.a.createElement("div",{className:"custom-ui-edit"},r.a.createElement("h1",null,"\xbfEsta seguro?"),r.a.createElement("p",{className:"font-alert"},"\xbfDesea realmente borrar este registro?"),r.a.createElement("button",{className:"button-alert",onClick:function(){w(e),a()}},"Si, Aceptar"),r.a.createElement("button",{className:"button-alert",onClick:a},"No"))}})},S=function(e){N({code_ean:e.code_ean,description:e.description,is_neto:e.is_neto_format,is_auto_sale:e.is_auto_sale_format,sticker_color:e.sticker_color,qr_image:e.qr_image,img_product:e.img_product,gallery:e.gallery,detailCost:e.cost_details,pack:e.pack}),b(!0)},w=function(e){c.a.delete(d.a+"product/"+e).then((function(e){j.b.success("Registro eliminado con \xe9xito"),z()})).catch((function(e){var t=e.response;t?j.b.error(t.data.message):j.b.error("Error, contacte con soporte")}))},M=function(t){e.history.replace("/product/form/"+btoa(t))},z=function(){var e=[c.a.get(d.a+"product")];Promise.all(e).then((function(e){u(e[0].data)})).catch((function(e){var t=e.response;console.log(e,t),t?j.b.error(t.data.message):j.b.error("Error, contacte con soporte")}))};return r.a.createElement(l.a,null,r.a.createElement(i.a,null,r.a.createElement(s.a,{sm:12,md:12,lg:12},r.a.createElement("br",null),r.a.createElement("h4",{className:"title_principal"},"Tabla Productos"),r.a.createElement("hr",null)),r.a.createElement(s.a,{sm:12,md:12,lg:12,xs:12,className:"containerDiv"},r.a.createElement("div",{className:"button-add"},r.a.createElement(k.a,{size:"sm",title:"Crear Producto",onClick:function(){e.history.replace("/product/form")},variant:"success"},r.a.createElement(y.o,null))),r.a.createElement(_.a,{columns:T,data:o}))),r.a.createElement(H.a,{show:p,onHide:function(){b(!1)},size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(H.a.Header,{closeButton:!0,className:"header_dark"},r.a.createElement(H.a.Title,{id:"contained-modal-title-vcenter"},r.a.createElement("h3",{className:"font-title"},"Detalles del Producto"))),r.a.createElement(H.a.Body,null,Object.keys(C).length>0?r.a.createElement("ul",{className:"list-group text-center"},r.a.createElement("li",{className:"list-group-item"},r.a.createElement("b",null,"Codigo EAN:\xa0\xa0")," ",C.code_ean),r.a.createElement("li",{className:"list-group-item"},r.a.createElement("b",null,"Descripci\xf3n:\xa0\xa0")," ",C.description),r.a.createElement("li",{className:"list-group-item"},r.a.createElement("b",null,"\xbfEs Neto?:\xa0\xa0")," ",C.is_neto),r.a.createElement("li",{className:"list-group-item"},r.a.createElement("b",null,"\xbfEs auto venta?:\xa0\xa0")," ",C.is_auto_sale),C.pack?r.a.createElement("li",{className:"list-group-item"},r.a.createElement("b",null,"Pack de Venta:\xa0\xa0")," ",C.pack):"",C.img_product?r.a.createElement("li",{className:"list-group-item"},r.a.createElement("b",null,"Imagen del Producto:"),r.a.createElement("br",null)," ",r.a.createElement(I.a,{src:d.a+"images/product/principal/"+C.img_product,thumbnail:!0,style:{width:"30%"}})):r.a.createElement("li",{className:"list-group-item"},r.a.createElement("b",null,"Sin imagen de Presentaci\xf3n")),r.a.createElement("li",{className:"list-group-item"},r.a.createElement("b",null,"Qr Imagen:"),r.a.createElement("br",null),r.a.createElement(i.a,{className:"justify-content-center"},r.a.createElement(s.a,{sm:6,md:6,lg:6,className:"text-center"},r.a.createElement(I.a,{src:d.a+"images/product/qr/"+C.qr_image,thumbnail:!0,style:{width:"80%"}}))))):"",r.a.createElement("br",null),Object.keys(C).length>0&&C.detailCost.length>0?r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",{className:"text-center"},"Detalle de Costos"),r.a.createElement("ul",{className:"list-group text-center"},C.detailCost.map((function(e,t){return r.a.createElement("li",{className:"list-group-item",key:t},r.a.createElement("b",null,"Detalle:"),"\xa0\xa0",e.detail,",\xa0\xa0",r.a.createElement("b",null,"Costo:"),"\xa0\xa0",e.cost," ")})))):"",r.a.createElement("br",null),C.gallery&&C.gallery.length>0?r.a.createElement(i.a,null,r.a.createElement(s.a,{sm:12,md:12,lg:12,xs:12},r.a.createElement("h1",{className:"text-center font-title"},"Galer\xeda de Imag\xe9nes")),r.a.createElement("div",{className:"clearfix"}),r.a.createElement("br",null),r.a.createElement("br",null),C.gallery.map((function(e,t){return r.a.createElement(s.a,{sm:4,md:4,lg:4,xs:4,key:t,className:"paddingColGallery"},r.a.createElement("a",{href:d.a+"images/product/gallery/"+e.filename,target:"_blank"},r.a.createElement(I.a,{src:d.a+"images/product/gallery/"+e.filename,id:"imagen_logo"+e.filename,style:{width:"85%",height:"230px"},rounded:!0})))}))):""),r.a.createElement(H.a.Footer,null)))}),A=function(e){var t=Object(n.useState)({minimun_stock:0,stock:0,id_product:0,id_provider:""}),a=Object(v.a)(t,2),o=a[0],l=a[1],u=Object(n.useState)(!1),m=Object(v.a)(u,2),f=m[0],p=m[1],E=Object(n.useState)([]),y=Object(v.a)(E,2),h=y[0],O=y[1];Object(n.useEffect)((function(){_()}),[]),Object(n.useEffect)((function(){l({minimun_stock:e.product.minimun_stock,stock:e.product.stock,id_product:e.product.id,id_provider:e.product.id_provider})}),[e.product]);var x=function(e){l(Object(g.a)(Object(g.a)({},o),{},Object(b.a)({},e.target.name,e.target.value)))},_=function(){c.a.get(d.a+"provider").then((function(e){O(e.data)})).catch((function(e){e.response?j.b.error(e.response.data.message):j.b.error("Error, contacte con soporte")}))};return r.a.createElement(H.a,{show:e.isShow,onHide:e.onHide,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(H.a.Header,{closeButton:!0,className:"header_dark"},r.a.createElement(H.a.Title,{id:"contained-modal-title-vcenter"},"Stock del Producto ",e.product.name_product)),r.a.createElement(C.a,{id:"formSubmit",onSubmit:function(t){t.preventDefault();var a=t.currentTarget,n=Object.assign({},o);return!1===a.checkValidity()?(t.stopPropagation(),void p(!0)):n.minimun_stock<0||n.stock<0?(j.b.error("Los campos de stock no pueden ser menor a 0"),void t.stopPropagation()):void c.a.put(d.a+"inventary/"+o.id_product,n).then((function(t){j.b.success("Stock Modificado"),e.handleSubmitStock()})).catch((function(e){e.response?j.b.error(e.response.data.message):j.b.error("Error, contacte con soporte")}))},noValidate:!0,validated:f},r.a.createElement(H.a.Body,null,r.a.createElement(i.a,null,r.a.createElement(s.a,{sm:12,md:12,lg:12,xs:12},r.a.createElement(i.a,null,r.a.createElement(N.a,Object.assign({},e.inputMinimun,{handleChange:x,value:o.minimun_stock})),r.a.createElement(N.a,Object.assign({},e.inputStock,{handleChange:x,value:o.stock}))),r.a.createElement(i.a,null,r.a.createElement(N.a,Object.assign({},e.inputProvider,{handleChange:x,value:o.id_provider}),r.a.createElement("option",null,"--Seleccione--"),h.map((function(e,t){return r.a.createElement("option",{value:e.id,key:t},e.name_fantasy)}))))))),r.a.createElement(H.a.Footer,null,r.a.createElement(k.a,{size:"sm",type:"submit",variant:"success"},"Modificar"),r.a.createElement(k.a,{size:"sm",onClick:e.onHide},"Cerrar"))))};A.defaultProps={inputMinimun:{type:"number",min:"0",required:!0,name:"minimun_stock",label:"Stock M\xednimo",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:["Requerido*"]},inputStock:{type:"number",required:!0,name:"stock",label:"Stock Actual",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:["Requerido*"]},inputProvider:{type:"select",required:!0,name:"id_provider",label:"Proveedor",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6",messageErrors:["Requerido*"]}};var D=A,F=function(e){var t=Object(n.useState)([]),a=Object(v.a)(t,2),o=a[0],l=a[1];Object(n.useEffect)((function(){e.id_inventary&&u()}),[e.id_inventary]),Object(n.useMemo)((function(){}),[]);var u=function(){c.a.get(d.a+"inventary_historial/"+e.id_inventary).then((function(e){l(e.data)})).catch((function(e){e.response?j.b.error(e.response.data.message):j.b.error("Error, contacte con soporte")}))};return r.a.createElement(H.a,{show:e.isShow,onHide:e.onHide,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(H.a.Header,{closeButton:!0,className:"header_dark"},r.a.createElement(H.a.Title,{id:"contained-modal-title-vcenter"},"Historial del Producto ",e.name_product)),r.a.createElement(H.a.Body,null,r.a.createElement(i.a,null,r.a.createElement(s.a,{sm:12,md:12,lg:12,xs:12},r.a.createElement(_.a,{columns:R,data:o})))),r.a.createElement(H.a.Footer,null,r.a.createElement(k.a,{size:"sm",onClick:e.onHide},"Cerrar")))},q=function(e){var t=Object(n.useState)([]),a=Object(v.a)(t,2),o=a[0],u=a[1],m=Object(n.useState)(!1),f=Object(v.a)(m,2),p=f[0],b=f[1],g=Object(n.useState)(!1),E=Object(v.a)(g,2),y=E[0],C=E[1],k=Object(n.useState)(!1),N=Object(v.a)(k,2),x=N[0],P=N[1],S=Object(n.useState)({}),w=Object(v.a)(S,2),H=w[0],I=w[1],M=Object(n.useState)(""),z=Object(v.a)(M,2),T=z[0],R=z[1];Object(n.useEffect)((function(){A()}),[]),Object(n.useMemo)((function(){K.length>6&&K.pop(),K.push({Header:"Acciones",Cell:function(e){e.cell.row.original.id;return r.a.createElement(h.a,{size:"sm",id:"drop"+e.cell.row.original.id,title:"Seleccione",block:"true"},r.a.createElement(O.a.Item,{onClick:function(){return B(e.cell.row.original)}},"Modificar Stock"),r.a.createElement(O.a.Item,{onClick:function(){return q(e.cell.row.original)}},"Ver Historial"))}})}),[]);var B=function(e){I(e),b(!0)},A=function(){c.a.get(d.a+"inventary").then((function(e){u(e.data)})).catch((function(e){e.response?j.b.error(e.response.data.message):j.b.error("Error, contacte con soporte")}))},q=function(e){P(e.id),C(!0),R(e.name_product)};return r.a.createElement(l.a,null,r.a.createElement(i.a,null,r.a.createElement(s.a,{sm:12,md:12,lg:12},r.a.createElement("br",null),r.a.createElement("h4",{className:"title_principal"},"Tabla Inventario"),r.a.createElement("hr",null)),r.a.createElement(s.a,{sm:12,md:12,lg:12,xs:12,className:"containerDiv"},r.a.createElement(_.a,{columns:K,data:o}))),r.a.createElement(D,{isShow:p,onHide:function(){b(!1)},product:H,handleSubmitStock:function(){b(!1),I({}),A()}}),r.a.createElement(F,{isShow:y,onHide:function(){C(!1),P(null)},id_inventary:x,name_product:T}))};t.default=function(e){return r.a.createElement(l.a,null,r.a.createElement(i.a,null,r.a.createElement(s.a,{sm:12,md:12,lg:12,xs:12,className:"containerDiv"},r.a.createElement(u.a,{defaultActiveKey:"product",id:"uncontrolled-tab-example"},r.a.createElement(m.a,{eventKey:"product",title:"Productos"},r.a.createElement(B,e)),r.a.createElement(m.a,{eventKey:"inventory",title:"Inventario"},r.a.createElement(q,e)),r.a.createElement(m.a,{eventKey:"categories",title:"Categorias"},r.a.createElement(w,null))))))}}}]);
//# sourceMappingURL=9.fe2e5e76.chunk.js.map