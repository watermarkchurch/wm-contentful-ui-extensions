!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="../",n(n.s=169)}({1:function(t,e,n){"use strict";var r=n(3).a.Symbol;e.a=r},12:function(t,e){t.exports=window.contentfulExtension},169:function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),i=this&&this.__assign||function(){return(i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};e.__esModule=!0;var a=n(12),s=n(40),c=n(178),u=n(6),l=n(17),f=n(39);n(170);a&&a.init(function(t){u.render(u.h(p,i({},t)),document.getElementById("react-root")),t.window.startAutoResizer()});var p=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r.reload=c.default(function(){r.setState({clearUrl:!0})},1e3),r.onLoad=function(t){r.setState({loading:!1})},r.state={fieldValue:e.field&&e.field.getValue(),entry:e.entry,fields:Object.keys(e.entry.fields).reduce(function(t,n){return t[n]=e.entry.fields[n].getValue(),t},{}),loading:!0},r}return o(e,t),e.prototype.params=function(){var t=this.props.parameters||{};return Object.assign({},t.installation,t.instance,t.invocation)},e.prototype.componentDidMount=function(){var t=this,e=this.props;e.field.onValueChanged(function(e){t.setState({fieldValue:e}),t.reload()}),Object.keys(e.entry.fields).forEach(function(n){e.entry.fields[n].onValueChanged(function(e){var r=i({},t.state.fields);r[n]=e,t.setState({fields:r}),t.reload()})})},e.prototype.renderUrl=function(){var t=this.state,e=t.entry,n=t.fields,r=i(i({sys:e.getSys(),fields:n},{id:e.getSys().id}),n);try{return f(this.params().renderUrl,r)}catch(t){console.error("template error!",t)}},e.prototype.render=function(){var t=this,e=this.state,n=e.loading,r=e.clearUrl;return r&&setTimeout(function(){t.setState({loading:!0,clearUrl:!1})},1),u.h("div",{className:["section-preview"].join(" ")},u.h("div",{className:"d-flex align-items-end"},u.h("a",{className:"badge badge-success",onClick:this.reload},u.h("i",{className:"material-icons"},"refresh")),u.h("div",{className:"loader",style:{visibility:n?"visible":"hidden"}})),u.h("iframe",{src:r?"":this.renderUrl(),onLoad:function(e){return t.onLoad(e)}}))},e}(u.Component);e.SectionPreview=p,s(document).ready(function(){l.injectBootstrap()})},17:function(t,e,n){"use strict";function r(t,e){var n=document.createElement("script");n.type="text/javascript",n.integrity=e,n.crossOrigin="anonymous",n.src=t,$("head").append(n)}function o(t,e){var n=document.createElement("link");n.rel="stylesheet",n.href=t,n.integrity=e,n.crossOrigin="anonymous",$("head").append(n)}e.__esModule=!0,String.prototype.startsWith||(String.prototype.startsWith=function(t,e){return this.substr(!e||e<0?0:+e,t.length)===t}),e.wait=function(t){return new Promise(function(e,n){return setTimeout(function(){return e()},t)})},e.pathJoin=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return t.join("/").replace(/\/{2,}/,"/")},e.basename=function(t){var e=t.split("/");return e[e.length-1]},e.trimStart=function(t,e){if(!t||!e)return t;for(;t.startsWith(e);)t=t.substring(e.length);return t},e.injectScript=r,e.injectCss=o,e.injectBootstrap=function(){o("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css","sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"),r("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js","sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"),r("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js","sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM")}},170:function(t,e,n){},178:function(t,e,n){"use strict";n.r(e);var r=n(5),o=n(3),i=function(){return o.a.Date.now()},a=n(7),s=NaN,c=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,f=/^0o[0-7]+$/i,p=parseInt;var d=function(t){if("number"==typeof t)return t;if(Object(a.a)(t))return s;if(Object(r.a)(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=Object(r.a)(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(c,"");var n=l.test(t);return n||f.test(t)?p(t.slice(2),n?2:8):u.test(t)?s:+t},v="Expected a function",h=Math.max,m=Math.min;e.default=function(t,e,n){var o,a,s,c,u,l,f=0,p=!1,y=!1,_=!0;if("function"!=typeof t)throw new TypeError(v);function b(e){var n=o,r=a;return o=a=void 0,f=e,c=t.apply(r,n)}function g(t){var n=t-l;return void 0===l||n>=e||n<0||y&&t-f>=s}function x(){var t=i();if(g(t))return j(t);u=setTimeout(x,function(t){var n=e-(t-l);return y?m(n,s-(t-f)):n}(t))}function j(t){return u=void 0,_&&o?b(t):(o=a=void 0,c)}function C(){var t=i(),n=g(t);if(o=arguments,a=this,l=t,n){if(void 0===u)return function(t){return f=t,u=setTimeout(x,e),p?b(t):c}(l);if(y)return u=setTimeout(x,e),b(l)}return void 0===u&&(u=setTimeout(x,e)),c}return e=d(e)||0,Object(r.a)(n)&&(p=!!n.leading,s=(y="maxWait"in n)?h(d(n.maxWait)||0,e):s,_="trailing"in n?!!n.trailing:_),C.cancel=function(){void 0!==u&&clearTimeout(u),f=0,o=l=a=u=void 0},C.flush=function(){return void 0===u?c:j(i())},C}},18:function(t,e,n){"use strict";(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.a=n}).call(this,n(21))},21:function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},3:function(t,e,n){"use strict";var r=n(18),o="object"==typeof self&&self&&self.Object===Object&&self,i=r.a||o||Function("return this")();e.a=i},39:function(t,e){t.exports=function(t,e){const n=Object.keys(e),r=Object.values(e);return new Function(...n,`return \`${t}\`;`)(...r)}},40:function(t,e){t.exports=jQuery},5:function(t,e,n){"use strict";e.a=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},6:function(t,e,n){"use strict";function r(){}n.r(e),n.d(e,"h",function(){return s}),n.d(e,"createElement",function(){return s}),n.d(e,"cloneElement",function(){return l}),n.d(e,"Component",function(){return B}),n.d(e,"render",function(){return V}),n.d(e,"rerender",function(){return v}),n.d(e,"options",function(){return o});var o={},i=[],a=[];function s(t,e){var n,s,c,u,l=a;for(u=arguments.length;u-- >2;)i.push(arguments[u]);for(e&&null!=e.children&&(i.length||i.push(e.children),delete e.children);i.length;)if((s=i.pop())&&void 0!==s.pop)for(u=s.length;u--;)i.push(s[u]);else"boolean"==typeof s&&(s=null),(c="function"!=typeof t)&&(null==s?s="":"number"==typeof s?s=String(s):"string"!=typeof s&&(c=!1)),c&&n?l[l.length-1]+=s:l===a?l=[s]:l.push(s),n=c;var f=new r;return f.nodeName=t,f.children=l,f.attributes=null==e?void 0:e,f.key=null==e?void 0:e.key,void 0!==o.vnode&&o.vnode(f),f}function c(t,e){for(var n in e)t[n]=e[n];return t}var u="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;function l(t,e){return s(t.nodeName,c(c({},t.attributes),e),arguments.length>2?[].slice.call(arguments,2):t.children)}var f=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,p=[];function d(t){!t._dirty&&(t._dirty=!0)&&1==p.push(t)&&(o.debounceRendering||u)(v)}function v(){var t,e=p;for(p=[];t=e.pop();)t._dirty&&E(t)}function h(t,e){return t.normalizedNodeName===e||t.nodeName.toLowerCase()===e.toLowerCase()}function m(t){var e=c({},t.attributes);e.children=t.children;var n=t.nodeName.defaultProps;if(void 0!==n)for(var r in n)void 0===e[r]&&(e[r]=n[r]);return e}function y(t){var e=t.parentNode;e&&e.removeChild(t)}function _(t,e,n,r,o){if("className"===e&&(e="class"),"key"===e);else if("ref"===e)n&&n(null),r&&r(t);else if("class"!==e||o)if("style"===e){if(r&&"string"!=typeof r&&"string"!=typeof n||(t.style.cssText=r||""),r&&"object"==typeof r){if("string"!=typeof n)for(var i in n)i in r||(t.style[i]="");for(var i in r)t.style[i]="number"==typeof r[i]&&!1===f.test(i)?r[i]+"px":r[i]}}else if("dangerouslySetInnerHTML"===e)r&&(t.innerHTML=r.__html||"");else if("o"==e[0]&&"n"==e[1]){var a=e!==(e=e.replace(/Capture$/,""));e=e.toLowerCase().substring(2),r?n||t.addEventListener(e,b,a):t.removeEventListener(e,b,a),(t._listeners||(t._listeners={}))[e]=r}else if("list"!==e&&"type"!==e&&!o&&e in t)!function(t,e,n){try{t[e]=n}catch(t){}}(t,e,null==r?"":r),null!=r&&!1!==r||t.removeAttribute(e);else{var s=o&&e!==(e=e.replace(/^xlink:?/,""));null==r||!1===r?s?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.removeAttribute(e):"function"!=typeof r&&(s?t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),r):t.setAttribute(e,r))}else t.className=r||""}function b(t){return this._listeners[t.type](o.event&&o.event(t)||t)}var g=[],x=0,j=!1,C=!1;function w(){for(var t;t=g.pop();)o.afterMount&&o.afterMount(t),t.componentDidMount&&t.componentDidMount()}function O(t,e,n,r,o,i){x++||(j=null!=o&&void 0!==o.ownerSVGElement,C=null!=t&&!("__preactattr_"in t));var a=N(t,e,n,r,i);return o&&a.parentNode!==o&&o.appendChild(a),--x||(C=!1,i||w()),a}function N(t,e,n,r,o){var i=t,a=j;if(null!=e&&"boolean"!=typeof e||(e=""),"string"==typeof e||"number"==typeof e)return t&&void 0!==t.splitText&&t.parentNode&&(!t._component||o)?t.nodeValue!=e&&(t.nodeValue=e):(i=document.createTextNode(e),t&&(t.parentNode&&t.parentNode.replaceChild(i,t),S(t,!0))),i.__preactattr_=!0,i;var s,c,u=e.nodeName;if("function"==typeof u)return function(t,e,n,r){var o=t&&t._component,i=o,a=t,s=o&&t._componentConstructor===e.nodeName,c=s,u=m(e);for(;o&&!c&&(o=o._parentComponent);)c=o.constructor===e.nodeName;o&&c&&(!r||o._component)?(P(o,u,3,n,r),t=o.base):(i&&!s&&(W(i),t=a=null),o=M(e.nodeName,u,n),t&&!o.nextBase&&(o.nextBase=t,a=null),P(o,u,1,n,r),t=o.base,a&&t!==a&&(a._component=null,S(a,!1)));return t}(t,e,n,r);if(j="svg"===u||"foreignObject"!==u&&j,u=String(u),(!t||!h(t,u))&&(s=u,(c=j?document.createElementNS("http://www.w3.org/2000/svg",s):document.createElement(s)).normalizedNodeName=s,i=c,t)){for(;t.firstChild;)i.appendChild(t.firstChild);t.parentNode&&t.parentNode.replaceChild(i,t),S(t,!0)}var l=i.firstChild,f=i.__preactattr_,p=e.children;if(null==f){f=i.__preactattr_={};for(var d=i.attributes,v=d.length;v--;)f[d[v].name]=d[v].value}return!C&&p&&1===p.length&&"string"==typeof p[0]&&null!=l&&void 0!==l.splitText&&null==l.nextSibling?l.nodeValue!=p[0]&&(l.nodeValue=p[0]):(p&&p.length||null!=l)&&function(t,e,n,r,o){var i,a,s,c,u,l=t.childNodes,f=[],p={},d=0,v=0,m=l.length,_=0,b=e?e.length:0;if(0!==m)for(var g=0;g<m;g++){var x=l[g],j=x.__preactattr_,C=b&&j?x._component?x._component.__key:j.key:null;null!=C?(d++,p[C]=x):(j||(void 0!==x.splitText?!o||x.nodeValue.trim():o))&&(f[_++]=x)}if(0!==b)for(var g=0;g<b;g++){c=e[g],u=null;var C=c.key;if(null!=C)d&&void 0!==p[C]&&(u=p[C],p[C]=void 0,d--);else if(!u&&v<_)for(i=v;i<_;i++)if(void 0!==f[i]&&(w=a=f[i],k=o,"string"==typeof(O=c)||"number"==typeof O?void 0!==w.splitText:"string"==typeof O.nodeName?!w._componentConstructor&&h(w,O.nodeName):k||w._componentConstructor===O.nodeName)){u=a,f[i]=void 0,i===_-1&&_--,i===v&&v++;break}u=N(u,c,n,r),s=l[g],u&&u!==t&&u!==s&&(null==s?t.appendChild(u):u===s.nextSibling?y(s):t.insertBefore(u,s))}var w,O,k;if(d)for(var g in p)void 0!==p[g]&&S(p[g],!1);for(;v<=_;)void 0!==(u=f[_--])&&S(u,!1)}(i,p,n,r,C||null!=f.dangerouslySetInnerHTML),function(t,e,n){var r;for(r in n)e&&null!=e[r]||null==n[r]||_(t,r,n[r],n[r]=void 0,j);for(r in e)"children"===r||"innerHTML"===r||r in n&&e[r]===("value"===r||"checked"===r?t[r]:n[r])||_(t,r,n[r],n[r]=e[r],j)}(i,e.attributes,f),j=a,i}function S(t,e){var n=t._component;n?W(n):(null!=t.__preactattr_&&t.__preactattr_.ref&&t.__preactattr_.ref(null),!1!==e&&null!=t.__preactattr_||y(t),k(t))}function k(t){for(t=t.lastChild;t;){var e=t.previousSibling;S(t,!0),t=e}}var T={};function M(t,e,n){var r,o=T[t.name];if(t.prototype&&t.prototype.render?(r=new t(e,n),B.call(r,e,n)):((r=new B(e,n)).constructor=t,r.render=U),o)for(var i=o.length;i--;)if(o[i].constructor===t){r.nextBase=o[i].nextBase,o.splice(i,1);break}return r}function U(t,e,n){return this.constructor(t,n)}function P(t,e,n,r,i){t._disable||(t._disable=!0,(t.__ref=e.ref)&&delete e.ref,(t.__key=e.key)&&delete e.key,!t.base||i?t.componentWillMount&&t.componentWillMount():t.componentWillReceiveProps&&t.componentWillReceiveProps(e,r),r&&r!==t.context&&(t.prevContext||(t.prevContext=t.context),t.context=r),t.prevProps||(t.prevProps=t.props),t.props=e,t._disable=!1,0!==n&&(1!==n&&!1===o.syncComponentUpdates&&t.base?d(t):E(t,1,i)),t.__ref&&t.__ref(t))}function E(t,e,n,r){if(!t._disable){var i,a,s,u=t.props,l=t.state,f=t.context,p=t.prevProps||u,d=t.prevState||l,v=t.prevContext||f,h=t.base,y=t.nextBase,_=h||y,b=t._component,j=!1;if(h&&(t.props=p,t.state=d,t.context=v,2!==e&&t.shouldComponentUpdate&&!1===t.shouldComponentUpdate(u,l,f)?j=!0:t.componentWillUpdate&&t.componentWillUpdate(u,l,f),t.props=u,t.state=l,t.context=f),t.prevProps=t.prevState=t.prevContext=t.nextBase=null,t._dirty=!1,!j){i=t.render(u,l,f),t.getChildContext&&(f=c(c({},f),t.getChildContext()));var C,N,k=i&&i.nodeName;if("function"==typeof k){var T=m(i);(a=b)&&a.constructor===k&&T.key==a.__key?P(a,T,1,f,!1):(C=a,t._component=a=M(k,T,f),a.nextBase=a.nextBase||y,a._parentComponent=t,P(a,T,0,f,!1),E(a,1,n,!0)),N=a.base}else s=_,(C=b)&&(s=t._component=null),(_||1===e)&&(s&&(s._component=null),N=O(s,i,f,n||!h,_&&_.parentNode,!0));if(_&&N!==_&&a!==b){var U=_.parentNode;U&&N!==U&&(U.replaceChild(N,_),C||(_._component=null,S(_,!1)))}if(C&&W(C),t.base=N,N&&!r){for(var B=t,V=t;V=V._parentComponent;)(B=V).base=N;N._component=B,N._componentConstructor=B.constructor}}if(!h||n?g.unshift(t):j||(t.componentDidUpdate&&t.componentDidUpdate(p,d,v),o.afterUpdate&&o.afterUpdate(t)),null!=t._renderCallbacks)for(;t._renderCallbacks.length;)t._renderCallbacks.pop().call(t);x||r||w()}}function W(t){o.beforeUnmount&&o.beforeUnmount(t);var e=t.base;t._disable=!0,t.componentWillUnmount&&t.componentWillUnmount(),t.base=null;var n=t._component;n?W(n):e&&(e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),t.nextBase=e,y(e),function(t){var e=t.constructor.name;(T[e]||(T[e]=[])).push(t)}(t),k(e)),t.__ref&&t.__ref(null)}function B(t,e){this._dirty=!0,this.context=e,this.props=t,this.state=this.state||{}}function V(t,e,n){return O(n,t,{},!1,e,!1)}c(B.prototype,{setState:function(t,e){var n=this.state;this.prevState||(this.prevState=c({},n)),c(n,"function"==typeof t?t(n,this.props):t),e&&(this._renderCallbacks=this._renderCallbacks||[]).push(e),d(this)},forceUpdate:function(t){t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),E(this,2)},render:function(){}});var L={h:s,createElement:s,cloneElement:l,Component:B,render:V,rerender:v,options:o};e.default=L},7:function(t,e,n){"use strict";var r=n(9),o=n(8),i="[object Symbol]";e.a=function(t){return"symbol"==typeof t||Object(o.a)(t)&&Object(r.a)(t)==i}},8:function(t,e,n){"use strict";e.a=function(t){return null!=t&&"object"==typeof t}},9:function(t,e,n){"use strict";var r=n(1),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,s=r.a?r.a.toStringTag:void 0;var c=function(t){var e=i.call(t,s),n=t[s];try{t[s]=void 0;var r=!0}catch(t){}var o=a.call(t);return r&&(e?t[s]=n:delete t[s]),o},u=Object.prototype.toString;var l=function(t){return u.call(t)},f="[object Null]",p="[object Undefined]",d=r.a?r.a.toStringTag:void 0;e.a=function(t){return null==t?void 0===t?p:f:d&&d in Object(t)?c(t):l(t)}}});