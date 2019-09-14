!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=168)}({15:function(t,e){t.exports=window.contentfulExtension},168:function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),i=this&&this.__assign||Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},s=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(o,i){function s(t){try{u(r.next(t))}catch(t){i(t)}}function a(t){try{u(r.throw(t))}catch(t){i(t)}}function u(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(s,a)}u((r=r.apply(t,e||[])).next())})},a=this&&this.__generator||function(t,e){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=r[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=e.call(t,s)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};e.__esModule=!0;var u=n(15),l=n(6),c=n(35),p=n(169);n(170);u&&u.init(function(t){l.render(l.h(f,i({},t)),document.getElementById("react-root"))});var f=function(t){function e(){var e=t.call(this)||this;return e.onSlugChange=e.onSlugChange.bind(e),e}return o(e,t),e.prototype.componentDidMount=function(){var t=this;this.setState({fieldValue:this.props.field.getValue(),errors:[]}),this.props.field.onValueChanged(function(e){return s(t,void 0,void 0,function(){return a(this,function(t){return this.setState({fieldValue:e}),[2]})})}),this.onMount().catch(function(e){console.error("Error querying!",e),t.setState({errors:[e.toString()]})})},e.prototype.render=function(){var t=this.state,e=t.fieldValue,n=t.parentSlug,r=t.errors,o=t.warnings;return l.h("div",null,l.h(p.SlugForm,{slug:e,parentSlug:n,onChange:this.onSlugChange}),r&&l.h("div",{className:"errors"},r.map(function(t){return l.h("div",{className:"error"},t)})),o&&l.h("div",{className:"warnings"},o.map(function(t){return l.h("div",{className:"error",dangerouslySetInnerHTML:{__html:t}})})))},e.prototype.onSlugChange=function(t){return s(this,void 0,void 0,function(){var e;return a(this,function(n){switch(n.label){case 0:return e=c.pathJoin(this.state.parentSlug,t.newValue),this.setState({fieldValue:t.newValue}),[4,this.validateNewSlug(t.newValue)];case 1:return n.sent()?[4,this.props.field.setValue(e)]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}})})},e.prototype.validateNewSlug=function(t){return s(this,void 0,void 0,function(){var e,n,r,o,i,s,u;return a(this,function(a){switch(a.label){case 0:return e=[],n=[],t&&0!=t.length?/\s/.test(t)&&e.push("The slug must not contain whitespace!"):e.push("The slug cannot be empty!"),(r=this.props.entry.fields).subpages?(o=r.subpages.getValue())&&o.length>0?(s=(i=n.push).apply,u=[n],[4,this.checkSubpages(o)]):[3,2]:[3,2];case 1:s.apply(i,u.concat([a.sent()])),a.label=2;case 2:return this.setState({errors:e,warnings:n}),e.length>0?(this.props.field.setInvalid(!0),[2,!1]):(this.props.field.setInvalid(!1),[2,!0])}})})},e.prototype.checkSubpages=function(t){return s(this,void 0,void 0,function(){var e,n,r,o,i,s;return a(this,function(a){switch(a.label){case 0:return e=this.state,n=e.parentSlug,r=e.fieldValue,o=this.props.entry.getSys().space,[4,this.props.space.getEntries({content_type:"page","sys.id[in]":t.map(function(t){return t.sys.id}).join(",")})];case 1:return i=a.sent(),0==(s=i.items.filter(function(t){return t}).map(function(t){if(!(t&&t.fields&&t.fields.slug&&t.fields.slug["en-US"]))return null;var e=t.fields.slug["en-US"];if(e.startsWith(c.pathJoin(n,r)))return console.log("subpage "+e+" is good"),null;console.log("bad page",r,t.fields);var i=t.fields.title&&t.fields.title["en-US"];return'<a href="https://app.contentful.com/spaces/'+o.sys.id+"/entries/"+t.sys.id+'" target="_blank">'+(i||t.sys.id)+"</a> ("+e+")"}).filter(function(t){return t})).length?[2,s]:[2,["Be sure to update these subpages! Their slugs are wrong:<br/>  "+s.join(",<br/>")]]}})})},e.prototype.onMount=function(){return s(this,void 0,void 0,function(){var t,e,n;return a(this,function(r){switch(r.label){case 0:return[4,this.props.space.getEntries({content_type:"page","fields.subpages.sys.id":this.props.entry.getSys().id})];case 1:return(t=r.sent()).items.length<=0?[2]:(e=t.items[0].fields.slug["en-US"],n=this.state.fieldValue,n=c.trimStart(n,e),n=c.trimStart(n,"/"),this.setState({parentSlug:e,fieldValue:n}),[4,this.validateNewSlug(n)]);case 2:return r.sent(),[2]}})})},e}(l.Component);e.SlugEditor=f},169:function(t,e,n){"use strict";var r,o=this&&this.__extends||(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});e.__esModule=!0;var i=n(6),s=function(t){function e(){var e=t.call(this)||this;return e.onFocusGained=e.onFocusGained.bind(e),e.onFocusLost=e.onFocusLost.bind(e),e.demandFocus=e.demandFocus.bind(e),e}return o(e,t),e.prototype.componentDidMount=function(){this.setState({value:this.props.slug})},e.prototype.render=function(){var t=this.props.parentSlug,e=this.props.slug;return this.state&&this.state.value&&this.state.value.length>0&&(e=this.state.value),i.h("div",{id:"slugForm",class:"cf-form-input",onClick:this.demandFocus},t&&i.h("span",{id:"parent",title:"This comes from the parent page and you can't change it here."},t,"/"),i.h("span",{id:"slug",contentEditable:!0,onFocus:this.onFocusGained,onBlur:this.onFocusLost},e))},e.prototype.demandFocus=function(){$("#slugForm #slug").focus()},e.prototype.onFocusLost=function(t){var e=t.target.textContent,n=this.state.value;e!=n&&(this.setState({value:e}),this.props.onChange.call(this,{oldValue:n,newValue:e}))},e.prototype.onFocusGained=function(t){console.log("focusGained",t)},e}(i.Component);e.SlugForm=s},170:function(t,e,n){},35:function(t,e,n){"use strict";function r(t,e){var n=document.createElement("script");n.type="text/javascript",n.integrity=e,n.crossOrigin="anonymous",n.src=t,$("head").append(n)}function o(t,e){var n=document.createElement("link");n.rel="stylesheet",n.href=t,n.integrity=e,n.crossOrigin="anonymous",$("head").append(n)}e.__esModule=!0,String.prototype.startsWith||(String.prototype.startsWith=function(t,e){return this.substr(!e||e<0?0:+e,t.length)===t}),e.wait=function(t){return new Promise(function(e,n){return setTimeout(function(){return e()},t)})},e.pathJoin=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return t.join("/").replace(/\/{2,}/,"/")},e.basename=function(t){var e=t.split("/");return e[e.length-1]},e.trimStart=function(t,e){if(!t||!e)return t;for(;t.startsWith(e);)t=t.substring(e.length);return t},e.injectScript=r,e.injectCss=o,e.injectBootstrap=function(){o("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css","sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"),r("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js","sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"),r("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js","sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM")}},6:function(t,e,n){"use strict";function r(){}n.r(e),n.d(e,"h",function(){return a}),n.d(e,"createElement",function(){return a}),n.d(e,"cloneElement",function(){return c}),n.d(e,"Component",function(){return F}),n.d(e,"render",function(){return B}),n.d(e,"rerender",function(){return h}),n.d(e,"options",function(){return o});var o={},i=[],s=[];function a(t,e){var n,a,u,l,c=s;for(l=arguments.length;l-- >2;)i.push(arguments[l]);for(e&&null!=e.children&&(i.length||i.push(e.children),delete e.children);i.length;)if((a=i.pop())&&void 0!==a.pop)for(l=a.length;l--;)i.push(a[l]);else"boolean"==typeof a&&(a=null),(u="function"!=typeof t)&&(null==a?a="":"number"==typeof a?a=String(a):"string"!=typeof a&&(u=!1)),u&&n?c[c.length-1]+=a:c===s?c=[a]:c.push(a),n=u;var p=new r;return p.nodeName=t,p.children=c,p.attributes=null==e?void 0:e,p.key=null==e?void 0:e.key,void 0!==o.vnode&&o.vnode(p),p}function u(t,e){for(var n in e)t[n]=e[n];return t}var l="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;function c(t,e){return a(t.nodeName,u(u({},t.attributes),e),arguments.length>2?[].slice.call(arguments,2):t.children)}var p=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,f=[];function d(t){!t._dirty&&(t._dirty=!0)&&1==f.push(t)&&(o.debounceRendering||l)(h)}function h(){var t,e=f;for(f=[];t=e.pop();)t._dirty&&U(t)}function v(t,e){return t.normalizedNodeName===e||t.nodeName.toLowerCase()===e.toLowerCase()}function m(t){var e=u({},t.attributes);e.children=t.children;var n=t.nodeName.defaultProps;if(void 0!==n)for(var r in n)void 0===e[r]&&(e[r]=n[r]);return e}function g(t){var e=t.parentNode;e&&e.removeChild(t)}function _(t,e,n,r,o){if("className"===e&&(e="class"),"key"===e);else if("ref"===e)n&&n(null),r&&r(t);else if("class"!==e||o)if("style"===e){if(r&&"string"!=typeof r&&"string"!=typeof n||(t.style.cssText=r||""),r&&"object"==typeof r){if("string"!=typeof n)for(var i in n)i in r||(t.style[i]="");for(var i in r)t.style[i]="number"==typeof r[i]&&!1===p.test(i)?r[i]+"px":r[i]}}else if("dangerouslySetInnerHTML"===e)r&&(t.innerHTML=r.__html||"");else if("o"==e[0]&&"n"==e[1]){var s=e!==(e=e.replace(/Capture$/,""));e=e.toLowerCase().substring(2),r?n||t.addEventListener(e,y,s):t.removeEventListener(e,y,s),(t._listeners||(t._listeners={}))[e]=r}else if("list"!==e&&"type"!==e&&!o&&e in t)!function(t,e,n){try{t[e]=n}catch(t){}}(t,e,null==r?"":r),null!=r&&!1!==r||t.removeAttribute(e);else{var a=o&&e!==(e=e.replace(/^xlink:?/,""));null==r||!1===r?a?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.removeAttribute(e):"function"!=typeof r&&(a?t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),r):t.setAttribute(e,r))}else t.className=r||""}function y(t){return this._listeners[t.type](o.event&&o.event(t)||t)}var b=[],S=0,w=!1,C=!1;function x(){for(var t;t=b.pop();)o.afterMount&&o.afterMount(t),t.componentDidMount&&t.componentDidMount()}function N(t,e,n,r,o,i){S++||(w=null!=o&&void 0!==o.ownerSVGElement,C=null!=t&&!("__preactattr_"in t));var s=k(t,e,n,r,i);return o&&s.parentNode!==o&&o.appendChild(s),--S||(C=!1,i||x()),s}function k(t,e,n,r,o){var i=t,s=w;if(null!=e&&"boolean"!=typeof e||(e=""),"string"==typeof e||"number"==typeof e)return t&&void 0!==t.splitText&&t.parentNode&&(!t._component||o)?t.nodeValue!=e&&(t.nodeValue=e):(i=document.createTextNode(e),t&&(t.parentNode&&t.parentNode.replaceChild(i,t),j(t,!0))),i.__preactattr_=!0,i;var a,u,l=e.nodeName;if("function"==typeof l)return function(t,e,n,r){var o=t&&t._component,i=o,s=t,a=o&&t._componentConstructor===e.nodeName,u=a,l=m(e);for(;o&&!u&&(o=o._parentComponent);)u=o.constructor===e.nodeName;o&&u&&(!r||o._component)?(P(o,l,3,n,r),t=o.base):(i&&!a&&(E(i),t=s=null),o=T(e.nodeName,l,n),t&&!o.nextBase&&(o.nextBase=t,s=null),P(o,l,1,n,r),t=o.base,s&&t!==s&&(s._component=null,j(s,!1)));return t}(t,e,n,r);if(w="svg"===l||"foreignObject"!==l&&w,l=String(l),(!t||!v(t,l))&&(a=l,(u=w?document.createElementNS("http://www.w3.org/2000/svg",a):document.createElement(a)).normalizedNodeName=a,i=u,t)){for(;t.firstChild;)i.appendChild(t.firstChild);t.parentNode&&t.parentNode.replaceChild(i,t),j(t,!0)}var c=i.firstChild,p=i.__preactattr_,f=e.children;if(null==p){p=i.__preactattr_={};for(var d=i.attributes,h=d.length;h--;)p[d[h].name]=d[h].value}return!C&&f&&1===f.length&&"string"==typeof f[0]&&null!=c&&void 0!==c.splitText&&null==c.nextSibling?c.nodeValue!=f[0]&&(c.nodeValue=f[0]):(f&&f.length||null!=c)&&function(t,e,n,r,o){var i,s,a,u,l,c=t.childNodes,p=[],f={},d=0,h=0,m=c.length,_=0,y=e?e.length:0;if(0!==m)for(var b=0;b<m;b++){var S=c[b],w=S.__preactattr_,C=y&&w?S._component?S._component.__key:w.key:null;null!=C?(d++,f[C]=S):(w||(void 0!==S.splitText?!o||S.nodeValue.trim():o))&&(p[_++]=S)}if(0!==y)for(var b=0;b<y;b++){u=e[b],l=null;var C=u.key;if(null!=C)d&&void 0!==f[C]&&(l=f[C],f[C]=void 0,d--);else if(!l&&h<_)for(i=h;i<_;i++)if(void 0!==p[i]&&(x=s=p[i],M=o,"string"==typeof(N=u)||"number"==typeof N?void 0!==x.splitText:"string"==typeof N.nodeName?!x._componentConstructor&&v(x,N.nodeName):M||x._componentConstructor===N.nodeName)){l=s,p[i]=void 0,i===_-1&&_--,i===h&&h++;break}l=k(l,u,n,r),a=c[b],l&&l!==t&&l!==a&&(null==a?t.appendChild(l):l===a.nextSibling?g(a):t.insertBefore(l,a))}var x,N,M;if(d)for(var b in f)void 0!==f[b]&&j(f[b],!1);for(;h<=_;)void 0!==(l=p[_--])&&j(l,!1)}(i,f,n,r,C||null!=p.dangerouslySetInnerHTML),function(t,e,n){var r;for(r in n)e&&null!=e[r]||null==n[r]||_(t,r,n[r],n[r]=void 0,w);for(r in e)"children"===r||"innerHTML"===r||r in n&&e[r]===("value"===r||"checked"===r?t[r]:n[r])||_(t,r,n[r],n[r]=e[r],w)}(i,e.attributes,p),w=s,i}function j(t,e){var n=t._component;n?E(n):(null!=t.__preactattr_&&t.__preactattr_.ref&&t.__preactattr_.ref(null),!1!==e&&null!=t.__preactattr_||g(t),M(t))}function M(t){for(t=t.lastChild;t;){var e=t.previousSibling;j(t,!0),t=e}}var O={};function T(t,e,n){var r,o=O[t.name];if(t.prototype&&t.prototype.render?(r=new t(e,n),F.call(r,e,n)):((r=new F(e,n)).constructor=t,r.render=V),o)for(var i=o.length;i--;)if(o[i].constructor===t){r.nextBase=o[i].nextBase,o.splice(i,1);break}return r}function V(t,e,n){return this.constructor(t,n)}function P(t,e,n,r,i){t._disable||(t._disable=!0,(t.__ref=e.ref)&&delete e.ref,(t.__key=e.key)&&delete e.key,!t.base||i?t.componentWillMount&&t.componentWillMount():t.componentWillReceiveProps&&t.componentWillReceiveProps(e,r),r&&r!==t.context&&(t.prevContext||(t.prevContext=t.context),t.context=r),t.prevProps||(t.prevProps=t.props),t.props=e,t._disable=!1,0!==n&&(1!==n&&!1===o.syncComponentUpdates&&t.base?d(t):U(t,1,i)),t.__ref&&t.__ref(t))}function U(t,e,n,r){if(!t._disable){var i,s,a,l=t.props,c=t.state,p=t.context,f=t.prevProps||l,d=t.prevState||c,h=t.prevContext||p,v=t.base,g=t.nextBase,_=v||g,y=t._component,w=!1;if(v&&(t.props=f,t.state=d,t.context=h,2!==e&&t.shouldComponentUpdate&&!1===t.shouldComponentUpdate(l,c,p)?w=!0:t.componentWillUpdate&&t.componentWillUpdate(l,c,p),t.props=l,t.state=c,t.context=p),t.prevProps=t.prevState=t.prevContext=t.nextBase=null,t._dirty=!1,!w){i=t.render(l,c,p),t.getChildContext&&(p=u(u({},p),t.getChildContext()));var C,k,M=i&&i.nodeName;if("function"==typeof M){var O=m(i);(s=y)&&s.constructor===M&&O.key==s.__key?P(s,O,1,p,!1):(C=s,t._component=s=T(M,O,p),s.nextBase=s.nextBase||g,s._parentComponent=t,P(s,O,0,p,!1),U(s,1,n,!0)),k=s.base}else a=_,(C=y)&&(a=t._component=null),(_||1===e)&&(a&&(a._component=null),k=N(a,i,p,n||!v,_&&_.parentNode,!0));if(_&&k!==_&&s!==y){var V=_.parentNode;V&&k!==V&&(V.replaceChild(k,_),C||(_._component=null,j(_,!1)))}if(C&&E(C),t.base=k,k&&!r){for(var F=t,B=t;B=B._parentComponent;)(F=B).base=k;k._component=F,k._componentConstructor=F.constructor}}if(!v||n?b.unshift(t):w||(t.componentDidUpdate&&t.componentDidUpdate(f,d,h),o.afterUpdate&&o.afterUpdate(t)),null!=t._renderCallbacks)for(;t._renderCallbacks.length;)t._renderCallbacks.pop().call(t);S||r||x()}}function E(t){o.beforeUnmount&&o.beforeUnmount(t);var e=t.base;t._disable=!0,t.componentWillUnmount&&t.componentWillUnmount(),t.base=null;var n=t._component;n?E(n):e&&(e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),t.nextBase=e,g(e),function(t){var e=t.constructor.name;(O[e]||(O[e]=[])).push(t)}(t),M(e)),t.__ref&&t.__ref(null)}function F(t,e){this._dirty=!0,this.context=e,this.props=t,this.state=this.state||{}}function B(t,e,n){return N(n,t,{},!1,e,!1)}u(F.prototype,{setState:function(t,e){var n=this.state;this.prevState||(this.prevState=u({},n)),u(n,"function"==typeof t?t(n,this.props):t),e&&(this._renderCallbacks=this._renderCallbacks||[]).push(e),d(this)},forceUpdate:function(t){t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),U(this,2)},render:function(){}});var L={h:a,createElement:a,cloneElement:c,Component:F,render:B,rerender:h,options:o};e.default=L}});