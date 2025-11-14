// floating-ui/core 1.7.3
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).FloatingUICore={})}(this,(function(t){"use strict";const e=["top","right","bottom","left"],n=["start","end"],i=e.reduce(((t,e)=>t.concat(e,e+"-"+n[0],e+"-"+n[1])),[]),o=Math.min,r=Math.max,a={left:"right",right:"left",bottom:"top",top:"bottom"},l={start:"end",end:"start"};function s(t,e,n){return r(t,o(e,n))}function f(t,e){return"function"==typeof t?t(e):t}function c(t){return t.split("-")[0]}function m(t){return t.split("-")[1]}function u(t){return"x"===t?"y":"x"}function d(t){return"y"===t?"height":"width"}const g=new Set(["top","bottom"]);function p(t){return g.has(c(t))?"y":"x"}function h(t){return u(p(t))}function y(t,e,n){void 0===n&&(n=!1);const i=m(t),o=h(t),r=d(o);let a="x"===o?i===(n?"end":"start")?"right":"left":"start"===i?"bottom":"top";return e.reference[r]>e.floating[r]&&(a=P(a)),[a,P(a)]}function w(t){return t.replace(/start|end/g,(t=>l[t]))}const x=["left","right"],v=["right","left"],b=["top","bottom"],A=["bottom","top"];function R(t,e,n,i){const o=m(t);let r=function(t,e,n){switch(t){case"top":case"bottom":return n?e?v:x:e?x:v;case"left":case"right":return e?b:A;default:return[]}}(c(t),"start"===n,i);return o&&(r=r.map((t=>t+"-"+o)),e&&(r=r.concat(r.map(w)))),r}function P(t){return t.replace(/left|right|bottom|top/g,(t=>a[t]))}function D(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function T(t){const{x:e,y:n,width:i,height:o}=t;return{width:i,height:o,top:n,left:e,right:e+i,bottom:n+o,x:e,y:n}}function O(t,e,n){let{reference:i,floating:o}=t;const r=p(e),a=h(e),l=d(a),s=c(e),f="y"===r,u=i.x+i.width/2-o.width/2,g=i.y+i.height/2-o.height/2,y=i[l]/2-o[l]/2;let w;switch(s){case"top":w={x:u,y:i.y-o.height};break;case"bottom":w={x:u,y:i.y+i.height};break;case"right":w={x:i.x+i.width,y:g};break;case"left":w={x:i.x-o.width,y:g};break;default:w={x:i.x,y:i.y}}switch(m(e)){case"start":w[a]-=y*(n&&f?-1:1);break;case"end":w[a]+=y*(n&&f?-1:1)}return w}async function E(t,e){var n;void 0===e&&(e={});const{x:i,y:o,platform:r,rects:a,elements:l,strategy:s}=t,{boundary:c="clippingAncestors",rootBoundary:m="viewport",elementContext:u="floating",altBoundary:d=!1,padding:g=0}=f(e,t),p=D(g),h=l[d?"floating"===u?"reference":"floating":u],y=T(await r.getClippingRect({element:null==(n=await(null==r.isElement?void 0:r.isElement(h)))||n?h:h.contextElement||await(null==r.getDocumentElement?void 0:r.getDocumentElement(l.floating)),boundary:c,rootBoundary:m,strategy:s})),w="floating"===u?{x:i,y:o,width:a.floating.width,height:a.floating.height}:a.reference,x=await(null==r.getOffsetParent?void 0:r.getOffsetParent(l.floating)),v=await(null==r.isElement?void 0:r.isElement(x))&&await(null==r.getScale?void 0:r.getScale(x))||{x:1,y:1},b=T(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:w,offsetParent:x,strategy:s}):w);return{top:(y.top-b.top+p.top)/v.y,bottom:(b.bottom-y.bottom+p.bottom)/v.y,left:(y.left-b.left+p.left)/v.x,right:(b.right-y.right+p.right)/v.x}}function L(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function k(t){return e.some((e=>t[e]>=0))}function C(t){const e=o(...t.map((t=>t.left))),n=o(...t.map((t=>t.top)));return{x:e,y:n,width:r(...t.map((t=>t.right)))-e,height:r(...t.map((t=>t.bottom)))-n}}const S=new Set(["left","top"]);t.arrow=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:i,placement:r,rects:a,platform:l,elements:c,middlewareData:u}=e,{element:g,padding:p=0}=f(t,e)||{};if(null==g)return{};const y=D(p),w={x:n,y:i},x=h(r),v=d(x),b=await l.getDimensions(g),A="y"===x,R=A?"top":"left",P=A?"bottom":"right",T=A?"clientHeight":"clientWidth",O=a.reference[v]+a.reference[x]-w[x]-a.floating[v],E=w[x]-a.reference[x],L=await(null==l.getOffsetParent?void 0:l.getOffsetParent(g));let k=L?L[T]:0;k&&await(null==l.isElement?void 0:l.isElement(L))||(k=c.floating[T]||a.floating[v]);const C=O/2-E/2,S=k/2-b[v]/2-1,B=o(y[R],S),H=o(y[P],S),F=B,j=k-b[v]-H,z=k/2-b[v]/2+C,M=s(F,z,j),V=!u.arrow&&null!=m(r)&&z!==M&&a.reference[v]/2-(z<F?B:H)-b[v]/2<0,W=V?z<F?z-F:z-j:0;return{[x]:w[x]+W,data:{[x]:M,centerOffset:z-M-W,...V&&{alignmentOffset:W}},reset:V}}}),t.autoPlacement=function(t){return void 0===t&&(t={}),{name:"autoPlacement",options:t,async fn(e){var n,o,r;const{rects:a,middlewareData:l,placement:s,platform:u,elements:d}=e,{crossAxis:g=!1,alignment:p,allowedPlacements:h=i,autoAlignment:x=!0,...v}=f(t,e),b=void 0!==p||h===i?function(t,e,n){return(t?[...n.filter((e=>m(e)===t)),...n.filter((e=>m(e)!==t))]:n.filter((t=>c(t)===t))).filter((n=>!t||m(n)===t||!!e&&w(n)!==n))}(p||null,x,h):h,A=await E(e,v),R=(null==(n=l.autoPlacement)?void 0:n.index)||0,P=b[R];if(null==P)return{};const D=y(P,a,await(null==u.isRTL?void 0:u.isRTL(d.floating)));if(s!==P)return{reset:{placement:b[0]}};const T=[A[c(P)],A[D[0]],A[D[1]]],O=[...(null==(o=l.autoPlacement)?void 0:o.overflows)||[],{placement:P,overflows:T}],L=b[R+1];if(L)return{data:{index:R+1,overflows:O},reset:{placement:L}};const k=O.map((t=>{const e=m(t.placement);return[t.placement,e&&g?t.overflows.slice(0,2).reduce(((t,e)=>t+e),0):t.overflows[0],t.overflows]})).sort(((t,e)=>t[1]-e[1])),C=(null==(r=k.filter((t=>t[2].slice(0,m(t[0])?2:3).every((t=>t<=0))))[0])?void 0:r[0])||k[0][0];return C!==s?{data:{index:R+1,overflows:O},reset:{placement:C}}:{}}}},t.computePosition=async(t,e,n)=>{const{placement:i="bottom",strategy:o="absolute",middleware:r=[],platform:a}=n,l=r.filter(Boolean),s=await(null==a.isRTL?void 0:a.isRTL(e));let f=await a.getElementRects({reference:t,floating:e,strategy:o}),{x:c,y:m}=O(f,i,s),u=i,d={},g=0;for(let n=0;n<l.length;n++){const{name:r,fn:p}=l[n],{x:h,y:y,data:w,reset:x}=await p({x:c,y:m,initialPlacement:i,placement:u,strategy:o,middlewareData:d,rects:f,platform:a,elements:{reference:t,floating:e}});c=null!=h?h:c,m=null!=y?y:m,d={...d,[r]:{...d[r],...w}},x&&g<=50&&(g++,"object"==typeof x&&(x.placement&&(u=x.placement),x.rects&&(f=!0===x.rects?await a.getElementRects({reference:t,floating:e,strategy:o}):x.rects),({x:c,y:m}=O(f,u,s))),n=-1)}return{x:c,y:m,placement:u,strategy:o,middlewareData:d}},t.detectOverflow=E,t.flip=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var n,i;const{placement:o,middlewareData:r,rects:a,initialPlacement:l,platform:s,elements:m}=e,{mainAxis:u=!0,crossAxis:d=!0,fallbackPlacements:g,fallbackStrategy:h="bestFit",fallbackAxisSideDirection:x="none",flipAlignment:v=!0,...b}=f(t,e);if(null!=(n=r.arrow)&&n.alignmentOffset)return{};const A=c(o),D=p(l),T=c(l)===l,O=await(null==s.isRTL?void 0:s.isRTL(m.floating)),L=g||(T||!v?[P(l)]:function(t){const e=P(t);return[w(t),e,w(e)]}(l)),k="none"!==x;!g&&k&&L.push(...R(l,v,x,O));const C=[l,...L],S=await E(e,b),B=[];let H=(null==(i=r.flip)?void 0:i.overflows)||[];if(u&&B.push(S[A]),d){const t=y(o,a,O);B.push(S[t[0]],S[t[1]])}if(H=[...H,{placement:o,overflows:B}],!B.every((t=>t<=0))){var F,j;const t=((null==(F=r.flip)?void 0:F.index)||0)+1,e=C[t];if(e){if(!("alignment"===d&&D!==p(e))||H.every((t=>p(t.placement)!==D||t.overflows[0]>0)))return{data:{index:t,overflows:H},reset:{placement:e}}}let n=null==(j=H.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:j.placement;if(!n)switch(h){case"bestFit":{var z;const t=null==(z=H.filter((t=>{if(k){const e=p(t.placement);return e===D||"y"===e}return!0})).map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:z[0];t&&(n=t);break}case"initialPlacement":n=l}if(o!==n)return{reset:{placement:n}}}return{}}}},t.hide=function(t){return void 0===t&&(t={}),{name:"hide",options:t,async fn(e){const{rects:n}=e,{strategy:i="referenceHidden",...o}=f(t,e);switch(i){case"referenceHidden":{const t=L(await E(e,{...o,elementContext:"reference"}),n.reference);return{data:{referenceHiddenOffsets:t,referenceHidden:k(t)}}}case"escaped":{const t=L(await E(e,{...o,altBoundary:!0}),n.floating);return{data:{escapedOffsets:t,escaped:k(t)}}}default:return{}}}}},t.inline=function(t){return void 0===t&&(t={}),{name:"inline",options:t,async fn(e){const{placement:n,elements:i,rects:a,platform:l,strategy:s}=e,{padding:m=2,x:u,y:d}=f(t,e),g=Array.from(await(null==l.getClientRects?void 0:l.getClientRects(i.reference))||[]),h=function(t){const e=t.slice().sort(((t,e)=>t.y-e.y)),n=[];let i=null;for(let t=0;t<e.length;t++){const o=e[t];!i||o.y-i.y>i.height/2?n.push([o]):n[n.length-1].push(o),i=o}return n.map((t=>T(C(t))))}(g),y=T(C(g)),w=D(m);const x=await l.getElementRects({reference:{getBoundingClientRect:function(){if(2===h.length&&h[0].left>h[1].right&&null!=u&&null!=d)return h.find((t=>u>t.left-w.left&&u<t.right+w.right&&d>t.top-w.top&&d<t.bottom+w.bottom))||y;if(h.length>=2){if("y"===p(n)){const t=h[0],e=h[h.length-1],i="top"===c(n),o=t.top,r=e.bottom,a=i?t.left:e.left,l=i?t.right:e.right;return{top:o,bottom:r,left:a,right:l,width:l-a,height:r-o,x:a,y:o}}const t="left"===c(n),e=r(...h.map((t=>t.right))),i=o(...h.map((t=>t.left))),a=h.filter((n=>t?n.left===i:n.right===e)),l=a[0].top,s=a[a.length-1].bottom;return{top:l,bottom:s,left:i,right:e,width:e-i,height:s-l,x:i,y:l}}return y}},floating:i.floating,strategy:s});return a.reference.x!==x.reference.x||a.reference.y!==x.reference.y||a.reference.width!==x.reference.width||a.reference.height!==x.reference.height?{reset:{rects:x}}:{}}}},t.limitShift=function(t){return void 0===t&&(t={}),{options:t,fn(e){const{x:n,y:i,placement:o,rects:r,middlewareData:a}=e,{offset:l=0,mainAxis:s=!0,crossAxis:m=!0}=f(t,e),d={x:n,y:i},g=p(o),h=u(g);let y=d[h],w=d[g];const x=f(l,e),v="number"==typeof x?{mainAxis:x,crossAxis:0}:{mainAxis:0,crossAxis:0,...x};if(s){const t="y"===h?"height":"width",e=r.reference[h]-r.floating[t]+v.mainAxis,n=r.reference[h]+r.reference[t]-v.mainAxis;y<e?y=e:y>n&&(y=n)}if(m){var b,A;const t="y"===h?"width":"height",e=S.has(c(o)),n=r.reference[g]-r.floating[t]+(e&&(null==(b=a.offset)?void 0:b[g])||0)+(e?0:v.crossAxis),i=r.reference[g]+r.reference[t]+(e?0:(null==(A=a.offset)?void 0:A[g])||0)-(e?v.crossAxis:0);w<n?w=n:w>i&&(w=i)}return{[h]:y,[g]:w}}}},t.offset=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){var n,i;const{x:o,y:r,placement:a,middlewareData:l}=e,s=await async function(t,e){const{placement:n,platform:i,elements:o}=t,r=await(null==i.isRTL?void 0:i.isRTL(o.floating)),a=c(n),l=m(n),s="y"===p(n),u=S.has(a)?-1:1,d=r&&s?-1:1,g=f(e,t);let{mainAxis:h,crossAxis:y,alignmentAxis:w}="number"==typeof g?{mainAxis:g,crossAxis:0,alignmentAxis:null}:{mainAxis:g.mainAxis||0,crossAxis:g.crossAxis||0,alignmentAxis:g.alignmentAxis};return l&&"number"==typeof w&&(y="end"===l?-1*w:w),s?{x:y*d,y:h*u}:{x:h*u,y:y*d}}(e,t);return a===(null==(n=l.offset)?void 0:n.placement)&&null!=(i=l.arrow)&&i.alignmentOffset?{}:{x:o+s.x,y:r+s.y,data:{...s,placement:a}}}}},t.rectToClientRect=T,t.shift=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:i,placement:o}=e,{mainAxis:r=!0,crossAxis:a=!1,limiter:l={fn:t=>{let{x:e,y:n}=t;return{x:e,y:n}}},...m}=f(t,e),d={x:n,y:i},g=await E(e,m),h=p(c(o)),y=u(h);let w=d[y],x=d[h];if(r){const t="y"===y?"bottom":"right";w=s(w+g["y"===y?"top":"left"],w,w-g[t])}if(a){const t="y"===h?"bottom":"right";x=s(x+g["y"===h?"top":"left"],x,x-g[t])}const v=l.fn({...e,[y]:w,[h]:x});return{...v,data:{x:v.x-n,y:v.y-i,enabled:{[y]:r,[h]:a}}}}}},t.size=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){var n,i;const{placement:a,rects:l,platform:s,elements:u}=e,{apply:d=()=>{},...g}=f(t,e),h=await E(e,g),y=c(a),w=m(a),x="y"===p(a),{width:v,height:b}=l.floating;let A,R;"top"===y||"bottom"===y?(A=y,R=w===(await(null==s.isRTL?void 0:s.isRTL(u.floating))?"start":"end")?"left":"right"):(R=y,A="end"===w?"top":"bottom");const P=b-h.top-h.bottom,D=v-h.left-h.right,T=o(b-h[A],P),O=o(v-h[R],D),L=!e.middlewareData.shift;let k=T,C=O;if(null!=(n=e.middlewareData.shift)&&n.enabled.x&&(C=D),null!=(i=e.middlewareData.shift)&&i.enabled.y&&(k=P),L&&!w){const t=r(h.left,0),e=r(h.right,0),n=r(h.top,0),i=r(h.bottom,0);x?C=v-2*(0!==t||0!==e?t+e:r(h.left,h.right)):k=b-2*(0!==n||0!==i?n+i:r(h.top,h.bottom))}await d({...e,availableWidth:C,availableHeight:k});const S=await s.getDimensions(u.floating);return v!==S.width||b!==S.height?{reset:{rects:!0}}:{}}}}}));
// floating-ui/dom 1.7.4
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("@floating-ui/core")):"function"==typeof define&&define.amd?define(["exports","@floating-ui/core"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).FloatingUIDOM={},t.FloatingUICore)}(this,(function(t,e){"use strict";const n=Math.min,o=Math.max,i=Math.round,r=Math.floor,c=t=>({x:t,y:t});function l(){return"undefined"!=typeof window}function s(t){return a(t)?(t.nodeName||"").toLowerCase():"#document"}function f(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function u(t){var e;return null==(e=(a(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function a(t){return!!l()&&(t instanceof Node||t instanceof f(t).Node)}function d(t){return!!l()&&(t instanceof Element||t instanceof f(t).Element)}function h(t){return!!l()&&(t instanceof HTMLElement||t instanceof f(t).HTMLElement)}function p(t){return!(!l()||"undefined"==typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof f(t).ShadowRoot)}const g=new Set(["inline","contents"]);function m(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=E(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!g.has(i)}const y=new Set(["table","td","th"]);function w(t){return y.has(s(t))}const x=[":popover-open",":modal"];function v(t){return x.some((e=>{try{return t.matches(e)}catch(t){return!1}}))}const b=["transform","translate","scale","rotate","perspective"],T=["transform","translate","scale","rotate","perspective","filter"],L=["paint","layout","strict","content"];function R(t){const e=S(),n=d(t)?E(t):t;return b.some((t=>!!n[t]&&"none"!==n[t]))||!!n.containerType&&"normal"!==n.containerType||!e&&!!n.backdropFilter&&"none"!==n.backdropFilter||!e&&!!n.filter&&"none"!==n.filter||T.some((t=>(n.willChange||"").includes(t)))||L.some((t=>(n.contain||"").includes(t)))}function S(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}const C=new Set(["html","body","#document"]);function F(t){return C.has(s(t))}function E(t){return f(t).getComputedStyle(t)}function O(t){return d(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function D(t){if("html"===s(t))return t;const e=t.assignedSlot||t.parentNode||p(t)&&t.host||u(t);return p(e)?e.host:e}function W(t){const e=D(t);return F(e)?t.ownerDocument?t.ownerDocument.body:t.body:h(e)&&m(e)?e:W(e)}function M(t,e,n){var o;void 0===e&&(e=[]),void 0===n&&(n=!0);const i=W(t),r=i===(null==(o=t.ownerDocument)?void 0:o.body),c=f(i);if(r){const t=H(c);return e.concat(c,c.visualViewport||[],m(i)?i:[],t&&n?M(t):[])}return e.concat(i,M(i,[],n))}function H(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function P(t){const e=E(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const r=h(t),c=r?t.offsetWidth:n,l=r?t.offsetHeight:o,s=i(n)!==c||i(o)!==l;return s&&(n=c,o=l),{width:n,height:o,$:s}}function z(t){return d(t)?t:t.contextElement}function A(t){const e=z(t);if(!h(e))return c(1);const n=e.getBoundingClientRect(),{width:o,height:r,$:l}=P(e);let s=(l?i(n.width):n.width)/o,f=(l?i(n.height):n.height)/r;return s&&Number.isFinite(s)||(s=1),f&&Number.isFinite(f)||(f=1),{x:s,y:f}}const B=c(0);function V(t){const e=f(t);return S()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:B}function N(t,n,o,i){void 0===n&&(n=!1),void 0===o&&(o=!1);const r=t.getBoundingClientRect(),l=z(t);let s=c(1);n&&(i?d(i)&&(s=A(i)):s=A(t));const u=function(t,e,n){return void 0===e&&(e=!1),!(!n||e&&n!==f(t))&&e}(l,o,i)?V(l):c(0);let a=(r.left+u.x)/s.x,h=(r.top+u.y)/s.y,p=r.width/s.x,g=r.height/s.y;if(l){const t=f(l),e=i&&d(i)?f(i):i;let n=t,o=H(n);for(;o&&i&&e!==n;){const t=A(o),e=o.getBoundingClientRect(),i=E(o),r=e.left+(o.clientLeft+parseFloat(i.paddingLeft))*t.x,c=e.top+(o.clientTop+parseFloat(i.paddingTop))*t.y;a*=t.x,h*=t.y,p*=t.x,g*=t.y,a+=r,h+=c,n=f(o),o=H(n)}}return e.rectToClientRect({width:p,height:g,x:a,y:h})}function I(t,e){const n=O(t).scrollLeft;return e?e.left+n:N(u(t)).left+n}function k(t,e){const n=t.getBoundingClientRect();return{x:n.left+e.scrollLeft-I(t,n),y:n.top+e.scrollTop}}const q=new Set(["absolute","fixed"]);function U(t,n,i){let r;if("viewport"===n)r=function(t,e){const n=f(t),o=u(t),i=n.visualViewport;let r=o.clientWidth,c=o.clientHeight,l=0,s=0;if(i){r=i.width,c=i.height;const t=S();(!t||t&&"fixed"===e)&&(l=i.offsetLeft,s=i.offsetTop)}const a=I(o);if(a<=0){const t=o.ownerDocument,e=t.body,n=getComputedStyle(e),i="CSS1Compat"===t.compatMode&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,c=Math.abs(o.clientWidth-e.clientWidth-i);c<=25&&(r-=c)}else a<=25&&(r+=a);return{width:r,height:c,x:l,y:s}}(t,i);else if("document"===n)r=function(t){const e=u(t),n=O(t),i=t.ownerDocument.body,r=o(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),c=o(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let l=-n.scrollLeft+I(t);const s=-n.scrollTop;return"rtl"===E(i).direction&&(l+=o(e.clientWidth,i.clientWidth)-r),{width:r,height:c,x:l,y:s}}(u(t));else if(d(n))r=function(t,e){const n=N(t,!0,"fixed"===e),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=h(t)?A(t):c(1);return{width:t.clientWidth*r.x,height:t.clientHeight*r.y,x:i*r.x,y:o*r.y}}(n,i);else{const e=V(t);r={x:n.x-e.x,y:n.y-e.y,width:n.width,height:n.height}}return e.rectToClientRect(r)}function j(t,e){const n=D(t);return!(n===e||!d(n)||F(n))&&("fixed"===E(n).position||j(n,e))}function X(t,e,n){const o=h(e),i=u(e),r="fixed"===n,l=N(t,!0,r,e);let f={scrollLeft:0,scrollTop:0};const a=c(0);function d(){a.x=I(i)}if(o||!o&&!r)if(("body"!==s(e)||m(i))&&(f=O(e)),o){const t=N(e,!0,r,e);a.x=t.x+e.clientLeft,a.y=t.y+e.clientTop}else i&&d();r&&!o&&i&&d();const p=!i||o||r?c(0):k(i,f);return{x:l.left+f.scrollLeft-a.x-p.x,y:l.top+f.scrollTop-a.y-p.y,width:l.width,height:l.height}}function Y(t){return"static"===E(t).position}function $(t,e){if(!h(t)||"fixed"===E(t).position)return null;if(e)return e(t);let n=t.offsetParent;return u(t)===n&&(n=n.ownerDocument.body),n}function _(t,e){const n=f(t);if(v(t))return n;if(!h(t)){let e=D(t);for(;e&&!F(e);){if(d(e)&&!Y(e))return e;e=D(e)}return n}let o=$(t,e);for(;o&&w(o)&&Y(o);)o=$(o,e);return o&&F(o)&&Y(o)&&!R(o)?n:o||function(t){let e=D(t);for(;h(e)&&!F(e);){if(R(e))return e;if(v(e))return null;e=D(e)}return null}(t)||n}const G={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:n,offsetParent:o,strategy:i}=t;const r="fixed"===i,l=u(o),f=!!e&&v(e.floating);if(o===l||f&&r)return n;let a={scrollLeft:0,scrollTop:0},d=c(1);const p=c(0),g=h(o);if((g||!g&&!r)&&(("body"!==s(o)||m(l))&&(a=O(o)),h(o))){const t=N(o);d=A(o),p.x=t.x+o.clientLeft,p.y=t.y+o.clientTop}const y=!l||g||r?c(0):k(l,a);return{width:n.width*d.x,height:n.height*d.y,x:n.x*d.x-a.scrollLeft*d.x+p.x+y.x,y:n.y*d.y-a.scrollTop*d.y+p.y+y.y}},getDocumentElement:u,getClippingRect:function(t){let{element:e,boundary:i,rootBoundary:r,strategy:c}=t;const l=[..."clippingAncestors"===i?v(e)?[]:function(t,e){const n=e.get(t);if(n)return n;let o=M(t,[],!1).filter((t=>d(t)&&"body"!==s(t))),i=null;const r="fixed"===E(t).position;let c=r?D(t):t;for(;d(c)&&!F(c);){const e=E(c),n=R(c);n||"fixed"!==e.position||(i=null),(r?!n&&!i:!n&&"static"===e.position&&i&&q.has(i.position)||m(c)&&!n&&j(t,c))?o=o.filter((t=>t!==c)):i=e,c=D(c)}return e.set(t,o),o}(e,this._c):[].concat(i),r],f=l[0],u=l.reduce(((t,i)=>{const r=U(e,i,c);return t.top=o(r.top,t.top),t.right=n(r.right,t.right),t.bottom=n(r.bottom,t.bottom),t.left=o(r.left,t.left),t}),U(e,f,c));return{width:u.right-u.left,height:u.bottom-u.top,x:u.left,y:u.top}},getOffsetParent:_,getElementRects:async function(t){const e=this.getOffsetParent||_,n=this.getDimensions,o=await n(t.floating);return{reference:X(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){const{width:e,height:n}=P(t);return{width:e,height:n}},getScale:A,isElement:d,isRTL:function(t){return"rtl"===E(t).direction}};function J(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}const K=e.detectOverflow,Q=e.offset,Z=e.autoPlacement,tt=e.shift,et=e.flip,nt=e.size,ot=e.hide,it=e.arrow,rt=e.inline,ct=e.limitShift;t.arrow=it,t.autoPlacement=Z,t.autoUpdate=function(t,e,i,c){void 0===c&&(c={});const{ancestorScroll:l=!0,ancestorResize:s=!0,elementResize:f="function"==typeof ResizeObserver,layoutShift:a="function"==typeof IntersectionObserver,animationFrame:d=!1}=c,h=z(t),p=l||s?[...h?M(h):[],...M(e)]:[];p.forEach((t=>{l&&t.addEventListener("scroll",i,{passive:!0}),s&&t.addEventListener("resize",i)}));const g=h&&a?function(t,e){let i,c=null;const l=u(t);function s(){var t;clearTimeout(i),null==(t=c)||t.disconnect(),c=null}return function f(u,a){void 0===u&&(u=!1),void 0===a&&(a=1),s();const d=t.getBoundingClientRect(),{left:h,top:p,width:g,height:m}=d;if(u||e(),!g||!m)return;const y={rootMargin:-r(p)+"px "+-r(l.clientWidth-(h+g))+"px "+-r(l.clientHeight-(p+m))+"px "+-r(h)+"px",threshold:o(0,n(1,a))||1};let w=!0;function x(e){const n=e[0].intersectionRatio;if(n!==a){if(!w)return f();n?f(!1,n):i=setTimeout((()=>{f(!1,1e-7)}),1e3)}1!==n||J(d,t.getBoundingClientRect())||f(),w=!1}try{c=new IntersectionObserver(x,{...y,root:l.ownerDocument})}catch(t){c=new IntersectionObserver(x,y)}c.observe(t)}(!0),s}(h,i):null;let m,y=-1,w=null;f&&(w=new ResizeObserver((t=>{let[n]=t;n&&n.target===h&&w&&(w.unobserve(e),cancelAnimationFrame(y),y=requestAnimationFrame((()=>{var t;null==(t=w)||t.observe(e)}))),i()})),h&&!d&&w.observe(h),w.observe(e));let x=d?N(t):null;return d&&function e(){const n=N(t);x&&!J(x,n)&&i();x=n,m=requestAnimationFrame(e)}(),i(),()=>{var t;p.forEach((t=>{l&&t.removeEventListener("scroll",i),s&&t.removeEventListener("resize",i)})),null==g||g(),null==(t=w)||t.disconnect(),w=null,d&&cancelAnimationFrame(m)}},t.computePosition=(t,n,o)=>{const i=new Map,r={platform:G,...o},c={...r.platform,_c:i};return e.computePosition(t,n,{...r,platform:c})},t.detectOverflow=K,t.flip=et,t.getOverflowAncestors=M,t.hide=ot,t.inline=rt,t.limitShift=ct,t.offset=Q,t.platform=G,t.shift=tt,t.size=nt}));

/**
 * This file holds Tooltips' code for adding on-hover balloons.
 * Serve JavaScript as an addition, not as an ends or means.
 *
 * @author Sybre Waaijer <https://cyberwire.nl/>
 * @link https://wordpress.org/plugins/autodescription/
 */

/**
 * The SEO Framework plugin
 * Copyright (C) 2019 - 2024 Sybre Waaijer, CyberWire B.V. (https://cyberwire.nl/)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published
 * by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

/**
 * Holds tsfTT (tsf tooltip) values in an object to avoid polluting global namespace.
 *
 * @since 3.1.0
 *
 * @constructor
 */
window.tsfTT = function () {

	const _ttBase = 'tsf-tooltip';
	const ttNames = /** @type {const} */ ( {
		base:      _ttBase,
		item:      `${_ttBase}-item`,
		wrap:      `${_ttBase}-wrap`,
		superWrap: `${_ttBase}-super-wrap`,
		text:      `${_ttBase}-text`,
		textWrap:  `${_ttBase}-text-wrap`,
		boundary:  `${_ttBase}-boundary`,
		arrow:     `${_ttBase}-arrow`,
	} );
	// Yes, I'm too lazy to copy/paste whatever's above again to prepend a dot, so I spent half an hour figuring this.
	/** @type {{[K in keyof typeof ttNames]: `.${typeof ttNames[K]}`}} */
	const ttSelectors = Object.fromEntries( Object.entries( ttNames ).map( ( [ i, v ] ) => [ i, `.${v}` ] ) );
	/** @type {Map<Element, HTMLDIVElement>} */
	const _ttMap = new Map();
	/** @type {WeakMap<HTMLDivElement, () => void>} */
	const _cleanupMap = new WeakMap();

	const _activeToolTipHandles = {
		updatePosition: null, // Assigned in _renderTooltip.
		updateDesc: event => {
			if ( ! event.target.classList.contains( ttNames.item ) ) return;

			let tooltipText = event.target.querySelector( ttSelectors.text );
			if ( tooltipText instanceof Element ) {
				tooltipText.innerHTML = event.target.dataset.desc;
				event.target.dispatchEvent( new Event( 'mousemove' ) ); // event time: <.3ms.
			}
		},
		pointerEnter: async event => {
			let desc = event.target.dataset.desc || event.target.title || '';

			// Don't create tooltip if bubbled.
			if ( desc && ! event.target.getElementsByClassName( ttNames.base ).length ) {
				// Exchanges data-desc with found desc to sustain easy access.
				event.target.dataset.desc = desc;
				// Clear title to prevent default browser tooltip.
				event.target.removeAttribute( 'title' );

				return await doTooltip( event, event.target, desc );
			}

			return false;
		},
		pointerMove: event => {
			_pointer.currPos.x     = event.pageX || NaN;
		},
		pointerLeave: event => {
			removeTooltip( event.target );
			_events( event.target ).unset();

			// Simply continue the animation if we continue onto another tooltip item.
			// If relatedTarget doesn't exist, also cancel.
			if ( ! event.relatedTarget?.classList?.contains( ttNames.item ) )
				_cancelArrowAnimation();
		},
	}

	function _events( target ) {
		const commonEvents = {
			mousemove:  _activeToolTipHandles.pointerMove,
			mouseleave: _activeToolTipHandles.pointerLeave,
			mouseout:   _activeToolTipHandles.pointerLeave,
			blur:       _activeToolTipHandles.pointerLeave,
		};

		return {
			set: () => {
				for ( const [ event, callBack ] of Object.entries( commonEvents ) )
					target.addEventListener( event, callBack );

				target.addEventListener( 'tsf-tooltip-update', _activeToolTipHandles.updateDesc );
			},
			unset: () => {
				for ( const [ event, callBack ] of Object.entries( commonEvents ) )
					target.removeEventListener( event, callBack );
			},
		};
	}

	const _pointer = {
		lastPos:       { x: void 0 },
		currPos:       { x: void 0 },
		reset:         () => {
			// Before and after should have objects assigned separately.
			// For otherwise they get the same pointer. Yes, a memory pointer: reference.
			_pointer.currPos = { x: void 0 };
			_pointer.lastPos = { x: void 0 };
		}
	}

	const {
		_requestArrowAnimation,
		_cancelArrowAnimation,
		_requestArrowAnimationOnce,
	} = ( () => {
		let _pointerAnimationId = void 0;

		const _requestArrowAnimation = () => {
			_pointerAnimationId = requestAnimationFrame( animate );
		}

		const _cancelArrowAnimation = () => {
			cancelAnimationFrame( _pointerAnimationId );
			_pointer.reset();
		}

		const _requestArrowAnimationOnce = () => {
			animate();
			_cancelArrowAnimation();
		}

		const animate = () => {
			let isMouseEvent = ! Number.isNaN( _pointer.currPos.x );

			if ( isMouseEvent ) {
				if ( _pointer.currPos.x === _pointer.lastPos.x ) {
					_requestArrowAnimation();
					return;
				}
			}

			_pointer.lastPos.x = _pointer.currPos.x;
			_activeToolTipHandles.updatePosition( _pointer.currPos.x );

			if ( isMouseEvent ) {
				_requestArrowAnimation();
			} else {
				_pointerAnimationId && _cancelArrowAnimation();
			}
		}

		return {
			_requestArrowAnimation,
			_cancelArrowAnimation,
			_requestArrowAnimationOnce,
		};
	} )();

	function _clickLocker( element ) {
		return {
			lock: () => {
				element.dataset.preventedClick = 1;

				// If the element is a label with a "for"-attribute, then we must forward this
				if ( element instanceof HTMLLabelElement && element.htmlFor ) {
					let input = document.getElementById( element.htmlFor );
					if ( input ) input.dataset.preventedClick = 1;
				}
				if ( element instanceof HTMLInputElement && element.id ) {
					document.querySelectorAll( `label[for="${element.id}"]` ).forEach(
						label => { label.dataset.preventedClick = 1; }
					);
				}
			},
			release: () => {
				if ( ! ( element instanceof Element ) ) return;

				delete element.dataset.preventedClick;

				if ( element instanceof HTMLLabelElement && element.htmlFor ) {
					let input = document.getElementById( element.htmlFor );
					if ( input ) delete input.dataset.preventedClick;
				}
				if ( element instanceof HTMLInputElement && element.id ) {
					document.querySelectorAll( `label[for="${element.id}"]` ).forEach(
						la => { delete la.dataset.preventedClick; }
					);
				}
			},
			isLocked: () => element instanceof Element && !!+element.dataset.preventedClick,
		}
	}

	/**
	 * Initializes tooltips.
	 *
	 * @since 3.1.0
	 * @since 4.0.0 1. Now adds default boundary to `wpwrap` instead of `wpcontent`.
	 *              2. Added focus/blur support.
	 * @since
	 * @access private
	 *
	 * @param {event?} event
	 * @param {Element} element
	 * @param {string} desc
	 */
	function _initToolTips() {

		// TODO move this test to the main tsf object? This whole file doesn't rely on `window.tsf` though.
		let passiveSupported = false,
			captureSupported = false;
		/**
		 * Sets passive & capture support flag.
		 * @link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
		 */
		try {
			( () => {
				const options = {
					get passive() {
						passiveSupported = true;
						return false;
					},
					get capture() {
						captureSupported = true;
						return false;
					},
				};
				// These EventTarget methods will try to get 'passive' and/or 'capture' when it's supported.
				window.addEventListener( 'tsf-tt-test-passive', null, options );
				window.removeEventListener( 'tsf-tt-test-passive', null, options );
			} )();
		} catch ( e ) {
			passiveSupported = false;
			captureSupported = false;
		}

		/**
		 * Loads tooltips within wrapper.
		 * @function
		 * @param {Event} event
		 */
		const loadToolTip = async event => {

			if ( event.target.dataset.hasTooltip ) return;

			let isTouch = false;

			switch ( event.type ) {
				case 'mouseenter':
					// Most likely, thus placed first.
					break;

				case 'pointerdown':
				case 'touchstart':
					isTouch = true;
					break;

				case 'focus':
				default:
					break;
			}

			if ( ! isTouch )
				_clickLocker( event.target ).lock();

			_cancelArrowAnimation();

			if ( ! ( await _activeToolTipHandles.pointerEnter( event ) ) ) return;

			// Initiate arrow placement directly.
			_activeToolTipHandles.pointerMove( event );

			if ( isTouch ) {
				_requestArrowAnimationOnce();
			} else {
				_requestArrowAnimation();
			}

			// Set other events, like removal when tapping elsewhere, or hitting "tab."
			_events( event.target ).set();
		}

		/**
		 * Prevents default click action on a tooltip item.
		 *
		 * Doesn't test whether a tooltip is present, since that happens asynchronously--often (yet _not always_) after the click finishes.
		 * If we set a datapoint where we tell the tooltip is still building, we might be able to read that out (e.g. instigatingTooltip).
		 *
		 * @function
		 * @param {Event} event
		 */
		const preventTooltipHandleClick = event => {
			if ( _clickLocker( event.target ).isLocked() ) return;
			event.preventDefault();
			// iOS 12 bug causes two clicks at once. Let's set this asynchronously.
			setTimeout( () => _clickLocker( event.target ).lock() );
		}

		let instigatingTooltip = false;
		/**
		 * Handles earliest stages of the tooltip.
		 *
		 * Note to self: Don't debounce using timeouts!
		 * Even at 144hz (7ms) it makes the tt flicker obviously when traveling over the SEO Bar.
		 *
		 * @function
		 * @param {Event} event
		 */
		const handleToolTip = event => {

			if ( instigatingTooltip ) return;

			instigatingTooltip = true;

			if ( event.target.matches( ttSelectors.item ) )
				loadToolTip( event );

			event.stopPropagation();

			instigatingTooltip = false;
		}

		const options = passiveSupported && captureSupported ? { capture: true, passive: true } : true;
		/**
		 * Initializes tooltips.
		 * @function
		 */
		const init = () => {
			let wraps   = document.querySelectorAll( ttSelectors.wrap ),
				actions = 'mouseenter pointerdown touchstart focus'.split( ' ' );
			for ( const wrap of wraps ) {
				for ( const e of actions )
					wrap.addEventListener( e, handleToolTip, options );
				// NOTE: If the tooltip-wrap is a label with a "for"-attribute, the input is forwarded to the <input> field.
				// We mitigated this issue at loadToolTip().
				wrap.addEventListener(
					'click',
					preventTooltipHandleClick,
					captureSupported ? { capture: false } : false,
				);
			}
		}
		window.addEventListener( 'tsf-tooltip-reset', init );
		triggerReset();
	}

	/** @param {string} desc The tooltip’s content. */
	let _createTooltip = ( _desc ) => {
		const range = document.createRange();
		const { firstChild: tooltipZero } = range.createContextualFragment(
			`<div class=${ttNames.base}><span class=${ttNames.textWrap}><span class=${ttNames.text}></span></span><div class=${ttNames.arrow} style=will-change:left></div></div>`
		);
		_createTooltip = ( desc ) => {
			const tooltip = tooltipZero.cloneNode( true );
			tooltip.getElementsByClassName( ttNames.text )[ 0 ].innerHTML = desc;
			return [ tooltip, tooltip.querySelector( ttSelectors.arrow ) ];
		}
		return _createTooltip( _desc );
	}

	/**
	 * Renders tooltip.
	 *
	 * @since 4.2.0
	 * @access private
	 *
	 * @param {event?}  event   Optional. The current mouse/touch event to center
	 *                                    tooltip position for to make it seem more natural.
	 * @param {Element} element The element to add the tooltip to.
	 * @param {string}  desc    The tooltip, may contain renderable HTML.
	 * @return {HTMLDivElement} Tooltip element.
	 */
	function _renderTooltip( event, element, desc ) {

		element.dataset.hasTooltip = 1;

		const [ tooltip, tooltipArrow ] = _createTooltip( desc );
		document.body.append( tooltip );

		const {
			arrow,
			autoPlacement,
			autoUpdate,
			computePosition,
			offset,
			shift,
			size
		} = window.FloatingUIDOM;

		const hoverItemSuperWrap = element.closest( ttSelectors.superWrap ),
			  hoverItemWrap      = element.closest( ttSelectors.wrap ) || element.parentElement;

		// TODO: support explicit boundaries added by addBoundary…
		// const boundary = element.closest( ttSelectors.boundary );

		const updateActiveTooltip = ( nextX ) => {
			// If a super wrap exists use its rect for horizontal placement of the tooltip.
			const [ horizontalRect, itemWrapRect ] = hoverItemSuperWrap
				? [ hoverItemSuperWrap.getBoundingClientRect(), hoverItemWrap.getBoundingClientRect() ]
				: Array( 2 ).fill( hoverItemWrap.getBoundingClientRect() );

			// Uses horizontal center of item if nextX unusable.
			if ( Number.isNaN( nextX ) || nextX == null ) {
				nextX = itemWrapRect.width / 2 + itemWrapRect.x;
			}
			const virtualEl = {
				getBoundingClientRect: () => {
					const { height, y, top, bottom } = itemWrapRect;
					const rect ={
						// Vertical components from the tooltip wrap.
						height, y, top, bottom,
						// Horizontal components from the pointer.
						width: 0, x: nextX, left: nextX, right: nextX,
					};
					return rect;
				},
				contextElement: hoverItemWrap,
			};
			// The spacing from boundaries (used in shift and size options).
			const padding = 12;
			computePosition( virtualEl, tooltip, {
				middleware: [
					offset( ( { rects } ) => ( {
						mainAxis: 8, // Height of arrow.
						crossAxis: horizontalRect.x - rects.reference.x + horizontalRect.width / 2
					} ) ),
					size( {
						padding,
						apply( { availableWidth, elements } ) {
							elements.floating.style.maxWidth = `${ Math.max( 0, availableWidth ) }px`;
						},
					} ),
					shift( { padding } ),
					autoPlacement( { allowedPlacements: [ 'top', 'bottom' ] } ),
					arrow( { element: tooltipArrow } ),
				],
			} ).then( ( { x, y, middlewareData: { arrow }, placement } ) => {
				tooltip.classList.toggle( 'tsf-tooltip-down', placement === 'bottom' );
				tooltip.style.left = `${ x }px`;
				tooltip.style.top = `${ y }px`;
				tooltipArrow.style.left = x != null ? `${ arrow.x - 8 }px` : '';
			} );
		};
		_activeToolTipHandles.updatePosition = updateActiveTooltip;
		const floatingCleanup = autoUpdate(
			element,
			tooltip,
			() => updateActiveTooltip( _pointer.currPos.x )
		);
		_cleanupMap.set( tooltip, () => {
			_activeToolTipHandles.updatePosition = null;
			floatingCleanup();
			tooltip.remove();
		} );

		return tooltip;
	}

	/**
	 * Outputs tooltip.
	 *
	 * @since 3.1.0
	 * @since 4.0.0 1. Tooltips are now prepended, instead of appended--so they no longer break the order of flow.
	 *                 Careful, however, as some CSS queries may be subjected differently.
	 *              2. Now calculates up/down overflow at the end, so it accounts for squashing and stretching.
	 * @since 4.2.0 1. Is now asynchronous.
	 *              2. Now returns Boolean whether the tooltip was entered successfully.
	 *              3. Now removes all other tooltips. Only one may prevail!
	 * @access public
	 *
	 * @param {event?}  event   Optional. The current mouse/touch event to center
	 *                                    tooltip position for to make it seem more natural.
	 * @param {Element} element The element to add the tooltip to.
	 * @param {string}  desc    The tooltip, may contain renderable HTML.
	 * @return {Promise<Boolean>} True on success, false otherwise.
	 */
	function doTooltip( event, element, desc ) {

		// Backward compatibility for jQuery vs ES.
		if ( element?.[0] )
			element = element[0];

		// Remove old tooltips, if any.
		for ( const [ element ] of _ttMap ) {
			removeTooltip( element );
			_events( element ).unset();
		}

		if ( ! desc.length ) return false;

		const tooltip = _renderTooltip( event, element, desc );
		_ttMap.set( element, tooltip );
		return !! tooltip; 
	}

	/**
	 * Adds tooltip boundaries.
	 *
	 * @since 3.1.0
	 * @since 4.1.1 Now only accepts Element, not jQuery or string.
	 * @access public
	 *
	 * @param {Element} element The DOM Element to add the boundary to.
	 */
	function addBoundary( element ) {
		element instanceof Element && element.classList.add( ttNames.boundary );
	}

	/**
	 * Removes the description balloon and arrow from element.
	 *
	 * @since 3.1.0
	 * @since 4.1.0 Now also clears the data of the tooltip.
	 * @access public
	 *
	 * @param {!jQuery|Element|string} element
	 */
	function removeTooltip( element ) {

		// Backward compatibility for jQuery vs ES.
		if ( element?.[0] )
			element = element[0];

		if ( element instanceof HTMLElement ) {
			delete element.dataset.hasTooltip;
			_clickLocker( element ).release();
		}

		const toolTip = getTooltip( element );
		if ( toolTip ) {
			_ttMap.delete( element );
			_cleanupMap.get( toolTip )();
		}
	}

	/**
	 * Returns the containing tooltip, if input element isn't already a tooltip.
	 *
	 * @since 3.1.0
	 * @since 4.2.0 Now returns a `HTMLElement` instead of a `jQuery.Element`.
	 * @access public
	 *
	 * @param {!jQuery|Element} element
	 * @return {(Element|undefined)}
	 */
	function getTooltip( element ) {

		// Backward compatibility for jQuery vs ES.
		if ( element?.[0] )
			element = element[0];

		const elementFromMap = _ttMap.get( element );
		return elementFromMap
			? elementFromMap
			: _ttMap.get( element?.querySelector( ttSelectors.base ) );
	}

	let _debounceTriggerReset = void 0;
	/**
	 * Triggers tooltip reset.
	 * This takes .5ms via the event handler thread, feel free to use it whenever.
	 *
	 * @since 3.1.0
	 * @since 4.2.0 Added debouncing.
	 * @access public
	 */
	function triggerReset() {
		clearTimeout( _debounceTriggerReset );
		_debounceTriggerReset = setTimeout(
			() => window.dispatchEvent( new CustomEvent( 'tsf-tooltip-reset' ) ),
			100, // Magic number. Low enough not to cause annoyances, high enough not to cause lag.
		);
	}

	/**
	 * Triggers active tooltip update.
	 *
	 * @since 3.1.0
	 * @access public
	 *
	 * @param {Element|NodeList} element
	 */
	function triggerUpdate( element ) {

		if ( ! element || ! ( element instanceof Element ) )
			element = document.querySelectorAll( ttSelectors.item );

		if ( ! element ) return;

		const updateEvent = new CustomEvent( 'tsf-tooltip-update' );

		if ( element instanceof Element ) {
			element.dispatchEvent( updateEvent );
		} else if ( element instanceof Nodelist ) {
			element.forEach( el => el.dispatchEvent( updateEvent ) );
		}
	}

	return Object.assign( {
		/**
		 * Initialises all aspects of the scripts.
		 * You shouldn't call this.
		 *
		 * @since 3.1.0
		 * @access protected
		 *
		 * @function
		 */
		load: () => {
			document.body.addEventListener( 'tsf-ready', _initToolTips );
		},
	}, {
		/**
		 * Copies internal public functions to tsfTT for public access.
		 * Don't overwrite these.
		 *
		 * @since 3.1.0
		 * @access public
		 */
		doTooltip,
		removeTooltip,
		getTooltip,
		addBoundary,
		triggerReset,
		triggerUpdate,
	} );
}();
window.tsfTT.load();
