(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[39],{611:function(e,t,a){"use strict";var n=a(32),l=a(119),r=a(1),c=a.n(r),o=a(120),s=a(622),i=a(623),m=a(301);function u(){var e=Object(l.a)(["\n  padding: 1rem;\n\n  .button-pagination{\n    margin-right: 10px;\n  }\n\n  .inputPage{\n    display: inline-block;\n    width: 150px;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .inputPageFilter{\n    display: inline-block;\n    width: 80%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .pagination {\n    padding: 0.5rem;\n    display: flex;\n    justify-content: center;\n  }\n\n  .table_responsive_eddit{\n    overflow-x: auto;\n  }\n"]);return u=function(){return e},e}var d=o.a.div(u());function E(e){var t=e.column,a=t.filterValue,n=t.preFilteredRows,l=t.setFilter,r=n.length;return c.a.createElement("input",{value:a||"",onChange:function(e){l(e.target.value||void 0)},placeholder:"Buscar en ".concat(r," registros..."),className:"inputPageFilter"})}function b(e,t,a){return Object(i.a)(e,a,{keys:[function(e){return e.values[t]}]})}function g(e){var t=e.columns,a=e.data,l=e.menuTop,r=e.headerColor,o=e.headerFontColor,i=c.a.useMemo((function(){return{fuzzyText:b,text:function(e,t,a){return e.filter((function(e){var n=e.values[t];return void 0===n||String(n).toLowerCase().startsWith(String(a).toLowerCase())}))}}}),[]),u=c.a.useMemo((function(){return{Filter:E}}),[]),d=Object(s.useTable)({columns:t,data:a,defaultColumn:u,filterTypes:i,initialState:{pageIndex:0}},s.useFilters,s.useSortBy,s.usePagination),g=d.getTableProps,p=d.getTableBodyProps,f=d.headerGroups,h=d.page,y=d.prepareRow,N=d.canPreviousPage,v=d.canNextPage,_=d.pageOptions,C=d.pageCount,k=d.gotoPage,x=d.nextPage,j=d.previousPage,z=d.setPageSize,O=d.state,w=O.pageIndex,F=O.pageSize;return c.a.createElement("div",{className:"table_responsive_eddit"},l?c.a.createElement("div",{className:"pagination"},c.a.createElement(m.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return k(0)},disabled:!N},"<<")," ",c.a.createElement(m.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return j()},disabled:!N},"<")," ",c.a.createElement(m.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return x()},disabled:!v},">")," ",c.a.createElement(m.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return k(C-1)},disabled:!v},">>")," ",c.a.createElement("span",null,"P\xe1gina"," ",c.a.createElement("strong",null,w+1," de ",_.length)," "),c.a.createElement("span",{className:"ml-3"},"| ",c.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),c.a.createElement("input",Object(n.a)({type:"number",defaultValue:w+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;k(t)},className:"inputPage"},"onChange",(function(e){e.target.value>_.length&&(e.target.value=1)}))))," ",c.a.createElement("select",{value:F,onChange:function(e){z(Number(e.target.value))},className:"inputPage"},[10,20,30,40,50].map((function(e){return c.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))):"",c.a.createElement("table",Object.assign({},g(),{className:"table table-bordered"}),c.a.createElement("thead",null,f.map((function(e){return c.a.createElement("tr",Object.assign({},e.getHeaderGroupProps(),{className:"text-center"}),e.headers.map((function(e){return c.a.createElement("th",Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{style:{backgroundColor:r||"rgb(218, 236, 242)",color:o||"black"}}),e.render("Header"),c.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""),c.a.createElement("div",null,e.canFilter?e.render("Filter"):null))})))}))),c.a.createElement("tbody",Object.assign({},p(),{className:"text-center"}),h.map((function(e,t){return y(e)||c.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return c.a.createElement("td",Object.assign({style:{position:"relative"}},e.getCellProps()),e.render("Cell"))})))})))),c.a.createElement("div",{className:"pagination"},c.a.createElement(m.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return k(0)},disabled:!N},"<<")," ",c.a.createElement(m.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return j()},disabled:!N},"<")," ",c.a.createElement(m.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return x()},disabled:!v},">")," ",c.a.createElement(m.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return k(C-1)},disabled:!v},">>")," ",c.a.createElement("span",null,"P\xe1gina"," ",c.a.createElement("strong",null,w+1," de ",_.length)," "),c.a.createElement("span",{className:"ml-3"},"| ",c.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),c.a.createElement("input",Object(n.a)({type:"number",defaultValue:w+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;k(t)},className:"inputPage"},"onChange",(function(e){e.target.value>_.length&&(e.target.value=1)}))))," ",c.a.createElement("select",{value:F,onChange:function(e){z(Number(e.target.value))},className:"inputPage"},[10,20,30,40,50].map((function(e){return c.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))))}b.autoRemove=function(e){return!e};t.a=function(e){var t=e.data,a=e.columns,n=e.menuTop,l=e.headerColor,r=e.headerFontColor;return c.a.createElement(d,null,c.a.createElement(g,{data:t,columns:a,menuTop:n,headerFontColor:r,headerColor:l}))}},612:function(e,t,a){},665:function(e,t,a){"use strict";var n=a(1),l=a.n(n),r=(a(612),a(831)),c=a(598),o=a(197),s=a(301),i=a(31),m=a(77);t.a=function(e){return l.a.createElement(r.a,{show:e.isShow,onHide:e.onHide,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},l.a.createElement(r.a.Header,{closeButton:!0,className:"header_dark"},l.a.createElement(r.a.Title,{id:"contained-modal-title-vcenter"},"Acciones Disponibles")),e.isLoading?l.a.createElement(r.a.Body,null,l.a.createElement(m.a,null)):l.a.createElement(r.a.Body,null,e.cotization.status>=1&&e.cotization.status<=3?l.a.createElement(l.a.Fragment,null,l.a.createElement("h5",{className:"title_principal"},"Acciones generales"),l.a.createElement("hr",null),e.isInvoice?l.a.createElement(c.a,{className:"justify-content-center"},l.a.createElement(o.a,{sm:3,md:3,lg:3},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.seeDetailCotization(e.cotization)},block:!0},"Ver Detalle ",l.a.createElement(i.j,null))),l.a.createElement(o.a,{sm:3,md:3,lg:3},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.goToBond(e.cotization)},block:!0},"Pagos ",l.a.createElement(i.p,null))),l.a.createElement(o.a,{sm:3,md:3,lg:3},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.printInvoice(e.cotization)},block:!0},"Ver factura pdf ",l.a.createElement(i.p,null))),l.a.createElement(o.a,{sm:3,md:3,lg:3},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.noteCredit(e.cotization)},block:!0},"Nota de cr\xe9dito o Debito ",l.a.createElement(i.p,null)))):e.isGuide?l.a.createElement(c.a,{className:"justify-content-center"},l.a.createElement(o.a,{sm:4,md:4,lg:4},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.seeDetailCotization(e.cotization)},block:!0},"Ver Detalle ",l.a.createElement(i.j,null))),l.a.createElement(o.a,{sm:4,md:4,lg:4},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.goToInvoice(e.cotization.id)},block:!0},"Facturar ",l.a.createElement(i.o,null))),l.a.createElement(o.a,{sm:4,md:4,lg:4},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.printInvoice(e.cotization)},block:!0},"Ver factura pdf ",l.a.createElement(i.p,null)))):l.a.createElement(c.a,{className:"justify-content-center"},l.a.createElement(o.a,{sm:3,md:3,lg:3},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.seeDetailCotization(e.cotization)},block:!0},"Ver Detalle ",l.a.createElement(i.j,null))),l.a.createElement(o.a,{sm:3,md:3,lg:3},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.goToBond(e.cotization)},block:!0},"Pagos ",l.a.createElement(i.p,null))),l.a.createElement(o.a,{sm:3,md:3,lg:3},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.printInvoice(e.cotization)},block:!0},"Ver factura pdf ",l.a.createElement(i.p,null))),2==e.cotization.type?l.a.createElement(o.a,{sm:3,md:3,lg:3},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.printInvoice(e.cotization,3)},block:!0},"Generar nueva factura pdf ",l.a.createElement(i.p,null))):""),l.a.createElement("br",null),2!=e.cotization.status?l.a.createElement(c.a,{className:"justify-content-center"},l.a.createElement(o.a,{sm:12,md:12,lg:12},l.a.createElement("h5",{className:"title_principal"},"Anular Documento"),l.a.createElement("hr",null)),l.a.createElement(o.a,{sm:3,md:3,lg:3},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.anulateInvoice(e.cotization)},block:!0},"Anular Documento ",l.a.createElement(i.a,null)))):""):l.a.createElement(l.a.Fragment,null,l.a.createElement("h5",{className:"title_principal"},"Acciones generales"),l.a.createElement("hr",null),l.a.createElement(c.a,{className:"justify-content-center"},l.a.createElement(o.a,{sm:3,md:3,lg:3},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.seeDetailCotization(e.cotization)},block:!0},"Ver Detalle ",l.a.createElement(i.j,null))),l.a.createElement(o.a,{sm:3,md:3,lg:3},l.a.createElement(s.a,{size:"sm",variant:"secondary",type:"button",onClick:function(t){return e.printInvoice(e.cotization)},block:!0},"Ver factura pdf ",l.a.createElement(i.p,null)))))),l.a.createElement(r.a.Footer,null,l.a.createElement(s.a,{variant:"danger",size:"md",onClick:e.onHide},"Cerrar")))}},666:function(e,t,a){"use strict";var n=a(32),l=a(18),r=a(1),c=a.n(r),o=a(598),s=a(197),i=a(660),m=a(661),u=a(301),d=a(607),E=a(88),b=(a(9),a(17)),g=a(31),p=(a(157),a(659)),f=a(10),h={responsive:!0,maintainAspectRatio:!1,animation:{duration:0},hover:{animationDuration:0},responsiveAnimationDuration:0},y={scales:{yAxes:[{ticks:{beginAtZero:!0}}]},maintainAspectRatio:!1},N={labels:[],datasets:[{data:[],backgroundColor:[],hoverBackgroundColor:[]}]},v={labels:[],datasets:[{data:[],backgroundColor:[],hoverBackgroundColor:[]}]},_={labels:[],datasets:[{data:[],backgroundColor:[],hoverBackgroundColor:[]}]},C={labels:[],datasets:[{label:"Monto acumulado de pagos hechos por mes",backgroundColor:"rgb(15, 13, 74)",borderColor:"rgb(27, 13, 74)",borderWidth:1,hoverBackgroundColor:"rgb(15, 13, 74)",hoverBorderColor:"rgb(27, 13, 74)",data:[]}]},k={labels:[],datasets:[{label:"Cantidad facturada por a\xf1os",data:[],fill:!1,backgroundColor:"rgb(125, 81, 52)",borderColor:"rgb(99, 56, 21)"}]};t.a=function(e){Object(r.useEffect)((function(){e.redraw&&(N={labels:[],datasets:[{data:[],backgroundColor:[],hoverBackgroundColor:[]}]},_={labels:[],datasets:[{data:[],backgroundColor:[],hoverBackgroundColor:[]}]},C={labels:[],datasets:[{label:"Monto acumulado de pagos hechos por mes",backgroundColor:"rgb(15, 13, 74)",borderColor:"rgb(27, 13, 74)",borderWidth:1,hoverBackgroundColor:"rgb(15, 13, 74)",hoverBorderColor:"rgb(27, 13, 74)",data:[]}]},k={labels:[],datasets:[{label:"Cantidad facturada por a\xf1os",data:[],fill:!1,backgroundColor:"rgb(125, 81, 52)",borderColor:"rgb(99, 56, 21)"}]},v={labels:[],datasets:[{data:[],backgroundColor:[],hoverBackgroundColor:[]}]},x())}),[e.redraw]);var t=function(t){e.setDataForm(Object(l.a)(Object(l.a)({},e.dataForm),{},Object(n.a)({},t.target.name,t.target.value)))},x=function(){e.statusCotization.statuses.forEach((function(e,t){N.labels.push(e.status),N.datasets[0].data.push(parseFloat(e.total)),N.datasets[0].backgroundColor.push(f.c[t]),N.datasets[0].hoverBackgroundColor.push(f.c[t])})),e.statusCotization.statusesBonds.forEach((function(e,t){_.labels.push(e.status),_.datasets[0].data.push(parseFloat(e.total)),_.datasets[0].backgroundColor.push(f.c[t]),_.datasets[0].hoverBackgroundColor.push(f.c[t])})),e.statusCotization.bondsByMonth.forEach((function(e,t){C.labels.push(e.mes),C.datasets[0].data.push(e.total)})),e.statusCotization.invoiceByYear.forEach((function(e,t){k.labels.push(e.year),k.datasets[0].data.push(e.total)})),e.statusCotization.totalByStatus.forEach((function(e,t){v.labels.push(e.name),v.datasets[0].data.push(parseFloat(e.total)),v.datasets[0].backgroundColor.push(f.c[t]),v.datasets[0].hoverBackgroundColor.push(f.c[t])}))},j=function(t){e.handleDisplayFilter(t)};return c.a.createElement(o.a,null,c.a.createElement(s.a,{sm:12,md:12,lg:12,xs:12},c.a.createElement(i.a,null,c.a.createElement(m.a,null,c.a.createElement(i.a.Toggle,{as:m.a.Header,eventKey:"0",className:"header_card"},c.a.createElement("b",null,"Estad\xedsticas")," ",c.a.createElement(g.d,null)),c.a.createElement(i.a.Collapse,{eventKey:"0"},c.a.createElement(m.a.Body,null,c.a.createElement(o.a,{className:"justify-content-center"},1==e.displayFilter?c.a.createElement(s.a,{sm:2,md:2,lg:2},c.a.createElement(u.a,{variant:"secondary",type:"button",size:"sm",block:!0,onClick:function(){return j(2)}},"Activar Filtros")):2==e.displayFilter?c.a.createElement(c.a.Fragment,null,c.a.createElement(E.a,{type:"date",label:"Fecha desde",name:"date_desde",required:!0,messageErrors:["Requerido*"],cols:"col-md-3 col-lg-3 col-sm-3",value:e.dataForm.date_desde,handleChange:t}),c.a.createElement(E.a,{type:"date",label:"Fecha Hasta",name:"date_hasta",required:!0,messageErrors:["Requerido*"],cols:"col-md-3 col-lg-3 col-sm-3",value:e.dataForm.date_hasta,handleChange:t}),c.a.createElement(s.a,{sm:3,md:3,lg:3},c.a.createElement("br",null),c.a.createElement(u.a,{variant:"danger",type:"button",size:"sm",block:!0,onClick:function(){e.handleStadistics()}},"Buscar")),c.a.createElement(s.a,{sm:3,md:3,lg:3},c.a.createElement("br",null),c.a.createElement(u.a,{variant:"secondary",type:"button",size:"sm",block:!0,onClick:function(){return j(1)}},"Ocultar Filtros"))):c.a.createElement(s.a,{sm:12,md:12,lg:12,className:"text-center"},c.a.createElement("br",null),c.a.createElement(d.a,{src:a(309),width:"30"}),c.a.createElement("br",null),"Cargando datos...")),c.a.createElement("br",null),c.a.createElement(o.a,null,c.a.createElement(s.a,{sm:6,md:6,lg:6,style:{height:"150px"}},c.a.createElement(p.b,{data:N,redraw:e.redraw,options:h})),c.a.createElement(s.a,{sm:6,md:6,lg:6},c.a.createElement("table",{className:"table table-bordered"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center",colSpan:"2",style:{backgroundColor:"rgb(147, 52, 12)",color:"white"}},"Monto acumulado por estados")),c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center",style:{backgroundColor:"rgb(133, 124, 124)",color:"white"}},"Estado"),c.a.createElement("th",{className:"text-center",style:{backgroundColor:"rgb(133, 124, 124)",color:"white"}},"Total"))),c.a.createElement("tbody",{className:"text-center"},Object.keys(e.statusCotization).length>0?c.a.createElement(c.a.Fragment,null,e.statusCotization.statuses.map((function(t,a){return c.a.createElement("tr",{key:a},c.a.createElement("td",null,t.status),c.a.createElement("td",null,e.configGeneral.simbolo_moneda,Object(b.g)(e.configGeneral,t.total)))}))):c.a.createElement("tr",null,c.a.createElement("td",{colSpan:"3",className:"text-center"},"Sin registros...")))))),c.a.createElement(o.a,null,c.a.createElement(s.a,{sm:6,md:6,lg:6},c.a.createElement("table",{className:"table table-bordered"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center",colSpan:"2",style:{backgroundColor:"rgb(21, 26, 88)",color:"white"}},"Monto pagado por estados")),c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center",style:{backgroundColor:"rgb(133, 124, 124)",color:"white"}},"Estado"),c.a.createElement("th",{className:"text-center",style:{backgroundColor:"rgb(133, 124, 124)",color:"white"}},"Total"))),c.a.createElement("tbody",{className:"text-center"},Object.keys(e.statusCotization).length>0?c.a.createElement(c.a.Fragment,null,e.statusCotization.statusesBonds.map((function(t,a){return c.a.createElement("tr",{key:a},c.a.createElement("td",null,t.status),c.a.createElement("td",null,e.configGeneral.simbolo_moneda,Object(b.g)(e.configGeneral,t.total)))}))):c.a.createElement("tr",null,c.a.createElement("td",{colSpan:"3",className:"text-center"},"Sin registros..."))))),c.a.createElement(s.a,{sm:6,md:6,lg:6,style:{height:"150px"}},c.a.createElement(p.b,{data:_,redraw:e.redraw,options:h}))),c.a.createElement(o.a,null,c.a.createElement(s.a,{sm:12,md:12,lg:12,style:{height:"200px"}},c.a.createElement(p.a,{data:C,options:h,redraw:e.redraw}))),c.a.createElement("br",null),c.a.createElement(o.a,null,c.a.createElement(s.a,{sm:6,md:6,lg:6,style:{height:"200px"}},c.a.createElement("table",{className:"table table-bordered"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center",colSpan:"2",style:{backgroundColor:"rgb(147, 52, 12)",color:"white"}},"Total ",1==e.dataForm.type?"facturas":2==e.dataForm.type?"notas de ventas":"boletas"," realizadas")),c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center",style:{backgroundColor:"rgb(133, 124, 124)",color:"white"}},"Estado"),c.a.createElement("th",{className:"text-center",style:{backgroundColor:"rgb(133, 124, 124)",color:"white"}},"Total"))),c.a.createElement("tbody",{className:"text-center"},Object.keys(e.statusCotization).length>0?c.a.createElement(c.a.Fragment,null,e.statusCotization.totalByStatus.map((function(e,t){return c.a.createElement("tr",{key:t},c.a.createElement("td",null,e.name),c.a.createElement("td",null,e.total))}))):c.a.createElement("tr",null,c.a.createElement("td",{colSpan:"3",className:"text-center"},"Sin registros..."))))),c.a.createElement(s.a,{sm:6,md:6,lg:6,style:{height:"150px"},className:"text-center"},c.a.createElement(p.b,{data:v,redraw:e.redraw,options:h}))),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement(o.a,null,c.a.createElement(s.a,{sm:12,md:12,lg:12,style:{height:"200px"}},c.a.createElement(p.d,{data:k,options:y})))))))))}},811:function(e,t,a){"use strict";a.r(t);var n=a(18),l=a(15),r=a(1),c=a.n(r),o=a(301),s=a(609),i=a(608),m=a(598),u=a(197),d=a(831),E=a(611),b=a(9),g=a.n(b),p=a(10),f=a(8),h=a(17),y=a(31),N=a(614),v=a(613),_=a(50),C=a(157),k=(a(612),a(28)),x=a(665),j=a(615),z=a(666),O=a(77),w=null;t.default=Object(k.b)((function(e){return{id_branch_office:e.enterpriseSucursal.id_branch_office,id_enterprise:e.enterpriseSucursal.id_enterprise,configGeneral:e.configs.config,configStore:e.configs.configStore}}),{})((function(e){var t=Object(r.useState)(!0),a=Object(l.a)(t,2),b=a[0],k=a[1],F=Object(r.useState)([]),B=Object(l.a)(F,2),S=B[0],G=B[1],D=Object(r.useState)({}),T=Object(l.a)(D,2),P=T[0],H=T[1],R=Object(r.useState)(!1),M=Object(l.a)(R,2),A=M[0],I=M[1],V=Object(r.useState)(!1),Y=Object(l.a)(V,2),q=Y[0],L=Y[1],K=Object(r.useState)({}),W=Object(l.a)(K,2),J=W[0],U=W[1],Z=Object(r.useState)(1),Q=Object(l.a)(Z,2),X=Q[0],$=Q[1],ee=Object(r.useState)({date_desde:"",date_hasta:"",type:2}),te=Object(l.a)(ee,2),ae=te[0],ne=te[1],le=Object(r.useState)({}),re=Object(l.a)(le,2),ce=re[0],oe=re[1],se=Object(r.useState)(!1),ie=Object(l.a)(se,2),me=ie[0],ue=ie[1];Object(r.useMemo)((function(){w=[{Header:"Referencia",accessor:"ref",Cell:function(e){var t=e.cell.row.original;return c.a.createElement(N.a,{placement:"bottom",overlay:c.a.createElement(v.a,{id:"tooltip-disabled2"},"Hacer click para acceder a las acciones de la Nota")},c.a.createElement(o.a,{variant:"link",block:!0,type:"button",size:"sm",onClick:function(){return de(t)}},t.ref))}},{Header:"Referencia-Cotizaci\xf3n",accessor:"ref_cotizacion"},{Header:"Referencia-Venta",accessor:"ref_sale"},{Header:"Rut Cliente",accessor:"rut_client"},{Header:"Raz\xf3n Social",accessor:"business_name_client",Cell:function(e){var t=e.cell.row.original;return c.a.createElement(N.a,{placement:"right",overlay:c.a.createElement(v.a,{id:"tooltip-disabled2"},c.a.createElement("ul",{className:"list-group"},c.a.createElement("li",{className:"list-group-item"},c.a.createElement("b",null,"Vendedor: ")," ",t.name_seller),c.a.createElement("li",{className:"list-group-item"},c.a.createElement("b",null,"Fono del Vendedor: ")," ",t.phone_seller?t.phone_seller:"No posee"),c.a.createElement("li",{className:"list-group-item"},c.a.createElement("b",null,"Contacto")," ",t.name_contact?t.name_contact:"No posee"),c.a.createElement("li",{className:"list-group-item"},c.a.createElement("b",null,"Fono del Contacto: ")," ",t.phone_contact),c.a.createElement("li",{className:"list-group-item"},c.a.createElement("b",null,"Comentario: ")," ",t.comment)))},c.a.createElement(o.a,{variant:"link",size:"sm",block:!0,type:"button"},t.business_name_client))}},{Header:"Tipo",accessor:function(e){return 1==e.type_invoicing?["Afecta"]:["Excento"]}},{Header:"Fecha-Emisi\xf3n",accessor:function(e){return[C(e.date_issue_invoice).tz("America/Santiago").format("DD-MM-YYYY")]}},{Header:"D\xedas de Vencimiento",accessor:"days_expiration"},{Header:"Status",accessor:function(e){return 1==e.status?c.a.createElement(s.a,{variant:"secondary",className:"font-badge"},"Pendiente"):2==e.status?c.a.createElement(s.a,{variant:"secondary",className:"font-badge"},"Pagada"):3==e.status?c.a.createElement(s.a,{variant:"secondary",className:"font-badge"},"Vencida"):c.a.createElement(s.a,{variant:"secondary",className:"font-badge"},"Anulada")}},{Header:"Total Productos",accessor:"total_product",Cell:function(t){return c.a.createElement(N.a,{placement:"left",overlay:c.a.createElement(v.a,{id:"tooltip-total_pagar"+t.cell.row.original.id},c.a.createElement("ul",{className:"list-group"},t.cell.row.original.products.map((function(t,a){return c.a.createElement("li",{className:"list-group-item",key:a},c.a.createElement("b",null,"Producto"),": ",t.name_product,c.a.createElement("br",null),c.a.createElement("b",null,"Precio")," : ",e.configGeneral?e.configGeneral.simbolo_moneda:"",Object(h.g)(e.configGeneral,t.price),c.a.createElement("br",null),c.a.createElement("b",null,"Cantidad"),": ",t.quantity)}))))},c.a.createElement(s.a,{variant:"info",className:"font-badge",style:{backgroundColor:"rgb(198, 196, 54)",color:"white"}},e.configGeneral?e.configGeneral.simbolo_moneda:"",Object(h.g)(e.configGeneral,t.cell.row.original.total_product)))}},{Header:"Total gastos",accessor:"total_gastos",Cell:function(t){return c.a.createElement(s.a,{variant:"info",className:"font-badge",style:{backgroundColor:"rgb(198, 196, 54)",color:"white"}},e.configGeneral?e.configGeneral.simbolo_moneda:"",Object(h.g)(e.configGeneral,t.cell.row.original.total_gastos))}},{Header:"Total Iva",accessor:"total_iva",Cell:function(t){return c.a.createElement(s.a,{variant:"info",className:"font-badge",style:{backgroundColor:"rgb(198, 196, 54)",color:"white"}},e.configGeneral?e.configGeneral.simbolo_moneda:"",Object(h.g)(e.configGeneral,t.cell.row.original.total_iva))}},{Header:"Descuento o Recargo Global",accessor:"discount_global_total",Cell:function(t){var a=t.cell.row.original;return c.a.createElement(N.a,{placement:"left",overlay:c.a.createElement(v.a,{id:"tooltip-total_pagar"+a.id},a.ref_sale?c.a.createElement(c.a.Fragment,null,"Monto: ",a.type_discount_global?a.discount_global+"%":Object(h.g)(e.configGeneral,a.discount_global_amount),c.a.createElement("br",null),a.discount_global_amount>0?c.a.createElement(c.a.Fragment,null,c.a.createElement("b",null,"Tipo:")," ",a.type_discount_global?"Porcentaje":"Fijo"," - ",a.discount_or_recharge_discount_global?"Descuento":"Recarga"):""):c.a.createElement(c.a.Fragment,null,a.discount_global,"%"))},c.a.createElement(s.a,{variant:"info",className:"font-badge",style:{backgroundColor:"rgb(198, 196, 54)",color:"white"}},e.configGeneral?e.configGeneral.simbolo_moneda:"",Object(h.g)(e.configGeneral,a.discount_global_amount)))}},{Header:"Total Balance",accessor:"total_balance",Cell:function(t){return c.a.createElement(s.a,{variant:"info",className:"font-badge",style:{backgroundColor:"rgb(198, 196, 54)",color:"white"}},e.configGeneral?e.configGeneral.simbolo_moneda:"",Object(h.g)(e.configGeneral,t.cell.row.original.total_balance))}},{Header:"Abonado",accessor:"total_bond",Cell:function(t){return c.a.createElement(s.a,{variant:"danger",className:"font-badge"},e.configGeneral?e.configGeneral.simbolo_moneda:"",Object(h.g)(e.configGeneral,t.cell.row.original.total_bond))}},{Header:"Saldo Deudor",accessor:"debit_balance",Cell:function(t){return c.a.createElement(s.a,{variant:"danger",className:"font-badge"},e.configGeneral?e.configGeneral.simbolo_moneda:"",Object(h.g)(e.configGeneral,t.cell.row.original.debit_balance))}},{Header:"Acciones",Cell:function(e){var t=Object.assign({},e.cell.row.original);return c.a.createElement(o.a,{variant:"primary",block:!0,type:"button",size:"sm",onClick:function(){return de(t)}},"Acciones")}}]}),[]),Object(r.useEffect)((function(){return _.a.toggleCollapsed(),function(){w=null,_.a.toggleCollapsed()}}),[]),Object(r.useEffect)((function(){be()}),[e.id_branch_office]),Object(r.useEffect)((function(){q&&Ee()}),[q]);var de=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];!me&&e&&oe(e),ue(!me)},Ee=function(){setTimeout((function(){L(!1)}),2e3)},be=function(){var t=Object.assign({},ae),a=[g.a.get(p.b+"invoice/0/2"),g.a.post(p.b+"invoice_stadistics",t)];Promise.all(a).then((function(e){G(e[0].data),U(Object(n.a)(Object(n.a)({},J),{},{statusesBonds:e[1].data.statusesBonds,statuses:e[1].data.statuses,bondsByMonth:e[1].data.bondsByMonth,invoiceByYear:e[1].data.invoiceByYear,totalByStatus:e[1].data.totalByStatus})),setTimeout((function(){L(!0)}),1e3),k(!1)})).catch((function(t){k(!1),e.tokenExpired(t)}))},ge=function(){I(!A)},pe=function(t){f.b.info("Anulando nota, esto podr\xeda tardar algunos segundos... espere por favor"),k(!0),g.a.put(p.b+"invoice_status/"+t).then((function(e){f.b.success("Nota de venta anulada con \xe9xito"),oe(Object(n.a)(Object(n.a)({},ce),{},{status:4})),be()})).catch((function(t){k(!1),e.tokenExpired(t)}))};return c.a.createElement(i.a,{fluid:!0},c.a.createElement(m.a,null,c.a.createElement(u.a,{sm:6,md:6,lg:6,className:"text-center"},c.a.createElement("h4",{className:"title_principal"},"Tabla de Notas de Ventas"),c.a.createElement(o.a,{block:!0,variant:"success",onClick:function(){e.history.replace("/sale_note/sale_note_create")},size:"sm"},"Nueva Nota ",c.a.createElement(y.y,null))),c.a.createElement(u.a,{sm:6,md:6,lg:6,className:"text-center title_principal"},c.a.createElement("h4",null,"Total Notas Realizadas"),c.a.createElement(s.a,{variant:"danger"},S.length))),c.a.createElement("hr",null),b?c.a.createElement(O.a,null):c.a.createElement(c.a.Fragment,null,c.a.createElement(z.a,{setDataForm:ne,dataForm:ae,redraw:q,statusCotization:J,handleDisplayFilter:function(e){3==e&&ne({date_desde:"",date_hasta:""}),$(e)},handleStadistics:function(){var t=Object.assign({},ae);$(3),g.a.post(p.b+"invoice_stadistics",t).then((function(e){U(Object(n.a)(Object(n.a)({},J),{},{statusesBonds:e.data.statusesBonds,statuses:e.data.statuses,bondsByMonth:e.data.bondsByMonth,invoiceByYear:e.data.invoiceByYear,totalByStatus:e.data.totalByStatus})),setTimeout((function(){L(!0),$(1)}),1e3)})).catch((function(t){$(1),e.tokenExpired(t)}))},displayFilter:X,configGeneral:e.configGeneral}),c.a.createElement(m.a,null,c.a.createElement(u.a,{sm:12,md:12,lg:12,xs:12},c.a.createElement(E.a,{columns:w,data:S})))),c.a.createElement(d.a,{show:A,onHide:ge,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},c.a.createElement(d.a.Header,{closeButton:!0,className:"header_dark"},c.a.createElement(d.a.Title,{id:"contained-modal-title-vcenter"},"Detalles de la Nota N\xb0 ",Object.keys(P).length>0?P.ref:"")),c.a.createElement(d.a.Body,null,c.a.createElement(m.a,null,c.a.createElement(u.a,{sm:12,md:12,lg:12},c.a.createElement("h4",{className:"title_principal text-center"},"Datos del Registrador"),c.a.createElement("br",null),c.a.createElement("table",{className:"table table-striped table-bordered"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center"},"Nombre"),c.a.createElement("th",{className:"text-center"},"Rut"),c.a.createElement("th",{className:"text-center"},"Direcci\xf3n"),c.a.createElement("th",{className:"text-center"},"Email"),c.a.createElement("th",{className:"text-center"},"Fono"),c.a.createElement("th",{className:"text-center"},"Pa\xeds"))),c.a.createElement("tbody",{className:"text-center"},Object.keys(P).length>0?c.a.createElement("tr",null,c.a.createElement("td",null,P.business_name_transmitter),c.a.createElement("td",null,P.rut_transmitter),c.a.createElement("td",null,P.address_transmitter),c.a.createElement("td",null,P.email_transmitter),c.a.createElement("td",null,P.phone_transmitter),c.a.createElement("td",null,P.country_transmitter)):"")))),c.a.createElement("br",null),c.a.createElement(m.a,null,c.a.createElement(u.a,{sm:12,md:12,lg:12},c.a.createElement("h4",{className:"title_principal text-center"},"Datos del Cliente"),c.a.createElement("br",null),c.a.createElement("table",{className:"table table-striped table-bordered"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center"},"Razon Social / Nombre"),c.a.createElement("th",{className:"text-center"},"Rut"),c.a.createElement("th",{className:"text-center"},"Direcci\xf3n"),c.a.createElement("th",{className:"text-center"},"Ciudad"),c.a.createElement("th",{className:"text-center"},"Comuna"),c.a.createElement("th",{className:"text-center"},"Giro"))),c.a.createElement("tbody",{className:"text-center"},Object.keys(P).length>0?c.a.createElement("tr",null,c.a.createElement("td",null,P.business_name_client),c.a.createElement("td",null,P.rut_client),c.a.createElement("td",null,P.address_client),c.a.createElement("td",null,P.city_client),c.a.createElement("td",null,P.comuna_client),c.a.createElement("td",null,P.spin_client)):"")))),c.a.createElement("br",null),c.a.createElement(m.a,null,c.a.createElement(u.a,{sm:12,md:12,lg:12},c.a.createElement("h4",{className:"title_principal text-center"},"Datos del Contacto"),c.a.createElement("br",null),c.a.createElement("table",{className:"table table-striped table-bordered"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center"},"Nombre"),c.a.createElement("th",{className:"text-center"},"Fono"),c.a.createElement("th",{className:"text-center"},"Email"))),c.a.createElement("tbody",{className:"text-center"},Object.keys(P).length>0?c.a.createElement("tr",null,c.a.createElement("td",null,P.name_contact),c.a.createElement("td",null,P.phone_contact),c.a.createElement("td",null,P.email_contact)):"")))),c.a.createElement("br",null),c.a.createElement(m.a,null,c.a.createElement(u.a,{sm:12,md:12,lg:12},c.a.createElement("h4",{className:"title_principal text-center"},"Datos del Vendedor"),c.a.createElement("br",null),c.a.createElement("table",{className:"table table-striped table-bordered"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center"},"Nombre"),c.a.createElement("th",{className:"text-center"},"Fono"),c.a.createElement("th",{className:"text-center"},"Email"))),c.a.createElement("tbody",{className:"text-center"},Object.keys(P).length>0?c.a.createElement("tr",null,c.a.createElement("td",null,P.name_seller),c.a.createElement("td",null,P.phone_seller),c.a.createElement("td",null,P.email_seller)):"")))),c.a.createElement("br",null),c.a.createElement(m.a,null,c.a.createElement(u.a,{sm:12,md:12,lg:12,className:"table-responsive"},c.a.createElement("h4",{className:"title_principal text-center"},"Productos de la Factura"),c.a.createElement("br",null),c.a.createElement("table",{className:"table table-striped table-bordered"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center"},"Categoria"),c.a.createElement("th",{className:"text-center"},"Nombre"),c.a.createElement("th",{className:"text-center"},"Descripci\xf3n"),c.a.createElement("th",{className:"text-center"},"Cantidad"),c.a.createElement("th",{className:"text-center"},"Precio"),c.a.createElement("th",{className:"text-center"},"Descuento"),c.a.createElement("th",{className:"text-center"},"M\xe9todo de Venta"),c.a.createElement("th",{className:"text-center"},"Neto"),c.a.createElement("th",{className:"text-center"},"Total"))),c.a.createElement("tbody",{className:"text-center"},Object.keys(P).length>0?c.a.createElement(c.a.Fragment,null,P.products.map((function(t,a){return c.a.createElement("tr",null,c.a.createElement("td",null,t.category),c.a.createElement("td",null,t.name_product),c.a.createElement("td",null,t.description),c.a.createElement("td",null,t.quantity),c.a.createElement("td",null,e.configGeneral.simbolo_moneda,Object(h.a)(t.price,2,",",".")),c.a.createElement("td",null,t.discount),c.a.createElement("td",null,(n=t.method_sale,1===(n=parseInt(n))?"Unidad":2===n?"Mayorista":"(Litros, Kg, Etc..)")),c.a.createElement("td",null,t.is_neto?"Neto":"Iva"),c.a.createElement("td",null,c.a.createElement(s.a,{variant:"danger",className:"font-badge"},e.configGeneral.simbolo_moneda,Object(h.a)(t.total,2,",","."))));var n}))):"")))),c.a.createElement("br",null),c.a.createElement(m.a,null,c.a.createElement(u.a,{sm:12,md:12,lg:12,className:""},c.a.createElement("h4",{className:"title_principal text-center"},"Gastos de la Factura"),c.a.createElement("br",null),c.a.createElement("table",{className:"table table-striped table-bordered"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center"},"Descripci\xf3n"),c.a.createElement("th",{className:"text-center"},"Monto"))),c.a.createElement("tbody",{className:"text-center"},Object.keys(P).length>0?c.a.createElement(c.a.Fragment,null,P.gastos.map((function(t,a){return c.a.createElement("tr",null,c.a.createElement("td",null,t.description),c.a.createElement("td",null,c.a.createElement(s.a,{variant:"danger",className:"font-badge"},e.configGeneral.simbolo_moneda,Object(h.a)(t.amount,2,",","."))))}))):"")))),c.a.createElement("br",null),Object.keys(P).length>0&&P.refs.length>0?c.a.createElement(m.a,null,c.a.createElement(u.a,{sm:12,md:12,lg:12,className:""},c.a.createElement("h4",{className:"title_principal text-center"},"Referencias de la Factura"),c.a.createElement("br",null),c.a.createElement("table",{className:"table table-striped table-bordered"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center"},"Tipo de Documento"),c.a.createElement("th",{className:"text-center"},"Referencia Cotiz."),c.a.createElement("th",{className:"text-center"},"Ind"),c.a.createElement("th",{className:"text-center"},"Fecha Ref."),c.a.createElement("th",{className:"text-center"},"Raz\xf3n de Referencia"),c.a.createElement("th",{className:"text-center"},"Tipo de C\xf3digo"))),c.a.createElement("tbody",{className:"text-center"},Object.keys(P).length>0?c.a.createElement(c.a.Fragment,null,P.refs.map((function(e,t){return c.a.createElement("tr",null,c.a.createElement("td",null,e.type_document),c.a.createElement("td",null,e.ref_invoice),c.a.createElement("td",null,e.ind),c.a.createElement("td",null,e.date_ref?C(e.date_ref).tz("America/Santiago").format("DD-MM-YYYY"):""),c.a.createElement("td",null,e.reason_ref),c.a.createElement("td",null,e.type_code))}))):"")))):"",c.a.createElement(m.a,null,c.a.createElement(u.a,{sm:12,md:12,lg:12,className:""},c.a.createElement("h4",{className:"title_principal text-center"},"Totales"),c.a.createElement("br",null),c.a.createElement("table",{className:"table table-striped table-bordered"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center"},"Total Neto"),c.a.createElement("th",{className:"text-center"},"Total Iva"),c.a.createElement("th",{className:"text-center"},"Total Gastos"),c.a.createElement("th",{className:"text-center"},"Total Descuento Global"),c.a.createElement("th",{className:"text-center"},"Total Balance"))),c.a.createElement("tbody",{className:"text-center"},Object.keys(P).length>0?c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement(s.a,{variant:"danger",className:"font-badge"},e.configGeneral.simbolo_moneda,Object(h.a)(P.total_product,2,",","."))),c.a.createElement("td",null,c.a.createElement(s.a,{variant:"danger",className:"font-badge"},e.configGeneral.simbolo_moneda,Object(h.a)(P.total_iva,2,",","."))),c.a.createElement("td",null,c.a.createElement(s.a,{variant:"danger",className:"font-badge"},e.configGeneral.simbolo_moneda,Object(h.a)(P.total_gastos,2,",","."))),c.a.createElement("td",null,c.a.createElement(s.a,{variant:"danger",className:"font-badge"},e.configGeneral.simbolo_moneda,Object(h.a)(P.discount_global_amount,2,",","."))),c.a.createElement("td",null,c.a.createElement(s.a,{variant:"danger",className:"font-badge"},e.configGeneral.simbolo_moneda,Object(h.a)(P.total_balance,2,",",".")))):"")))),c.a.createElement("br",null),c.a.createElement(m.a,null,c.a.createElement(u.a,{sm:6,md:6,lg:6},Object.keys(P).length>0?c.a.createElement("h5",null,"Mostrar solo los Totales: ",c.a.createElement(s.a,{variant:"primary",className:"font-badge"},P.total_with_iva?"No":"Si")):""),c.a.createElement(u.a,{sm:6,md:6,lg:6,className:"text-center"},Object.keys(P).length>0?c.a.createElement("h5",null,"M\xe9todo de Pago: ",c.a.createElement(s.a,{variant:"primary",className:"font-badge"},P.way_of_payment)):""))),c.a.createElement(d.a.Footer,null,c.a.createElement(o.a,{size:"md",variant:"secondary",onClick:ge},"cerrar"))),c.a.createElement(x.a,{isShow:me,onHide:de,cotization:ce,printInvoice:function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;f.b.info("Cargando documento, espere por favor"),k(!0),ue(!1),g.a.get(p.b+"invoice_print/"+t.id+"/"+a+"/2").then((function(e){window.open(p.b+"documents/sale_note/files_pdf/"+e.data.name),k(!1),ue(!0)})).catch((function(t){k(!1),e.tokenExpired(t)}))},goToBond:function(t){e.history.replace("/sale_note/sale_note_bond/"+t.id)},anulateInvoice:function(e){Object(j.confirmAlert)({customUI:function(t){var a=t.onClose;return c.a.createElement("div",{className:"custom-ui-edit"},c.a.createElement("h1",null,"\xbfEsta seguro?"),c.a.createElement("p",{className:"font-alert"},"\xbfDesea realmente anular este registro?"),c.a.createElement("button",{className:"button-alert",onClick:function(){pe(e.id),a()}},"Si, Aceptar"),c.a.createElement("button",{className:"button-alert",onClick:a},"No"))}})},seeDetailCotization:function(e){H(e),ge()}}))}))}}]);
//# sourceMappingURL=39.3edca888.chunk.js.map