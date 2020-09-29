(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[24],{670:function(e,a,t){"use strict";var n=t(3),o=t(4),r=t(5),c=t.n(r),l=t(1),s=t.n(l),i=(t(335),t(8)),u=s.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.placement,l=e.className,u=e.style,d=e.children,p=e.arrowProps,m=(e.popper,e.show,Object(o.a)(e,["bsPrefix","placement","className","style","children","arrowProps","popper","show"]));t=Object(i.a)(t,"tooltip");var f=((null==r?void 0:r.split("-"))||[])[0];return s.a.createElement("div",Object(n.a)({ref:a,style:u,role:"tooltip","x-placement":f,className:c()(l,t,"bs-tooltip-"+f)},m),s.a.createElement("div",Object(n.a)({className:"arrow"},p)),s.a.createElement("div",{className:t+"-inner"},d))}));u.defaultProps={placement:"right"},u.displayName="Tooltip",a.a=u},672:function(e,a,t){"use strict";var n=t(3),o=t(4),r=t(13),c=t(216),l=t(1),s=t.n(l),i=t(218),u=t(214),d=(t(97),t(59)),p=t(5),m=t.n(p),f=t(2),b=t.n(f),g=t(34),h=t.n(g),E=t(127),O=t(69),j=t(221),v=t(222),y=t(223),x=t(684),_=t(219),w=s.a.forwardRef((function(e,a){var t=e.flip,r=e.offset,c=e.placement,i=e.containerPadding,u=void 0===i?5:i,d=e.popperConfig,p=void 0===d?{}:d,m=e.transition,f=Object(E.a)(),b=f[0],g=f[1],j=Object(E.a)(),w=j[0],C=j[1],k=Object(O.a)(g,a),N=Object(x.a)(e.container),P=Object(x.a)(e.target),q=Object(l.useState)(!e.show),S=q[0],T=q[1],R=Object(v.a)(P,b,Object(_.a)({placement:c,enableEvents:!!e.show,containerPadding:u||5,flip:t,offset:r,arrowElement:w,popperConfig:p})),D=R.styles,F=R.attributes,A=Object(o.a)(R,["styles","attributes"]);e.show?S&&T(!1):e.transition||S||T(!0);var z=e.show||m&&!S;if(Object(y.a)(b,e.onHide,{disabled:!e.rootClose||e.rootCloseDisabled,clickTrigger:e.rootCloseEvent}),!z)return null;var H=e.children(Object(n.a)({},A,{show:!!e.show,props:Object(n.a)({},F.popper,{style:D.popper,ref:k}),arrowProps:Object(n.a)({},F.arrow,{style:D.arrow,ref:C})}));if(m){var B=e.onExit,I=e.onExiting,J=e.onEnter,L=e.onEntering,M=e.onEntered;H=s.a.createElement(m,{in:e.show,appear:!0,onExit:B,onExiting:I,onExited:function(){T(!0),e.onExited&&e.onExited.apply(e,arguments)},onEnter:J,onEntering:L,onEntered:M},H)}return N?h.a.createPortal(H,N):null}));w.displayName="Overlay",w.propTypes={show:b.a.bool,placement:b.a.oneOf(j.b),target:b.a.any,container:b.a.any,flip:b.a.bool,children:b.a.func.isRequired,containerPadding:b.a.number,popperConfig:b.a.object,rootClose:b.a.bool,rootCloseEvent:b.a.oneOf(["click","mousedown"]),rootCloseDisabled:b.a.bool,onHide:function(e){for(var a=arguments.length,t=new Array(a>1?a-1:0),n=1;n<a;n++)t[n-1]=arguments[n];var o;return e.rootClose?(o=b.a.func).isRequired.apply(o,[e].concat(t)):b.a.func.apply(b.a,[e].concat(t))},transition:b.a.elementType,onEnter:b.a.func,onEntering:b.a.func,onEntered:b.a.func,onExit:b.a.func,onExiting:b.a.func,onExited:b.a.func};var C=w,k=t(220),N=t(674),P={transition:N.a,rootClose:!1,show:!1,placement:"top"};function q(e){var a=e.children,t=e.transition,r=e.popperConfig,c=void 0===r?{}:r,i=Object(o.a)(e,["children","transition","popperConfig"]),d=Object(l.useRef)({}),p=Object(k.a)(),f=p[0],b=p[1],g=!0===t?N.a:t||null;return s.a.createElement(C,Object(n.a)({},i,{ref:f,popperConfig:Object(n.a)({},c,{modifiers:b.concat(c.modifiers||[])}),transition:g}),(function(e){var r,c=e.props,l=e.arrowProps,i=e.show,p=e.update,f=(e.forceUpdate,e.placement),b=e.state,g=Object(o.a)(e,["props","arrowProps","show","update","forceUpdate","placement","state"]);!function(e,a){var t=e.ref,n=a.ref;e.ref=t.__wrapped||(t.__wrapped=function(e){return t(Object(u.a)(e))}),a.ref=n.__wrapped||(n.__wrapped=function(e){return n(Object(u.a)(e))})}(c,l);var h=Object.assign(d.current,{state:b,scheduleUpdate:p,placement:f,outOfBoundaries:(null==b||null==(r=b.modifiersData.hide)?void 0:r.isReferenceHidden)||!1});return"function"===typeof a?a(Object(n.a)({},g,{},c,{placement:f,show:i,popper:h,arrowProps:l})):s.a.cloneElement(a,Object(n.a)({},g,{},c,{placement:f,arrowProps:l,popper:h,className:m()(a.props.className,!t&&i&&"show"),style:Object(n.a)({},a.props.style,{},c.style)}))}))}q.defaultProps=P;var S=q,T=function(e){function a(){return e.apply(this,arguments)||this}return Object(r.a)(a,e),a.prototype.render=function(){return this.props.children},a}(s.a.Component);function R(e,a,t){var n=a[0],o=n.currentTarget,r=n.relatedTarget||n.nativeEvent[t];r&&r===o||Object(c.a)(o,r)||e.apply(void 0,a)}function D(e){var a=e.trigger,t=e.overlay,r=e.children,c=e.popperConfig,p=void 0===c?{}:c,m=e.show,f=e.defaultShow,b=void 0!==f&&f,g=e.onToggle,h=e.delay,E=e.placement,O=e.flip,j=void 0===O?E&&-1!==E.indexOf("auto"):O,v=Object(o.a)(e,["trigger","overlay","children","popperConfig","show","defaultShow","onToggle","delay","placement","flip"]),y=Object(l.useRef)(null),x=Object(i.a)(),_=Object(l.useRef)(""),w=Object(d.b)(m,b,g),C=w[0],k=w[1],N=function(e){return e&&"object"===typeof e?e:{show:e,hide:e}}(h),P="function"!==typeof r?s.a.Children.only(r).props:{},q=P.onFocus,D=P.onBlur,F=P.onClick,A=Object(l.useCallback)((function(){return Object(u.a)(y.current)}),[]),z=Object(l.useCallback)((function(){x.clear(),_.current="show",N.show?x.set((function(){"show"===_.current&&k(!0)}),N.show):k(!0)}),[N.show,k,x]),H=Object(l.useCallback)((function(){x.clear(),_.current="hide",N.hide?x.set((function(){"hide"===_.current&&k(!1)}),N.hide):k(!1)}),[N.hide,k,x]),B=Object(l.useCallback)((function(){z();for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];null==q||q.apply(void 0,a)}),[z,q]),I=Object(l.useCallback)((function(){H();for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];null==D||D.apply(void 0,a)}),[H,D]),J=Object(l.useCallback)((function(){k(!C),F&&F.apply(void 0,arguments)}),[F,k,C]),L=Object(l.useCallback)((function(){for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];R(z,a,"fromElement")}),[z]),M=Object(l.useCallback)((function(){for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];R(H,a,"toElement")}),[H]),U=null==a?[]:[].concat(a),V={};return-1!==U.indexOf("click")&&(V.onClick=J),-1!==U.indexOf("focus")&&(V.onFocus=B,V.onBlur=I),-1!==U.indexOf("hover")&&(V.onMouseOver=L,V.onMouseOut=M),s.a.createElement(s.a.Fragment,null,"function"===typeof r?r(Object(n.a)({},V,{ref:y})):s.a.createElement(T,{ref:y},Object(l.cloneElement)(r,V)),s.a.createElement(S,Object(n.a)({},v,{show:C,onHide:H,flip:j,placement:E,popperConfig:p,target:A}),t))}D.defaultProps={defaultShow:!1,trigger:["hover","focus"]};a.a=D},674:function(e,a,t){"use strict";var n,o=t(3),r=t(4),c=t(5),l=t.n(c),s=t(129),i=t(1),u=t.n(i),d=t(82),p=t(132),m=((n={})[d.b]="show",n[d.a]="show",n),f=u.a.forwardRef((function(e,a){var t=e.className,n=e.children,c=Object(r.a)(e,["className","children"]),f=Object(i.useCallback)((function(e){Object(p.a)(e),c.onEnter&&c.onEnter(e)}),[c]);return u.a.createElement(d.e,Object(o.a)({ref:a,addEndListener:s.a},c,{onEnter:f}),(function(e,a){return u.a.cloneElement(n,Object(o.a)({},a,{className:l()("fade",t,n.props.className,m[e])}))}))}));f.defaultProps={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1},f.displayName="Fade",a.a=f},675:function(e,a,t){e.exports=t.p+"static/media/empty_logo.258d3697.jpg"},684:function(e,a,t){"use strict";t.d(a,"a",(function(){return c}));var n=t(126),o=t(1),r=function(e){var a;return"undefined"===typeof document?null:null==e?Object(n.a)().body:("function"===typeof e&&(e=e()),e&&"current"in e&&(e=e.current),(null==(a=e)?void 0:a.nodeType)&&e||null)};function c(e,a){var t=Object(o.useState)((function(){return r(e)})),n=t[0],c=t[1];if(!n){var l=r(e);l&&c(l)}return Object(o.useEffect)((function(){a&&n&&a(n)}),[a,n]),Object(o.useEffect)((function(){var a=r(e);a!==n&&c(a)}),[e,n]),n}},801:function(e,a,t){"use strict";t.d(a,"b",(function(){return n})),t.d(a,"a",(function(){return o}));var n=function(e){return{type:"setConfigStore",configStore:e}},o=function(e){return{type:"setConfig",config:e}}},830:function(e,a,t){"use strict";t.r(a);var n,o=t(47),r=t(26),c=t(41),l=t(1),s=t.n(l),i=t(17),u=t.n(i),d=t(37),p=t(25),m=t(170),f=t(15),b=t(18),g=t(801),h=t(672),E=t(670),O=t(656),j=t(631),v=t(52),y=t(632),x=t(319),_=t(320),w=function(e){var a,n,i,d=Object(l.useState)({logo:"",name_store:"",country:"",phone:"",whatssap:"",address:"",email:"",tax:"",handle_stock:!1,header_text:"",foot_page_text:"",client_data_foot_page:"",ref:1}),g=Object(c.a)(d,2),w=g[0],C=g[1],k=Object(l.useState)([]),N=Object(c.a)(k,2),P=N[0],q=N[1],S=Object(l.useState)([]),T=Object(c.a)(S,2),R=T[0],D=T[1],F=Object(l.useState)(!1),A=Object(c.a)(F,2),z=A[0],H=A[1],B=Object(l.useState)(!1),I=Object(c.a)(B,2),J=I[0],L=I[1],M=Object(l.useState)(s.a.createElement(O.a,{src:t(675),id:"imagen_logo",style:{width:"80px"},roundedCircle:!0})),U=Object(c.a)(M,2),V=U[0],W=U[1];Object(l.useEffect)((function(){K()}),[]);var G=function(e){"client_data_foot_page"===e.target.name?C(Object(r.a)(Object(r.a)({},w),{},Object(o.a)({},e.target.name,"true"===e.target.value))):C(Object(r.a)(Object(r.a)({},w),{},Object(o.a)({},e.target.name,e.target.value)))},K=function(){var a=[u.a.get(b.a+"country")];e.match.params.id&&a.push(u.a.get(b.a+"config_store")),Promise.all(a).then((function(e){D(e[0].data),e.length>1&&(C({logo:e[1].data.logo,name_store:e[1].data.name_store,country:e[1].data.country,phone:e[1].data.phone,whatssap:e[1].data.whatssap,address:e[1].data.address,email:e[1].data.email,header_text:e[1].data.header_text,tax:e[1].data.tax,handle_stock:e[1].data.handle_stock,foot_page_text:e[1].data.foot_page_text,client_data_foot_page:e[1].data.client_data_foot_page,ref:e[1].data.ref}),L(!0),e[1].data.logo&&W(s.a.createElement(O.a,{src:b.a+"images/store/logo/"+e[1].data.logo,id:"imagen_logo",style:{width:"80px"},roundedCircle:!0})))})).catch((function(e){e.response?f.b.error(e.response.data.message):(console.log(e),f.b.error("Error,contacte con soporte"))}))};return s.a.createElement(j.a,null,s.a.createElement(v.a,{onSubmit:function(a){var t=a.currentTarget;if(a.preventDefault(),!1===t.checkValidity())return a.stopPropagation(),void H(!0);var n=new FormData;Object.keys(w).forEach((function(e,a){"logo"===e?P&&n.append(e,P):n.append(e,w[e])})),J?u.a.put(b.a+"config_store/"+e.match.params.id,n).then((function(a){f.b.success("Configuraci\xf3n Modificada"),localStorage.setItem("configStore",JSON.stringify(a.data)),setTimeout((function(){e.history.push("/config/config_store")}),1500)})).catch((function(e){var a=e.response;a?f.b.error(a.data.message):f.b.error("Error, contacte con soporte")})):u.a.post(b.a+"config_store",n).then((function(a){f.b.success("Configuraci\xf3n Creada"),localStorage.setItem("configStore",JSON.stringify(a.data)),setTimeout((function(){e.history.push("/config/config_store")}),1500)})).catch((function(e){var a=e.response;a?f.b.error(a.data.message):f.b.error("Error, contacte con soporte")}))},noValidate:!0,validated:z},s.a.createElement(y.a,{className:"justify-content-center containerDiv"},s.a.createElement(x.a,{sm:12,md:12,lg:12},s.a.createElement("h3",{className:"text-center font-title"},"Datos de la Tienda"),s.a.createElement("br",null)),s.a.createElement(x.a,{sm:6,md:6,lg:6,xs:6,className:""},s.a.createElement("br",null),s.a.createElement(y.a,{className:"align-items-center"},s.a.createElement(x.a,{sm:6,md:6,lg:6,xs:6},s.a.createElement(_.a,(a={size:"sm"},Object(o.a)(a,"size","sm"),Object(o.a)(a,"onClick",(function(){document.getElementById("file_logo").click()})),Object(o.a)(a,"variant","secondary"),Object(o.a)(a,"block","true"),a),"Escoger Logo ",s.a.createElement(p.l,null)),s.a.createElement("input",{type:"file",id:"file_logo",style:{display:"none"},onChange:function(e){var a=e.target.files[0],t=new FileReader;t.onload=function(e){document.getElementById("imagen_logo").src=e.target.result,q(a)},t.readAsDataURL(a)}})),s.a.createElement(x.a,{sm:6,md:6,lg:6,xs:6,className:"text-center"},V)),s.a.createElement("br",null),s.a.createElement(y.a,null,s.a.createElement(m.a,Object.assign({},e.inputNameStore,{handleChange:G,value:w.name_store})),s.a.createElement(m.a,Object.assign({},e.inputEmail,{handleChange:G,value:w.email}))),s.a.createElement(y.a,null,s.a.createElement(m.a,Object.assign({},e.inputCountry,{handleChange:G,value:w.country}),s.a.createElement("option",{value:""},"--Seleccione--"),R.map((function(e,a){return s.a.createElement("option",{value:e.id,key:a},e.nombre)}))),s.a.createElement(m.a,Object.assign({},e.inputPhone,{handleChange:G,value:w.phone}))),s.a.createElement(y.a,null,s.a.createElement(m.a,Object.assign({},e.inputWhatssap,{handleChange:G,value:w.whatssap})),s.a.createElement(m.a,Object.assign({},e.inputAddress,{handleChange:G,value:w.address}))),s.a.createElement(h.a,{placement:"top",overlay:s.a.createElement(E.a,{id:"tooltip-disabled1"},"Campos para especificar el tax que se le va a colocar a los productos y si se maneja inventario a la hora de facturar una venta")},s.a.createElement(y.a,null,s.a.createElement(m.a,Object.assign({},e.inputTax,{handleChange:G,value:w.tax})),s.a.createElement(m.a,Object.assign({},e.inputHandleStock,{handleChange:G,value:w.handle_stock}),s.a.createElement("option",{value:!1},"No"),s.a.createElement("option",{value:!0},"Si")))),s.a.createElement(h.a,{placement:"top",overlay:s.a.createElement(E.a,{id:"tooltip-disabled1"},"Campo para determinar desde que n\xfamero empieza la facturaci\xf3n en las ventas")},s.a.createElement(y.a,null,s.a.createElement(m.a,Object.assign({},e.inputRef,{handleChange:G,value:w.ref}))))),s.a.createElement(x.a,{sm:6,md:6,lg:6,xs:6,className:""},s.a.createElement("h4",{className:"text-center font-title"},"Datos de la Factura"),s.a.createElement(h.a,{placement:"top",overlay:s.a.createElement(E.a,{id:"tooltip-disabled1"},"Campos para especificar que texto saldr\xe1 en el encabezado de la factura y en el pie de p\xe1gina ( No es requerido )")},s.a.createElement(y.a,null,s.a.createElement(m.a,Object.assign({},e.inputHeaderText,{handleChange:G,value:w.header_text})),s.a.createElement(m.a,Object.assign({},e.inputFooterPageText,{handleChange:G,value:w.foot_page_text})))),s.a.createElement("br",null),s.a.createElement(y.a,null,s.a.createElement(x.a,{sm:12,md:12,lg:12,xs:12},s.a.createElement("label",{htmlFor:"",className:"form-control-label"},"Datos del Cliente en el Pie de P\xe1gina")),s.a.createElement("br",null),s.a.createElement(x.a,{sm:6,md:6,lg:6,xs:6},s.a.createElement("label",{htmlFor:"check1",className:"form-control-label"},"Activado"),"\xa0\xa0\xa0",s.a.createElement("input",{id:"check1",name:"client_data_foot_page",type:"checkbox",checked:!0===w.client_data_foot_page,value:!0,onChange:G})),s.a.createElement(x.a,{sm:6,md:6,lg:6,xs:6},s.a.createElement("label",{htmlFor:"check2",className:"form-control-label"},"Desactivado"),"\xa0\xa0\xa0",s.a.createElement("input",{id:"check2",name:"client_data_foot_page",type:"checkbox",checked:!1===w.client_data_foot_page,value:!1,onChange:G}))),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement(y.a,{className:"justify-content-center"},s.a.createElement(x.a,{sm:12,md:12,lg:12,xs:12,className:""},s.a.createElement(_.a,(n={size:"sm"},Object(o.a)(n,"size","sm"),Object(o.a)(n,"type","submit"),Object(o.a)(n,"variant","primary"),Object(o.a)(n,"block",!0),n),"Guardar ",s.a.createElement(p.p,null)),s.a.createElement("br",null),s.a.createElement("p",{className:"text-center"},"O"),s.a.createElement(_.a,(i={size:"sm"},Object(o.a)(i,"size","sm"),Object(o.a)(i,"type","button"),Object(o.a)(i,"onClick",(function(){e.history.replace("/config/config_store")})),Object(o.a)(i,"variant","info"),Object(o.a)(i,"block",!0),i),"Volver a la Configuracipon ",s.a.createElement(p.g,null))))))))};w.defaultProps=(n={inputNameStore:{type:"file",required:!1,name:"logo",label:"Logo de la Tienda",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}},Object(o.a)(n,"inputNameStore",{type:"text",required:!0,name:"name_store",label:"Nombre de la Tienda",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputEmail",{type:"email",required:!0,name:"email",label:"Correo",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputCountry",{type:"select",required:!0,name:"country",label:"Pa\xeds",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputPhone",{type:"number",required:!0,name:"phone",label:"Tel\xe9fono",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputWhatssap",{type:"number",required:!1,name:"whatssap",label:"Whatssap",messageErrors:[],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputAddress",{type:"textarea",required:!0,name:"address",label:"Direcci\xf3n",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputTax",{type:"number",required:!0,name:"tax",label:"Tax",messageErrors:[],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputHandleStock",{type:"select",required:!0,name:"handle_stock",label:"Maneja Inventario",messageErrors:[],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputHeaderText",{type:"text",required:!1,name:"header_text",label:"Texto de Cabecera",messageErrors:[],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputFooterPageText",{type:"text",required:!1,name:"foot_page_text",label:"Texto Pie de P\xe1gina",messageErrors:[],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputClientDataFoot",{type:"select",required:!0,name:"client_data_foot_page",label:"Datos del Cliente en el Pie de P\xe1gina",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputRut",{type:"text",required:!0,name:"rut",label:"Rut de la tienda",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputRef",{type:"number",required:!0,name:"ref",label:"N\xfamero de referencia",placeholder:"N\xfamero de referencia de venta",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),n),a.default=Object(d.b)(null,(function(){return{setConfigStore:g.b}}))(w)}}]);
//# sourceMappingURL=24.19e7c4b7.chunk.js.map