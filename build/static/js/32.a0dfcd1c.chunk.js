(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[32],{716:function(e,a,t){},824:function(e,a,t){"use strict";t.r(a);var r=t(24),n=t.n(r),l=t(130),c=t(53),s=t(47),o=t(26),i=t(41),m=t(1),u=t.n(m),d=t(25),p=t(631),b=t(52),E=t(632),g=t(319),f=t(320),h=t(656),v=t(37),j=t(208),O=t(170),_=t(17),x=t.n(_),k=t(15),y=t(18),S=(t(716),function(e){var a=Object(m.useState)({name:"",email:"",rut:"",password:"",id_rol:""}),r=Object(i.a)(a,2),v=r[0],j=r[1],_=Object(m.useState)({name:"",address:"",is_open:!0,id:""}),S=Object(i.a)(_,2),w=S[0],C=S[1],N=Object(m.useState)([]),q=Object(i.a)(N,2),R=q[0],D=q[1],z=Object(m.useState)([]),P=Object(i.a)(z,2),I=P[0],M=P[1],T=Object(m.useState)([]),J=Object(i.a)(T,2),V=J[0],F=J[1],G=Object(m.useState)(!1),U=Object(i.a)(G,2),A=U[0],B=U[1],H=Object(m.useState)(!1),L=Object(i.a)(H,2),K=(L[0],L[1],Object(m.useState)(!1)),Q=Object(i.a)(K,2),W=Q[0],X=Q[1],Y=Object(m.useState)(1),Z=Object(i.a)(Y,2),$=Z[0],ee=Z[1],ae=Object(m.useState)([]),te=Object(i.a)(ae,2),re=te[0],ne=te[1],le=Object(m.useState)(""),ce=Object(i.a)(le,2),se=ce[0],oe=ce[1];Object(m.useEffect)((function(){!function(){var a=[x.a.get(y.a+"modules"),x.a.get(y.a+"roles")];e.match.params.id>0&&a.push(x.a.get(y.a+"user/"+e.match.params.id)),Promise.all(a).then((function(a){F(a[0].data),M(a[1].data),e.match.params.id&&(j({name:a[2].data.user.name,email:a[2].data.user.email,rut:a[2].data.user.rut,password:"",id_rol:a[2].data.user.id_rol}),1==a[2].data.user.id_rol||3==a[2].data.user.id_rol||4==a[2].data.user.id_rol?D(a[2].data.modules.map((function(e){return e.id_menu}))):2==a[2].data.user.id_rol?(ee(2),ne(a[2].data.user.enterprise)):a[2].data.user.id_rol>4&&ee(3),a[2].data.message&&oe(a[2].data.message),X(!0))})).catch((function(e){k.b.error("Error, contacte con soporte")}))}()}),[]);var ie=function(e){"id_rol"===e.target.name&&(2==e.target.value?ee(2):e.target.value>=3&&e.target.value<=4||1==e.target.value?(ee(1),de()):(ee(3),de())),j(Object(o.a)(Object(o.a)({},v),{},Object(s.a)({},e.target.name,e.target.value)))},me=function(e){C(Object(o.a)(Object(o.a)({},w),{},Object(s.a)({},e.target.name,"is_open"===e.target.name?e.target.checked:e.target.value)))},ue=function(){var e=Object(c.a)(n.a.mark((function e(a,t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.persist(),!a.target.checked){e.next=6;break}return e.next=4,D([].concat(Object(l.a)(R),[t]));case 4:e.next=7;break;case 6:D(R.filter((function(e){return e!=a.target.value})));case 7:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),de=function(){C({name:"",address:"",is_open:!0,id:""})},pe=function(){var a=Object(c.a)(n.a.mark((function a(t){var r;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,x.a.get(y.a+"menu_user");case 2:r=a.sent,e.setMenu(r.data),t?setTimeout((function(){e.history.push("/user/list")}),1e3):(j({name:"",email:"",rut:"",password:"",id_rol:1}),D([]),B(!1),de());case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}(),be=function(e){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(a)de();else{var t=re.find((function(a){return a.id===e}));C({name:t.name,address:t.address,id:e,is_open:t.is_open})}};return u.a.createElement(p.a,null,u.a.createElement(b.a,{onSubmit:function(a){var t=a.currentTarget;if(a.preventDefault(),!1===t.checkValidity())return a.stopPropagation(),void B(!0);if(0===R.length&&(1==v.id_rol||3==v.id_rol||4==v.id_rol))return a.stopPropagation(),B(!0),void k.b.error("Debe escoger al menos un m\xf3dulo para el usuario");var r=Object.assign({},v,{modules:R,enterprise:w});if(!W&&!r.password)return k.b.error("Debe escribir una contrase\xf1a"),!1;var n=parseInt(JSON.parse(localStorage.getItem("user")).id_rol,10);r.id_rol>=4&&r.id_rol<=7&&(r.id_sucursal=localStorage.getItem("id_sucursal"));var l="";W?(l=n>=3&&n<=7?y.a+"user_by_branch_office/"+e.match.params.id:y.a+"user/"+e.match.params.id,x.a.put(l,r).then((function(e){k.b.success("Usuario Modificado"),pe(!0)})).catch((function(e){var a=e.response;a?k.b.error(a.data.message):k.b.error("Error, contacte con soporte")}))):(l=n>=3&&n<=7?y.a+"user_by_brach_office":y.a+"user",x.a.post(l,r).then((function(e){k.b.success("Usuario Registrado"),pe(!1)})).catch((function(e){var a=e.response;a?k.b.error(a.data.message):k.b.error("Error, contacte con soporte")})))},noValidate:!0,validated:A},u.a.createElement(E.a,null,u.a.createElement(g.a,{sm:$>4?12:5,md:$>4?12:5,lg:$>4?12:5,xs:12,style:{borderRight:"1px solid rgb(237, 237, 237)"}},u.a.createElement("h3",{className:"text-center font-title"},"Formulario"),u.a.createElement("br",null),u.a.createElement(E.a,null,u.a.createElement(O.a,Object.assign({},e.inputName,{handleChange:ie,value:v.name})),u.a.createElement(O.a,Object.assign({},e.inputEmail,{handleChange:ie,value:v.email}))),u.a.createElement(E.a,null,u.a.createElement(O.a,Object.assign({},e.inputRut,{handleChange:ie,value:v.rut})),u.a.createElement(O.a,Object.assign({},e.inputPassword,{handleChange:ie,value:v.password}))),u.a.createElement(E.a,null,u.a.createElement(O.a,Object.assign({},e.inputSelect,{cols:$<5?"col-md-6 col-sm-6 col-lg-6":"col-md-12 col-sm-12 col-lg-12",handleChange:ie,value:v.id_rol}),u.a.createElement("option",{value:""},"--Seleccione--"),I.map((function(e,a){return u.a.createElement("option",{key:a,value:e.id},e.name_role)})))),u.a.createElement(E.a,null,u.a.createElement(g.a,{sm:12,md:12,lg:12,xs:12,className:"text-center"},u.a.createElement(f.a,{size:"sm",type:"submit",variant:"primary",block:!0},"Enviar ",u.a.createElement(d.p,null)),"o",u.a.createElement(f.a,{size:"sm",onClick:function(){e.history.replace("/user/list")},type:"button",variant:"info",block:!0},"Ir al Listado"))),u.a.createElement("br",null),se?u.a.createElement("p",{className:"alert alert-info text-center"},se):""),1==$?u.a.createElement(g.a,{sm:7,md:7,lg:7,xs:12,className:"containerDivSeparated"},u.a.createElement("h3",{className:"text-center font-title"},"M\xf3dulos"),u.a.createElement(E.a,null,V.map((function(e,a){return u.a.createElement(g.a,{sm:4,md:4,lg:4,xs:6,key:a},u.a.createElement(b.a.Group,null,u.a.createElement(b.a.Check,{type:"checkbox",custom:!0,id:e.name_item+e.id,label:e.name_item,value:e.id,checked:!!R.find((function(a){return a==e.id})),onChange:function(a){return ue(a,e.id)}})))}))),u.a.createElement(E.a,{className:"fixedBottom"},u.a.createElement(g.a,{sm:12,md:12,lg:12},u.a.createElement("p",{className:"text-center"},"Hacer click en el bot\xf3n enviar para guardar los cambios")),u.a.createElement(g.a,{sm:6,md:6,lg:6,xs:12},u.a.createElement(f.a,{size:"sm",variant:"secondary",block:!0,onClick:function(){var e=V.map((function(e){return e.id}));D(e)}},"Seleccionar Todos ",u.a.createElement(d.d,null))),u.a.createElement(g.a,{sm:6,md:6,lg:6,xs:12},u.a.createElement(f.a,{size:"sm",variant:"secondary",block:!0,onClick:function(){D([])}},"Deseleccionar Todos ",u.a.createElement(d.x,null))))):2==$?u.a.createElement(g.a,{sm:7,md:7,lg:7,xs:12,className:"containerDivSeparated"},u.a.createElement("h3",{className:"text-center font-title"},"Datos de la Empresa"),W&&!w.id?u.a.createElement(E.a,null,re.map((function(e,a){return u.a.createElement(g.a,{sm:4,md:4,lg:4,className:"text-center",key:a},u.a.createElement("h5",{style:{color:"black",textTransform:"uppercase"}},e.name),u.a.createElement(h.a,{src:t(346),style:{width:"100%"}}),u.a.createElement("br",null),u.a.createElement(f.a,{size:"sm",variant:"danger",block:!0,onClick:function(){return be(e.id)}},"Modificar"))}))):u.a.createElement(E.a,null,u.a.createElement(g.a,{sm:12,md:12,lg:12},u.a.createElement(E.a,null,u.a.createElement(O.a,{type:"text",label:"Nombre empresa",name:"name",required:!0,messageErrors:["Requerido*"],cols:"col-md-6 col-lg-6 col-sm-6",value:w.name,handleChange:me}),u.a.createElement(O.a,{type:"text",label:"Direcci\xf3n",name:"address",required:!1,messageErrors:[],cols:"col-md-6 col-lg-6 col-sm-6",value:w.address,handleChange:me})),u.a.createElement(E.a,null,u.a.createElement(g.a,{sm:4,md:4,lg:4},u.a.createElement("br",null),u.a.createElement(b.a.Group,null,u.a.createElement(b.a.Check,{type:"checkbox",custom:!0,id:"is_open",name:"is_open",label:"Activa",value:w.is_open,checked:w.is_open,onChange:me})))),W?u.a.createElement(E.a,{className:"justify-content-center"},u.a.createElement(g.a,{sm:4,md:4,lg:4},u.a.createElement("br",null),u.a.createElement(f.a,{variant:"secondary",size:"sm",type:"button",block:!0,onClick:function(){return be(null,!0)}},"Ver Empresas ",u.a.createElement(d.a,null)))):""))):"")))});S.defaultProps={inputName:{type:"text",required:!0,name:"name",label:"Nombre Completo",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"},inputEmail:{type:"email",required:!0,name:"email",label:"Email",messageErrors:["Requerido*, ","Formato tipo Email*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"},inputRut:{type:"text",required:!0,name:"rut",label:"Documento Identidad",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"},inputPassword:{type:"password",required:!1,name:"password",label:"Contrase\xf1a",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"},inputSelect:{type:"select",required:!0,name:"id_rol",label:"Rol",messageErrors:["Requerido*"]}},a.default=Object(v.b)(null,{setMenu:j.b})(S)}}]);
//# sourceMappingURL=32.a0dfcd1c.chunk.js.map