(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[17],{661:function(e,a,t){"use strict";var n,o=t(3),r=t(4),l=t(5),c=t.n(l),s=t(128),i=t(1),u=t.n(i),d=t(80),m=t(131),p=((n={})[d.b]="show",n[d.a]="show",n),f=u.a.forwardRef((function(e,a){var t=e.className,n=e.children,l=Object(r.a)(e,["className","children"]),f=Object(i.useCallback)((function(e){Object(m.a)(e),l.onEnter&&l.onEnter(e)}),[l]);return u.a.createElement(d.e,Object(o.a)({ref:a,addEndListener:s.a},l,{onEnter:f}),(function(e,a){return u.a.cloneElement(n,Object(o.a)({},a,{className:c()("fade",t,n.props.className,p[e])}))}))}));f.defaultProps={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1},f.displayName="Fade",a.a=f},663:function(e,a,t){"use strict";var n=t(3),o=t(4),r=t(5),l=t.n(r),c=t(1),s=t.n(c),i=(t(333),t(8)),u=s.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.placement,c=e.className,u=e.style,d=e.children,m=e.arrowProps,p=(e.popper,e.show,Object(o.a)(e,["bsPrefix","placement","className","style","children","arrowProps","popper","show"]));t=Object(i.a)(t,"tooltip");var f=((null==r?void 0:r.split("-"))||[])[0];return s.a.createElement("div",Object(n.a)({ref:a,style:u,role:"tooltip","x-placement":f,className:l()(c,t,"bs-tooltip-"+f)},p),s.a.createElement("div",Object(n.a)({className:"arrow"},m)),s.a.createElement("div",{className:t+"-inner"},d))}));u.defaultProps={placement:"right"},u.displayName="Tooltip",a.a=u},664:function(e,a,t){"use strict";var n=t(3),o=t(4),r=t(13),l=t(216),c=t(1),s=t.n(c),i=t(217),u=t(212),d=(t(96),t(56)),m=t(5),p=t.n(m),f=t(2),b=t.n(f),g=t(33),h=t.n(g),E=t(127),O=t(67),j=t(220),v=t(221),y=t(222),x=t(672),_=t(218),C=s.a.forwardRef((function(e,a){var t=e.flip,r=e.offset,l=e.placement,i=e.containerPadding,u=void 0===i?5:i,d=e.popperConfig,m=void 0===d?{}:d,p=e.transition,f=Object(E.a)(),b=f[0],g=f[1],j=Object(E.a)(),C=j[0],w=j[1],k=Object(O.a)(g,a),N=Object(x.a)(e.container),P=Object(x.a)(e.target),q=Object(c.useState)(!e.show),S=q[0],T=q[1],R=Object(v.a)(P,b,Object(_.a)({placement:l,enableEvents:!!e.show,containerPadding:u||5,flip:t,offset:r,arrowElement:C,popperConfig:m})),D=R.styles,F=R.attributes,A=Object(o.a)(R,["styles","attributes"]);e.show?S&&T(!1):e.transition||S||T(!0);var z=e.show||p&&!S;if(Object(y.a)(b,e.onHide,{disabled:!e.rootClose||e.rootCloseDisabled,clickTrigger:e.rootCloseEvent}),!z)return null;var H=e.children(Object(n.a)({},A,{show:!!e.show,props:Object(n.a)({},F.popper,{style:D.popper,ref:k}),arrowProps:Object(n.a)({},F.arrow,{style:D.arrow,ref:w})}));if(p){var I=e.onExit,B=e.onExiting,J=e.onEnter,L=e.onEntering,M=e.onEntered;H=s.a.createElement(p,{in:e.show,appear:!0,onExit:I,onExiting:B,onExited:function(){T(!0),e.onExited&&e.onExited.apply(e,arguments)},onEnter:J,onEntering:L,onEntered:M},H)}return N?h.a.createPortal(H,N):null}));C.displayName="Overlay",C.propTypes={show:b.a.bool,placement:b.a.oneOf(j.b),target:b.a.any,container:b.a.any,flip:b.a.bool,children:b.a.func.isRequired,containerPadding:b.a.number,popperConfig:b.a.object,rootClose:b.a.bool,rootCloseEvent:b.a.oneOf(["click","mousedown"]),rootCloseDisabled:b.a.bool,onHide:function(e){for(var a=arguments.length,t=new Array(a>1?a-1:0),n=1;n<a;n++)t[n-1]=arguments[n];var o;return e.rootClose?(o=b.a.func).isRequired.apply(o,[e].concat(t)):b.a.func.apply(b.a,[e].concat(t))},transition:b.a.elementType,onEnter:b.a.func,onEntering:b.a.func,onEntered:b.a.func,onExit:b.a.func,onExiting:b.a.func,onExited:b.a.func};var w=C,k=t(219),N=t(661),P={transition:N.a,rootClose:!1,show:!1,placement:"top"};function q(e){var a=e.children,t=e.transition,r=e.popperConfig,l=void 0===r?{}:r,i=Object(o.a)(e,["children","transition","popperConfig"]),d=Object(c.useRef)({}),m=Object(k.a)(),f=m[0],b=m[1],g=!0===t?N.a:t||null;return s.a.createElement(w,Object(n.a)({},i,{ref:f,popperConfig:Object(n.a)({},l,{modifiers:b.concat(l.modifiers||[])}),transition:g}),(function(e){var r,l=e.props,c=e.arrowProps,i=e.show,m=e.update,f=(e.forceUpdate,e.placement),b=e.state,g=Object(o.a)(e,["props","arrowProps","show","update","forceUpdate","placement","state"]);!function(e,a){var t=e.ref,n=a.ref;e.ref=t.__wrapped||(t.__wrapped=function(e){return t(Object(u.a)(e))}),a.ref=n.__wrapped||(n.__wrapped=function(e){return n(Object(u.a)(e))})}(l,c);var h=Object.assign(d.current,{state:b,scheduleUpdate:m,placement:f,outOfBoundaries:(null==b||null==(r=b.modifiersData.hide)?void 0:r.isReferenceHidden)||!1});return"function"===typeof a?a(Object(n.a)({},g,{},l,{placement:f,show:i,popper:h,arrowProps:c})):s.a.cloneElement(a,Object(n.a)({},g,{},l,{placement:f,arrowProps:c,popper:h,className:p()(a.props.className,!t&&i&&"show"),style:Object(n.a)({},a.props.style,{},l.style)}))}))}q.defaultProps=P;var S=q,T=function(e){function a(){return e.apply(this,arguments)||this}return Object(r.a)(a,e),a.prototype.render=function(){return this.props.children},a}(s.a.Component);function R(e,a,t){var n=a[0],o=n.currentTarget,r=n.relatedTarget||n.nativeEvent[t];r&&r===o||Object(l.a)(o,r)||e.apply(void 0,a)}function D(e){var a=e.trigger,t=e.overlay,r=e.children,l=e.popperConfig,m=void 0===l?{}:l,p=e.show,f=e.defaultShow,b=void 0!==f&&f,g=e.onToggle,h=e.delay,E=e.placement,O=e.flip,j=void 0===O?E&&-1!==E.indexOf("auto"):O,v=Object(o.a)(e,["trigger","overlay","children","popperConfig","show","defaultShow","onToggle","delay","placement","flip"]),y=Object(c.useRef)(null),x=Object(i.a)(),_=Object(c.useRef)(""),C=Object(d.b)(p,b,g),w=C[0],k=C[1],N=function(e){return e&&"object"===typeof e?e:{show:e,hide:e}}(h),P="function"!==typeof r?s.a.Children.only(r).props:{},q=P.onFocus,D=P.onBlur,F=P.onClick,A=Object(c.useCallback)((function(){return Object(u.a)(y.current)}),[]),z=Object(c.useCallback)((function(){x.clear(),_.current="show",N.show?x.set((function(){"show"===_.current&&k(!0)}),N.show):k(!0)}),[N.show,k,x]),H=Object(c.useCallback)((function(){x.clear(),_.current="hide",N.hide?x.set((function(){"hide"===_.current&&k(!1)}),N.hide):k(!1)}),[N.hide,k,x]),I=Object(c.useCallback)((function(){z();for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];null==q||q.apply(void 0,a)}),[z,q]),B=Object(c.useCallback)((function(){H();for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];null==D||D.apply(void 0,a)}),[H,D]),J=Object(c.useCallback)((function(){k(!w),F&&F.apply(void 0,arguments)}),[F,k,w]),L=Object(c.useCallback)((function(){for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];R(z,a,"fromElement")}),[z]),M=Object(c.useCallback)((function(){for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];R(H,a,"toElement")}),[H]),U=null==a?[]:[].concat(a),V={};return-1!==U.indexOf("click")&&(V.onClick=J),-1!==U.indexOf("focus")&&(V.onFocus=I,V.onBlur=B),-1!==U.indexOf("hover")&&(V.onMouseOver=L,V.onMouseOut=M),s.a.createElement(s.a.Fragment,null,"function"===typeof r?r(Object(n.a)({},V,{ref:y})):s.a.createElement(T,{ref:y},Object(c.cloneElement)(r,V)),s.a.createElement(S,Object(n.a)({},v,{show:w,onHide:H,flip:j,placement:E,popperConfig:m,target:A}),t))}D.defaultProps={defaultShow:!1,trigger:["hover","focus"]};a.a=D},666:function(e,a,t){e.exports=t.p+"static/media/empty_logo.258d3697.jpg"},672:function(e,a,t){"use strict";t.d(a,"a",(function(){return l}));var n=t(126),o=t(1),r=function(e){var a;return"undefined"===typeof document?null:null==e?Object(n.a)().body:("function"===typeof e&&(e=e()),e&&"current"in e&&(e=e.current),(null==(a=e)?void 0:a.nodeType)&&e||null)};function l(e,a){var t=Object(o.useState)((function(){return r(e)})),n=t[0],l=t[1];if(!n){var c=r(e);c&&l(c)}return Object(o.useEffect)((function(){a&&n&&a(n)}),[a,n]),Object(o.useEffect)((function(){var a=r(e);a!==n&&l(a)}),[e,n]),n}},676:function(e,a,t){"use strict";var n=t(3),o=t(4),r=t(5),l=t.n(r),c=t(1),s=t.n(c),i=t(2),u=t.n(i),d=t(8),m=(u.a.string,u.a.bool,u.a.bool,u.a.bool,u.a.bool,s.a.forwardRef((function(e,a){var t=e.bsPrefix,r=e.className,c=e.fluid,i=e.rounded,u=e.roundedCircle,m=e.thumbnail,p=Object(o.a)(e,["bsPrefix","className","fluid","rounded","roundedCircle","thumbnail"]);t=Object(d.a)(t,"img");var f=l()(c&&t+"-fluid",i&&"rounded",u&&"rounded-circle",m&&t+"-thumbnail");return s.a.createElement("img",Object(n.a)({ref:a},p,{className:l()(r,f)}))})));m.displayName="Image",m.defaultProps={fluid:!1,rounded:!1,roundedCircle:!1,thumbnail:!1},a.a=m},693:function(e,a,t){"use strict";t.d(a,"b",(function(){return n})),t.d(a,"a",(function(){return o}));var n=function(e){return{type:"setConfigStore",configStore:e}},o=function(e){return{type:"setConfig",config:e}}},728:function(e,a,t){"use strict";t.r(a);var n,o=t(45),r=t(23),l=t(61),c=t(1),s=t.n(c),i=t(21),u=t.n(i),d=t(36),m=t(29),p=t(171),f=t(15),b=t(32),g=t(693),h=t(664),E=t(663),O=t(676),j=t(626),v=t(50),y=t(627),x=t(318),_=t(319),C=function(e){var a,n,i,d=Object(c.useState)({logo:"",name_store:"",country:"",phone:"",whatssap:"",address:"",email:"",tax:"",handle_stock:!1,header_text:"",foot_page_text:"",client_data_foot_page:"",ref:1}),g=Object(l.a)(d,2),C=g[0],w=g[1],k=Object(c.useState)([]),N=Object(l.a)(k,2),P=N[0],q=N[1],S=Object(c.useState)([]),T=Object(l.a)(S,2),R=T[0],D=T[1],F=Object(c.useState)(!1),A=Object(l.a)(F,2),z=A[0],H=A[1],I=Object(c.useState)(!1),B=Object(l.a)(I,2),J=B[0],L=B[1],M=Object(c.useState)(s.a.createElement(O.a,{src:t(666),id:"imagen_logo",style:{width:"80px"},roundedCircle:!0})),U=Object(l.a)(M,2),V=U[0],W=U[1];Object(c.useEffect)((function(){K()}),[]);var G=function(e){"client_data_foot_page"===e.target.name?w(Object(r.a)(Object(r.a)({},C),{},Object(o.a)({},e.target.name,"true"===e.target.value))):w(Object(r.a)(Object(r.a)({},C),{},Object(o.a)({},e.target.name,e.target.value)))},K=function(){var a=[u.a.get(b.a+"country")];e.match.params.id&&a.push(u.a.get(b.a+"config_store")),Promise.all(a).then((function(e){D(e[0].data),e.length>1&&(w({logo:e[1].data.logo,name_store:e[1].data.name_store,country:e[1].data.country,phone:e[1].data.phone,whatssap:e[1].data.whatssap,address:e[1].data.address,email:e[1].data.email,header_text:e[1].data.header_text,tax:e[1].data.tax,handle_stock:e[1].data.handle_stock,foot_page_text:e[1].data.foot_page_text,client_data_foot_page:e[1].data.client_data_foot_page,ref:e[1].data.ref}),L(!0),e[1].data.logo&&W(s.a.createElement(O.a,{src:b.a+"images/store/logo/"+e[1].data.logo,id:"imagen_logo",style:{width:"80px"},roundedCircle:!0})))})).catch((function(e){e.response?f.b.error(e.response.data.message):(console.log(e),f.b.error("Error,contacte con soporte"))}))};return s.a.createElement(j.a,null,s.a.createElement(v.a,{onSubmit:function(a){var t=a.currentTarget;if(a.preventDefault(),!1===t.checkValidity())return a.stopPropagation(),void H(!0);var n=new FormData;Object.keys(C).forEach((function(e,a){"logo"===e?P&&n.append(e,P):n.append(e,C[e])})),J?u.a.put(b.a+"config_store/"+e.match.params.id,n).then((function(a){f.b.success("Configuraci\xf3n Modificada"),localStorage.setItem("configStore",JSON.stringify(a.data)),setTimeout((function(){e.history.push("/config/config_store")}),1500)})).catch((function(e){var a=e.response;a?f.b.error(a.data.message):f.b.error("Error, contacte con soporte")})):u.a.post(b.a+"config_store",n).then((function(a){f.b.success("Configuraci\xf3n Creada"),localStorage.setItem("configStore",JSON.stringify(a.data)),setTimeout((function(){e.history.push("/config/config_store")}),1500)})).catch((function(e){var a=e.response;a?f.b.error(a.data.message):f.b.error("Error, contacte con soporte")}))},noValidate:!0,validated:z},s.a.createElement(y.a,{className:"justify-content-center containerDiv"},s.a.createElement(x.a,{sm:12,md:12,lg:12},s.a.createElement("h3",{className:"text-center font-title"},"Datos de la Tienda"),s.a.createElement("br",null)),s.a.createElement(x.a,{sm:6,md:6,lg:6,xs:6,className:""},s.a.createElement("br",null),s.a.createElement(y.a,{className:"align-items-center"},s.a.createElement(x.a,{sm:6,md:6,lg:6,xs:6},s.a.createElement(_.a,(a={size:"sm"},Object(o.a)(a,"size","sm"),Object(o.a)(a,"onClick",(function(){document.getElementById("file_logo").click()})),Object(o.a)(a,"variant","secondary"),Object(o.a)(a,"block","true"),a),"Escoger Logo ",s.a.createElement(m.k,null)),s.a.createElement("input",{type:"file",id:"file_logo",style:{display:"none"},onChange:function(e){var a=e.target.files[0],t=new FileReader;t.onload=function(e){document.getElementById("imagen_logo").src=e.target.result,q(a)},t.readAsDataURL(a)}})),s.a.createElement(x.a,{sm:6,md:6,lg:6,xs:6,className:"text-center"},V)),s.a.createElement("br",null),s.a.createElement(y.a,null,s.a.createElement(p.a,Object.assign({},e.inputNameStore,{handleChange:G,value:C.name_store})),s.a.createElement(p.a,Object.assign({},e.inputEmail,{handleChange:G,value:C.email}))),s.a.createElement(y.a,null,s.a.createElement(p.a,Object.assign({},e.inputCountry,{handleChange:G,value:C.country}),s.a.createElement("option",{value:""},"--Seleccione--"),R.map((function(e,a){return s.a.createElement("option",{value:e.id,key:a},e.nombre)}))),s.a.createElement(p.a,Object.assign({},e.inputPhone,{handleChange:G,value:C.phone}))),s.a.createElement(y.a,null,s.a.createElement(p.a,Object.assign({},e.inputWhatssap,{handleChange:G,value:C.whatssap})),s.a.createElement(p.a,Object.assign({},e.inputAddress,{handleChange:G,value:C.address}))),s.a.createElement(h.a,{placement:"top",overlay:s.a.createElement(E.a,{id:"tooltip-disabled1"},"Campos para especificar el tax que se le va a colocar a los productos y si se maneja inventario a la hora de facturar una venta")},s.a.createElement(y.a,null,s.a.createElement(p.a,Object.assign({},e.inputTax,{handleChange:G,value:C.tax})),s.a.createElement(p.a,Object.assign({},e.inputHandleStock,{handleChange:G,value:C.handle_stock}),s.a.createElement("option",{value:!1},"No"),s.a.createElement("option",{value:!0},"Si")))),s.a.createElement(h.a,{placement:"top",overlay:s.a.createElement(E.a,{id:"tooltip-disabled1"},"Campo para determinar desde que n\xfamero empieza la facturaci\xf3n en las ventas")},s.a.createElement(y.a,null,s.a.createElement(p.a,Object.assign({},e.inputRef,{handleChange:G,value:C.ref}))))),s.a.createElement(x.a,{sm:6,md:6,lg:6,xs:6,className:""},s.a.createElement("h4",{className:"text-center font-title"},"Datos de la Factura"),s.a.createElement(h.a,{placement:"top",overlay:s.a.createElement(E.a,{id:"tooltip-disabled1"},"Campos para especificar que texto saldr\xe1 en el encabezado de la factura y en el pie de p\xe1gina ( No es requerido )")},s.a.createElement(y.a,null,s.a.createElement(p.a,Object.assign({},e.inputHeaderText,{handleChange:G,value:C.header_text})),s.a.createElement(p.a,Object.assign({},e.inputFooterPageText,{handleChange:G,value:C.foot_page_text})))),s.a.createElement("br",null),s.a.createElement(y.a,null,s.a.createElement(x.a,{sm:12,md:12,lg:12,xs:12},s.a.createElement("label",{htmlFor:"",className:"form-control-label"},"Datos del Cliente en el Pie de P\xe1gina")),s.a.createElement("br",null),s.a.createElement(x.a,{sm:6,md:6,lg:6,xs:6},s.a.createElement("label",{htmlFor:"check1",className:"form-control-label"},"Activado"),"\xa0\xa0\xa0",s.a.createElement("input",{id:"check1",name:"client_data_foot_page",type:"checkbox",checked:!0===C.client_data_foot_page,value:!0,onChange:G})),s.a.createElement(x.a,{sm:6,md:6,lg:6,xs:6},s.a.createElement("label",{htmlFor:"check2",className:"form-control-label"},"Desactivado"),"\xa0\xa0\xa0",s.a.createElement("input",{id:"check2",name:"client_data_foot_page",type:"checkbox",checked:!1===C.client_data_foot_page,value:!1,onChange:G}))),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement(y.a,{className:"justify-content-center"},s.a.createElement(x.a,{sm:12,md:12,lg:12,xs:12,className:""},s.a.createElement(_.a,(n={size:"sm"},Object(o.a)(n,"size","sm"),Object(o.a)(n,"type","submit"),Object(o.a)(n,"variant","primary"),Object(o.a)(n,"block",!0),n),"Guardar ",s.a.createElement(m.o,null)),s.a.createElement("br",null),s.a.createElement("p",{className:"text-center"},"O"),s.a.createElement(_.a,(i={size:"sm"},Object(o.a)(i,"size","sm"),Object(o.a)(i,"type","button"),Object(o.a)(i,"onClick",(function(){e.history.replace("/config/config_store")})),Object(o.a)(i,"variant","info"),Object(o.a)(i,"block",!0),i),"Volver a la Configuracipon ",s.a.createElement(m.f,null))))))))};C.defaultProps=(n={inputNameStore:{type:"file",required:!1,name:"logo",label:"Logo de la Tienda",cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}},Object(o.a)(n,"inputNameStore",{type:"text",required:!0,name:"name_store",label:"Nombre de la Tienda",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputEmail",{type:"email",required:!0,name:"email",label:"Correo",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputCountry",{type:"select",required:!0,name:"country",label:"Pa\xeds",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputPhone",{type:"number",required:!0,name:"phone",label:"Tel\xe9fono",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputWhatssap",{type:"number",required:!1,name:"whatssap",label:"Whatssap",messageErrors:[],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputAddress",{type:"textarea",required:!0,name:"address",label:"Direcci\xf3n",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputTax",{type:"number",required:!0,name:"tax",label:"Tax",messageErrors:[],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputHandleStock",{type:"select",required:!0,name:"handle_stock",label:"Maneja Inventario",messageErrors:[],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputHeaderText",{type:"text",required:!1,name:"header_text",label:"Texto de Cabecera",messageErrors:[],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputFooterPageText",{type:"text",required:!1,name:"foot_page_text",label:"Texto Pie de P\xe1gina",messageErrors:[],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputClientDataFoot",{type:"select",required:!0,name:"client_data_foot_page",label:"Datos del Cliente en el Pie de P\xe1gina",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputRut",{type:"text",required:!0,name:"rut",label:"Rut de la tienda",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),Object(o.a)(n,"inputRef",{type:"number",required:!0,name:"ref",label:"N\xfamero de referencia",placeholder:"N\xfamero de referencia de venta",messageErrors:["Requerido*"],cols:"col-sm-6 col-md-6 col-lg-6 col-xs-6"}),n),a.default=Object(d.b)(null,(function(){return{setConfigStore:g.b}}))(C)}}]);
//# sourceMappingURL=17.46599889.chunk.js.map