!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="../",n(n.s=165)}({12:function(e,t){e.exports=window.contentfulExtension},165:function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},a=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{l(r.next(e))}catch(e){i(e)}}function s(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(a,s)}l((r=r.apply(e,t||[])).next())})},s=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};t.__esModule=!0;var l=n(12),u=n(6),c=n(166);n(167);l&&l.init(function(e){u.render(u.h(p,i({},e)),document.getElementById("react-root")),e.window.startAutoResizer()});var p=function(e){function t(){var t=e.call(this)||this;return t.onItemsChanged=t.onItemsChanged.bind(t),t}return o(t,e),t.prototype.componentDidMount=function(){var e=this,t=this.props;this.setState({fieldValue:(t.field.getValue()||[]).filter(function(e){return e})}),t.field.onValueChanged(function(t){e.setState({fieldValue:(t||[]).filter(function(e){return e})})})},t.prototype.render=function(){var e=this.state,t=e.fieldValue,n=e.waiting;return u.h("div",{className:n?"disabled":""},u.h(c.KVPForm,{items:t,onItemsChanged:this.onItemsChanged}))},t.prototype.onItemsChanged=function(e){return a(this,void 0,void 0,function(){var t;return s(this,function(n){switch(n.label){case 0:return t=this.props,this.setState({waiting:!0}),[4,t.field.setValue(e)];case 1:return n.sent(),this.setState({fieldValue:e,waiting:!1}),[2]}})})},t}(u.Component);t.KvpEditor=p},166:function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var i=arguments[t],a=0,s=i.length;a<s;a++,o++)r[o]=i[a];return r};t.__esModule=!0;var a=n(40),s=n(6),l=function(e){function t(){var t=e.call(this)||this;return t.setKey=t.setKey.bind(t),t.setVal=t.setVal.bind(t),t.addRow=t.addRow.bind(t),t.deleteRow=t.deleteRow.bind(t),t}return o(t,e),t.prototype.render=function(){var e=this,t=this.props.items;return s.h("div",{className:"kvp-form"},s.h("div",{className:"kvp-form__table"},s.h("table",null,s.h("tbody",null,t&&t.map(function(n,r){return s.h("tr",{key:r,className:"kvp-form__table__row"},s.h("td",{className:"text"},n.key),s.h("td",{className:"divider"},"|"),s.h("td",{className:"text"},n.value),s.h("td",{className:"buttons"},s.h("div",{className:"flex-vert"},s.h("a",{className:"",onClick:function(){return e.moveUp(r)}},r>0?"△":" "),s.h("a",{className:"",onClick:function(){return e.moveDown(r)}},r<t.length-1?"▽":" ")),s.h("button",{className:"cf-btn-secondary delete",onClick:function(){return e.deleteRow(n)}},"X")))}),s.h("tr",{className:"kvp-form__table__row form"},s.h("td",{className:"text"},s.h("input",{className:"cf-form-input",type:"text",id:"key",onChange:this.setKey,value:this.state.key})),s.h("td",{className:"divider"},s.h("span",{class:"divider"},"|")),s.h("td",{className:"text"},s.h("input",{className:"cf-form-input",type:"text",id:"value",onChange:this.setVal,value:this.state.value})),s.h("td",{className:"buttons"},s.h("button",{className:"cf-btn-primary",type:"submit",id:"add",onClick:this.addRow},"+"))))),this.state.errors&&this.state.errors.map(function(e){return s.h("div",{class:"error"},e)})))},t.prototype.setKey=function(e){this.setState({key:a(e.target).val().toString()})},t.prototype.setVal=function(e){this.setState({value:a(e.target).val().toString()})},t.prototype.addRow=function(){var e=[];if(this.state.key&&0!=this.state.key.length||e.push("Please set a key"),this.state.value&&0!=this.state.value.length||e.push("Please set a value"),0==e.length&&this.props.onItemsChanged){var t={key:this.state.key,value:this.state.value},n=this.props.items||[];this.props.onItemsChanged(i(n,[t])),this.setState({key:"",value:""})}this.setState({errors:e})},t.prototype.deleteRow=function(e){if(this.setState({key:e.key,value:e.value}),this.props.onItemsChanged){var t=this.props.items||[];if(0!=t.length){var n=t.findIndex(function(t){return t.key==e.key&&t.value==e.value});if(!(n<0)){var r=t.slice(0,n);r.push.apply(r,t.slice(n+1)),this.props.onItemsChanged(r)}}}},t.prototype.moveUp=function(e){var t=this.props.items||[];if(t.length>0&&e>0&&this.props.onItemsChanged){var n=t.splice(e,1);t.splice.apply(t,i([e-1,0],n)),this.props.onItemsChanged(t)}},t.prototype.moveDown=function(e){var t=this.props.items||[];if(t.length>0&&e<t.length-1&&this.props.onItemsChanged){var n=t.splice(e,1);t.splice.apply(t,i([e+1,0],n)),this.props.onItemsChanged(t)}},t}(s.Component);t.KVPForm=l},167:function(e,t,n){},40:function(e,t){e.exports=jQuery},6:function(e,t,n){"use strict";function r(){}n.r(t),n.d(t,"h",function(){return s}),n.d(t,"createElement",function(){return s}),n.d(t,"cloneElement",function(){return c}),n.d(t,"Component",function(){return E}),n.d(t,"render",function(){return R}),n.d(t,"rerender",function(){return h}),n.d(t,"options",function(){return o});var o={},i=[],a=[];function s(e,t){var n,s,l,u,c=a;for(u=arguments.length;u-- >2;)i.push(arguments[u]);for(t&&null!=t.children&&(i.length||i.push(t.children),delete t.children);i.length;)if((s=i.pop())&&void 0!==s.pop)for(u=s.length;u--;)i.push(s[u]);else"boolean"==typeof s&&(s=null),(l="function"!=typeof e)&&(null==s?s="":"number"==typeof s?s=String(s):"string"!=typeof s&&(l=!1)),l&&n?c[c.length-1]+=s:c===a?c=[s]:c.push(s),n=l;var p=new r;return p.nodeName=e,p.children=c,p.attributes=null==t?void 0:t,p.key=null==t?void 0:t.key,void 0!==o.vnode&&o.vnode(p),p}function l(e,t){for(var n in t)e[n]=t[n];return e}var u="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;function c(e,t){return s(e.nodeName,l(l({},e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}var p=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,f=[];function d(e){!e._dirty&&(e._dirty=!0)&&1==f.push(e)&&(o.debounceRendering||u)(h)}function h(){var e,t=f;for(f=[];e=t.pop();)e._dirty&&U(e)}function v(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function m(e){var t=l({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var r in n)void 0===t[r]&&(t[r]=n[r]);return t}function _(e){var t=e.parentNode;t&&t.removeChild(e)}function y(e,t,n,r,o){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)n&&n(null),r&&r(e);else if("class"!==t||o)if("style"===t){if(r&&"string"!=typeof r&&"string"!=typeof n||(e.style.cssText=r||""),r&&"object"==typeof r){if("string"!=typeof n)for(var i in n)i in r||(e.style[i]="");for(var i in r)e.style[i]="number"==typeof r[i]&&!1===p.test(i)?r[i]+"px":r[i]}}else if("dangerouslySetInnerHTML"===t)r&&(e.innerHTML=r.__html||"");else if("o"==t[0]&&"n"==t[1]){var a=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),r?n||e.addEventListener(t,b,a):e.removeEventListener(t,b,a),(e._listeners||(e._listeners={}))[t]=r}else if("list"!==t&&"type"!==t&&!o&&t in e)!function(e,t,n){try{e[t]=n}catch(e){}}(e,t,null==r?"":r),null!=r&&!1!==r||e.removeAttribute(t);else{var s=o&&t!==(t=t.replace(/^xlink:?/,""));null==r||!1===r?s?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof r&&(s?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),r):e.setAttribute(t,r))}else e.className=r||""}function b(e){return this._listeners[e.type](o.event&&o.event(e)||e)}var g=[],C=0,w=!1,x=!1;function N(){for(var e;e=g.pop();)o.afterMount&&o.afterMount(e),e.componentDidMount&&e.componentDidMount()}function k(e,t,n,r,o,i){C++||(w=null!=o&&void 0!==o.ownerSVGElement,x=null!=e&&!("__preactattr_"in e));var a=S(e,t,n,r,i);return o&&a.parentNode!==o&&o.appendChild(a),--C||(x=!1,i||N()),a}function S(e,t,n,r,o){var i=e,a=w;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||o)?e.nodeValue!=t&&(e.nodeValue=t):(i=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(i,e),P(e,!0))),i.__preactattr_=!0,i;var s,l,u=t.nodeName;if("function"==typeof u)return function(e,t,n,r){var o=e&&e._component,i=o,a=e,s=o&&e._componentConstructor===t.nodeName,l=s,u=m(t);for(;o&&!l&&(o=o._parentComponent);)l=o.constructor===t.nodeName;o&&l&&(!r||o._component)?(j(o,u,3,n,r),e=o.base):(i&&!s&&(T(i),e=a=null),o=I(t.nodeName,u,n),e&&!o.nextBase&&(o.nextBase=e,a=null),j(o,u,1,n,r),e=o.base,a&&e!==a&&(a._component=null,P(a,!1)));return e}(e,t,n,r);if(w="svg"===u||"foreignObject"!==u&&w,u=String(u),(!e||!v(e,u))&&(s=u,(l=w?document.createElementNS("http://www.w3.org/2000/svg",s):document.createElement(s)).normalizedNodeName=s,i=l,e)){for(;e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),P(e,!0)}var c=i.firstChild,p=i.__preactattr_,f=t.children;if(null==p){p=i.__preactattr_={};for(var d=i.attributes,h=d.length;h--;)p[d[h].name]=d[h].value}return!x&&f&&1===f.length&&"string"==typeof f[0]&&null!=c&&void 0!==c.splitText&&null==c.nextSibling?c.nodeValue!=f[0]&&(c.nodeValue=f[0]):(f&&f.length||null!=c)&&function(e,t,n,r,o){var i,a,s,l,u,c=e.childNodes,p=[],f={},d=0,h=0,m=c.length,y=0,b=t?t.length:0;if(0!==m)for(var g=0;g<m;g++){var C=c[g],w=C.__preactattr_,x=b&&w?C._component?C._component.__key:w.key:null;null!=x?(d++,f[x]=C):(w||(void 0!==C.splitText?!o||C.nodeValue.trim():o))&&(p[y++]=C)}if(0!==b)for(var g=0;g<b;g++){l=t[g],u=null;var x=l.key;if(null!=x)d&&void 0!==f[x]&&(u=f[x],f[x]=void 0,d--);else if(!u&&h<y)for(i=h;i<y;i++)if(void 0!==p[i]&&(N=a=p[i],O=o,"string"==typeof(k=l)||"number"==typeof k?void 0!==N.splitText:"string"==typeof k.nodeName?!N._componentConstructor&&v(N,k.nodeName):O||N._componentConstructor===k.nodeName)){u=a,p[i]=void 0,i===y-1&&y--,i===h&&h++;break}u=S(u,l,n,r),s=c[g],u&&u!==e&&u!==s&&(null==s?e.appendChild(u):u===s.nextSibling?_(s):e.insertBefore(u,s))}var N,k,O;if(d)for(var g in f)void 0!==f[g]&&P(f[g],!1);for(;h<=y;)void 0!==(u=p[y--])&&P(u,!1)}(i,f,n,r,x||null!=p.dangerouslySetInnerHTML),function(e,t,n){var r;for(r in n)t&&null!=t[r]||null==n[r]||y(e,r,n[r],n[r]=void 0,w);for(r in t)"children"===r||"innerHTML"===r||r in n&&t[r]===("value"===r||"checked"===r?e[r]:n[r])||y(e,r,n[r],n[r]=t[r],w)}(i,t.attributes,p),w=a,i}function P(e,t){var n=e._component;n?T(n):(null!=e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),!1!==t&&null!=e.__preactattr_||_(e),O(e))}function O(e){for(e=e.lastChild;e;){var t=e.previousSibling;P(e,!0),e=t}}var V={};function I(e,t,n){var r,o=V[e.name];if(e.prototype&&e.prototype.render?(r=new e(t,n),E.call(r,t,n)):((r=new E(t,n)).constructor=e,r.render=M),o)for(var i=o.length;i--;)if(o[i].constructor===e){r.nextBase=o[i].nextBase,o.splice(i,1);break}return r}function M(e,t,n){return this.constructor(e,n)}function j(e,t,n,r,i){e._disable||(e._disable=!0,(e.__ref=t.ref)&&delete t.ref,(e.__key=t.key)&&delete t.key,!e.base||i?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,r),r&&r!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=r),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&!1===o.syncComponentUpdates&&e.base?d(e):U(e,1,i)),e.__ref&&e.__ref(e))}function U(e,t,n,r){if(!e._disable){var i,a,s,u=e.props,c=e.state,p=e.context,f=e.prevProps||u,d=e.prevState||c,h=e.prevContext||p,v=e.base,_=e.nextBase,y=v||_,b=e._component,w=!1;if(v&&(e.props=f,e.state=d,e.context=h,2!==t&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(u,c,p)?w=!0:e.componentWillUpdate&&e.componentWillUpdate(u,c,p),e.props=u,e.state=c,e.context=p),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!w){i=e.render(u,c,p),e.getChildContext&&(p=l(l({},p),e.getChildContext()));var x,S,O=i&&i.nodeName;if("function"==typeof O){var V=m(i);(a=b)&&a.constructor===O&&V.key==a.__key?j(a,V,1,p,!1):(x=a,e._component=a=I(O,V,p),a.nextBase=a.nextBase||_,a._parentComponent=e,j(a,V,0,p,!1),U(a,1,n,!0)),S=a.base}else s=y,(x=b)&&(s=e._component=null),(y||1===t)&&(s&&(s._component=null),S=k(s,i,p,n||!v,y&&y.parentNode,!0));if(y&&S!==y&&a!==b){var M=y.parentNode;M&&S!==M&&(M.replaceChild(S,y),x||(y._component=null,P(y,!1)))}if(x&&T(x),e.base=S,S&&!r){for(var E=e,R=e;R=R._parentComponent;)(E=R).base=S;S._component=E,S._componentConstructor=E.constructor}}if(!v||n?g.unshift(e):w||(e.componentDidUpdate&&e.componentDidUpdate(f,d,h),o.afterUpdate&&o.afterUpdate(e)),null!=e._renderCallbacks)for(;e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);C||r||N()}}function T(e){o.beforeUnmount&&o.beforeUnmount(e);var t=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var n=e._component;n?T(n):t&&(t.__preactattr_&&t.__preactattr_.ref&&t.__preactattr_.ref(null),e.nextBase=t,_(t),function(e){var t=e.constructor.name;(V[t]||(V[t]=[])).push(e)}(e),O(t)),e.__ref&&e.__ref(null)}function E(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{}}function R(e,t,n){return k(n,e,{},!1,t,!1)}l(E.prototype,{setState:function(e,t){var n=this.state;this.prevState||(this.prevState=l({},n)),l(n,"function"==typeof e?e(n,this.props):e),t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),d(this)},forceUpdate:function(e){e&&(this._renderCallbacks=this._renderCallbacks||[]).push(e),U(this,2)},render:function(){}});var B={h:s,createElement:s,cloneElement:c,Component:E,render:R,rerender:h,options:o};t.default=B}});