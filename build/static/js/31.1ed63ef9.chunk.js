(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[31],{690:function(e,a,t){},818:function(e,a,t){"use strict";t.r(a);var r=t(86),n=t.n(r),c=t(129),l=t(125),s=t(45),o=t(23),i=t(61),u=t(1),m=t.n(u),d=t(32),p=t(626),b=t(50),E=t(627),f=t(318),g=t(319),h=t(36),v=t(208),j=t(170),O=t(21),k=t.n(O),x=t(15),y=t(31),w=(t(690),function(e){var a=Object(u.useState)({name:"",email:"",rut:"",password:"",id_rol:""}),t=Object(i.a)(a,2),r=t[0],h=t[1],v=Object(u.useState)([]),O=Object(i.a)(v,2),w=O[0],C=O[1],S=Object(u.useState)([]),R=Object(i.a)(S,2),_=R[0],q=R[1],N=Object(u.useState)([]),z=Object(i.a)(N,2),D=z[0],P=z[1],M=Object(u.useState)(!1),T=Object(i.a)(M,2),I=T[0],F=T[1],J=Object(u.useState)(!1),U=Object(i.a)(J,2),V=U[0],B=U[1],G=Object(u.useState)(!1),H=Object(i.a)(G,2),L=H[0],A=H[1];Object(u.useEffect)((function(){!function(){var a=[k.a.get(y.a+"modules"),k.a.get(y.a+"roles")];e.match.params.id>0&&a.push(k.a.get(y.a+"user/"+e.match.params.id)),Promise.all(a).then((function(a){if(P(a[0].data),q(a[1].data),e.match.params.id){h({name:a[2].data.user.name,email:a[2].data.user.email,rut:a[2].data.user.rut,password:"",id_rol:a[2].data.user.id_rol});var t=a[2].data.modules.map((function(e){return e.id_menu}));C(t),A(!0)}})).catch((function(e){x.b.error("Error, contacte con soporte")}))}()}),[]);var K=function(e){h(Object(o.a)(Object(o.a)({},r),{},Object(s.a)({},e.target.name,e.target.value)))},Q=function(){var e=Object(l.a)(n.a.mark((function e(a,t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.persist(),!a.target.checked){e.next=6;break}return e.next=4,C([].concat(Object(c.a)(w),[t]));case 4:e.next=7;break;case 6:C(w.filter((function(e){return e!=a.target.value})));case 7:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),W=function(){e.history.replace("/user/list")},X=function(){var a=Object(l.a)(n.a.mark((function a(t){var r;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,k.a.get(y.a+"menu_user");case 2:r=a.sent,e.setMenu(r.data),t?setTimeout((function(){e.history.push("/user/list")}),1e3):(h({name:"",email:"",rut:"",password:"",id_rol:""}),C([]),F(!1),B(!0));case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return m.a.createElement(p.a,null,m.a.createElement(b.a,{onSubmit:function(a){var t=a.currentTarget;if(a.preventDefault(),!1===t.checkValidity())return a.stopPropagation(),void F(!0);if(0===w.length)return a.stopPropagation(),F(!0),void x.b.error("Debe escoger al menos un m\xf3dulo para el usuario");var n=Object.assign({},r,{modules:w});if(!L&&!n.password)return x.b.error("Debe escribir una contrase\xf1a"),!1;L?k.a.put(y.a+"user/"+e.match.params.id,n).then((function(e){x.b.success("Usuario Modificado"),X(!0)})).catch((function(e){var a=e.response;a?x.b.error(a.data.message):x.b.error("Error, contacte con soporte")})):k.a.post(y.a+"user",n).then((function(e){x.b.success("Usuario Registrado"),X(!1)})).catch((function(e){var a=e.response;a?x.b.error(a.data.message):x.b.error("Error, contacte con soporte")}))},noValidate:!0,validated:I},m.a.createElement(E.a,null,m.a.createElement(f.a,{sm:5,md:5,lg:5,xs:12,style:{borderRight:"1px solid rgb(237, 237, 237)"}},m.a.createElement("h3",{className:"text-center font-title"},"Formulario"),m.a.createElement("br",null),m.a.createElement(E.a,null,m.a.createElement(j.a,Object.assign({},e.inputName,{handleChange:K,value:r.name})),m.a.createElement(j.a,Object.assign({},e.inputEmail,{handleChange:K,value:r.email}))),m.a.createElement(E.a,null,m.a.createElement(j.a,Object.assign({},e.inputRut,{handleChange:K,value:r.rut})),m.a.createElement(j.a,Object.assign({},e.inputPassword,{handleChange:K,value:r.password}))),m.a.createElement(E.a,null,m.a.createElement(j.a,Object.assign({},e.inputSelect,{handleChange:K,value:r.id_rol}),m.a.createElement("option",{value:""},"--Seleccione--"),_.map((function(e,a){return m.a.createElement("option",{key:a,value:e.id},e.name_role)})))),V?m.a.createElement(E.a,null,m.a.createElement(f.a,{sm:6,md:6,lg:6,xs:6},m.a.createElement(g.a,{size:"sm",type:"button",variant:"primary",block:!0,onClick:function(){return B(!1)}},"Registrar Otro ",m.a.createElement(d.o,null))),m.a.createElement(f.a,{sm:6,md:6,lg:6,xs:6},m.a.createElement(g.a,{size:"sm",type:"button",variant:"warning",block:!0,onClick:W},"Ir al listado ",m.a.createElement(d.y,null)))):m.a.createElement(E.a,null,m.a.createElement(f.a,{sm:12,md:12,lg:12,xs:12,className:"text-center"},m.a.createElement(g.a,{size:"sm",type:"submit",variant:"primary",block:!0},"Enviar ",m.a.createElement(d.o,null)),"o",m.a.createElement(g.a,{size:"sm",onClick:W,type:"button",variant:"info",block:!0},"Ir al Listado")))),m.a.createElement(f.a,{sm:7,md:7,lg:7,xs:12,className:"containerDivSeparated"},m.a.createElement("h3",{className:"text-center font-title"},"M\xf3dulos"),m.a.createElement(E.a,null,D.map((function(e,a){return m.a.createElement(f.a,{sm:4,md:4,lg:4,xs:6,key:a},m.a.createElement(b.a.Group,null,m.a.createElement(b.a.Check,{type:"checkbox",custom:!0,id:e.name_item+e.id,label:e.name_item,value:e.id,checked:!!w.find((function(a){return a==e.id})),onChange:function(a){return Q(a,e.id)}})))}))),m.a.createElement("div",{className:"fixedBottom"},m.a.createElement(E.a,null,m.a.createElement(f.a,{sm:6,md:6,lg:6,xs:12},m.a.createElement(g.a,{size:"sm",variant:"secondary",block:!0,onClick:function(){var e=D.map((function(e){return e.id}));C(e)}},"Seleccionar Todos ",m.a.createElement(d.c,null))),m.a.createElement(f.a,{sm:6,md:6,lg:6,xs:12},m.a.createElement(g.a,{size:"sm",variant:"secondary",block:!0,onClick:function(){C([])}},"Deseleccionar Todos ",m.a.createElement(d.v,null)))),m.a.createElement(E.a,{className:"justify-content-center"},m.a.createElement(f.a,{sm:12,md:12,lg:12},m.a.createElement("br",null),m.a.createElement("p",null,"Hacer click en el bot\xf3n enviar para guardar los cambios"))))))))});w.defaultProps={inputName:{type:"text",required:!0,name:"name",label:"Nombre Completo",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"},inputEmail:{type:"email",required:!0,name:"email",label:"Email",messageErrors:["Requerido*, ","Formato tipo Email*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"},inputRut:{type:"text",required:!0,name:"rut",label:"Documento Identidad",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"},inputPassword:{type:"password",required:!1,name:"password",label:"Contrase\xf1a",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"},inputSelect:{type:"select",required:!0,name:"id_rol",label:"Rol",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}},a.default=Object(h.b)(null,{setMenu:v.b})(w)}}]);
//# sourceMappingURL=31.1ed63ef9.chunk.js.map