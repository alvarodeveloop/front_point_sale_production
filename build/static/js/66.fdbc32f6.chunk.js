(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[66],{625:function(e,a,t){e.exports=t.p+"static/media/empty_logo.258d3697.jpg"},836:function(e,a,t){"use strict";t.r(a);var n=t(51),l=t(20),r=t(16),i=t(1),o=t.n(i),s=t(613),c=t(614),m=t(604),u=t(205),d=t(50),g=t(305),p=t(82),_=t(32),b=t(9),E=t.n(b),f=t(10),h=t(8),x=t(18),y=t(83);a.default=function(e){var a=Object(i.useState)({img_login:"",api_key_nuxo:"",rut_nuxo:"",password_nuxo:"",file_img_login:"",base64LoginImg:"",bussines_name:"",address:"",email:""}),b=Object(r.a)(a,2),v=b[0],w=b[1],j=Object(i.useState)(!1),k=Object(r.a)(j,2),O=k[0],q=k[1],C=Object(i.useState)(!0),R=Object(r.a)(C,2),I=R[0],L=R[1];Object(i.useEffect)((function(){N()}),[]),Object(i.useEffect)((function(){D()}),[v.base64LoginImg]);var N=function(){E.a.get(f.b+"config_aidy").then((function(e){w({img_login:e.data.img_login,api_key_nuxo:e.data.api_key_nuxo,rut_nuxo:e.data.rut_nuxo+"-"+e.data.dv_nuxo,password_nuxo:e.data.password_nuxo,bussines_name:e.data.bussines_name,address:e.data.address,email:e.data.email}),L(!1)})).catch((function(a){L(!1),e.tokenExpired(a)}))},D=function(){return v.base64LoginImg?o.a.createElement(s.a,{src:v.base64LoginImg,id:"img_show",style:{width:"100px",height:"100px"},roundedCircle:!0}):v.img_login?v.img_login?o.a.createElement(s.a,{src:f.b+"images/aidy/"+v.img_login,id:"img_show",style:{width:"100px",height:"100px"},roundedCircle:!0}):void 0:o.a.createElement(s.a,{src:t(625),id:"imagen_logo",style:{width:"80px"},roundedCircle:!0})},F=function(e){w(Object(l.a)(Object(l.a)({},v),{},Object(n.a)({},e.target.name,"rut_nuxo"===e.target.name?Object(x.b)(e.target.value):e.target.value)))};return o.a.createElement(c.a,null,I?o.a.createElement(y.a,null):o.a.createElement(m.a,null,o.a.createElement(u.a,{sm:12,md:12,lg:12},o.a.createElement(d.a,{onSubmit:function(a){var t=a.currentTarget;if(a.preventDefault(),!1===t.checkValidity())return a.stopPropagation(),void q(!0);var n=new FormData,l=Object.assign({},v);Object.keys(l).forEach((function(e,a){"file_img_login"===e?n.append("img_login",l[e]):"base64LoginImg"!==e&&n.append(e,l[e])})),L(!0),E.a.post(f.b+"config_aidy",n).then((function(e){h.b.success("Configuraci\xf3n guardada"),L(!1)})).catch((function(a){L(!1),e.tokenExpired(a)}))},noValidate:!0,validated:O},o.a.createElement(m.a,null,o.a.createElement(u.a,{sm:7,md:7,lg:7},o.a.createElement("h4",{className:"title_principal"},"Formulario de configuraci\xf3n de aidy")),o.a.createElement(u.a,{sm:5,md:5,lg:5},o.a.createElement(g.a,{variant:"danger",block:!0,type:"submit",size:"sm"},"Guardar ",o.a.createElement(_.H,null)))),o.a.createElement("hr",null),o.a.createElement(m.a,null,o.a.createElement(u.a,{sm:4,md:4,lg:4},o.a.createElement("br",null),o.a.createElement(g.a,{variant:"primary",block:!0,onClick:function(){document.getElementById("input_file_img_login").click()},type:"button",size:"sm"},"Escoger imagen login"),o.a.createElement("input",{type:"file",onChange:function(e){var a=e.target.files[0],t=new FileReader;t.onload=function(e){document.getElementById("input_file_img_login").src=e.target.result,w(Object(l.a)(Object(l.a)({},v),{},{file_img_login:a,base64LoginImg:e.target.result}))},t.readAsDataURL(a)},style:{display:"none"},id:"input_file_img_login"})),o.a.createElement(u.a,{sm:4,md:4,lg:4,className:"text-center"},D())),o.a.createElement(m.a,null,o.a.createElement(p.a,{type:"text",label:"Api Key Nuxo",name:"api_key_nuxo",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:v.api_key_nuxo,handleChange:F}),o.a.createElement(p.a,{type:"text",label:"Rut Nuxo",name:"rut_nuxo",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:v.rut_nuxo,handleChange:F}),o.a.createElement(p.a,{type:"password",label:"Password Nuxo",name:"password_nuxo",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:v.password_nuxo,handleChange:F})),o.a.createElement(m.a,null,o.a.createElement(p.a,{type:"text",label:"Nombre de la empresa",name:"bussines_name",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:v.bussines_name,handleChange:F}),o.a.createElement(p.a,{type:"text",label:"Direcci\xf3n",name:"address",required:!0,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:v.address,handleChange:F}),o.a.createElement(p.a,{type:"email",label:"Email",name:"email",required:!0,messageErrors:["Requerido* ","*Formato email requerido"],cols:"col-md-4 col-lg-4 col-sm-4",value:v.email,handleChange:F}))))))}}}]);