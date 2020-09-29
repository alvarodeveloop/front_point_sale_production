(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[26],{662:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,r,l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();t.confirmAlert=function(e){document.body.classList.add("react-confirm-alert-body-element"),function(){if(document.getElementById("react-confirm-alert-firm-svg"))return;var e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"feGaussianBlur");t.setAttribute("stdDeviation","0.3");var n=document.createElementNS(e,"filter");n.setAttribute("id","gaussian-blur"),n.appendChild(t);var a=document.createElementNS(e,"svg");a.setAttribute("id","react-confirm-alert-firm-svg"),a.setAttribute("class","react-confirm-alert-svg"),a.appendChild(n),document.body.appendChild(a)}(),function(e){var t=document.getElementById("react-confirm-alert");t||(document.body.children[0].classList.add("react-confirm-alert-blur"),(t=document.createElement("div")).id="react-confirm-alert",document.body.appendChild(t)),(0,s.render)(c.default.createElement(f,e),t)}(e)};var o=n(1),c=u(o),i=u(n(2)),s=n(34);function u(e){return e&&e.__esModule?e:{default:e}}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var f=(r=a=function(e){function t(){var e,n,a;m(this,t);for(var r=arguments.length,l=Array(r),o=0;o<r;o++)l[o]=arguments[o];return n=a=d(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),a.handleClickButton=function(e){e.onClick&&e.onClick(),a.close()},a.handleClickOverlay=function(e){var t=a.props,n=t.closeOnClickOutside,r=t.onClickOutside,l=e.target===a.overlay;n&&l&&(r(),a.close())},a.close=function(){var e=a.props.afterClose;E(),b(),p(e)},a.keyboardClose=function(e){var t=a.props,n=t.closeOnEscape,r=t.onKeypressEscape,l=27===e.keyCode;n&&l&&(r(e),a.close())},a.componentDidMount=function(){document.addEventListener("keydown",a.keyboardClose,!1)},a.componentWillUnmount=function(){document.removeEventListener("keydown",a.keyboardClose,!1),a.props.willUnmount()},a.renderCustomUI=function(){var e=a.props,t=e.title,n=e.message,r=e.buttons;return(0,e.customUI)({title:t,message:n,buttons:r,onClose:a.close})},d(a,n)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.title,a=t.message,r=t.buttons,l=t.childrenElement,o=t.customUI;return c.default.createElement("div",{className:"react-confirm-alert-overlay",ref:function(t){return e.overlay=t},onClick:this.handleClickOverlay},c.default.createElement("div",{className:"react-confirm-alert"},o?this.renderCustomUI():c.default.createElement("div",{className:"react-confirm-alert-body"},n&&c.default.createElement("h1",null,n),a,l(),c.default.createElement("div",{className:"react-confirm-alert-button-group"},r.map((function(t,n){return c.default.createElement("button",{key:n,onClick:function(){return e.handleClickButton(t)},className:t.className},t.label)}))))))}}]),t}(o.Component),a.propTypes={title:i.default.string,message:i.default.string,buttons:i.default.array.isRequired,childrenElement:i.default.func,customUI:i.default.func,closeOnClickOutside:i.default.bool,closeOnEscape:i.default.bool,willUnmount:i.default.func,afterClose:i.default.func,onClickOutside:i.default.func,onKeypressEscape:i.default.func},a.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null},className:null},{label:"Confirm",onClick:function(){return null},className:null}],childrenElement:function(){return null},closeOnClickOutside:!0,closeOnEscape:!0,willUnmount:function(){return null},afterClose:function(){return null},onClickOutside:function(){return null},onKeypressEscape:function(){return null}},r);function p(e){var t=document.getElementById("react-confirm-alert-firm-svg");t.parentNode.removeChild(t),document.body.children[0].classList.remove("react-confirm-alert-blur"),e()}function b(){var e=document.getElementById("react-confirm-alert");e&&((0,s.unmountComponentAtNode)(e),e.parentNode.removeChild(e))}function E(){document.body.classList.remove("react-confirm-alert-body-element")}t.default=f},663:function(e,t,n){},664:function(e,t,n){},851:function(e,t,n){"use strict";n.r(t);var a=n(41),r=n(1),l=n.n(r),o=n(17),c=n.n(o),i=n(25),s=n(18),u=n(631),m=n(632),d=n(319),f=n(320),p=n(15),b=(n(662),n(663),n(844)),E=(n(664),function(e){return l.a.createElement(b.a,Object.assign({},e,{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0}),l.a.createElement(b.a.Header,{closeButton:!0,className:"header_dark"},l.a.createElement(b.a.Title,{id:"contained-modal-title-vcenter"},"\xbfEsta seguro que desea eliminar los registros?")),l.a.createElement(b.a.Body,null,l.a.createElement("h4",null,"Escoja los datos que desea eliminar")),l.a.createElement(b.a.Footer,null,l.a.createElement(f.a,{size:"sm",variant:"success",onClick:e.onHide},"Aceptar"),l.a.createElement(f.a,{size:"sm",onClick:e.onHide},"Close")))});t.default=function(e){var t=Object(r.useState)({simbolo_moneda:"",active_price_decimals:"",close_session:""}),n=Object(a.a)(t,2),o=n[0],b=n[1],v=Object(r.useState)(!1),y=Object(a.a)(v,2),g=y[0],h=y[1];Object(r.useEffect)((function(){C()}),[]);var C=function(){c.a.get(s.a+"config_general").then((function(e){e.data&&b({simbolo_moneda:e.data.simbolo_moneda,active_price_decimals:e.data.active_price_decimals,close_session:e.data.close_session})})).catch((function(e){var t=e.response;t?p.b.error(t.data.message):(console.log(e),p.b.error("Error contacte con soporte"))}))},k=function(){h(!1)};return l.a.createElement(u.a,null,l.a.createElement(m.a,null,l.a.createElement(d.a,{sm:12,md:12,lg:12},l.a.createElement("h4",{className:"title_principal"},"Configuraci\xf3n General"),l.a.createElement("hr",null))),l.a.createElement(m.a,{className:"justify-content-center align-items-center"},l.a.createElement(d.a,{md:6,sm:6,lg:6,xs:6},l.a.createElement("table",{className:"table table-bordered"},l.a.createElement("thead",null,l.a.createElement("tr",{style:{backgroundColor:"rgb(218,236,242)",color:"black"}},l.a.createElement("th",{className:"text-center"},"Simbolo Moneda"),l.a.createElement("th",{className:"text-center"},"Precios Decimales"),l.a.createElement("th",{className:"text-center"},"Cerrar Sesi\xf3n"))),l.a.createElement("tbody",{className:"text-center"},l.a.createElement("tr",null,l.a.createElement("td",null,o.simbolo_moneda),l.a.createElement("td",null,o.active_price_decimals),l.a.createElement("td",null,o.close_session))))),l.a.createElement(d.a,{sm:6,md:6,lg:6},l.a.createElement(f.a,{size:"sm",variant:"danger",block:"true",onClick:function(){h(!0)}},"Eliminar Datos ",l.a.createElement(i.w,null)),l.a.createElement("br",null),o.simbolo_moneda?l.a.createElement(f.a,{size:"sm",variant:"primary",block:"true",onClick:function(){e.history.push("/config/config_general_form/"+JSON.parse(localStorage.getItem("user")).id_parent)}},"Modificar Configuraci\xf3n General ",l.a.createElement(i.h,null)):l.a.createElement(l.a.Fragment,null,l.a.createElement(f.a,{size:"sm",variant:"primary",block:"true",onClick:function(){e.history.push("/config/config_general_form")}},"Crear Configuraci\xf3n General  ",l.a.createElement(i.p,null)),l.a.createElement("br",null),l.a.createElement("p",{className:"text-center",style:{color:"darkred",fontWeight:"bold"}},"(No posee configuraci\xf3n y debe crearla)")))),l.a.createElement(E,{show:g,onHide:k,handleClose:k}))}}}]);
//# sourceMappingURL=26.19ff94d2.chunk.js.map