(this["webpackJsonpappwork-react-starter"]=this["webpackJsonpappwork-react-starter"]||[]).push([[30],{800:function(e,t,a){},836:function(e,t,a){"use strict";a.r(t);var l=a(41),n=a(1),c=a.n(n),r=(a(37),a(631)),m=a(632),s=a(319),o=a(656),u=(a(800),a(32)),i=a(18),E=a(669),d=a(17),f=a.n(d),g=a(15),b="",h=function(e){var t=Object(n.useState)(null),a=Object(l.a)(t,2),d=a[0],h=a[1];Object(n.useEffect)((function(){p()}),[]);var p=function(){var t=e.match.params.id;f.a.get(i.a+"sale/"+t).then((function(e){h(e.data),setTimeout((function(){window.print()}),500)})).catch((function(e){e.response?g.b.error(e.response.data.message):g.b.error("Error, contacte con soporte")}))},x=function(t){var a=0;if(t.is_neto||void 0===t.is_neto)return a+=t.quantity*t.price,a,a,Object(u.f)(e.config,a);a=t.quantity*t.price,a;var l=t.price*t.quantity*e.configStore.tax/100;return l,a+l,Object(u.f)(e.config,a+l)};return d?c.a.createElement(r.a,null,c.a.createElement(m.a,{className:"justify-content-center"},c.a.createElement(s.a,{sm:4,md:4,lg:4,xs:12,className:"text-center"},c.a.createElement(o.a,{src:i.a+"images/store/logo/"+e.configStore.logo,style:{width:"40%"}}))),c.a.createElement("br",null),c.a.createElement(m.a,{className:"justify-content-center text-center"},c.a.createElement(s.a,{sm:4,md:4,lg:4,xs:12},c.a.createElement("h4",null,e.configStore.name_store))),c.a.createElement(m.a,{className:"justify-content-center text-center"},c.a.createElement(s.a,{sm:4,md:4,lg:4,xs:12},c.a.createElement("h4",null,e.configStore.address))),c.a.createElement(m.a,{className:"justify-content-center text-center"},c.a.createElement(s.a,{sm:4,md:4,lg:4,xs:12},c.a.createElement("h4",null,"Fono: ",e.configStore.phone))),c.a.createElement("br",null),c.a.createElement(m.a,{className:"justify-content-center"},c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6,className:"div_client"},c.a.createElement(m.a,null,c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6},c.a.createElement("h6",null,"Se\xf1or(es)")),c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6},d.client?c.a.createElement("h6",null,d.client.name_client):"")),c.a.createElement(m.a,null,c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6},c.a.createElement("h6",null,"Fecha: ")),c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6},E.tz("America/Santiago").format("DD-MM-YYYY"))),c.a.createElement(m.a,null,c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6},c.a.createElement("h6",null,"Rut")),c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6},d.client?c.a.createElement(c.a.Fragment,null,c.a.createElement("h6",null,d.client.type_document),c.a.createElement("h6",null,d.client.data_document)):"")),c.a.createElement(m.a,null,c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6},c.a.createElement("h6",null,"Direcci\xf3n")),c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6},d.client?c.a.createElement("h6",null,d.client.address):"")),c.a.createElement(m.a,null,c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6},c.a.createElement("h6",null,"Tel\xe9fono")),c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6},d.client?c.a.createElement("h6",null,d.client.phone):"")))),c.a.createElement(m.a,{className:"justify-content-center"},c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6,className:"div_client"},c.a.createElement("table",{className:"table"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"text-center bgThead"},"Producto"),c.a.createElement("th",{className:"text-center bgThead"},"Precio.U"),c.a.createElement("th",{className:"text-center bgThead"},"Cantidad"),c.a.createElement("th",{className:"text-center bgThead"},"Iva"),c.a.createElement("th",{className:"text-center bgThead"},"Total"))),c.a.createElement("tbody",{className:"text-center"},d.products.map((function(t,a){return b=function(t){if(t.is_neto||void 0===t.is_neto)return c.a.createElement("span",null,"Excento");var a=t.price*t.quantity*e.configStore.tax/100;return a,Object(u.f)(e.config,a)}(t),c.a.createElement("tr",{key:a},c.a.createElement("td",null,t.product.name_product),c.a.createElement("td",null,e.config.simbolo_moneda,Object(u.f)(e.config,t.price)),c.a.createElement("td",null,t.quantity),c.a.createElement("td",null,t.product.is_neto?"":e.config.simbolo_moneda,b),c.a.createElement("td",null,e.config.simbolo_moneda,x(t)," "))})),d.products_not_registered.map((function(t,a){return c.a.createElement("tr",{key:a},c.a.createElement("td",null,t.name_product),c.a.createElement("td",null,e.config.simbolo_moneda,Object(u.f)(e.config,t.price)),c.a.createElement("td",null,t.quantity),c.a.createElement("td",null,"Excento"),c.a.createElement("td",null,e.config.simbolo_moneda,x(t)," "))})))))),c.a.createElement(m.a,{className:"justify-content-center"},c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6,className:"div_client"},c.a.createElement("table",{className:"table"},c.a.createElement("tbody",{className:""},c.a.createElement("tr",null,c.a.createElement("td",null,"Monto Neto:"),c.a.createElement("td",null,Object(u.f)(e.config,d.sub_total))),c.a.createElement("tr",null,c.a.createElement("td",null,"Tax",e.configStore.tax," :"),c.a.createElement("td",null,Object(u.f)(e.config,d.tax))),c.a.createElement("tr",null,c.a.createElement("td",null,"Total:"),c.a.createElement("td",null,Object(u.f)(e.config,d.total))))))),c.a.createElement(m.a,{className:"justify-content-center"},c.a.createElement(s.a,{sm:6,md:6,lg:6,xs:6,className:"div_client"},c.a.createElement("table",{className:"rowTable",border:"1"},c.a.createElement("tbody",null,c.a.createElement("tr",null,c.a.createElement("td",{className:"text-center"},"ACUSE DE RECIBO")),c.a.createElement("tr",null,c.a.createElement("td",null,"Nombre:")),c.a.createElement("tr",null,c.a.createElement("td",null,"Rut:")),c.a.createElement("tr",null,c.a.createElement("td",null,"Fecha:")),c.a.createElement("tr",null,c.a.createElement("td",null,"Recinto:")),c.a.createElement("tr",null,c.a.createElement("td",null,"Firma:")),c.a.createElement("tr",null,c.a.createElement("td",null,"El acuse de recibo que se declara en esteacto, de acuerdo a lo dispuesto en la letra b)del art\xedculo 4\xba y la letra c) del art\xedculo 5\xba de laley 19.983, acredita que la entrega demercader\xeda(s) o servicio(s) prestado(s) ha(n)sido recibo(s)"))))))):c.a.createElement("h1",null,"Sin datos de factura")};h.defaultProps={config:JSON.parse(localStorage.getItem("configGeneral")),configStore:JSON.parse(localStorage.getItem("configStore"))},t.default=h}}]);
//# sourceMappingURL=30.7b70c3ac.chunk.js.map