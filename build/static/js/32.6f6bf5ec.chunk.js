(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[32],{613:function(e,a,t){"use strict";var n=t(2),r=t(4),o=t(6),c=t.n(o),l=t(1),i=t.n(l),s=(t(307),t(7)),u=i.a.forwardRef((function(e,a){var t=e.bsPrefix,o=e.placement,l=e.className,u=e.style,m=e.children,p=e.arrowProps,d=(e.popper,e.show,Object(r.a)(e,["bsPrefix","placement","className","style","children","arrowProps","popper","show"]));t=Object(s.a)(t,"tooltip");var f=((null==o?void 0:o.split("-"))||[])[0];return i.a.createElement("div",Object(n.a)({ref:a,style:u,role:"tooltip","x-placement":f,className:c()(l,t,"bs-tooltip-"+f)},d),i.a.createElement("div",Object(n.a)({className:"arrow"},p)),i.a.createElement("div",{className:t+"-inner"},m))}));u.defaultProps={placement:"right"},u.displayName="Tooltip",a.a=u},614:function(e,a,t){"use strict";var n=t(2),r=t(4),o=t(19),c=t(202),l=t(1),i=t.n(l),s=t(621),u=t(200),m=(t(97),t(63)),p=t(6),d=t.n(p),f=t(3),b=t.n(f),g=t(43),E=t.n(g),v=t(121),O=t(56),h=t(207),j=t(208),y=t(209),_=t(624),w=t(203),C=i.a.forwardRef((function(e,a){var t=e.flip,o=e.offset,c=e.placement,s=e.containerPadding,u=void 0===s?5:s,m=e.popperConfig,p=void 0===m?{}:m,d=e.transition,f=Object(v.a)(),b=f[0],g=f[1],h=Object(v.a)(),C=h[0],k=h[1],x=Object(O.a)(g,a),S=Object(_.a)(e.container),R=Object(_.a)(e.target),N=Object(l.useState)(!e.show),P=N[0],q=N[1],T=Object(j.a)(R,b,Object(w.a)({placement:c,enableEvents:!!e.show,containerPadding:u||5,flip:t,offset:o,arrowElement:C,popperConfig:p})),D=T.styles,F=T.attributes,A=Object(r.a)(T,["styles","attributes"]);e.show?P&&q(!1):e.transition||P||q(!0);var G=e.show||d&&!P;if(Object(y.a)(b,e.onHide,{disabled:!e.rootClose||e.rootCloseDisabled,clickTrigger:e.rootCloseEvent}),!G)return null;var M=e.children(Object(n.a)({},A,{show:!!e.show,props:Object(n.a)({},F.popper,{style:D.popper,ref:x}),arrowProps:Object(n.a)({},F.arrow,{style:D.arrow,ref:k})}));if(d){var L=e.onExit,z=e.onExiting,B=e.onEnter,H=e.onEntering,I=e.onEntered;M=i.a.createElement(d,{in:e.show,appear:!0,onExit:L,onExiting:z,onExited:function(){q(!0),e.onExited&&e.onExited.apply(e,arguments)},onEnter:B,onEntering:H,onEntered:I},M)}return S?E.a.createPortal(M,S):null}));C.displayName="Overlay",C.propTypes={show:b.a.bool,placement:b.a.oneOf(h.b),target:b.a.any,container:b.a.any,flip:b.a.bool,children:b.a.func.isRequired,containerPadding:b.a.number,popperConfig:b.a.object,rootClose:b.a.bool,rootCloseEvent:b.a.oneOf(["click","mousedown"]),rootCloseDisabled:b.a.bool,onHide:function(e){for(var a=arguments.length,t=new Array(a>1?a-1:0),n=1;n<a;n++)t[n-1]=arguments[n];var r;return e.rootClose?(r=b.a.func).isRequired.apply(r,[e].concat(t)):b.a.func.apply(b.a,[e].concat(t))},transition:b.a.elementType,onEnter:b.a.func,onEntering:b.a.func,onEntered:b.a.func,onExit:b.a.func,onExiting:b.a.func,onExited:b.a.func};var k=C,x=t(205),S=t(616),R={transition:S.a,rootClose:!1,show:!1,placement:"top"};function N(e){var a=e.children,t=e.transition,o=e.popperConfig,c=void 0===o?{}:o,s=Object(r.a)(e,["children","transition","popperConfig"]),m=Object(l.useRef)({}),p=Object(x.a)(),f=p[0],b=p[1],g=!0===t?S.a:t||null;return i.a.createElement(k,Object(n.a)({},s,{ref:f,popperConfig:Object(n.a)({},c,{modifiers:b.concat(c.modifiers||[])}),transition:g}),(function(e){var o,c=e.props,l=e.arrowProps,s=e.show,p=e.update,f=(e.forceUpdate,e.placement),b=e.state,g=Object(r.a)(e,["props","arrowProps","show","update","forceUpdate","placement","state"]);!function(e,a){var t=e.ref,n=a.ref;e.ref=t.__wrapped||(t.__wrapped=function(e){return t(Object(u.a)(e))}),a.ref=n.__wrapped||(n.__wrapped=function(e){return n(Object(u.a)(e))})}(c,l);var E=Object.assign(m.current,{state:b,scheduleUpdate:p,placement:f,outOfBoundaries:(null==b||null==(o=b.modifiersData.hide)?void 0:o.isReferenceHidden)||!1});return"function"===typeof a?a(Object(n.a)({},g,{},c,{placement:f,show:s,popper:E,arrowProps:l})):i.a.cloneElement(a,Object(n.a)({},g,{},c,{placement:f,arrowProps:l,popper:E,className:d()(a.props.className,!t&&s&&"show"),style:Object(n.a)({},a.props.style,{},c.style)}))}))}N.defaultProps=R;var P=N,q=function(e){function a(){return e.apply(this,arguments)||this}return Object(o.a)(a,e),a.prototype.render=function(){return this.props.children},a}(i.a.Component);function T(e,a,t){var n=a[0],r=n.currentTarget,o=n.relatedTarget||n.nativeEvent[t];o&&o===r||Object(c.a)(r,o)||e.apply(void 0,a)}function D(e){var a=e.trigger,t=e.overlay,o=e.children,c=e.popperConfig,p=void 0===c?{}:c,d=e.show,f=e.defaultShow,b=void 0!==f&&f,g=e.onToggle,E=e.delay,v=e.placement,O=e.flip,h=void 0===O?v&&-1!==v.indexOf("auto"):O,j=Object(r.a)(e,["trigger","overlay","children","popperConfig","show","defaultShow","onToggle","delay","placement","flip"]),y=Object(l.useRef)(null),_=Object(s.a)(),w=Object(l.useRef)(""),C=Object(m.b)(d,b,g),k=C[0],x=C[1],S=function(e){return e&&"object"===typeof e?e:{show:e,hide:e}}(E),R="function"!==typeof o?i.a.Children.only(o).props:{},N=R.onFocus,D=R.onBlur,F=R.onClick,A=Object(l.useCallback)((function(){return Object(u.a)(y.current)}),[]),G=Object(l.useCallback)((function(){_.clear(),w.current="show",S.show?_.set((function(){"show"===w.current&&x(!0)}),S.show):x(!0)}),[S.show,x,_]),M=Object(l.useCallback)((function(){_.clear(),w.current="hide",S.hide?_.set((function(){"hide"===w.current&&x(!1)}),S.hide):x(!1)}),[S.hide,x,_]),L=Object(l.useCallback)((function(){G();for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];null==N||N.apply(void 0,a)}),[G,N]),z=Object(l.useCallback)((function(){M();for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];null==D||D.apply(void 0,a)}),[M,D]),B=Object(l.useCallback)((function(){x(!k),F&&F.apply(void 0,arguments)}),[F,x,k]),H=Object(l.useCallback)((function(){for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];T(G,a,"fromElement")}),[G]),I=Object(l.useCallback)((function(){for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];T(M,a,"toElement")}),[M]),J=null==a?[]:[].concat(a),U={};return-1!==J.indexOf("click")&&(U.onClick=B),-1!==J.indexOf("focus")&&(U.onFocus=L,U.onBlur=z),-1!==J.indexOf("hover")&&(U.onMouseOver=H,U.onMouseOut=I),i.a.createElement(i.a.Fragment,null,"function"===typeof o?o(Object(n.a)({},U,{ref:y})):i.a.createElement(q,{ref:y},Object(l.cloneElement)(o,U)),i.a.createElement(P,Object(n.a)({},j,{show:k,onHide:M,flip:h,placement:v,popperConfig:p,target:A}),t))}D.defaultProps={defaultShow:!1,trigger:["hover","focus"]};a.a=D},616:function(e,a,t){"use strict";var n,r=t(2),o=t(4),c=t(6),l=t.n(c),i=t(215),s=t(1),u=t.n(s),m=t(92),p=t(216),d=((n={})[m.b]="show",n[m.a]="show",n),f=u.a.forwardRef((function(e,a){var t=e.className,n=e.children,c=Object(o.a)(e,["className","children"]),f=Object(s.useCallback)((function(e){Object(p.a)(e),c.onEnter&&c.onEnter(e)}),[c]);return u.a.createElement(m.e,Object(r.a)({ref:a,addEndListener:i.a},c,{onEnter:f}),(function(e,a){return u.a.cloneElement(n,Object(r.a)({},a,{className:l()("fade",t,n.props.className,d[e])}))}))}));f.defaultProps={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1},f.displayName="Fade",a.a=f},621:function(e,a,t){"use strict";t.d(a,"a",(function(){return l}));var n=t(1),r=t(211),o=t(650),c=Math.pow(2,31)-1;function l(){var e=Object(r.a)(),a=Object(n.useRef)();return Object(o.a)((function(){return clearTimeout(a.current)})),Object(n.useMemo)((function(){var t=function(){return clearTimeout(a.current)};return{set:function(n,r){void 0===r&&(r=0),e()&&(t(),r<=c?a.current=setTimeout(n,r):function e(a,t,n){var r=n-Date.now();a.current=r<=c?setTimeout(t,r):setTimeout((function(){return e(a,t,n)}),c)}(a,n,Date.now()+r))},clear:t}}),[])}},624:function(e,a,t){"use strict";t.d(a,"a",(function(){return c}));var n=t(122),r=t(1),o=function(e){var a;return"undefined"===typeof document?null:null==e?Object(n.a)().body:("function"===typeof e&&(e=e()),e&&"current"in e&&(e=e.current),(null==(a=e)?void 0:a.nodeType)&&e||null)};function c(e,a){var t=Object(r.useState)((function(){return o(e)})),n=t[0],c=t[1];if(!n){var l=o(e);l&&c(l)}return Object(r.useEffect)((function(){a&&n&&a(n)}),[a,n]),Object(r.useEffect)((function(){var a=o(e);a!==n&&c(a)}),[e,n]),n}},650:function(e,a,t){"use strict";t.d(a,"a",(function(){return r}));var n=t(1);function r(e){var a=function(e){var a=Object(n.useRef)(e);return a.current=e,a}(e);Object(n.useEffect)((function(){return function(){return a.current()}}),[])}},688:function(e,a,t){},792:function(e,a,t){"use strict";t.r(a);var n=t(16),r=t.n(n),o=t(32),c=t(18),l=t(35),i=t(15),s=t(1),u=t.n(s),m=t(607),p=t(608),d=t(598),f=t(197),b=t(47),g=t(301),E=t(31),v=t(28),O=t(88),h=t(9),j=t.n(h),y=t(8),_=t(10),w=(t(688),t(85),t(614)),C=t(613),k=t(17),x=t(77),S=function(e){var a=Object(s.useState)(!0),t=Object(i.a)(a,2),n=t[0],v=t[1],h=Object(s.useState)({simbolo_moneda:"",active_price_decimals:"",close_session:"",actividad_economica:"",giro:"",rut_legal_representative:"",clave_login_sii:"",clave_sii:"",file:""}),S=Object(i.a)(h,2),R=S[0],N=S[1],P=Object(s.useState)(!1),q=Object(i.a)(P,2),T=q[0],D=q[1],F=Object(s.useState)(!1),A=Object(i.a)(F,2),G=A[0],M=A[1],L=Object(s.useState)(""),z=Object(i.a)(L,2),B=z[0],H=z[1];Object(s.useEffect)((function(){e.match.params.id&&I()}),[e.id_enterprise]);var I=function(){j.a.get(_.b+"config_general_update").then((function(e){N((function(a){return Object.assign({},a,{simbolo_moneda:e.data.simbolo_moneda,active_price_decimals:e.data.active_price_decimals,close_session:e.data.close_session,actividad_economica:e.data.actividad_economica,giro:e.data.giro,rut_legal_representative:e.data.rut_legal_representative,clave_sii:e.data.clave_sii,clave_login_sii:e.data.clave_login_sii,logo:e.data.logo})})),M(!0),v(!1)})).catch((function(a){v(!1),e.tokenExpired(a)}))},J=function(){var e=Object(l.a)(r.a.mark((function e(a){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"rut_legal_representative"===a.target.name?N(Object(c.a)(Object(c.a)({},R),{},Object(o.a)({},a.target.name,Object(k.b)(a.target.value)))):N(Object(c.a)(Object(c.a)({},R),{},Object(o.a)({},a.target.name,a.target.value)));case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return u.a.createElement(p.a,null,u.a.createElement(u.a.Fragment,null,n?u.a.createElement(x.a,null):u.a.createElement(d.a,{className:""},u.a.createElement(f.a,{sm:12,md:12,lg:12},u.a.createElement("h4",{className:"title_principal"},"Formulario de Configuraci\xf3n General"),u.a.createElement("br",null),u.a.createElement(b.a,{onSubmit:function(a){var t=a.currentTarget;if(a.preventDefault(),!1===t.checkValidity())return a.stopPropagation(),void D(!0);var n=new FormData;Object.keys(R).forEach((function(e,a){"file"===e&&""!==R[e]?n.append("logo",R[e]):n.append(e,R[e])})),v(!0),G?j.a.put(_.b+"config_general/"+e.match.params.id,n).then((function(a){y.b.success("Configuraci\xf3n General Modificada"),localStorage.setItem("configGeneral",JSON.stringify(a.data)),setTimeout((function(){e.history.push("/config/config_general")}),1500)})).catch((function(a){v(!1),e.tokenExpired(a)})):j.a.post(_.b+"config_general",n).then((function(a){y.b.success("Configuraci\xf3n Guardada"),localStorage.setItem("configGeneral",JSON.stringify(a.data)),setTimeout((function(){e.history.push("/config/config_general")}),1500)})).catch((function(a){v(!1),e.tokenExpired(a)}))},noValidate:!0,validated:T,className:""},u.a.createElement(d.a,null,u.a.createElement(f.a,{md:4,lg:4,sm:4},u.a.createElement(w.a,{placement:"top",overlay:u.a.createElement(C.a,{id:"tooltip-disabled1"},"Este campo contendr\xe1 el simbolo con el que se mostraran los precios en el sistema")},u.a.createElement(d.a,null,u.a.createElement(O.a,Object.assign({},e.inputSymbol,{handleChange:J,value:R.simbolo_moneda}))))),u.a.createElement(f.a,{md:4,lg:4,sm:4},u.a.createElement(w.a,{placement:"top",overlay:u.a.createElement(C.a,{id:"tooltip-disabled2"},"Campo para activar la funci\xf3n de mostrar los precios con 2 decimales en el sistema")},u.a.createElement(d.a,null,u.a.createElement(O.a,Object.assign({},e.inputPriceDecimals,{handleChange:J,value:R.active_price_decimals}),u.a.createElement("option",{value:""},"--Seleccione--"),u.a.createElement("option",{value:!0},"Activo"),u.a.createElement("option",{value:!1},"Desactivado"))))),u.a.createElement(f.a,{md:4,lg:4,sm:4},u.a.createElement(w.a,{placement:"top",overlay:u.a.createElement(C.a,{id:"tooltip-disabled3"},"Campo para activar la funci\xf3n de cerrar la sesi\xf3n en el sistema")},u.a.createElement(d.a,null,u.a.createElement(O.a,Object.assign({},e.inputSession,{handleChange:J,value:R.close_session}),u.a.createElement("option",{value:""},"--Seleccione--"),u.a.createElement("option",{value:!0},"Activo"),u.a.createElement("option",{value:!1},"Desactivado")))))),u.a.createElement(d.a,null,u.a.createElement(O.a,{type:"text",label:"Actividad Econ\xf3mica",name:"actividad_economica",required:!1,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:R.actividad_economica,handleChange:J}),u.a.createElement(O.a,{type:"text",label:"Giro",name:"giro",required:!1,messageErrors:["Requerido*"],cols:"col-md-4 col-lg-4 col-sm-4",value:R.giro,handleChange:J}),u.a.createElement(f.a,{sm:4,md:4,lg:4},B?u.a.createElement(u.a.Fragment,null,u.a.createElement(d.a,{className:"justify-content-center"},u.a.createElement(f.a,{sm:8,md:8,lg:8},B)),u.a.createElement(d.a,null,u.a.createElement(f.a,{sm:12,md:12,lg:12,className:"text-center"},u.a.createElement("br",null),u.a.createElement(g.a,{variant:"dark",size:"sm",onClick:function(){H(""),N(Object(c.a)(Object(c.a)({},R),{},{file:""}))},type:"button"},u.a.createElement(E.L,null))))):u.a.createElement(u.a.Fragment,null,u.a.createElement("br",null),u.a.createElement(g.a,{block:!0,size:"sm",type:"button",variant:"primary",onClick:function(){document.getElementById("file_input").click()}},"Logo Empresa ",u.a.createElement(E.r,null)),u.a.createElement("input",{type:"file",id:"file_input",style:{display:"none"},onChange:function(e){var a=e.target.files[0],t=new FileReader;t.onload=function(e){H(u.a.createElement(m.a,{src:e.target.result,id:"img_show",style:{width:"100%"},thumbnail:!0})),N(Object(c.a)(Object(c.a)({},R),{},{file:a}))},t.readAsDataURL(a)}})))),u.a.createElement(d.a,null,u.a.createElement(f.a,{sm:4,md:4,lg:4},u.a.createElement(w.a,{placement:"top",overlay:u.a.createElement(C.a,{id:"tooltip-disabled4"},"Rut del representante legal de la empresa en el Sii")},u.a.createElement(d.a,null,u.a.createElement(O.a,{type:"text",label:"Rut Representante Legal",name:"rut_legal_representative",required:!1,messageErrors:["Requerido*"],cols:"col-md-12 col-lg-12 col-sm-12",value:R.rut_legal_representative,handleChange:J})))),u.a.createElement(f.a,{sm:4,md:4,lg:4},u.a.createElement(w.a,{placement:"top",overlay:u.a.createElement(C.a,{id:"tooltip-disabled5"},"Clave del representate legal de la empresa en el Sii")},u.a.createElement(d.a,null,u.a.createElement(O.a,{type:"text",label:"Clave Sii",name:"clave_login_sii",required:!1,messageErrors:["Requerido*"],cols:"col-md-12 col-lg-12 col-sm-12",value:R.clave_login_sii,handleChange:J})))),u.a.createElement(f.a,{sm:4,md:4,lg:4},u.a.createElement(w.a,{placement:"top",overlay:u.a.createElement(C.a,{id:"tooltip-disabled6"},"Firma del representate legal en el Sii")},u.a.createElement(d.a,null,u.a.createElement(O.a,{type:"text",label:"Firma Sii",name:"clave_sii",required:!1,messageErrors:["Requerido*"],cols:"col-md-12 col-lg-12 col-sm-12",value:R.clave_sii,handleChange:J}))))),u.a.createElement(d.a,{className:"justify-content-center"},u.a.createElement(f.a,{sm:4,md:4,lg:4},u.a.createElement(g.a,{size:"sm",type:"submit",variant:"danger",block:"true"},"Enviar ",u.a.createElement(E.f,null))),u.a.createElement(f.a,{sm:4,md:4,lg:4},u.a.createElement(g.a,{size:"sm",type:"button",variant:"secondary",block:"true",onClick:function(){e.history.replace("/config/config_general")}},"Ir a la configuraci\xf3n ",u.a.createElement(E.h,null)))))))))};S.defaultProps={inputSymbol:{type:"text",required:!0,name:"simbolo_moneda",label:"Simbolo de Moneda",messageErrors:["Requerido*"],cols:"col-sm-12 col-md-12 col-lg-12 col-xs-12"},inputPriceDecimals:{type:"select",required:!0,name:"active_price_decimals",label:"Estado de Precios Decimales",messageErrors:["Requerido*"],cols:"col-sm-12 col-md-12 col-lg-12 col-xs-12"},inputSession:{type:"select",name:"close_session",label:"Estado de Cerrar Sesi\xf3n",messageErrors:["Requerido*"],required:!0,cols:"col-sm-12 col-md-12 col-lg-12 col-xs-12"}},a.default=Object(v.b)((function(e){return{id_branch_office:e.enterpriseSucursal.id_branch_office,id_enterprise:e.enterpriseSucursal.id_enterprise}}),{})(S)}}]);
//# sourceMappingURL=32.6f6bf5ec.chunk.js.map