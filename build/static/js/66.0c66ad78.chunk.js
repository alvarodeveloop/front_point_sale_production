(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[66],{819:function(e,a,t){"use strict";t.r(a);var n=t(47),o=t(18),r=t(15),c=t(1),l=t.n(c),i=t(28),s=t(10),d=(t(612),t(609)),m=t(633),u=t(599),b=t(608),f=t(598),p=t(197),g=t(301),E=t(833),h=t(46),_=t(682),y=t(9),v=t.n(y),k=t(8),Y=t(31),j=t(88),O=t(157),S=t(615),D=t(17),A=t(661),C=t(611),M=t(644),x=t.n(M),z=t(77),T=[];a.default=Object(i.b)((function(e){return{id_branch_office:e.enterpriseSucursal.id_branch_office,configGeneral:e.configs.config,configStore:e.configs.configStore}}),{})((function(e){var a=Object(c.useState)(null),t=Object(r.a)(a,2),i=t[0],y=t[1],M=Object(c.useState)([]),w=Object(r.a)(M,2),N=w[0],G=w[1],P=Object(c.useState)([]),q=Object(r.a)(P,2),F=q[0],H=q[1],I=Object(c.useState)(!1),B=Object(r.a)(I,2),R=B[0],V=B[1],J=Object(c.useState)(!1),U=Object(r.a)(J,2),$=U[0],K=(U[1],Object(c.useState)(!1)),L=Object(r.a)(K,2),Q=L[0],W=L[1],X=Object(c.useState)({notify_client:!1,amount:"",id_type_bond:"",detail:"",date_payment_bond:O().tz("America/Santiago").format("YYYY-MM-DD")}),Z=Object(r.a)(X,2),ee=Z[0],ae=Z[1],te=Object(c.useState)(!0),ne=Object(r.a)(te,2),oe=ne[0],re=ne[1],ce=0,le=null;Object(c.useEffect)((function(){0===ce?(le=e.id_branch_office,ce++,ie()):le!==e.id_branch_office?setTimeout((function(){e.history.replace("/bill/bill_search")}),1500):(ce++,ie())}),[e.id_branch_office]),Object(c.useEffect)((function(){if(e.configStore&&e.configGeneral){if(!e.configGeneral.is_syncronized)return k.b.error("Su cuenta no esta sincronizada con el SII, complete su configuraci\xf3n general para usar este m\xf3dulo"),void setTimeout((function(){e.history.replace("/dashboard")}),3e3);se()}else e.configStore?e.configGeneral||(k.b.error("Debe hacer su configuraci\xf3n general para usar este m\xf3dulo"),setTimeout((function(){e.history.replace("/dashboard")}),3e3)):(k.b.error("Debe hacer su configuraci\xf3n de tienda o seleccionar una sucursal para usar este m\xf3dulo"),setTimeout((function(){e.history.replace("/dashboard")}),3e3))}),[]),Object(c.useMemo)((function(){T=[{Header:"Fecha",accessor:function(e){return[O(e.date_payment_bond).format("DD-MM-YYYY")]}},{Header:"Detalle",accessor:"detail"},{Header:"Tipo de Abono",accessor:function(e){return[e.type_bond.name]}},{Header:"Monto",accessor:function(a){return[Object(D.g)(e.configGeneral,a.amount)]},Cell:function(a){return l.a.createElement(d.a,{variant:"danger",className:"font-badge"},e.configGeneral.simbolo_moneda,Object(D.g)(e.configGeneral,a.cell.row.original.amount))}},{Header:"Acciones",Cell:function(e){var a=e.cell.row.original;return i&&2===i.status?"":l.a.createElement(m.a,{size:"sm",id:"drop"+a.id,title:"Seleccione",block:"true"},l.a.createElement(u.a.Item,{onClick:function(){return ue(a)}},"Modificar"),l.a.createElement(u.a.Item,{onClick:function(){return be(a)}},"Eliminar"))}}]}),[i]);var ie=function(){var a=e.match.params.id,t=[v.a.get(s.b+"invoice/"+a+"/3")];Promise.all(t).then((function(e){y(e[0].data),G(e[0].data.bonds)})).catch((function(e){e.response?k.b.error(e.response.data.message):(console.log(e),k.b.error("Error, contacte con soporte"))}))},se=function(){v.a.get(s.b+"type_bond").then((function(e){H(e.data)})).catch((function(e){e.response?k.b.error(e.response.data.message):(console.log(e),k.b.error("Error, contacte con soporte"))}))},de=function(){R&&ae({notify_client:!1,amount:"",id_type_bond:"",detail:"",date_payment_bond:O().tz("America/Santiago").format("YYYY-MM-DD")}),V(!R)},me=function(e){ae(Object(o.a)(Object(o.a)({},ee),{},Object(n.a)({},e.target.name,"notify_client"===e.target.name?e.target.checked:e.target.value)))},ue=function(e){ae({notify_client:e.notify_client,amount:e.amount,id_type_bond:e.id_type_bond,detail:e.detail,date_payment_bond:O(e.date_payment_bond).tz("America/Santiago").format("YYYY-MM-DD"),id:e.id}),de()},be=function(e){Object(S.confirmAlert)({customUI:function(a){var t=a.onClose;return l.a.createElement("div",{className:"custom-ui-edit"},l.a.createElement("h1",null,"\xbfEsta seguro?"),l.a.createElement("p",{className:"font-alert"},"\xbfDesea realmente borrar este registro?"),l.a.createElement("button",{className:"button-alert",onClick:function(){fe(e.id),t()}},"Si, Aceptar"),l.a.createElement("button",{className:"button-alert",onClick:t},"No"))}})},fe=function(a){v.a.delete(s.b+"invoice_bonds/"+a).then((function(e){k.b.success("Abono eliminado con \xe9xito"),ie()})).catch((function(a){e.tokenExpired(a)}))};return l.a.createElement(l.a.Fragment,null,oe?l.a.createElement(b.a,{fluid:!0},l.a.createElement(z.a,null)):l.a.createElement(b.a,{fluid:!0},l.a.createElement(f.a,null,l.a.createElement(p.a,{sm:7,md:7,lg:7},l.a.createElement("h4",{className:"title_principal"},"Historial de Pagos de la Boleta ",i?l.a.createElement(d.a,{variant:"danger",className:"font-badge"},i.folio_bill):"")),l.a.createElement(p.a,{sm:5,md:5,lg:5},l.a.createElement(g.a,{variant:"primary",block:!0,type:"button",onClick:function(){e.history.replace("/bill/bill_search")},size:"sm"},"Volver a las Boletas"))),l.a.createElement(_.a,{invoice:i,configGeneral:e.configGeneral,configStore:e.configStore}),l.a.createElement("br",null),l.a.createElement(f.a,null,l.a.createElement(p.a,{sm:3,md:3,lg:3},l.a.createElement(g.a,{variant:"success",block:!0,type:"button",onClick:function(){if(N.length<1)k.b.error("Error, no hay abonos para realizar el excel");else{re(!0);var a=A.utils.book_new(),t=[["Fecha","Detalle","Tipo de Abono","Monto"]];a.Props={Title:"Pagos abonados de la boleta "+i.ref,Subject:"Exportaci\xf3n de Data",Author:"Aidy tecnology",CreatedDate:O().format("YYYY-MM-DD")},a.SheetNames.push("Pagos"),N.forEach((function(a,n){t.push([O(a.date_payment_bond).format("DD-MM-YYYY"),a.detail,a.type_bond.name,Object(D.g)(e.configGeneral,a.amount)])}));var n=A.utils.aoa_to_sheet(t);a.Sheets.Pagos=n;var o=A.write(a,{bookType:"xlsx",type:"binary"}),r=Object(D.e)(o);x.a.saveAs(new Blob([r],{type:"application/octet-stream"}),"Abonos de la boleta "+i.ref+" fecha: "+O().tz("America/Santiago").format("DD-MM-YYYY")+".xlsx"),re(!1)}},size:"sm"},"Exportar a Excel ",l.a.createElement(Y.D,null))),l.a.createElement(p.a,{sm:3,md:3,lg:3},l.a.createElement(g.a,{variant:"success",block:!0,type:"button",onClick:de,size:"sm",disabled:!(!i||2!==i.status)},"Agregar Abono ",l.a.createElement(Y.A,null))),l.a.createElement(p.a,{sm:3,md:3,lg:3},l.a.createElement(g.a,{variant:"success",block:!0,type:"button",onClick:function(){N.length>0?(re(!0),v.a.get(s.b+"print_invoice_bonds/"+e.match.params.id+"/3",{responseType:"blob"}).then((function(e){x.a.saveAs(e.data,"Informe de los pagos de la boleta: "+i.ref+" fecha: "+O().tz("America/Santiago").format("DD-MM-YYYY")+".pdf"),re(!1)})).catch((function(a){re(!1),e.tokenExpired(a)}))):k.b.error("No hay pagos para realizar el informe")},size:"sm"},"Exportar a Pdf ",l.a.createElement(Y.F,null))),l.a.createElement(p.a,{sm:3,md:3,lg:3},l.a.createElement(g.a,{variant:"success",block:!0,type:"button",onClick:function(){re(!0),v.a.get(s.b+"invoice_print/"+e.match.params.id+"/0/3").then((function(e){k.b.info("Cargando documento, espere por favor");var a=document.createElement("a");a.style.display="none",a.href=e.data.pdf_public_url_bill_64_encode,a.download="bill_pdf_".concat(e.data.ref,".pdf"),document.body.appendChild(a),a.click(),document.body.removeChild(a),re(!1)})).catch((function(a){re(!1),e.tokenExpired(a)}))},size:"sm"},"Imprimir Factura ",l.a.createElement(Y.F,null)))),l.a.createElement(f.a,null,l.a.createElement(p.a,{sm:12,md:12,lg:12},l.a.createElement("br",null),l.a.createElement(C.a,{columns:T,data:N}))),l.a.createElement(E.a,{show:R,onHide:de,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0},l.a.createElement(E.a.Header,{closeButton:!0,className:"header_dark"},l.a.createElement(E.a.Title,{id:"contained-modal-title-vcenter"},"Agregar Abono $")),l.a.createElement(h.a,{onSubmit:function(a){var t=a.currentTarget;if(a.preventDefault(),!1===t.checkValidity())return a.stopPropagation(),void W(!0);var n=Object.assign({},ee,{id_invoice:e.match.params.id});n.id?v.a.put(s.b+"invoice_bonds/"+n.id,n).then((function(e){k.b.success("Abono modificado con \xe9xito"),de(),ie()})).catch((function(a){e.tokenExpired(a)})):v.a.post(s.b+"invoice_bonds",n).then((function(e){k.b.success("Abono agregado con \xe9xito"),de(),ie()})).catch((function(a){e.tokenExpired(a)}))},noValidate:!0,validated:Q},l.a.createElement(E.a.Body,null,l.a.createElement(f.a,null,l.a.createElement(j.a,{type:"date",label:"Fecha del Pago",name:"date_payment_bond",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:ee.date_payment_bond,handleChange:me}),l.a.createElement(j.a,{type:"select",label:"Tipo de Abono",name:"id_type_bond",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:ee.id_type_bond,handleChange:me},l.a.createElement("option",{value:""},"--Seleccione--"),F.map((function(e,a){return l.a.createElement("option",{value:e.id,key:a},e.name)}))),l.a.createElement(j.a,{type:"number",step:"any",label:"Monto",name:"amount",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:ee.amount,handleChange:me})),l.a.createElement(f.a,null,l.a.createElement(j.a,{type:"text",label:"Detalle",name:"detail",required:!1,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:ee.detail,handleChange:me}))),l.a.createElement(E.a.Footer,null,l.a.createElement(g.a,{size:"md",type:"submit",variant:"primary",disabled:$},"Enviar"),l.a.createElement(g.a,{size:"md",variant:"secondary",onClick:de,disabled:$},"cerrar"))))))}))}}]);
//# sourceMappingURL=66.0c66ad78.chunk.js.map