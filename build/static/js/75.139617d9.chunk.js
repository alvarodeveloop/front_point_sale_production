(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[75],{821:function(e,a,t){"use strict";t.r(a);var n=t(51),o=t(20),c=t(16),r=t(1),i=t.n(r),l=t(29),s=t(10),m=(t(311),t(615)),u=t(648),d=t(605),b=t(614),f=t(604),p=t(205),g=t(305),E=t(616),_=t(50),h=t(679),y=t(9),v=t.n(y),Y=t(8),k=t(32),j=t(82),S=t(165),O=t(621),D=t(18),A=t(659),M=t(618),x=t(646),z=t.n(x),C=t(83),w=[];a.default=Object(l.b)((function(e){return{id_branch_office:e.enterpriseSucursal.id_branch_office,configGeneral:e.configs.config,configStore:e.configs.configStore}}),{})((function(e){var a=Object(r.useState)(null),t=Object(c.a)(a,2),l=t[0],y=t[1],x=Object(r.useState)([]),T=Object(c.a)(x,2),N=T[0],F=T[1],G=Object(r.useState)([]),P=Object(c.a)(G,2),q=P[0],H=P[1],I=Object(r.useState)(!1),B=Object(c.a)(I,2),R=B[0],V=B[1],J=Object(r.useState)(!1),U=Object(c.a)(J,2),$=U[0],K=(U[1],Object(r.useState)(!1)),L=Object(c.a)(K,2),Q=L[0],W=L[1],X=Object(r.useState)({notify_client:!1,amount:"",id_type_bond:"",detail:"",date_payment_bond:S().tz("America/Santiago").format("YYYY-MM-DD")}),Z=Object(c.a)(X,2),ee=Z[0],ae=Z[1],te=Object(r.useState)(!0),ne=Object(c.a)(te,2),oe=ne[0],ce=ne[1],re=0,ie=null;Object(r.useEffect)((function(){0===re?(ie=e.id_branch_office,re++,le()):ie!==e.id_branch_office?setTimeout((function(){e.history.replace("/invoice/invoice_search")}),1500):(re++,le())}),[e.id_branch_office]),Object(r.useEffect)((function(){if(e.configStore&&e.configGeneral){if(!e.configGeneral.is_syncronized)return Y.b.error("Su cuenta no esta sincronizada con el SII, complete su configuraci\xf3n general para usar este m\xf3dulo"),void setTimeout((function(){e.history.replace("/dashboard")}),3e3);se()}else e.configStore?e.configGeneral||(Y.b.error("Debe hacer su configuraci\xf3n general para usar este m\xf3dulo"),setTimeout((function(){e.history.replace("/dashboard")}),3e3)):(Y.b.error("Debe hacer su configuraci\xf3n de tienda o seleccionar una sucursal para usar este m\xf3dulo"),setTimeout((function(){e.history.replace("/dashboard")}),3e3))}),[]),Object(r.useMemo)((function(){w=[{Header:"Fecha",accessor:function(e){return[S(e.date_payment_bond).format("DD-MM-YYYY")]}},{Header:"Detalle",accessor:"detail"},{Header:"Tipo de Abono",accessor:function(e){return[e.type_bond.name]}},{Header:"Monto",accessor:function(a){return[Object(D.g)(e.configGeneral,a.amount)]},Cell:function(a){return i.a.createElement(m.a,{variant:"danger",className:"font-badge"},e.configGeneral.simbolo_moneda,Object(D.g)(e.configGeneral,a.cell.row.original.amount))}},{Header:"Acciones",Cell:function(e){var a=e.cell.row.original;return l&&2===l.status?"":i.a.createElement(u.a,{size:"sm",id:"drop"+a.id,title:"Seleccione",block:"true"},i.a.createElement(d.a.Item,{onClick:function(){return de(a)}},"Modificar"),i.a.createElement(d.a.Item,{onClick:function(){return be(a)}},"Eliminar"))}}]}),[l]);var le=function(){var a=e.match.params.id,t=[v.a.get(s.b+"invoice/"+a)];Promise.all(t).then((function(e){y(e[0].data),F(e[0].data.bonds),ce(!1)})).catch((function(a){ce(!1),e.tokenExpired(a)}))},se=function(){v.a.get(s.b+"type_bond").then((function(e){H(e.data)})).catch((function(a){e.tokenExpired(a)}))},me=function(){ae(R?{notify_client:!1,amount:"",id_type_bond:"",detail:"",date_payment_bond:S().tz("America/Santiago").format("YYYY-MM-DD")}:{notify_client:!1,amount:l.debit_balance,id_type_bond:1,detail:"",date_payment_bond:S().tz("America/Santiago").format("YYYY-MM-DD")}),V(!R)},ue=function(e){ae(Object(o.a)(Object(o.a)({},ee),{},Object(n.a)({},e.target.name,"notify_client"===e.target.name?e.target.checked:e.target.value)))},de=function(e){ae({notify_client:e.notify_client,amount:e.amount,id_type_bond:e.id_type_bond,detail:e.detail,date_payment_bond:S(e.date_payment_bond).tz("America/Santiago").format("YYYY-MM-DD"),id:e.id}),me()},be=function(e){Object(O.confirmAlert)({customUI:function(a){var t=a.onClose;return i.a.createElement("div",{className:"custom-ui-edit"},i.a.createElement("h1",null,"\xbfEsta seguro?"),i.a.createElement("p",{className:"font-alert"},"\xbfDesea realmente borrar este registro?"),i.a.createElement("button",{className:"button-alert",onClick:function(){fe(e.id),t()}},"Si, Aceptar"),i.a.createElement("button",{className:"button-alert",onClick:t},"No"))}})},fe=function(a){ce(!0),v.a.delete(s.b+"invoice_bonds/"+a).then((function(e){Y.b.success("Abono eliminado con \xe9xito"),le()})).catch((function(a){ce(!1),e.tokenExpired(a)}))};return i.a.createElement(b.a,{fluid:!0},i.a.createElement(f.a,null,i.a.createElement(p.a,{sm:7,md:7,lg:7},i.a.createElement("h4",{className:"title_principal"},"Historial de Pagos de la Factura ",l?i.a.createElement(m.a,{variant:"danger",className:"font-badge"},l.folio_bill):"")),i.a.createElement(p.a,{sm:5,md:5,lg:5},i.a.createElement(g.a,{variant:"primary",block:!0,type:"button",onClick:function(){e.history.replace("/invoice/invoice_search")},size:"sm"},"Volver a las Facturas"))),oe?i.a.createElement(C.a,null):i.a.createElement(i.a.Fragment,null,i.a.createElement(h.a,{invoice:l,configGeneral:e.configGeneral,configStore:e.configStore}),i.a.createElement("br",null),i.a.createElement(f.a,null,i.a.createElement(p.a,{sm:3,md:3,lg:3},i.a.createElement(g.a,{variant:"success",block:!0,type:"button",onClick:function(){if(N.length<1)Y.b.error("Error, no hay abonos para realizar el excel");else{ce(!0);var a=A.utils.book_new(),t=[["Fecha","Detalle","Tipo de Abono","Monto"]];a.Props={Title:"Pagos abonados de la factura "+l.ref,Subject:"Exportaci\xf3n de Data",Author:"Aidy tecnology",CreatedDate:S().format("YYYY-MM-DD")},a.SheetNames.push("Pagos"),N.forEach((function(a,n){t.push([S(a.date_payment_bond).format("DD-MM-YYYY"),a.detail,a.type_bond.name,Object(D.g)(e.configGeneral,a.amount)])}));var n=A.utils.aoa_to_sheet(t);a.Sheets.Pagos=n;var o=A.write(a,{bookType:"xlsx",type:"binary"}),c=Object(D.e)(o);z.a.saveAs(new Blob([c],{type:"application/octet-stream"}),"Abonos de la factura "+l.ref+" fecha: "+S().tz("America/Santiago").format("DD-MM-YYYY")+".xlsx"),ce(!1)}},size:"sm"},"Exportar a Excel ",i.a.createElement(k.D,null))),i.a.createElement(p.a,{sm:3,md:3,lg:3},i.a.createElement(g.a,{variant:"success",block:!0,type:"button",onClick:me,size:"sm",disabled:!(!l||2!==l.status)},"Agregar Abono ",i.a.createElement(k.A,null))),i.a.createElement(p.a,{sm:3,md:3,lg:3},i.a.createElement(g.a,{variant:"success",block:!0,type:"button",onClick:function(){N.length>0?(ce(!0),v.a.get(s.b+"print_invoice_bonds/"+e.match.params.id,{responseType:"blob"}).then((function(e){z.a.saveAs(e.data,"Informe de los pagos de la factura: "+l.ref+" fecha: "+S().tz("America/Santiago").format("DD-MM-YYYY")+".pdf"),ce(!1)})).catch((function(a){ce(!1),e.tokenExpired(a)}))):Y.b.error("No hay pagos para realizar el informe")},size:"sm"},"Exportar a Pdf ",i.a.createElement(k.F,null))),i.a.createElement(p.a,{sm:3,md:3,lg:3},i.a.createElement(g.a,{variant:"success",block:!0,type:"button",onClick:function(){window.open(l.name_pdf,"_blank")},size:"sm"},"Imprimir Factura ",i.a.createElement(k.F,null)))),i.a.createElement(f.a,null,i.a.createElement(p.a,{sm:12,md:12,lg:12},i.a.createElement("br",null),i.a.createElement(M.a,{columns:w,data:N})))),i.a.createElement(E.a,{show:R,onHide:me,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},i.a.createElement(E.a.Header,{closeButton:!0,className:"header_dark"},i.a.createElement(E.a.Title,{id:"contained-modal-title-vcenter"},"Agregar Abono $")),i.a.createElement(_.a,{onSubmit:function(a){var t=a.currentTarget;if(a.preventDefault(),!1===t.checkValidity())return a.stopPropagation(),void W(!0);var n=Object.assign({},ee,{id_invoice:e.match.params.id});n.id?v.a.put(s.b+"invoice_bonds/"+n.id,n).then((function(e){Y.b.success("Abono modificado con \xe9xito"),me(),le()})).catch((function(a){e.tokenExpired(a)})):v.a.post(s.b+"invoice_bonds",n).then((function(e){Y.b.success("Abono agregado con \xe9xito"),me(),le()})).catch((function(a){e.tokenExpired(a)}))},noValidate:!0,validated:Q},oe?i.a.createElement(E.a.Body,null,i.a.createElement(C.a,null)):i.a.createElement(E.a.Body,null,i.a.createElement(f.a,null,i.a.createElement(j.a,{type:"date",label:"Fecha del Pago",name:"date_payment_bond",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:ee.date_payment_bond,handleChange:ue}),i.a.createElement(j.a,{type:"select",label:"Tipo de Abono",name:"id_type_bond",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:ee.id_type_bond,handleChange:ue},i.a.createElement("option",{value:""},"--Seleccione--"),q.map((function(e,a){return i.a.createElement("option",{value:e.id,key:a},e.name)}))),i.a.createElement(j.a,{type:"number",step:"any",label:"Monto",name:"amount",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:ee.amount,handleChange:ue})),i.a.createElement(f.a,null,i.a.createElement(j.a,{type:"text",label:"Detalle",name:"detail",required:!1,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:ee.detail,handleChange:ue}))),i.a.createElement(E.a.Footer,null,i.a.createElement(g.a,{size:"md",type:"submit",variant:"primary",disabled:$},"Enviar"),i.a.createElement(g.a,{size:"md",variant:"secondary",onClick:me,disabled:$},"cerrar")))))}))}}]);