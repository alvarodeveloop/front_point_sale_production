(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[22],{661:function(e,t,n){"use strict";var a=n(47),r=n(665),o=n(1),l=n.n(o),c=n(666),i=n(667),s=n(668),u=n(320);function d(){var e=Object(r.a)(["\n  padding: 1rem;\n\n  .button-pagination{\n    margin-right: 10px;\n  }\n\n  .inputPage{\n    display: inline-block;\n    width: 150px;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .inputPageFilter{\n    display: inline-block;\n    width: 80%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .pagination {\n    padding: 0.5rem;\n    display: flex;\n    justify-content: center;\n  }\n\n  .tr_cabecera{\n    background-color: rgb(218, 236, 242);\n    color: black;\n  }\n"]);return d=function(){return e},e}var m=c.a.div(d());function f(e){var t=e.column,n=t.filterValue,a=t.preFilteredRows,r=t.setFilter,o=a.length;return l.a.createElement("input",{value:n||"",onChange:function(e){r(e.target.value||void 0)},placeholder:"Buscar en ".concat(o," registros..."),className:"inputPageFilter"})}function p(e,t,n){return Object(s.a)(e,n,{keys:[function(e){return e.values[t]}]})}function g(e){var t=e.columns,n=e.data,r=l.a.useMemo((function(){return{fuzzyText:p,text:function(e,t,n){return e.filter((function(e){var a=e.values[t];return void 0===a||String(a).toLowerCase().startsWith(String(n).toLowerCase())}))}}}),[]),o=l.a.useMemo((function(){return{Filter:f}}),[]),c=Object(i.useTable)({columns:t,data:n,defaultColumn:o,filterTypes:r,initialState:{pageIndex:0}},i.useFilters,i.useSortBy,i.usePagination),s=c.getTableProps,d=c.getTableBodyProps,m=c.headerGroups,g=c.page,b=c.prepareRow,v=c.canPreviousPage,h=c.canNextPage,E=c.pageOptions,y=c.pageCount,C=c.gotoPage,k=c.nextPage,N=c.previousPage,O=c.setPageSize,x=c.state,w=x.pageIndex,P=x.pageSize;return l.a.createElement("div",{className:"table-responsive"},l.a.createElement("table",Object.assign({},s(),{className:"table table-bordered"}),l.a.createElement("thead",null,m.map((function(e){return l.a.createElement("tr",Object.assign({},e.getHeaderGroupProps(),{className:"text-center"}),e.headers.map((function(e){return l.a.createElement("th",Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{className:"tr_cabecera"}),e.render("Header"),l.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""),l.a.createElement("div",null,e.canFilter?e.render("Filter"):null))})))}))),l.a.createElement("tbody",Object.assign({},d(),{className:"text-center"}),g.map((function(e,t){return b(e)||l.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return l.a.createElement("td",e.getCellProps(),e.render("Cell"))})))})))),l.a.createElement("div",{className:"pagination"},l.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return C(0)},disabled:!v},"<<")," ",l.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return N()},disabled:!v},"<")," ",l.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return k()},disabled:!h},">")," ",l.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return C(y-1)},disabled:!h},">>")," ",l.a.createElement("span",null,"P\xe1gina"," ",l.a.createElement("strong",null,w+1," de ",E.length)," "),l.a.createElement("span",{className:"ml-3"},"| ",l.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),l.a.createElement("input",Object(a.a)({type:"number",defaultValue:w+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;C(t)},className:"inputPage"},"onChange",(function(e){e.target.value>E.length&&(e.target.value=1)}))))," ",l.a.createElement("select",{value:P,onChange:function(e){O(Number(e.target.value))},className:"inputPage"},[10,20,30,40,50].map((function(e){return l.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))))}p.autoRemove=function(e){return!e};t.a=function(e){var t=e.data,n=e.columns;return l.a.createElement(m,null,l.a.createElement(g,{data:t,columns:n}))}},662:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();t.confirmAlert=function(e){document.body.classList.add("react-confirm-alert-body-element"),function(){if(document.getElementById("react-confirm-alert-firm-svg"))return;var e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"feGaussianBlur");t.setAttribute("stdDeviation","0.3");var n=document.createElementNS(e,"filter");n.setAttribute("id","gaussian-blur"),n.appendChild(t);var a=document.createElementNS(e,"svg");a.setAttribute("id","react-confirm-alert-firm-svg"),a.setAttribute("class","react-confirm-alert-svg"),a.appendChild(n),document.body.appendChild(a)}(),function(e){var t=document.getElementById("react-confirm-alert");t||(document.body.children[0].classList.add("react-confirm-alert-blur"),(t=document.createElement("div")).id="react-confirm-alert",document.body.appendChild(t)),(0,s.render)(c.default.createElement(f,e),t)}(e)};var l=n(1),c=u(l),i=u(n(2)),s=n(34);function u(e){return e&&e.__esModule?e:{default:e}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var f=(r=a=function(e){function t(){var e,n,a;d(this,t);for(var r=arguments.length,o=Array(r),l=0;l<r;l++)o[l]=arguments[l];return n=a=m(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),a.handleClickButton=function(e){e.onClick&&e.onClick(),a.close()},a.handleClickOverlay=function(e){var t=a.props,n=t.closeOnClickOutside,r=t.onClickOutside,o=e.target===a.overlay;n&&o&&(r(),a.close())},a.close=function(){var e=a.props.afterClose;b(),g(),p(e)},a.keyboardClose=function(e){var t=a.props,n=t.closeOnEscape,r=t.onKeypressEscape,o=27===e.keyCode;n&&o&&(r(e),a.close())},a.componentDidMount=function(){document.addEventListener("keydown",a.keyboardClose,!1)},a.componentWillUnmount=function(){document.removeEventListener("keydown",a.keyboardClose,!1),a.props.willUnmount()},a.renderCustomUI=function(){var e=a.props,t=e.title,n=e.message,r=e.buttons;return(0,e.customUI)({title:t,message:n,buttons:r,onClose:a.close})},m(a,n)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.title,a=t.message,r=t.buttons,o=t.childrenElement,l=t.customUI;return c.default.createElement("div",{className:"react-confirm-alert-overlay",ref:function(t){return e.overlay=t},onClick:this.handleClickOverlay},c.default.createElement("div",{className:"react-confirm-alert"},l?this.renderCustomUI():c.default.createElement("div",{className:"react-confirm-alert-body"},n&&c.default.createElement("h1",null,n),a,o(),c.default.createElement("div",{className:"react-confirm-alert-button-group"},r.map((function(t,n){return c.default.createElement("button",{key:n,onClick:function(){return e.handleClickButton(t)},className:t.className},t.label)}))))))}}]),t}(l.Component),a.propTypes={title:i.default.string,message:i.default.string,buttons:i.default.array.isRequired,childrenElement:i.default.func,customUI:i.default.func,closeOnClickOutside:i.default.bool,closeOnEscape:i.default.bool,willUnmount:i.default.func,afterClose:i.default.func,onClickOutside:i.default.func,onKeypressEscape:i.default.func},a.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null},className:null},{label:"Confirm",onClick:function(){return null},className:null}],childrenElement:function(){return null},closeOnClickOutside:!0,closeOnEscape:!0,willUnmount:function(){return null},afterClose:function(){return null},onClickOutside:function(){return null},onKeypressEscape:function(){return null}},r);function p(e){var t=document.getElementById("react-confirm-alert-firm-svg");t.parentNode.removeChild(t),document.body.children[0].classList.remove("react-confirm-alert-blur"),e()}function g(){var e=document.getElementById("react-confirm-alert");e&&((0,s.unmountComponentAtNode)(e),e.parentNode.removeChild(e))}function b(){document.body.classList.remove("react-confirm-alert-body-element")}t.default=f},663:function(e,t,n){},673:function(e,t,n){"use strict";var a=n(3),r=n(4),o=n(1),l=n.n(o),c=n(2),i=n.n(c),s=n(623),u=n(213),d=n(212),m={id:i.a.any,href:i.a.string,onClick:i.a.func,title:i.a.node.isRequired,disabled:i.a.bool,menuRole:i.a.string,renderMenuOnMount:i.a.bool,rootCloseEvent:i.a.string,bsPrefix:i.a.string,variant:i.a.string,size:i.a.string},f=l.a.forwardRef((function(e,t){var n=e.title,o=e.children,c=e.bsPrefix,i=e.rootCloseEvent,m=e.variant,f=e.size,p=e.menuRole,g=e.renderMenuOnMount,b=e.disabled,v=e.href,h=e.id,E=Object(r.a)(e,["title","children","bsPrefix","rootCloseEvent","variant","size","menuRole","renderMenuOnMount","disabled","href","id"]);return l.a.createElement(s.a,Object(a.a)({ref:t},E),l.a.createElement(u.a,{id:h,href:v,size:f,variant:m,disabled:b,childBsPrefix:c},n),l.a.createElement(d.a,{role:p,renderOnMount:g,rootCloseEvent:i},o))}));f.displayName="DropdownButton",f.propTypes=m,t.a=f},716:function(e,t,n){},850:function(e,t,n){"use strict";n.r(t);var a=n(41),r=n(1),o=n.n(r),l=n(25),c=n(17),i=n.n(c),s=n(673),u=n(623),d=n(631),m=n(632),f=n(319),p=n(657),g=n(320),b=n(15),v=n(18),h=[{Header:"Email",accessor:"email"},{Header:"Name",accessor:"name"},{Header:"Rol",accessor:function(e){return e.roles?[e.roles.name_role]:e.name_role}}],E=n(661),y=n(662);n(663),n(716),t.default=function(e){var t=Object(r.useState)([]),n=Object(a.a)(t,2),c=n[0],C=n[1];Object(r.useEffect)((function(){x()}),[]),Object(r.useMemo)((function(){h.length>3&&h.pop(),h.push({Header:"Acciones",Cell:function(e){var t=e.cell.row.original.id;return o.a.createElement(s.a,{size:"sm",id:"drop"+e.cell.row.original.id,title:"Seleccione",block:"true"},o.a.createElement(u.a.Item,{onClick:function(){return O(t)}},"Modificar"),o.a.createElement(u.a.Item,{onClick:function(){return k(t)}},"Eliminar"))}})}),[]);var k=function(e){Object(y.confirmAlert)({customUI:function(t){var n=t.onClose;return o.a.createElement("div",{className:"custom-ui-edit"},o.a.createElement("h1",null,"\xbfEsta seguro?"),o.a.createElement("p",{className:"font-alert"},"\xbfDesea realmente borrar este registro?"),o.a.createElement("button",{className:"button-alert",onClick:function(){N(e),n()}},"Si, Aceptar"),o.a.createElement("button",{className:"button-alert",onClick:n},"No"))}})},N=function(e){i.a.delete(v.a+"user/"+e).then((function(e){b.b.success("Registro eliminado con \xe9xito"),x()})).catch((function(e){var t=e.response;t?b.b.error(t.data.message):b.b.error("Error, contacte con soporte")}))},O=function(t){e.history.replace("/user/create/"+t)},x=function(){i.a.get(v.a+"user").then((function(e){C(e.data)})).catch((function(e){var t=e.response;console.log(e,t),t?b.b.error(t.data.message):b.b.error("Error, contacte con soporte")}))};return o.a.createElement(d.a,null,o.a.createElement(m.a,null,o.a.createElement(f.a,{sm:6,md:6,lg:6},o.a.createElement("h4",{className:"title_principal"},"Usuarios")),o.a.createElement(f.a,{sm:6,md:6,lg:6},o.a.createElement("h4",{className:"title_principal"},"Total Usuarios Registrados: ",o.a.createElement(p.a,{variant:"danger"},c.length)))),o.a.createElement("hr",null),o.a.createElement(m.a,null,o.a.createElement(f.a,{sm:12,md:12,lg:12,xs:12,className:"containerDiv"},o.a.createElement("div",{className:"button-add"},o.a.createElement(g.a,{size:"sm",title:"Crear Usuario",onClick:function(){e.history.replace("/user/create")},variant:"success"},o.a.createElement(l.p,null))),o.a.createElement(E.a,{columns:h,data:c}))))}}}]);
//# sourceMappingURL=22.d960f915.chunk.js.map