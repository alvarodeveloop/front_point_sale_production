(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[32],{838:function(e,a,t){"use strict";t.r(a);var c=t(45),s=(t(314),t(16)),r=t(1),l=t.n(r),n=(t(52),t(99)),i=t(3),m=t(4),o=t(2),b=t.n(o),u=t(5),d=t.n(u),g=t(6),p={tag:g.k,listTag:g.k,className:b.a.string,listClassName:b.a.string,cssModule:b.a.object,children:b.a.node,"aria-label":b.a.string},h=function(e){var a=e.className,t=e.listClassName,c=e.cssModule,s=e.children,r=e.tag,n=e.listTag,o=e["aria-label"],b=Object(m.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),u=Object(g.h)(d()(a),c),p=Object(g.h)(d()("breadcrumb",t),c);return l.a.createElement(r,Object(i.a)({},b,{className:u,"aria-label":o}),l.a.createElement(n,{className:p},s))};h.propTypes=p,h.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"};var j=h,v={tag:g.k,active:b.a.bool,className:b.a.string,cssModule:b.a.object},f=function(e){var a=e.className,t=e.cssModule,c=e.active,s=e.tag,r=Object(m.a)(e,["className","cssModule","active","tag"]),n=Object(g.h)(d()(a,!!c&&"active","breadcrumb-item"),t);return l.a.createElement(s,Object(i.a)({},r,{className:n,"aria-current":c?"page":void 0}))};f.propTypes=v,f.defaultProps={tag:"li"};var O=f,N={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6","display-1":"h1","display-2":"h1","display-3":"h1","display-4":"h1",p:"p",lead:"p",blockquote:"blockquote"},E=function(e){var a,t=e.tag,r=e.className,n=e.type,i=Object(s.a)(e,["tag","className","type"]),m=d()(Object(c.a)({},n,!!n),r);return a=t||(!t&&N[n]?N[n]:"p"),l.a.createElement(a,Object.assign({},i,{className:m}))};E.defaultProps={type:"p"};var k=E,y=n.a.create("page"),C=function(e){var a=e.title,t=e.breadcrumbs,c=e.tag,r=e.className,n=e.children,i=Object(s.a)(e,["title","breadcrumbs","tag","className","children"]),m=y.b("px-3",r);return l.a.createElement(c,Object.assign({className:m},i),l.a.createElement("div",{className:y.e("header")},a&&"string"===typeof a?l.a.createElement(k,{type:"h1",className:y.e("title")},a):a,t&&l.a.createElement(j,{className:y.e("breadcrumb")},l.a.createElement(O,null,"Home"),t.length&&t.map((function(e,a){var t=e.name,c=e.active;return l.a.createElement(O,{key:a,active:c},t)})))),n)};C.defaultProps={tag:"div",title:""};var T=C,z=t(32),M=t(626),P=t(627),w=t(318),D=t(319);a.default=function(e){var a,t,s,r=function(a){e.history.replace(a)};return l.a.createElement(T,{className:"DashboardPage",title:"Dashboard",breadcrumbs:[{name:"Dashboard",active:!0}]},l.a.createElement(M.a,null,l.a.createElement(P.a,{className:"containerDiv"},l.a.createElement(w.a,{sm:4,md:4,lg:4},l.a.createElement(D.a,(a={size:"sm"},Object(c.a)(a,"size","sm"),Object(c.a)(a,"onClick",(function(){return r("/config/config_general")})),Object(c.a)(a,"variant","secondary"),Object(c.a)(a,"block",!0),a),"Configuraci\xf3n General ",l.a.createElement(z.f,null))),l.a.createElement(w.a,{sm:4,md:4,lg:4},l.a.createElement(D.a,(t={size:"sm"},Object(c.a)(t,"size","sm"),Object(c.a)(t,"onClick",(function(){return r("/config/config_store")})),Object(c.a)(t,"variant","secondary"),Object(c.a)(t,"block",!0),t),"Configuraci\xf3n Tienda ",l.a.createElement(z.t,null))),l.a.createElement(w.a,{sm:4,md:4,lg:4},l.a.createElement(D.a,(s={size:"sm"},Object(c.a)(s,"size","sm"),Object(c.a)(s,"onClick",(function(){return r("/user/list")})),Object(c.a)(s,"variant","secondary"),Object(c.a)(s,"block",!0),s),"Usuarios ",l.a.createElement(z.x,null))))))}}}]);
//# sourceMappingURL=32.0faed994.chunk.js.map