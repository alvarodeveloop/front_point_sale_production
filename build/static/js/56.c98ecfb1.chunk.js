(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[56],{611:function(e,a,t){"use strict";var n=t(47),r=t(119),l=t(1),o=t.n(l),s=t(120),c=t(622),i=t(623),u=t(301);function d(){var e=Object(r.a)(["\n  padding: 1rem;\n\n  .button-pagination{\n    margin-right: 10px;\n  }\n\n  .inputPage{\n    display: inline-block;\n    width: 150px;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .inputPageFilter{\n    display: inline-block;\n    width: 80%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .pagination {\n    padding: 0.5rem;\n    display: flex;\n    justify-content: center;\n  }\n\n  .table_responsive_eddit{\n    overflow-x: auto;\n  }\n"]);return d=function(){return e},e}var m=s.a.div(d());function g(e){var a=e.column,t=a.filterValue,n=a.preFilteredRows,r=a.setFilter,l=n.length;return o.a.createElement("input",{value:t||"",onChange:function(e){r(e.target.value||void 0)},placeholder:"Buscar en ".concat(l," registros..."),className:"inputPageFilter"})}function p(e,a,t){return Object(i.a)(e,t,{keys:[function(e){return e.values[a]}]})}function b(e){var a=e.columns,t=e.data,r=e.menuTop,l=e.headerColor,s=e.headerFontColor,i=e.pageSizeHandler,d=o.a.useMemo((function(){return{fuzzyText:p,text:function(e,a,t){return e.filter((function(e){var n=e.values[a];return void 0===n||String(n).toLowerCase().startsWith(String(t).toLowerCase())}))}}}),[]),m=o.a.useMemo((function(){return{Filter:g}}),[]),b=Object(c.useTable)({columns:a,data:t,defaultColumn:m,filterTypes:d,initialState:{pageIndex:0,pageSize:i[0]}},c.useFilters,c.useSortBy,c.usePagination),f=b.getTableProps,h=b.getTableBodyProps,E=b.headerGroups,v=b.page,y=b.prepareRow,x=b.canPreviousPage,C=b.canNextPage,O=b.pageOptions,k=b.pageCount,j=b.gotoPage,N=b.nextPage,P=b.previousPage,w=b.setPageSize,z=b.state,F=z.pageIndex,H=z.pageSize;return o.a.createElement("div",{className:"table_responsive_eddit"},r?o.a.createElement("div",{className:"pagination"},o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return j(0)},disabled:!x},"<<")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return P()},disabled:!x},"<")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return N()},disabled:!C},">")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return j(k-1)},disabled:!C},">>")," ",o.a.createElement("span",null,"P\xe1gina"," ",o.a.createElement("strong",null,F+1," de ",O.length)," "),o.a.createElement("span",{className:"ml-3"},"| ",o.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),o.a.createElement("input",Object(n.a)({type:"number",defaultValue:F+1,onChange:function(e){var a=e.target.value?Number(e.target.value)-1:0;j(a)},className:"inputPage"},"onChange",(function(e){e.target.value>O.length&&(e.target.value=1)}))))," ",o.a.createElement("select",{value:H,onChange:function(e){w(Number(e.target.value))},className:"inputPage"},i.map((function(e){return o.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))):"",o.a.createElement("table",Object.assign({},f(),{className:"table table-bordered"}),o.a.createElement("thead",null,E.map((function(e){return o.a.createElement("tr",Object.assign({},e.getHeaderGroupProps(),{className:"text-center"}),e.headers.map((function(e){return o.a.createElement("th",Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{style:{backgroundColor:l||"rgb(218, 236, 242)",color:s||"black"}}),e.render("Header"),o.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""),o.a.createElement("div",null,e.canFilter?e.render("Filter"):null))})))}))),o.a.createElement("tbody",Object.assign({},h(),{className:"text-center"}),v.map((function(e,a){return y(e)||o.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return o.a.createElement("td",Object.assign({style:{position:"relative"}},e.getCellProps()),e.render("Cell"))})))})))),o.a.createElement("div",{className:"pagination"},o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return j(0)},disabled:!x},"<<")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return P()},disabled:!x},"<")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return N()},disabled:!C},">")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return j(k-1)},disabled:!C},">>")," ",o.a.createElement("span",null,"P\xe1gina"," ",o.a.createElement("strong",null,F+1," de ",O.length)," "),o.a.createElement("span",{className:"ml-3"},"| ",o.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),o.a.createElement("input",Object(n.a)({type:"number",defaultValue:F+1,onChange:function(e){var a=e.target.value?Number(e.target.value)-1:0;j(a)},className:"inputPage"},"onChange",(function(e){e.target.value>O.length&&(e.target.value=1)}))))," ",o.a.createElement("select",{value:H,onChange:function(e){w(Number(e.target.value))},className:"inputPage"},i.map((function(e){return o.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))))}p.autoRemove=function(e){return!e};a.a=function(e){var a=e.data,t=e.columns,n=e.menuTop,r=e.headerColor,l=e.headerFontColor,s=e.pageSizeHandler;return s=s||[10,20,30,40,50],o.a.createElement(m,null,o.a.createElement(b,{pageSizeHandler:s,data:a,columns:t,menuTop:n,headerFontColor:l,headerColor:r}))}},612:function(e,a,t){},831:function(e,a,t){"use strict";t.r(a);var n=t(47),r=t(18),l=t(15),o=t(1),s=t.n(o),c=t(10),i=t(9),u=t.n(i),d=t(609),m=t(608),g=t(598),p=t(197),b=t(301),f=t(46),h=t(833),E=t(611),v=t(17),y=t(77),x=t(50),C=t(88),O=t(31),k=t(659),j=(t(612),[]),N={responsive:!0,maintainAspectRatio:!1,animation:{duration:0},hover:{animationDuration:0},responsiveAnimationDuration:0},P={labels:[],datasets:[{data:[],backgroundColor:[],hoverBackgroundColor:[]}]},w={labels:[],datasets:[{label:"Monto acumulado por estados de las facturas",backgroundColor:"rgb(15, 13, 74)",borderColor:"rgb(27, 13, 74)",borderWidth:1,hoverBackgroundColor:"rgb(15, 13, 74)",hoverBorderColor:"rgb(27, 13, 74)",data:[]}]};a.default=function(e){var a=Object(o.useState)({payments:[],isLoading:!0,filter:{dateIni:"",dateEnd:""},isOpenModal:!1,counts:[],amounts:[],redraw:!1}),t=Object(l.a)(a,2),i=t[0],z=t[1];Object(o.useEffect)((function(){return x.a.toggleCollapsed(),F(),function(){x.a.toggleCollapsed()}}),[]),Object(o.useEffect)((function(){i.counts.length&&T()}),[i.counts]),j=Object(o.useMemo)((function(){return[{Header:"Empresa",accessor:function(e){return[e.enterprise.bussines_name]}},{Header:"Plan",accessor:function(e){return[e.plan.name]}},{Header:"Monto",accessor:"amount",Cell:function(e){return s.a.createElement(d.a,{variant:"danger",className:"font-badge"},Object(v.a)(e.cell.row.original.amount,2,",","."))}},{Header:"Estado",accessor:function(e){return 1===e.status?["Pendiente"]:["Pagada"]}},{Header:"N\xba Factura",accessor:"identifier"},{Header:"Token Flow",accessor:"tokenFlow"},{Header:"Orden Flow",accessor:"flowOrdenFlow"}]}),[]);var F=function(){u.a.post(c.b+"payment_invoices",{}).then((function(e){z((function(a){return Object.assign({},a,{payments:e.data.invoices,counts:e.data.counts,amounts:e.data.amounts,isLoading:!1})}))})).catch((function(a){z(Object(r.a)(Object(r.a)({},i),{},{isLoading:!1})),e.tokenExpired(a)}))},H=function(e){e.persist(),z((function(a){return Object.assign({},a,{filter:Object.assign({},a.filter,Object(n.a)({},e.target.name,e.target.value))})}))},S=function(){z(Object(r.a)(Object(r.a)({},i),{},{isOpenModal:!i.isOpenModal}))},T=function(){P.labels=[],P.datasets[0].data=[],P.datasets[0].backgroundColor=[],P.datasets[0].hoverBackgroundColor=[],w.labels=[],w.datasets[0].data=[],i.counts.forEach((function(e,a){P.labels.push(e.label),P.datasets[0].data.push(parseFloat(e.total)),P.datasets[0].backgroundColor.push(c.c[a]),P.datasets[0].hoverBackgroundColor.push(c.c[a])})),i.amounts.forEach((function(e,a){w.labels.push(e.label),w.datasets[0].data.push(e.total)})),z((function(e){return Object.assign({},e,{redraw:!0})})),setTimeout((function(){z((function(e){return Object.assign({},e,{redraw:!1})}))}),1500)};return s.a.createElement(m.a,{fluid:!0},i.isLoading?s.a.createElement(y.a,null):s.a.createElement(s.a.Fragment,null,s.a.createElement(g.a,null,s.a.createElement(p.a,null,s.a.createElement("h4",{className:"title_principal"},"Facturas de Aidy")),s.a.createElement(p.a,null,s.a.createElement("h4",{className:"title_principal text-right"},"Total Factutas ",s.a.createElement(d.a,{variant:"danger",className:"font-badge"},i.payments.length)))),s.a.createElement(g.a,null,s.a.createElement(p.a,{sm:4,md:4,lg:4},s.a.createElement(b.a,{variant:"danger",size:"sm",type:"button",onClick:S},"Estad\xedsticas ",s.a.createElement(O.d,null)))),s.a.createElement("hr",null),s.a.createElement(g.a,null,s.a.createElement(p.a,null,s.a.createElement(f.a,{onSubmit:function(a){a.preventDefault();var t=Object.assign({},i.filter);z(Object(r.a)(Object(r.a)({},i),{},{isLoading:!0})),u.a.post(c.b+"payment_invoices",t).then((function(e){z(Object(r.a)(Object(r.a)({},i),{},{isLoading:!1,payments:e.data}))})).catch((function(a){z(Object(r.a)(Object(r.a)({},i),{},{isLoading:!1})),e.tokenExpired(a)}))}},s.a.createElement(g.a,null,s.a.createElement(C.a,{type:"date",name:"dateIni",required:!1,label:"Desde",cols:"col-md-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4",messageErrors:[],handleChange:H,value:i.filter.dateIni}),s.a.createElement(C.a,{type:"date",name:"dateEnd",required:!1,label:"Hasta",cols:"col-md-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4",messageErrors:[],handleChange:H,value:i.filter.dateEnd}),s.a.createElement(p.a,null,s.a.createElement("br",null),s.a.createElement(b.a,{variant:"secondary",size:"sm",block:!0,type:"submit"},"Buscar ",s.a.createElement(O.J,null))))))),s.a.createElement(g.a,null,s.a.createElement(p.a,null,s.a.createElement(E.a,{data:i.payments,columns:j})))),s.a.createElement(h.a,{show:i.isOpenModal,onHide:S,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},s.a.createElement(h.a.Header,{closeButton:!0,className:"header_dark"},s.a.createElement(h.a.Title,{id:"contained-modal-title-vcenter"},"Estad\xedsticas de las Facturas")),s.a.createElement(h.a.Body,null,s.a.createElement(g.a,null,s.a.createElement(p.a,{style:{height:"200px",borderRight:"1px solid lightgray"}},s.a.createElement("h5",null,"Total de facturas categorizado por estados"),s.a.createElement(k.b,{data:P,redraw:i.redraw,options:N})),s.a.createElement(p.a,null,s.a.createElement(k.a,{data:w,options:N,redraw:i.redraw})))),s.a.createElement(h.a.Footer,null,s.a.createElement(b.a,{variant:"danger",type:"button",onClick:S},"Cerrar"))))}}}]);
//# sourceMappingURL=56.c98ecfb1.chunk.js.map