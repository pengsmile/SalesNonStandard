(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{"0Owb":function(e,t,n){"use strict";function a(){return a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},a.apply(this,arguments)}n.d(t,"a",(function(){return a}))},Dwlv:function(e,t,n){e.exports={toolbar:"toolbar___1yFBa",left:"left___nlsq6",right:"right___3Rq5M"}},JZj8:function(e,t,n){"use strict";n.r(t);n("P2fV");var a=n("NJEC"),r=(n("+L6B"),n("2/Rp")),l=(n("7Kak"),n("9yH6")),o=(n("IzEo"),n("bx4M")),c=(n("+BJd"),n("mr32")),i=(n("g9YV"),n("wCAj")),s=(n("14J3"),n("BMrR")),u=(n("jCWc"),n("kPKH")),m=(n("/zsF"),n("PArb")),f=(n("bP8k"),n("gFTJ")),_=(n("/xke"),n("TeRw")),d=n("WmNS"),b=n.n(d),E=(n("miYZ"),n("tsqr")),p=n("9og8"),v=n("tJVT"),y=(n("5NDa"),n("5rEg")),T=n("q1tI"),P=n.n(T),C=n("Hx5s"),A=n("9kvl"),I=n("J5/B"),S=n("n+Aq"),N=n("0Owb"),O=n("PpiC"),V=n("fWQN"),h=n("mtLc"),M=n("yKVA"),g=n("879j"),x=n("TSYQ"),j=n.n(x),w=n("Dwlv"),L=n.n(w),D=function(e){Object(M["a"])(n,e);var t=Object(g["a"])(n);function n(){var e;Object(V["a"])(this,n);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return e=t.call.apply(t,[this].concat(r)),e.getWidth=function(e){var t=e.collapsed,n=e.isMobile,a=e.siderWidth,r=document.querySelector(".ant-layout-sider");if(r)return n?void 0:"calc(100% - ".concat(t?80:a||256,"px)")},e}return Object(h["a"])(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.children,a=t.className,r=t.extra,l=Object(O["a"])(t,["children","className","extra"]);return P.a.createElement(C["d"].Consumer,null,(function(t){return P.a.createElement("div",Object(N["a"])({className:j()(a,L.a.toolbar),style:{width:e.getWidth(t),transition:"0.3s all"}},l),P.a.createElement("div",{className:L.a.left},r),P.a.createElement("div",{className:L.a.right},n))}))}}]),n}(T["Component"]),U=n("qGy/"),k=n.n(U),R=y["a"].TextArea,B=function(e){var t=e.title,n=e.value,a=e.bordered;return P.a.createElement("div",{className:k.a.headerInfo},P.a.createElement("span",null,t),P.a.createElement("p",null,n),a&&P.a.createElement("em",null))},H=function(e){e.dispatch;var t=A["d"].location,n=t.query,d=n.VPVT_KY,y=n.watch,N=Object(T["useState"])(y?"WATCH":"AUDIT"),O=Object(v["a"])(N,2),V=O[0],h=(O[1],Object(T["useState"])(!1)),M=Object(v["a"])(h,2),g=M[0],x=M[1],j=Object(T["useState"])({VIP_NAME:"",VIP_CERT_ID_NUM:"",VIP_CELL_PHONE:"",PAY_TYPE_DESC:"",LIMIT_AMT:"",SPEC_DISCOUNT:"",SUM_ALLOW_AMT:"",SUM_PAID:"",VPVT_CHG:"",VPVT_CALC_AMT:"",VPVT_ALLOW_AMT:"",VPVT_FINAL_PAID:"",VPVT_COMMENT:"",DCDC_NAME:""}),w=Object(v["a"])(j,2),L=w[0],U=w[1],H=Object(T["useState"])({}),F=Object(v["a"])(H,2),Y=F[0],W=F[1],J={},q=Object(T["useState"])([]),K=Object(v["a"])(q,2),G=K[0],z=K[1],Q=Object(T["useState"])("NEXT"),Z=Object(v["a"])(Q,2),X=Z[0],$=Z[1];Object(S["b"])((function(){var e=function(){var e=Object(p["a"])(b.a.mark((function e(){var t,n,a,r,l,o,c,i,s,u,m,f,_,p,v,y,T,P;return b.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return x(!0),t=E["a"].loading("\u52a0\u8f7d\u4e2d",0),e.next=4,Object(I["a"])({SP_NAME:"SP_VIP_VISIT_SELECT",m:"DULPEX",VPVT_KY:d,DB_NAME:"DENTAL_CUSTOMER"});case 4:return n=e.sent,e.next=7,Object(I["a"])({SP_NAME:"SP_VIP_VISIT_AUDIT_INFO_SELECT",DB_NAME:"DENTAL_CUSTOMER",m:"SELECT",VPVT_KY:d});case 7:a=e.sent,W(a[0]),r=n.datatable[0],l=r.VIP_NAME,o=r.VIP_CERT_ID_NUM,c=r.SUM_PAID,i=r.DCDC_NAME,s=r.VPVT_COMMENT,u=r.VPVT_CHG,m=r.VPVT_CALC_AMT,f=r.VPVT_ALLOW_AMT,_=r.VPVT_FINAL_PAID,p=r.VIP_CELL_PHONE,v=r.PAY_TYPE_DESC,y=r.LIMIT_AMT,T=r.SPEC_DISCOUNT,P=r.SUM_ALLOW_AMT,U({VIP_NAME:l,VIP_CERT_ID_NUM:o,VIP_CELL_PHONE:p,PAY_TYPE_DESC:v,LIMIT_AMT:y,SPEC_DISCOUNT:T,SUM_ALLOW_AMT:P,SUM_PAID:c,VPVT_CHG:u,VPVT_CALC_AMT:m,VPVT_ALLOW_AMT:f,VPVT_FINAL_PAID:_,VPVT_COMMENT:s,DCDC_NAME:i}),z(n.datatable2),x(!1),t();case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}));var ee=function(e){$(e.target.value)},te=[{title:"\u6cbb\u7597\u9879\u76ee",dataIndex:"SPSP_NAME",key:"SPSP_NAME"},{title:"\u6570\u91cf",dataIndex:"SPSP_UNIT",key:"SPSP_UNIT"},{title:"\u5355\u4ef7",dataIndex:"SPSP_AMT",key:"SPSP_AMT",render:function(e,t,n){return P.a.createElement("span",null,"\uffe5",parseFloat(t.SPSP_AMT).toFixed(2))}}],ne=function(){var e=Object(p["a"])(b.a.mark((function e(){var t;return b.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return E["a"].loading("\u63d0\u4ea4\u4e2d....."),x(!0),e.next=4,Object(I["a"])({SP_NAME:"SP_VIP_VISIT_AUDIT_INFO_INVOKE",DB_NAME:"DENTAL_CUSTOMER",m:"INVOKE",VPVT_KY:d,ACTION:X,AUDIT_COMMENT:J.current.state.value});case 4:t=e.sent,x(!1),t.RETURN_CODE?_["a"].error({message:t.RETURN_MESSAGE,description:"",duration:2.5}):(_["a"].success({message:t.RETURN_MESSAGE,description:"\u5373\u5c06\u8fd4\u56de\u9996\u9875",duration:2.5}),setTimeout((function(){A["d"].goBack()}),2500));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return P.a.createElement(P.a.Fragment,null,P.a.createElement(C["b"],null),P.a.createElement(o["a"],{className:k.a.card},P.a.createElement(f["a"],{title:"\u5ba2\u6237\u4fe1\u606f",column:{xxl:4,xl:3,lg:3,md:3,sm:2,xs:1},style:{marginBottom:10}},P.a.createElement(f["a"].Item,{label:"\u5ba2\u6237\u59d3\u540d"},L.VIP_NAME),P.a.createElement(f["a"].Item,{label:"\u8bc1\u4ef6\u53f7"},L.VIP_CERT_ID_NUM),P.a.createElement(f["a"].Item,{label:"\u624b\u673a\u53f7"},L.VIP_CELL_PHONE),P.a.createElement(f["a"].Item,{label:"\u4f18\u60e0\u6bd4\u4f8b"},100*parseFloat(L.SPEC_DISCOUNT),"%"),P.a.createElement(f["a"].Item,{label:"\u6700\u5927\u989d\u5ea6 / \u5df2\u7528\u989d\u5ea6"},"\uffe5",L.LIMIT_AMT," / \uffe5",L.SUM_ALLOW_AMT),P.a.createElement(f["a"].Item,{label:"\u5ba2\u6237\u603b\u4ed8"},"\uffe5",L.SUM_PAID),P.a.createElement(f["a"].Item,{label:"\u7ed3\u7b97\u65b9\u5f0f"},L.PAY_TYPE_DESC)),P.a.createElement(m["a"],{style:{marginBottom:10}}),P.a.createElement("div",{className:k.a.title},"\u5ba2\u6237\u8be6\u60c5"),P.a.createElement("div",null,P.a.createElement(s["a"],null,P.a.createElement(u["a"],{sm:24,xs:24,md:6,lg:6,xl:6},P.a.createElement(B,{title:"\u603b\u8ba1",value:"\uffe5".concat(L.VPVT_CHG),bordered:!0})),P.a.createElement(u["a"],{sm:24,xs:24,md:6,lg:6,xl:6},P.a.createElement(B,{title:"\u4f18\u60e0",value:"\uffe5".concat(L.VPVT_CALC_AMT),bordered:!0})),P.a.createElement(u["a"],{sm:24,xs:24,md:6,lg:6,xl:6},P.a.createElement(B,{title:"\u5e94\u6536",value:"\uffe5".concat(L.VPVT_ALLOW_AMT),bordered:!0})),P.a.createElement(u["a"],{sm:24,xs:24,md:6,lg:6,xl:6},P.a.createElement(B,{title:"\u5ba2\u6237\u4ed8\u6b3e",value:"\uffe5".concat(L.VPVT_FINAL_PAID)})))),P.a.createElement(i["a"],{pagination:!1,columns:te,bordered:!0,dataSource:G}),P.a.createElement(m["a"],{style:{marginBottom:10}}),P.a.createElement(f["a"],{title:"\u5176\u4ed6\u4fe1\u606f",column:{xxl:4,xl:3,lg:3,md:3,sm:2,xs:1},style:{marginBottom:10}},P.a.createElement(f["a"].Item,{label:"\u533b\u751f\u59d3\u540d"},L.DCDC_NAME),P.a.createElement(f["a"].Item,{label:"\u5c31\u8bca\u5907\u6ce8"},L.VPVT_COMMENT)),P.a.createElement(m["a"],{style:{marginBottom:10}}),P.a.createElement("div",{className:k.a.title},"\u5ba1\u6838\u610f\u89c1"),"WATCH"==V?P.a.createElement(R,{readOnly:!0,style:{resize:"none"},value:Y.AUDIT_COMMENT,rows:3,placeholder:"\u5ba1\u6838\u8bf4\u660e"}):P.a.createElement(R,{ref:J,rows:3,placeholder:"\u5ba1\u6838\u8bf4\u660e"}),P.a.createElement("div",{className:k.a.affix},"WATCH"==V?P.a.createElement(c["a"],{className:k.a.tag,color:"error"},Y.VPVT_AUDIT_STS_DESC):"")),P.a.createElement(D,{extra:"AUDIT"==V?P.a.createElement(l["a"].Group,{onChange:ee,defaultValue:"NEXT",buttonStyle:"solid"},P.a.createElement(l["a"],{value:"NEXT"}," \u901a\u8fc7"),P.a.createElement(l["a"],{value:"REJECT"}," \u9a73\u56de")):""},"AUDIT"==V?P.a.createElement(a["a"],{title:"\u4f60\u786e\u5b9a\u8981\u63d0\u4ea4\u5417\uff1f",onConfirm:ne},P.a.createElement(r["a"],{type:"primary",loading:g},"\u63d0\u4ea4")):"",P.a.createElement(r["a"],{onClick:function(){A["d"].goBack()}},"\u8fd4\u56de")))};t["default"]=Object(A["a"])((function(){return{}}))(H)},NJEC:function(e,t,n){"use strict";var a=n("q1tI"),r=n("sKbD"),l=n.n(r),o=n("3S7+"),c=n("2/Rp"),i=n("YMnH"),s=n("ZvpZ"),u=n("H84U"),m=n("bogI"),f=void 0;function _(){return _=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},_.apply(this,arguments)}function d(e,t){return y(e)||v(e,t)||E(e,t)||b()}function b(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function E(e,t){if(e){if("string"===typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function v(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],a=!0,r=!1,l=void 0;try{for(var o,c=e[Symbol.iterator]();!(a=(o=c.next()).done);a=!0)if(n.push(o.value),t&&n.length===t)break}catch(i){r=!0,l=i}finally{try{a||null==c["return"]||c["return"]()}finally{if(r)throw l}}return n}}function y(e){if(Array.isArray(e))return e}var T=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},P=a["forwardRef"]((function(e,t){var n=a["useState"](e.visible),r=d(n,2),l=r[0],b=r[1];a["useEffect"]((function(){"visible"in e&&b(e.visible)}),[e.visible]),a["useEffect"]((function(){"defaultVisible"in e&&b(e.defaultVisible)}),[e.defaultVisible]);var E=function(t,n){"visible"in e||b(t),e.onVisibleChange&&e.onVisibleChange(t,n)},p=function(t){E(!1,t),e.onConfirm&&e.onConfirm.call(f,t)},v=function(t){E(!1,t),e.onCancel&&e.onCancel.call(f,t)},y=function(t){var n=e.disabled;n||E(t)},P=function(t,n){var r=e.okButtonProps,l=e.cancelButtonProps,o=e.title,i=e.cancelText,s=e.okText,u=e.okType,f=e.icon;return a["createElement"]("div",{className:"".concat(t,"-inner-content")},a["createElement"]("div",{className:"".concat(t,"-message")},f,a["createElement"]("div",{className:"".concat(t,"-message-title")},Object(m["a"])(o))),a["createElement"]("div",{className:"".concat(t,"-buttons")},a["createElement"](c["a"],_({onClick:v,size:"small"},l),i||n.cancelText),a["createElement"](c["a"],_({onClick:p,type:u,size:"small"},r),s||n.okText)))},C=a["useContext"](u["b"]),A=C.getPrefixCls,I=e.prefixCls,S=e.placement,N=T(e,["prefixCls","placement"]),O=A("popover",I),V=a["createElement"](i["a"],{componentName:"Popconfirm",defaultLocale:s["a"].Popconfirm},(function(e){return P(O,e)}));return a["createElement"](o["a"],_({},N,{prefixCls:O,placement:S,onVisibleChange:y,visible:l,overlay:V,ref:t}))}));P.defaultProps={transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary",icon:a["createElement"](l.a,null),disabled:!1},t["a"]=P},P2fV:function(e,t,n){"use strict";n("cIOH"),n("Q9mQ"),n("+L6B")},bP8k:function(e,t,n){"use strict";n("cIOH"),n("jhiw")},gFTJ:function(e,t,n){"use strict";var a=n("q1tI"),r=n("TSYQ"),l=n.n(r),o=n("Zm9Q"),c=n("ACnJ"),i=n("6CfX"),s=n("H84U");function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e){return void 0!==e&&null!==e}var f=function(e){var t,n=e.itemPrefixCls,r=e.component,o=e.span,c=e.className,i=e.style,s=e.bordered,f=e.label,_=e.content,d=e.colon,b=r;return s?a["createElement"](b,{className:l()((t={},u(t,"".concat(n,"-item-label"),m(f)),u(t,"".concat(n,"-item-content"),m(_)),t),c),style:i,colSpan:o},m(f)?f:_):a["createElement"](b,{className:l()("".concat(n,"-item"),c),style:i,colSpan:o},f&&a["createElement"]("span",{className:l()("".concat(n,"-item-label"),u({},"".concat(n,"-item-colon"),d))},f),_&&a["createElement"]("span",{className:l()("".concat(n,"-item-content"))},_))},_=f;function d(e,t,n){var r=t.colon,l=t.prefixCls,o=t.bordered,c=n.component,i=n.type,s=n.showLabel,u=n.showContent;return e.map((function(e,t){var n=e.props,m=n.label,f=n.children,d=n.prefixCls,b=void 0===d?l:d,E=n.className,p=n.style,v=n.span,y=void 0===v?1:v,T=e.key;return"string"===typeof c?a["createElement"](_,{key:"".concat(i,"-").concat(T||t),className:E,style:p,span:y,colon:r,component:c,itemPrefixCls:b,bordered:o,label:s?m:null,content:u?f:null}):[a["createElement"](_,{key:"label-".concat(T||t),className:E,style:p,span:1,colon:r,component:c[0],itemPrefixCls:b,bordered:o,label:m}),a["createElement"](_,{key:"content-".concat(T||t),className:E,style:p,span:2*y-1,component:c[1],itemPrefixCls:b,bordered:o,content:f})]}))}var b=function(e){var t=e.prefixCls,n=e.vertical,r=e.row,l=e.index,o=e.bordered;return n?a["createElement"](a["Fragment"],null,a["createElement"]("tr",{key:"label-".concat(l),className:"".concat(t,"-row")},d(r,e,{component:"th",type:"label",showLabel:!0})),a["createElement"]("tr",{key:"content-".concat(l),className:"".concat(t,"-row")},d(r,e,{component:"td",type:"content",showContent:!0}))):a["createElement"]("tr",{key:l,className:"".concat(t,"-row")},d(r,e,{component:o?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0}))},E=b,p=function(e){var t=e.children;return t},v=p;function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function T(e,t){return S(e)||I(e,t)||C(e,t)||P()}function P(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function C(e,t){if(e){if("string"===typeof e)return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?A(e,t):void 0}}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function I(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],a=!0,r=!1,l=void 0;try{for(var o,c=e[Symbol.iterator]();!(a=(o=c.next()).done);a=!0)if(n.push(o.value),t&&n.length===t)break}catch(i){r=!0,l=i}finally{try{a||null==c["return"]||c["return"]()}finally{if(r)throw l}}return n}}function S(e){if(Array.isArray(e))return e}function N(e){return N="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},N(e)}var O={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1};function V(e,t){if("number"===typeof e)return e;if("object"===N(e))for(var n=0;n<c["b"].length;n++){var a=c["b"][n];if(t[a]&&void 0!==e[a])return e[a]||O[a]}return 3}function h(e,t,n){var r=e;return(void 0===t||t>n)&&(r=a["cloneElement"](e,{span:n}),Object(i["a"])(void 0===t,"Descriptions","Sum of column `span` in a line not match `column` of Descriptions.")),r}function M(e,t){var n=Object(o["a"])(e).filter((function(e){return e})),a=[],r=[],l=t;return n.forEach((function(e,o){var c,i=null===(c=e.props)||void 0===c?void 0:c.span,s=i||1;if(o===n.length-1)return r.push(h(e,i,l)),void a.push(r);s<l?(l-=s,r.push(e)):(r.push(h(e,s,l)),a.push(r),l=t,r=[])})),a}function g(e){var t,n=e.prefixCls,r=e.title,o=e.column,i=void 0===o?O:o,u=e.colon,m=void 0===u||u,f=e.bordered,_=e.layout,d=e.children,b=e.className,p=e.style,v=e.size,P=a["useContext"](s["b"]),C=P.getPrefixCls,A=P.direction,I=C("descriptions",n),S=a["useState"]({}),h=T(S,2),g=h[0],x=h[1],j=V(i,g);a["useEffect"]((function(){var e=c["a"].subscribe((function(e){"object"===N(i)&&x(e)}));return function(){c["a"].unsubscribe(e)}}),[]);var w=M(d,j);return a["createElement"]("div",{className:l()(I,b,(t={},y(t,"".concat(I,"-").concat(v),v&&"default"!==v),y(t,"".concat(I,"-bordered"),!!f),y(t,"".concat(I,"-rtl"),"rtl"===A),t)),style:p},r&&a["createElement"]("div",{className:"".concat(I,"-title")},r),a["createElement"]("div",{className:"".concat(I,"-view")},a["createElement"]("table",null,a["createElement"]("tbody",null,w.map((function(e,t){return a["createElement"](E,{key:t,index:t,colon:m,prefixCls:I,vertical:"vertical"===_,bordered:f,row:e})}))))))}g.Item=v;t["a"]=g},jhiw:function(e,t,n){},"qGy/":function(e,t,n){e.exports={card:"card___3JZMA",errorIcon:"errorIcon___1iBcQ",anticon:"anticon___1IMJR",errorPopover:"errorPopover___3irJg",errorListItem:"errorListItem___iMipa",errorField:"errorField___9y9CY",editable:"editable___2C6r3",title:"title___2NVTk",headerInfo:"headerInfo___3Falh",affix:"affix___5rLyS",tag:"tag___3djUh"}}}]);