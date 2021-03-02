(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[51,52],{613:function(e,t,n){"use strict";var r=n(2),o=n(4),a=n(6),c=n.n(a),l=n(1),i=n.n(l),u=(n(307),n(7)),s=i.a.forwardRef((function(e,t){var n=e.bsPrefix,a=e.placement,l=e.className,s=e.style,f=e.children,d=e.arrowProps,p=(e.popper,e.show,Object(o.a)(e,["bsPrefix","placement","className","style","children","arrowProps","popper","show"]));n=Object(u.a)(n,"tooltip");var m=((null==a?void 0:a.split("-"))||[])[0];return i.a.createElement("div",Object(r.a)({ref:t,style:s,role:"tooltip","x-placement":m,className:c()(l,n,"bs-tooltip-"+m)},p),i.a.createElement("div",Object(r.a)({className:"arrow"},d)),i.a.createElement("div",{className:n+"-inner"},f))}));s.defaultProps={placement:"right"},s.displayName="Tooltip",t.a=s},614:function(e,t,n){"use strict";var r=n(2),o=n(4),a=n(19),c=n(202),l=n(1),i=n.n(l),u=n(621),s=n(200),f=(n(97),n(63)),d=n(6),p=n.n(d),m=n(3),b=n.n(m),v=n(42),h=n.n(v),y=n(121),O=n(56),w=n(207),g=n(208),E=n(209),C=n(624),j=n(203),k=i.a.forwardRef((function(e,t){var n=e.flip,a=e.offset,c=e.placement,u=e.containerPadding,s=void 0===u?5:u,f=e.popperConfig,d=void 0===f?{}:f,p=e.transition,m=Object(y.a)(),b=m[0],v=m[1],w=Object(y.a)(),k=w[0],P=w[1],N=Object(O.a)(v,t),x=Object(C.a)(e.container),_=Object(C.a)(e.target),T=Object(l.useState)(!e.show),R=T[0],M=T[1],A=Object(g.a)(_,b,Object(j.a)({placement:c,enableEvents:!!e.show,containerPadding:s||5,flip:n,offset:a,arrowElement:k,popperConfig:d})),B=A.styles,U=A.attributes,I=Object(o.a)(A,["styles","attributes"]);e.show?R&&M(!1):e.transition||R||M(!0);var D=e.show||p&&!R;if(Object(E.a)(b,e.onHide,{disabled:!e.rootClose||e.rootCloseDisabled,clickTrigger:e.rootCloseEvent}),!D)return null;var S=e.children(Object(r.a)({},I,{show:!!e.show,props:Object(r.a)({},U.popper,{style:B.popper,ref:N}),arrowProps:Object(r.a)({},U.arrow,{style:B.arrow,ref:P})}));if(p){var L=e.onExit,q=e.onExiting,z=e.onEnter,H=e.onEntering,F=e.onEntered;S=i.a.createElement(p,{in:e.show,appear:!0,onExit:L,onExiting:q,onExited:function(){M(!0),e.onExited&&e.onExited.apply(e,arguments)},onEnter:z,onEntering:H,onEntered:F},S)}return x?h.a.createPortal(S,x):null}));k.displayName="Overlay",k.propTypes={show:b.a.bool,placement:b.a.oneOf(w.b),target:b.a.any,container:b.a.any,flip:b.a.bool,children:b.a.func.isRequired,containerPadding:b.a.number,popperConfig:b.a.object,rootClose:b.a.bool,rootCloseEvent:b.a.oneOf(["click","mousedown"]),rootCloseDisabled:b.a.bool,onHide:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o;return e.rootClose?(o=b.a.func).isRequired.apply(o,[e].concat(n)):b.a.func.apply(b.a,[e].concat(n))},transition:b.a.elementType,onEnter:b.a.func,onEntering:b.a.func,onEntered:b.a.func,onExit:b.a.func,onExiting:b.a.func,onExited:b.a.func};var P=k,N=n(205),x=n(616),_={transition:x.a,rootClose:!1,show:!1,placement:"top"};function T(e){var t=e.children,n=e.transition,a=e.popperConfig,c=void 0===a?{}:a,u=Object(o.a)(e,["children","transition","popperConfig"]),f=Object(l.useRef)({}),d=Object(N.a)(),m=d[0],b=d[1],v=!0===n?x.a:n||null;return i.a.createElement(P,Object(r.a)({},u,{ref:m,popperConfig:Object(r.a)({},c,{modifiers:b.concat(c.modifiers||[])}),transition:v}),(function(e){var a,c=e.props,l=e.arrowProps,u=e.show,d=e.update,m=(e.forceUpdate,e.placement),b=e.state,v=Object(o.a)(e,["props","arrowProps","show","update","forceUpdate","placement","state"]);!function(e,t){var n=e.ref,r=t.ref;e.ref=n.__wrapped||(n.__wrapped=function(e){return n(Object(s.a)(e))}),t.ref=r.__wrapped||(r.__wrapped=function(e){return r(Object(s.a)(e))})}(c,l);var h=Object.assign(f.current,{state:b,scheduleUpdate:d,placement:m,outOfBoundaries:(null==b||null==(a=b.modifiersData.hide)?void 0:a.isReferenceHidden)||!1});return"function"===typeof t?t(Object(r.a)({},v,{},c,{placement:m,show:u,popper:h,arrowProps:l})):i.a.cloneElement(t,Object(r.a)({},v,{},c,{placement:m,arrowProps:l,popper:h,className:p()(t.props.className,!n&&u&&"show"),style:Object(r.a)({},t.props.style,{},c.style)}))}))}T.defaultProps=_;var R=T,M=function(e){function t(){return e.apply(this,arguments)||this}return Object(a.a)(t,e),t.prototype.render=function(){return this.props.children},t}(i.a.Component);function A(e,t,n){var r=t[0],o=r.currentTarget,a=r.relatedTarget||r.nativeEvent[n];a&&a===o||Object(c.a)(o,a)||e.apply(void 0,t)}function B(e){var t=e.trigger,n=e.overlay,a=e.children,c=e.popperConfig,d=void 0===c?{}:c,p=e.show,m=e.defaultShow,b=void 0!==m&&m,v=e.onToggle,h=e.delay,y=e.placement,O=e.flip,w=void 0===O?y&&-1!==y.indexOf("auto"):O,g=Object(o.a)(e,["trigger","overlay","children","popperConfig","show","defaultShow","onToggle","delay","placement","flip"]),E=Object(l.useRef)(null),C=Object(u.a)(),j=Object(l.useRef)(""),k=Object(f.b)(p,b,v),P=k[0],N=k[1],x=function(e){return e&&"object"===typeof e?e:{show:e,hide:e}}(h),_="function"!==typeof a?i.a.Children.only(a).props:{},T=_.onFocus,B=_.onBlur,U=_.onClick,I=Object(l.useCallback)((function(){return Object(s.a)(E.current)}),[]),D=Object(l.useCallback)((function(){C.clear(),j.current="show",x.show?C.set((function(){"show"===j.current&&N(!0)}),x.show):N(!0)}),[x.show,N,C]),S=Object(l.useCallback)((function(){C.clear(),j.current="hide",x.hide?C.set((function(){"hide"===j.current&&N(!1)}),x.hide):N(!1)}),[x.hide,N,C]),L=Object(l.useCallback)((function(){D();for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];null==T||T.apply(void 0,t)}),[D,T]),q=Object(l.useCallback)((function(){S();for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];null==B||B.apply(void 0,t)}),[S,B]),z=Object(l.useCallback)((function(){N(!P),U&&U.apply(void 0,arguments)}),[U,N,P]),H=Object(l.useCallback)((function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];A(D,t,"fromElement")}),[D]),F=Object(l.useCallback)((function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];A(S,t,"toElement")}),[S]),K=null==t?[]:[].concat(t),J={};return-1!==K.indexOf("click")&&(J.onClick=z),-1!==K.indexOf("focus")&&(J.onFocus=L,J.onBlur=q),-1!==K.indexOf("hover")&&(J.onMouseOver=H,J.onMouseOut=F),i.a.createElement(i.a.Fragment,null,"function"===typeof a?a(Object(r.a)({},J,{ref:E})):i.a.createElement(M,{ref:E},Object(l.cloneElement)(a,J)),i.a.createElement(R,Object(r.a)({},g,{show:P,onHide:S,flip:w,placement:y,popperConfig:d,target:I}),n))}B.defaultProps={defaultShow:!1,trigger:["hover","focus"]};t.a=B},615:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,o,a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.confirmAlert=function(e){document.body.classList.add("react-confirm-alert-body-element"),function(){if(document.getElementById("react-confirm-alert-firm-svg"))return;var e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"feGaussianBlur");t.setAttribute("stdDeviation","0.3");var n=document.createElementNS(e,"filter");n.setAttribute("id","gaussian-blur"),n.appendChild(t);var r=document.createElementNS(e,"svg");r.setAttribute("id","react-confirm-alert-firm-svg"),r.setAttribute("class","react-confirm-alert-svg"),r.appendChild(n),document.body.appendChild(r)}(),function(e){var t=document.getElementById("react-confirm-alert");t||(document.body.children[0].classList.add("react-confirm-alert-blur"),(t=document.createElement("div")).id="react-confirm-alert",document.body.appendChild(t)),(0,u.render)(l.default.createElement(p,e),t)}(e)};var c=n(1),l=s(c),i=s(n(3)),u=n(42);function s(e){return e&&e.__esModule?e:{default:e}}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var p=(o=r=function(e){function t(){var e,n,r;f(this,t);for(var o=arguments.length,a=Array(o),c=0;c<o;c++)a[c]=arguments[c];return n=r=d(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),r.handleClickButton=function(e){e.onClick&&e.onClick(),r.close()},r.handleClickOverlay=function(e){var t=r.props,n=t.closeOnClickOutside,o=t.onClickOutside,a=e.target===r.overlay;n&&a&&(o(),r.close())},r.close=function(){var e=r.props.afterClose;v(),b(),m(e)},r.keyboardClose=function(e){var t=r.props,n=t.closeOnEscape,o=t.onKeypressEscape,a=27===e.keyCode;n&&a&&(o(e),r.close())},r.componentDidMount=function(){document.addEventListener("keydown",r.keyboardClose,!1)},r.componentWillUnmount=function(){document.removeEventListener("keydown",r.keyboardClose,!1),r.props.willUnmount()},r.renderCustomUI=function(){var e=r.props,t=e.title,n=e.message,o=e.buttons;return(0,e.customUI)({title:t,message:n,buttons:o,onClose:r.close})},d(r,n)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.title,r=t.message,o=t.buttons,a=t.childrenElement,c=t.customUI;return l.default.createElement("div",{className:"react-confirm-alert-overlay",ref:function(t){return e.overlay=t},onClick:this.handleClickOverlay},l.default.createElement("div",{className:"react-confirm-alert"},c?this.renderCustomUI():l.default.createElement("div",{className:"react-confirm-alert-body"},n&&l.default.createElement("h1",null,n),r,a(),l.default.createElement("div",{className:"react-confirm-alert-button-group"},o.map((function(t,n){return l.default.createElement("button",{key:n,onClick:function(){return e.handleClickButton(t)},className:t.className},t.label)}))))))}}]),t}(c.Component),r.propTypes={title:i.default.string,message:i.default.string,buttons:i.default.array.isRequired,childrenElement:i.default.func,customUI:i.default.func,closeOnClickOutside:i.default.bool,closeOnEscape:i.default.bool,willUnmount:i.default.func,afterClose:i.default.func,onClickOutside:i.default.func,onKeypressEscape:i.default.func},r.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null},className:null},{label:"Confirm",onClick:function(){return null},className:null}],childrenElement:function(){return null},closeOnClickOutside:!0,closeOnEscape:!0,willUnmount:function(){return null},afterClose:function(){return null},onClickOutside:function(){return null},onKeypressEscape:function(){return null}},o);function m(e){var t=document.getElementById("react-confirm-alert-firm-svg");t.parentNode.removeChild(t),document.body.children[0].classList.remove("react-confirm-alert-blur"),e()}function b(){var e=document.getElementById("react-confirm-alert");e&&((0,u.unmountComponentAtNode)(e),e.parentNode.removeChild(e))}function v(){document.body.classList.remove("react-confirm-alert-body-element")}t.default=p},621:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(1),o=n(211),a=n(650),c=Math.pow(2,31)-1;function l(){var e=Object(o.a)(),t=Object(r.useRef)();return Object(a.a)((function(){return clearTimeout(t.current)})),Object(r.useMemo)((function(){var n=function(){return clearTimeout(t.current)};return{set:function(r,o){void 0===o&&(o=0),e()&&(n(),o<=c?t.current=setTimeout(r,o):function e(t,n,r){var o=r-Date.now();t.current=o<=c?setTimeout(n,o):setTimeout((function(){return e(t,n,r)}),c)}(t,r,Date.now()+o))},clear:n}}),[])}},633:function(e,t,n){"use strict";var r=n(2),o=n(4),a=n(1),c=n.n(a),l=n(3),i=n.n(l),u=n(599),s=n(206),f=n(204),d={id:i.a.any,href:i.a.string,onClick:i.a.func,title:i.a.node.isRequired,disabled:i.a.bool,menuRole:i.a.string,renderMenuOnMount:i.a.bool,rootCloseEvent:i.a.string,bsPrefix:i.a.string,variant:i.a.string,size:i.a.string},p=c.a.forwardRef((function(e,t){var n=e.title,a=e.children,l=e.bsPrefix,i=e.rootCloseEvent,d=e.variant,p=e.size,m=e.menuRole,b=e.renderMenuOnMount,v=e.disabled,h=e.href,y=e.id,O=Object(o.a)(e,["title","children","bsPrefix","rootCloseEvent","variant","size","menuRole","renderMenuOnMount","disabled","href","id"]);return c.a.createElement(u.a,Object(r.a)({ref:t},O),c.a.createElement(s.a,{id:y,href:h,size:p,variant:d,disabled:v,childBsPrefix:l},n),c.a.createElement(f.a,{role:m,renderOnMount:b,rootCloseEvent:i},a))}));p.displayName="DropdownButton",p.propTypes=d,t.a=p}}]);
//# sourceMappingURL=51.e208f6cb.chunk.js.map