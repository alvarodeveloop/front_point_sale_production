(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[27],{654:function(e,n,t){"use strict";var a=t(45),r=t(658),o=t(1),i=t.n(o),l=t(660),c=t(659),s=t(665),u=t(319);function d(){var e=Object(r.a)(["\n  padding: 1rem;\n\n  .button-pagination{\n    margin-right: 10px;\n  }\n\n  .inputPage{\n    display: inline-block;\n    width: 150px;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .inputPageFilter{\n    display: inline-block;\n    width: 80%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .pagination {\n    padding: 0.5rem;\n    display: flex;\n    justify-content: center;\n  }\n\n  .tr_cabecera{\n    background-color: rgb(218, 236, 242);\n    color: black;\n  }\n"]);return d=function(){return e},e}var g=l.a.div(d());function m(e){var n=e.column,t=n.filterValue,a=n.preFilteredRows,r=n.setFilter,o=a.length;return i.a.createElement("input",{value:t||"",onChange:function(e){r(e.target.value||void 0)},placeholder:"Buscar en ".concat(o," registros..."),className:"inputPageFilter"})}function p(e,n,t){return Object(s.a)(e,t,{keys:[function(e){return e.values[n]}]})}function f(e){var n=e.columns,t=e.data,r=i.a.useMemo((function(){return{fuzzyText:p,text:function(e,n,t){return e.filter((function(e){var a=e.values[n];return void 0===a||String(a).toLowerCase().startsWith(String(t).toLowerCase())}))}}}),[]),o=i.a.useMemo((function(){return{Filter:m}}),[]),l=Object(c.useTable)({columns:n,data:t,defaultColumn:o,filterTypes:r,initialState:{pageIndex:0}},c.useFilters,c.useSortBy,c.usePagination),s=l.getTableProps,d=l.getTableBodyProps,g=l.headerGroups,f=l.page,b=l.prepareRow,v=l.canPreviousPage,E=l.canNextPage,h=l.pageOptions,x=l.pageCount,C=l.gotoPage,P=l.nextPage,k=l.previousPage,O=l.setPageSize,y=l.state,N=y.pageIndex,w=y.pageSize;return i.a.createElement("div",{className:"table-responsive"},i.a.createElement("table",Object.assign({},s(),{className:"table table-bordered"}),i.a.createElement("thead",null,g.map((function(e){return i.a.createElement("tr",Object.assign({},e.getHeaderGroupProps(),{className:"text-center"}),e.headers.map((function(e){return i.a.createElement("th",Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{className:"tr_cabecera"}),e.render("Header"),i.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""),i.a.createElement("div",null,e.canFilter?e.render("Filter"):null))})))}))),i.a.createElement("tbody",Object.assign({},d(),{className:"text-center"}),f.map((function(e,n){return b(e)||i.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return i.a.createElement("td",e.getCellProps(),e.render("Cell"))})))})))),i.a.createElement("div",{className:"pagination"},i.a.createElement(u.a,{size:"sm",className:"button-pagination",variant:"secondary",onClick:function(){return C(0)},disabled:!v},"<<")," ",i.a.createElement(u.a,{size:"sm",className:"button-pagination",variant:"secondary",onClick:function(){return k()},disabled:!v},"<")," ",i.a.createElement(u.a,{size:"sm",className:"button-pagination",variant:"secondary",onClick:function(){return P()},disabled:!E},">")," ",i.a.createElement(u.a,{size:"sm",className:"button-pagination",variant:"secondary",onClick:function(){return C(x-1)},disabled:!E},">>")," ",i.a.createElement("span",null,"P\xe1gina"," ",i.a.createElement("strong",null,N+1," de ",h.length)," "),i.a.createElement("span",{className:"ml-3"},"| ",i.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),i.a.createElement("input",Object(a.a)({type:"number",defaultValue:N+1,onChange:function(e){var n=e.target.value?Number(e.target.value)-1:0;C(n)},className:"inputPage"},"onChange",(function(e){e.target.value>h.length&&(e.target.value=1)}))))," ",i.a.createElement("select",{value:w,onChange:function(e){O(Number(e.target.value))},className:"inputPage"},[10,20,30,40,50].map((function(e){return i.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))))}p.autoRemove=function(e){return!e};n.a=function(e){var n=e.data,t=e.columns;return i.a.createElement(g,null,i.a.createElement(f,{data:n,columns:t}))}},671:function(e,n,t){"use strict";var a=t(3),r=t(4),o=t(1),i=t.n(o),l=t(2),c=t.n(l),s=t(618),u=t(214),d=t(213),g={id:c.a.any,href:c.a.string,onClick:c.a.func,title:c.a.node.isRequired,disabled:c.a.bool,menuRole:c.a.string,renderMenuOnMount:c.a.bool,rootCloseEvent:c.a.string,bsPrefix:c.a.string,variant:c.a.string,size:c.a.string},m=i.a.forwardRef((function(e,n){var t=e.title,o=e.children,l=e.bsPrefix,c=e.rootCloseEvent,g=e.variant,m=e.size,p=e.menuRole,f=e.renderMenuOnMount,b=e.disabled,v=e.href,E=e.id,h=Object(r.a)(e,["title","children","bsPrefix","rootCloseEvent","variant","size","menuRole","renderMenuOnMount","disabled","href","id"]);return i.a.createElement(s.a,Object(a.a)({ref:n},h),i.a.createElement(u.a,{id:E,href:v,size:m,variant:g,disabled:b,childBsPrefix:l},t),i.a.createElement(d.a,{role:p,renderOnMount:f,rootCloseEvent:c},o))}));m.displayName="DropdownButton",m.propTypes=g,n.a=m},724:function(e,n,t){"use strict";t.r(n);var a=t(61),r=t(1),o=t.n(r),i=t(319),l=t(671),c=t(618),s=t(626),u=t(627),d=t(318),g=t(654),m=t(21),p=t.n(m),f=t(32),b=t(15),v=t(30),E=null,h=function(e){var n=Object(r.useState)([]),t=Object(a.a)(n,2),m=t[0],h=t[1];Object(r.useMemo)((function(){E=[{Header:"Cotizaciones Registradas",columns:[{Header:"Referencia",accessor:"ref",Cell:function(e){var n=e.cell.row.original.id;return o.a.createElement(i.a,{size:"sm",variant:"link",block:!0,onClick:function(){return C(n)}},e.cell.row.original.ref," ")}},{Header:"Cliente",accessor:function(e){return[e.client.name_client]}},{Header:"Total Productos",accessor:"total_product",Cell:function(e){return Object(v.f)(e.configGeneral,e.cell.row.original.total_product)}},{Header:"Total gastos",accessor:"total_gastos",Cell:function(e){return Object(v.f)(e.configGeneral,e.cell.row.original.total_gastos)}},{Header:"Total Balance",accessor:"total_balance",Cell:function(e){return Object(v.f)(e.configGeneral,e.cell.row.original.total_balance)}},{Header:"Acciones",Cell:function(e){var n=e.cell.row.original.id;return o.a.createElement(l.a,{size:"sm",id:"drop"+n,title:"Seleccione",block:"true"},o.a.createElement(c.a.Item,{onClick:function(){return C(n)}},"Modificar | Ver detalle"),o.a.createElement(c.a.Item,{onClick:function(){return P(n)}},"Eliminar"))}}]}]}),[]),Object(r.useEffect)((function(){return x(),function(){E=null}}),[]);var x=function(){p.a.get(f.a+"cotizacion").then((function(e){h(e.data)})).catch((function(e){e.response?b.b.error(e.response.data.message):b.b.error("Error, contacte con soporte")}))},C=function(n){e.history.replace("/quotitation/create_quotitation/"+n)},P=function(e){p.a.delete(f.a+"cotizacion/"+e).then((function(e){b.b.success("Proceso completado"),x()})).catch((function(e){e.response?b.b.error(e.response.data.messsage):b.b.error("Error, contacte con soporte")}))};return o.a.createElement(s.a,{className:"containerDiv"},o.a.createElement(u.a,null,o.a.createElement(d.a,{sm:12,md:12,lg:12,xs:12},o.a.createElement(g.a,{columns:E,data:m}))))};h.defaultProps={configGeneral:JSON.parse(localStorage.getItem("configGeneral"))},n.default=h}}]);
//# sourceMappingURL=27.b4b7ad36.chunk.js.map