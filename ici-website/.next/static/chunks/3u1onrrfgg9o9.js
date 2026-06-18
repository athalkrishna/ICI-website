(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,54017,e=>{"use strict";e.s(["portalCardClass",0,"bg-white rounded-2xl shadow-md border border-navy-100","portalCardPadding",0,"p-6 md:p-8","portalEyebrowClass",0,"text-brand-gold-600 text-xs font-semibold uppercase tracking-widest","portalFieldLabelClass",0,"block text-sm font-bold text-brand-navy-900 uppercase tracking-wider","portalInputClass",0,"w-full bg-cream-50 border border-navy-100 rounded-xl px-4 py-3 text-sm text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body","portalLabelClass",0,"block text-xs font-semibold uppercase tracking-wider text-brand-gold-700 mb-1.5","portalMainContentClass",0,"flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain p-4 sm:p-6 md:p-8 lg:p-10","portalNavActiveClass",0,"bg-brand-gold-500/20 text-brand-gold-400","portalNavInactiveClass",0,"text-white/80 hover:bg-brand-navy-800 hover:text-white","portalPrimaryBtnClass",0,"inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-brand-navy-900 hover:bg-brand-navy-800 rounded-xl transition-colors disabled:opacity-50","portalSecondaryBtnClass",0,"inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-brand-navy-900 border border-navy-100 bg-white hover:bg-cream-50 rounded-xl transition-colors disabled:opacity-50","portalSectionTitleClass",0,"font-display text-xl text-brand-navy-900","portalShellClass",0,"flex flex-col lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] h-full max-h-full min-h-0 overflow-hidden bg-cream-50 text-brand-navy-900 font-sans","portalSidebarClass",0,"flex flex-col h-full max-h-full min-h-0 w-full min-w-0 overflow-hidden bg-brand-navy-900 text-white","portalSidebarColumnClass",0,"h-full min-h-0 max-h-full overflow-hidden bg-brand-navy-900","portalTableWrapperClass",0,"overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0"])},74588,e=>{"use strict";let t,a;var r,s=e.i(48505);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let a="",r="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+o+";":r+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,o):i+":"+o+";")}return a+(t&&s?t+"{"+s+"}":s)+r},c={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e};function m(e){let t,a,r=this||{},s=e.call?e(r.p):e;return((e,t,a,r,s)=>{var i;let m=u(e),p=c[m]||(c[m]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(m));if(!c[p]){let t=m!==e?e:(e=>{let t,a,r=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?r.shift():t[3]?(a=t[3].replace(l," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(l," ").trim();return r[0]})(e);c[p]=d(s?{["@keyframes "+p]:t}:t,a?"":"."+p)}let f=a&&c.g;return a&&(c.g=c[p]),i=c[p],f?t.data=t.data.replace(f,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),p})(s.unshift?s.raw?(t=[].slice.call(arguments,1),a=r.p,s.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}m.bind({g:1});let p,f,h,x=m.bind({k:1});function b(e,t){let a=this||{};return function(){let r=arguments;function s(i,o){let n=Object.assign({},i),l=n.className||s.className;a.p=Object.assign({theme:f&&f()},n),a.o=/go\d/.test(l),n.className=m.apply(a,r)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),h&&d[0]&&h(n),p(d,n)}return t?t(s):s}}var y=(e,t)=>"function"==typeof e?e(t):e,g=(t=0,()=>(++t).toString()),v=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},w="default",k=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return k(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},j=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},E=(e,t=w)=>{C[t]=k(C[t]||N,e),j.forEach(([e,a])=>{e===t&&a(C[t])})},M=e=>Object.keys(C).forEach(t=>E(e,t)),z=(e=w)=>t=>{E(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=e=>(t,a)=>{let r,s=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||g()}))(t,e,a);return z(s.toasterId||(r=s.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===r))))({type:2,toast:s}),s.id},S=(e,t)=>I("blank")(e,t);S.error=I("error"),S.success=I("success"),S.loading=I("loading"),S.custom=I("custom"),S.dismiss=(e,t)=>{let a={type:3,toastId:e};t?z(t)(a):M(a)},S.dismissAll=e=>S.dismiss(void 0,e),S.remove=(e,t)=>{let a={type:4,toastId:e};t?z(t)(a):M(a)},S.removeAll=e=>S.remove(void 0,e),S.promise=(e,t,a)=>{let r=S.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?y(t.success,e):void 0;return s?S.success(s,{id:r,...a,...null==a?void 0:a.success}):S.dismiss(r),e}).catch(e=>{let s=t.error?y(t.error,e):void 0;s?S.error(s,{id:r,...a,...null==a?void 0:a.error}):S.dismiss(r)}),e};var $=1e3,A=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=x`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=x`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,P=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${A} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${D} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,T=x`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,H=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${T} 1s linear infinite;
`,F=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,U=x`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,_=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${U} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,B=b("div")`
  position: absolute;
`,R=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,V=x`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${V} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,G=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(q,null,t):t:"blank"===a?null:s.createElement(R,null,s.createElement(H,{...r}),"loading"!==a&&s.createElement(B,null,"error"===a?s.createElement(P,{...r}):s.createElement(_,{...r})))},K=b("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,W=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=s.memo(({toast:e,position:t,style:a,children:r})=>{let i=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[r,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${x(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${x(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(G,{toast:e}),n=s.createElement(W,{...e.ariaProps},y(e.message,e));return s.createElement(K,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof r?r({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});r=s.createElement,d.p=void 0,p=r,f=void 0,h=void 0;var Y=({id:e,className:t,style:a,onHeightUpdate:r,children:i})=>{let o=s.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return s.createElement("div",{ref:o,className:t,style:a},i)},Z=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:a,pausedAt:r}=((e={},t=w)=>{let[a,r]=(0,s.useState)(C[t]||N),i=(0,s.useRef)(C[t]);(0,s.useEffect)(()=>(i.current!==C[t]&&r(C[t]),j.push([t,r]),()=>{let e=j.findIndex(([e])=>e===t);e>-1&&j.splice(e,1)}),[t]);let o=a.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...a,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=$)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,a)},[]);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),s=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&S.dismiss(a.id);return}return setTimeout(()=>S.dismiss(a.id,t),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let n=(0,s.useCallback)(z(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,s.useCallback)(()=>{r&&n({type:6,time:Date.now()})},[r,n]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:i}=t||{},o=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[a]);return(0,s.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,o]),{toasts:a,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}})(a,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let o,n,l=a.position||t,d=c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}),u=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(Y,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?Z:"",style:u},"custom"===a.type?y(a.message,a):i?i(a):s.createElement(X,{toast:a,position:l}))}))},"default",0,S],74588)},95389,e=>{"use strict";let t=(0,e.i(18856).default)("external-link",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);e.s(["ExternalLink",0,t],95389)},87910,e=>{"use strict";let t=(0,e.i(18856).default)("book-open",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);e.s(["BookOpen",0,t],87910)},21413,e=>{"use strict";let t=(0,e.i(18856).default)("graduation-cap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]);e.s(["GraduationCap",0,t],21413)},9345,e=>{"use strict";let t=(0,e.i(18856).default)("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);e.s(["User",0,t],9345)},32777,47580,38792,e=>{"use strict";var t=e.i(18856);let a=(0,t.default)("layout-dashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);e.s(["LayoutDashboard",0,a],32777);var r=e.i(99885),s=e.i(26960),i=e.i(17085),o=e.i(37643);let n=(0,t.default)("log-out",[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]);var l=e.i(44349),d=e.i(54017);e.s(["default",0,function({portalName:e,homeHref:t,navItems:a,userName:c,userMeta:u,logoutCallbackUrl:m}){let p=(0,i.usePathname)();return(0,r.jsxs)("aside",{className:d.portalSidebarClass,children:[(0,r.jsx)("div",{className:"shrink-0 p-5 sm:p-6 border-b border-white/10 min-w-0",children:(0,r.jsxs)(s.default,{href:t,className:"block group min-w-0",children:[(0,r.jsx)("p",{className:"text-brand-gold-400 text-xs font-semibold uppercase tracking-widest mb-1.5 group-hover:text-brand-gold-300 transition-colors truncate",children:"International Coaching Institute"}),(0,r.jsx)("p",{className:"font-display text-lg sm:text-xl text-white tracking-wide truncate",children:e})]})}),(0,r.jsx)("nav",{className:"portal-sidebar-nav flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain px-3 py-4",children:(0,r.jsx)("ul",{className:"space-y-1 pb-2",children:a.map(e=>{var t;let a=(t=e.href,e.exact?p===t:p===t||p.startsWith(`${t}/`)),i=e.icon,o=(0,l.default)("flex items-center gap-3 min-w-0 py-2.5 px-3 rounded-lg text-sm font-medium transition",a?d.portalNavActiveClass:d.portalNavInactiveClass);return(0,r.jsx)("li",{className:"min-w-0",children:e.external?(0,r.jsxs)("a",{href:e.href,target:"_blank",rel:"noopener noreferrer",className:o,children:[(0,r.jsx)(i,{size:18,className:(0,l.default)("shrink-0",a?"text-brand-gold-400":"text-white/60")}),(0,r.jsx)("span",{className:"truncate",children:e.label})]}):(0,r.jsxs)(s.default,{href:e.href,className:o,children:[(0,r.jsx)(i,{size:18,className:(0,l.default)("shrink-0",a?"text-brand-gold-400":"text-white/60")}),(0,r.jsx)("span",{className:"truncate",children:e.label})]})},e.href)})})}),(0,r.jsxs)("div",{className:"shrink-0 min-w-0 px-3 py-4 border-t border-white/10 bg-brand-navy-900",children:[c&&(0,r.jsxs)("div",{className:"mb-3 px-3 min-w-0",children:[(0,r.jsx)("p",{className:"text-sm text-white truncate font-medium",children:c}),u&&(0,r.jsx)("p",{className:"text-xs text-white/50 truncate mt-0.5",children:u})]}),(0,r.jsxs)("button",{type:"button",onClick:()=>(0,o.signOut)({callbackUrl:m}),className:(0,l.default)("flex items-center gap-2 w-full min-w-0 py-2.5 px-3 rounded-lg text-sm font-medium transition",d.portalNavInactiveClass),children:[(0,r.jsx)(n,{size:16,className:"shrink-0"}),(0,r.jsx)("span",{className:"truncate",children:"Log out"})]})]})]})}],47580);var c=e.i(48505),u=e.i(76),m=e.i(95389),p=e.i(58233);function f({title:e,userName:t,userMeta:a,siteHref:i="/",onMenuClick:o}){return(0,r.jsx)("header",{className:"shrink-0 z-20 border-b border-navy-100 bg-white/95 backdrop-blur-sm",children:(0,r.jsxs)("div",{className:"flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 min-h-[3.5rem]",children:[(0,r.jsxs)("div",{className:"flex items-center gap-3 min-w-0",children:[o&&(0,r.jsx)("button",{type:"button",onClick:o,className:"lg:hidden p-2 -ml-1 rounded-lg text-brand-navy-700 hover:bg-cream-100 transition-colors","aria-label":"Open navigation menu",children:(0,r.jsx)(p.Menu,{size:22})}),(0,r.jsxs)("div",{className:"min-w-0",children:[(0,r.jsx)("p",{className:"text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold-600 truncate",children:"International Coaching Institute"}),(0,r.jsx)("h1",{className:"font-display text-lg sm:text-xl text-brand-navy-900 truncate leading-tight",children:e})]})]}),(0,r.jsxs)("div",{className:"flex items-center gap-2 sm:gap-4 shrink-0",children:[(0,r.jsxs)(s.default,{href:i,target:"_blank",rel:"noopener noreferrer",className:"hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-brand-navy-700 hover:text-brand-gold-600 transition-colors",children:["View website",(0,r.jsx)(m.ExternalLink,{size:14,className:"shrink-0"})]}),t&&(0,r.jsxs)("div",{className:"text-right min-w-0 max-w-[10rem] sm:max-w-[14rem] pl-2 sm:pl-3 border-l border-navy-100",children:[(0,r.jsx)("p",{className:"text-xs sm:text-sm font-semibold text-brand-navy-900 truncate",children:t}),a&&(0,r.jsx)("p",{className:"text-[10px] sm:text-xs text-muted truncate",children:a})]})]})]})})}e.s(["default",0,function({sidebar:e,children:t,className:a,mobileTitle:s="Portal",headerUserName:i,headerUserMeta:o,siteHref:n="/"}){let[m,p]=(0,c.useState)(!1);return(0,c.useEffect)(()=>{if(!m)return;let e=e=>{"Escape"===e.key&&p(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",e),()=>{document.body.style.overflow="",window.removeEventListener("keydown",e)}},[m]),(0,r.jsxs)("div",{className:(0,l.default)(d.portalShellClass,a),children:[m&&(0,r.jsx)("button",{type:"button",className:"fixed inset-0 z-40 bg-black/50 lg:hidden","aria-label":"Close navigation menu",onClick:()=>p(!1)}),(0,r.jsxs)("div",{className:(0,l.default)(d.portalSidebarColumnClass,"fixed inset-y-0 left-0 z-50 w-[min(16rem,88vw)] transform transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-auto lg:translate-x-0",m?"translate-x-0":"-translate-x-full lg:translate-x-0"),children:[(0,r.jsx)("button",{type:"button",onClick:()=>p(!1),className:"lg:hidden absolute top-3 right-3 z-10 p-2 rounded-lg bg-brand-navy-800 text-white hover:bg-brand-navy-700","aria-label":"Close menu",children:(0,r.jsx)(u.X,{size:18})}),(0,r.jsx)("div",{className:"h-full min-h-0",onClick:e=>{e.target.closest("a, button")&&p(!1)},children:e})]}),(0,r.jsxs)("div",{className:"flex flex-col flex-1 min-w-0 min-h-0 h-full overflow-hidden",children:[(0,r.jsx)(f,{title:s,userName:i,userMeta:o,siteHref:n,onMenuClick:()=>p(!0)}),(0,r.jsx)("div",{className:d.portalMainContentClass,children:t})]})]})}],38792)},930,e=>{"use strict";var t=e.i(99885),a=e.i(74588);e.s(["default",0,function({children:e}){return(0,t.jsxs)(t.Fragment,{children:[e,(0,t.jsx)(a.Toaster,{position:"top-right",toastOptions:{className:"font-sans text-sm",style:{background:"#0A1F44",color:"#fff"},success:{iconTheme:{primary:"#C9A84C",secondary:"#0A1F44"}},error:{iconTheme:{primary:"#ef4444",secondary:"#0A1F44"}}}})]})}])},78435,e=>{"use strict";var t=e.i(99885),a=e.i(37643),r=e.i(87910),s=e.i(21413),i=e.i(32777);let o=(0,e.i(18856).default)("message-circle",[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]]);var n=e.i(9345),l=e.i(47580);let d=[{label:"Dashboard",href:"/dashboard",icon:i.LayoutDashboard,exact:!0},{label:"My Materials",href:"/dashboard/materials",icon:r.BookOpen},{label:"My Profile",href:"/dashboard/profile",icon:n.User},{label:"My Credential",href:"/dashboard/credential",icon:s.GraduationCap},{label:"Contact Support",href:"/contact",icon:o}];function c(){let{data:e}=(0,a.useSession)();return(0,t.jsx)(l.default,{portalName:"Student Portal",homeHref:"/dashboard",navItems:d,userName:e?.user?.name,userMeta:e?.user?.email??void 0,logoutCallbackUrl:"/login"})}var u=e.i(38792);e.s(["default",0,function({children:e}){let{data:r}=(0,a.useSession)();return(0,t.jsx)(u.default,{mobileTitle:"Student Portal",headerUserName:r?.user?.name,headerUserMeta:r?.user?.email??void 0,siteHref:"/",sidebar:(0,t.jsx)(c,{}),children:e})}],78435)}]);