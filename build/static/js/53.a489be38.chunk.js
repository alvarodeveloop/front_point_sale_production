(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[53],{611:function(e,a,t){"use strict";var n=t(47),r=t(119),l=t(1),o=t.n(l),s=t(120),i=t(622),c=t(623),u=t(301);function m(){var e=Object(r.a)(["\n  padding: 1rem;\n\n  .button-pagination{\n    margin-right: 10px;\n  }\n\n  .inputPage{\n    display: inline-block;\n    width: 150px;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .inputPageFilter{\n    display: inline-block;\n    width: 80%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n\n  .pagination {\n    padding: 0.5rem;\n    display: flex;\n    justify-content: center;\n  }\n\n  .table_responsive_eddit{\n    overflow-x: auto;\n  }\n"]);return m=function(){return e},e}var d=s.a.div(m());function p(e){var a=e.column,t=a.filterValue,n=a.preFilteredRows,r=a.setFilter,l=n.length;return o.a.createElement("input",{value:t||"",onChange:function(e){r(e.target.value||void 0)},placeholder:"Buscar en ".concat(l," registros..."),className:"inputPageFilter"})}function g(e,a,t){return Object(c.a)(e,t,{keys:[function(e){return e.values[a]}]})}function f(e){var a=e.columns,t=e.data,r=e.menuTop,l=e.headerColor,s=e.headerFontColor,c=e.pageSizeHandler,m=o.a.useMemo((function(){return{fuzzyText:g,text:function(e,a,t){return e.filter((function(e){var n=e.values[a];return void 0===n||String(n).toLowerCase().startsWith(String(t).toLowerCase())}))}}}),[]),d=o.a.useMemo((function(){return{Filter:p}}),[]),f=Object(i.useTable)({columns:a,data:t,defaultColumn:d,filterTypes:m,initialState:{pageIndex:0,pageSize:c[0]}},i.useFilters,i.useSortBy,i.usePagination),b=f.getTableProps,h=f.getTableBodyProps,E=f.headerGroups,y=f.page,v=f.prepareRow,x=f.canPreviousPage,C=f.canNextPage,N=f.pageOptions,k=f.pageCount,O=f.gotoPage,P=f.nextPage,j=f.previousPage,z=f.setPageSize,w=f.state,S=w.pageIndex,_=w.pageSize;return o.a.createElement("div",{className:"table_responsive_eddit"},r?o.a.createElement("div",{className:"pagination"},o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return O(0)},disabled:!x},"<<")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return j()},disabled:!x},"<")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return P()},disabled:!C},">")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return O(k-1)},disabled:!C},">>")," ",o.a.createElement("span",null,"P\xe1gina"," ",o.a.createElement("strong",null,S+1," de ",N.length)," "),o.a.createElement("span",{className:"ml-3"},"| ",o.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),o.a.createElement("input",Object(n.a)({type:"number",defaultValue:S+1,onChange:function(e){var a=e.target.value?Number(e.target.value)-1:0;O(a)},className:"inputPage"},"onChange",(function(e){e.target.value>N.length&&(e.target.value=1)}))))," ",o.a.createElement("select",{value:_,onChange:function(e){z(Number(e.target.value))},className:"inputPage"},c.map((function(e){return o.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))):"",o.a.createElement("table",Object.assign({},b(),{className:"table table-bordered"}),o.a.createElement("thead",null,E.map((function(e){return o.a.createElement("tr",Object.assign({},e.getHeaderGroupProps(),{className:"text-center"}),e.headers.map((function(e){return o.a.createElement("th",Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{style:{backgroundColor:l||"rgb(218, 236, 242)",color:s||"black"}}),e.render("Header"),o.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""),o.a.createElement("div",null,e.canFilter?e.render("Filter"):null))})))}))),o.a.createElement("tbody",Object.assign({},h(),{className:"text-center"}),y.map((function(e,a){return v(e)||o.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return o.a.createElement("td",Object.assign({style:{position:"relative"}},e.getCellProps()),e.render("Cell"))})))})))),o.a.createElement("div",{className:"pagination"},o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return O(0)},disabled:!x},"<<")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return j()},disabled:!x},"<")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return P()},disabled:!C},">")," ",o.a.createElement(u.a,{size:"sm",style:{height:"40px"},className:"button-pagination",variant:"secondary",onClick:function(){return O(k-1)},disabled:!C},">>")," ",o.a.createElement("span",null,"P\xe1gina"," ",o.a.createElement("strong",null,S+1," de ",N.length)," "),o.a.createElement("span",{className:"ml-3"},"| ",o.a.createElement("span",{className:"ml-2"},"Ir a la P\xe1gina:"," "),o.a.createElement("input",Object(n.a)({type:"number",defaultValue:S+1,onChange:function(e){var a=e.target.value?Number(e.target.value)-1:0;O(a)},className:"inputPage"},"onChange",(function(e){e.target.value>N.length&&(e.target.value=1)}))))," ",o.a.createElement("select",{value:_,onChange:function(e){z(Number(e.target.value))},className:"inputPage"},c.map((function(e){return o.a.createElement("option",{key:e,value:e},"Mostrar ",e)})))))}g.autoRemove=function(e){return!e};a.a=function(e){var a=e.data,t=e.columns,n=e.menuTop,r=e.headerColor,l=e.headerFontColor,s=e.pageSizeHandler;return s=s||[10,20,30,40,50],o.a.createElement(d,null,o.a.createElement(f,{pageSizeHandler:s,data:a,columns:t,menuTop:n,headerFontColor:l,headerColor:r}))}},633:function(e,a,t){"use strict";var n=t(2),r=t(4),l=t(1),o=t.n(l),s=t(3),i=t.n(s),c=t(599),u=t(206),m=t(204),d={id:i.a.any,href:i.a.string,onClick:i.a.func,title:i.a.node.isRequired,disabled:i.a.bool,menuRole:i.a.string,renderMenuOnMount:i.a.bool,rootCloseEvent:i.a.string,bsPrefix:i.a.string,variant:i.a.string,size:i.a.string},p=o.a.forwardRef((function(e,a){var t=e.title,l=e.children,s=e.bsPrefix,i=e.rootCloseEvent,d=e.variant,p=e.size,g=e.menuRole,f=e.renderMenuOnMount,b=e.disabled,h=e.href,E=e.id,y=Object(r.a)(e,["title","children","bsPrefix","rootCloseEvent","variant","size","menuRole","renderMenuOnMount","disabled","href","id"]);return o.a.createElement(c.a,Object(n.a)({ref:a},y),o.a.createElement(u.a,{id:E,href:h,size:p,variant:d,disabled:b,childBsPrefix:s},t),o.a.createElement(m.a,{role:g,renderOnMount:f,rootCloseEvent:i},l))}));p.displayName="DropdownButton",p.propTypes=d,a.a=p},658:function(e,a,t){"use strict";var n=t(1),r=t.n(n),l=t(46),o=(t(310),r.a.forwardRef((function(e,a){var t=e.cols?e.cols:"col-md-6 col-sm-6";return"select"!==e.type&&"textarea"!==e.type?r.a.createElement(l.a.Group,{className:t},r.a.createElement(l.a.Label,{className:"fontBold"},e.label),r.a.createElement(l.a.Control,{ref:a,id:e.id?e.id:e.name,type:e.type,name:e.name,onChange:e.handleChange,value:e.value,placeholder:e.placeholder?e.placeholder:"",required:e.required,readOnly:!!e.readonly&&e.readonly,step:e.step?e.step:"",onKeyUp:e.handleKeyUp?e.handleKeyUp:function(){},className:e.className?e.className+" form-control-sm mainBorder":"form-control-sm mainBorder",style:e.style?e.style:{},autoComplete:e.autoComplete?e.autoComplete:"xxx"}),r.a.createElement(l.a.Control.Feedback,{type:"invalid"},e.messageErrors.map((function(e,a){return r.a.createElement("span",{key:a,className:"error-input"},e.replace(/[*]$/g,""))})))):"select"===e.type?r.a.createElement(l.a.Group,{className:t},r.a.createElement(l.a.Label,{className:"fontBold"},e.label),r.a.createElement(l.a.Control,{id:e.id?e.id:e.name,as:e.type,name:e.name,onChange:e.handleChange,value:e.value,placeholder:e.placeholder?e.placeholder:"",readOnly:!!e.readonly&&e.readonly,required:e.required,multiple:!!e.multiple&&e.multiple,ref:a||null,className:e.className?e.className+" form-control-sm mainBorder":"form-control-sm mainBorder",style:e.style?e.style:{},autoComplete:e.autoComplete?e.autoComplete:"xxx"},e.children),r.a.createElement(l.a.Control.Feedback,{type:"invalid"},e.messageErrors.map((function(e,a){return r.a.createElement("span",{key:a,className:"error-input"},e.replace(/[*]$/g,""))})))):"textarea"===e.type?r.a.createElement(l.a.Group,{className:t},r.a.createElement(l.a.Label,{className:"fontBold"},e.label),r.a.createElement(l.a.Control,{id:e.id?e.id:e.name,as:e.type,name:e.name,onChange:e.handleChange,value:e.value,placeholder:e.placeholder?e.placeholder:"",required:e.required,rows:e.rows?e.rows:2,readOnly:!!e.readonly&&e.readonly,onKeyUp:e.handleKeyUp?e.handleKeyUp:function(){},ref:a||null,className:e.className?e.className+" form-control-sm mainBorder":"form-control-sm mainBorder",style:e.style?e.style:{},autoComplete:e.autoComplete?e.autoComplete:"xxx"}),r.a.createElement(l.a.Control.Feedback,{type:"invalid"},e.messageErrors.map((function(e,a){return r.a.createElement("span",{key:a,className:"error-input"},e.replace(/[*]$/g,""))})))):void 0})));a.a=o},830:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return C}));var n=t(15),r=t(1),l=t.n(r),o=t(9),s=t.n(o),i=t(10),c=t(609),u=t(633),m=t(599),d=t(608),p=t(598),g=t(197),f=t(46),b=t(301),h=t(77),E=t(611),y=t(658),v=t(8),x=[];function C(e){var a=Object(r.useState)([]),t=Object(n.a)(a,2),o=t[0],C=t[1],N=Object(r.useState)(1),k=Object(n.a)(N,2),O=k[0],P=k[1],j=Object(r.useState)(!0),z=Object(n.a)(j,2),w=z[0],S=z[1],_=Object(r.useState)({enterprise:{},type:!1}),F=Object(n.a)(_,2),B=F[0],R=F[1],H=Object(r.useState)(!1),M=Object(n.a)(H,2),T=M[0],q=M[1],D=Object(r.useRef)(null);Object(r.useEffect)((function(){I()}),[]),x=Object(r.useMemo)((function(){return[{Header:"Empresa",accessor:"bussines_name"},{Header:"Rut",accessor:"rut"},{Header:"Email",accessor:"email_enterprise"},{Header:"Fono",accessor:"phone"},{Header:"Dias Prueba",accessor:"extra_days_test",Cell:function(e){return l.a.createElement(c.a,{variant:"danger",className:"font-badge"},e.cell.row.original.extra_days_test)}},{Header:"Dias Expiraci\xf3n",accessor:"extra_days_expire",Cell:function(e){return l.a.createElement(c.a,{variant:"danger",className:"font-badge"},e.cell.row.original.extra_days_expire)}},{Header:"Acci\xf3n",accessor:"",Cell:function(e){var a=e.cell.row.original;return l.a.createElement(u.a,{size:"sm",id:"drop"+a.id,title:"Seleccione",block:"true"},l.a.createElement(m.a.Item,{onClick:function(){return K(a,!1)}},"Agregar dias de prueba"),l.a.createElement(m.a.Item,{onClick:function(){return K(a,!0)}},"Agregar dias de plazo de vencimiento"))}}]}),[]);var I=function(){s.a.get(i.b+"enterprise_all").then((function(e){C(e.data),S(!1)})).catch((function(a){S(!1),e.tokenExpired(a)}))},K=function(e,a){R({enterprise:e,type:a}),P(2),setTimeout((function(){D.current.focus()}),400)};return l.a.createElement(d.a,{fluid:!0},w?l.a.createElement(h.a,null):l.a.createElement(l.a.Fragment,null,l.a.createElement(p.a,null,l.a.createElement(g.a,{sm:6,md:6,lg:6,xs:12},l.a.createElement("h4",{className:"title_principal"},"Empresas Registradas")),l.a.createElement(g.a,{sm:6,md:6,lg:6,xs:12,className:"text-right"},l.a.createElement("h5",null,"Total Empresas: ",l.a.createElement(c.a,{variant:"danger",className:"title_badge"},o.length)))),1===O?l.a.createElement(p.a,null,l.a.createElement(g.a,null,l.a.createElement(E.a,{data:o,columns:x}))):l.a.createElement(f.a,{onSubmit:function(a){var t=a.currentTarget;if(a.preventDefault(),!1===t.checkValidity())return a.stopPropagation(),void q(!0);var n=Object.assign({},B);S(!0),s.a.put(i.b+"enterprise_extra_days/"+n.enterprise.id,n).then((function(e){v.b.success("Dias agregados con \xe9xito"),P(1),I()})).catch((function(a){e.tokenExpired(a)}))},noValidated:!0,validated:T},l.a.createElement(p.a,{className:"justify-content-center"},l.a.createElement(y.a,{ref:D,type:"number",label:"Modificar Cantidad de dias",name:"days",required:!0,messageErrors:["Requerido*"],cols:"col-md-6 col-lg-6 col-sm-6 col-xs-12",value:B.enterprise.days,handleChange:function(e){e.persist(),R((function(a){return{enterprise:Object.assign({},a.enterprise,{days:e.target.value}),type:a.type}}))}})),l.a.createElement(p.a,{className:"justify-content-center"},l.a.createElement(g.a,{sm:4,md:4,lg:4,xs:12,xl:4},l.a.createElement(b.a,{variant:"primary",block:!0,size:"sm",type:"submit"},"Enviar"))))))}}}]);
//# sourceMappingURL=53.a489be38.chunk.js.map