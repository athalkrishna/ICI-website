(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,68862,e=>{"use strict";let t={home:"/"},a={"/":"home"};function r(e){return a[e]??encodeURIComponent(e)}e.s(["formatDate",0,function(e,t){return new Date(e).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric",...t})},"formatDateTime",0,function(e){return new Date(e).toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})},"formatEnumLabel",0,function(e){return e.split("_").map(e=>e.charAt(0)+e.slice(1).toLowerCase()).join(" ")},"groupFieldsBySection",0,function(e){let t=[...e].sort((e,t)=>e.order-t.order),a=new Map;for(let e of t){let t=e.section?.trim()||"General";a.has(t)||a.set(t,[]),a.get(t).push(e)}return Array.from(a.entries())},"pageApiPath",0,function(e){return`/api/admin/pages/${r(e)}`},"pageEditorHref",0,function(e){return`/admin/pages/${r(e)}`},"resolvePageSlug",0,function(e){let a=function(e){try{return decodeURIComponent(e)}catch{return e}}(e);return t[a]??a},"slugToPreviewPath",0,function(e){return"/"===e||"global"===e?"/":e.startsWith("/")?e:`/${e}`}])},54017,e=>{"use strict";e.s(["portalCardClass",0,"bg-white rounded-2xl shadow-md border border-navy-100","portalCardPadding",0,"p-6 md:p-8","portalEyebrowClass",0,"text-brand-gold-600 text-xs font-semibold uppercase tracking-widest","portalFieldLabelClass",0,"block text-sm font-bold text-brand-navy-900 uppercase tracking-wider","portalInputClass",0,"w-full bg-cream-50 border border-navy-100 rounded-xl px-4 py-3 text-sm text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body","portalLabelClass",0,"block text-xs font-semibold uppercase tracking-wider text-brand-gold-700 mb-1.5","portalMainContentClass",0,"flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain p-4 sm:p-6 md:p-8 lg:p-10","portalNavActiveClass",0,"bg-brand-gold-500/20 text-brand-gold-400","portalNavInactiveClass",0,"text-white/80 hover:bg-brand-navy-800 hover:text-white","portalPrimaryBtnClass",0,"inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-brand-navy-900 hover:bg-brand-navy-800 rounded-xl transition-colors disabled:opacity-50","portalSecondaryBtnClass",0,"inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-brand-navy-900 border border-navy-100 bg-white hover:bg-cream-50 rounded-xl transition-colors disabled:opacity-50","portalSectionTitleClass",0,"font-display text-xl text-brand-navy-900","portalShellClass",0,"flex flex-col lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] h-full max-h-full min-h-0 overflow-hidden bg-cream-50 text-brand-navy-900 font-sans","portalSidebarClass",0,"flex flex-col h-full max-h-full min-h-0 w-full min-w-0 overflow-hidden bg-brand-navy-900 text-white","portalSidebarColumnClass",0,"h-full min-h-0 max-h-full overflow-hidden bg-brand-navy-900","portalTableWrapperClass",0,"overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0"])},74588,e=>{"use strict";let t,a;var r,s=e.i(48505);let i={data:""},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,o=/\n+/g,d=(e,t)=>{let a="",r="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":r+="f"==i[1]?d(n,i):i+"{"+d(n,"k"==i[1]?"":t)+"}":"object"==typeof n?r+=d(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i="-"==i[1]?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,n):i+":"+n+";")}return a+(t&&s?t+"{"+s+"}":s)+r},c={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e};function m(e){let t,a,r=this||{},s=e.call?e(r.p):e;return((e,t,a,r,s)=>{var i;let m=u(e),p=c[m]||(c[m]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(m));if(!c[p]){let t=m!==e?e:(e=>{let t,a,r=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(a=t[3].replace(o," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(o," ").trim();return r[0]})(e);c[p]=d(s?{["@keyframes "+p]:t}:t,a?"":"."+p)}let h=a&&c.g;return a&&(c.g=c[p]),i=c[p],h?t.data=t.data.replace(h,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),p})(s.unshift?s.raw?(t=[].slice.call(arguments,1),a=r.p,s.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}m.bind({g:1});let p,h,f,x=m.bind({k:1});function y(e,t){let a=this||{};return function(){let r=arguments;function s(i,n){let l=Object.assign({},i),o=l.className||s.className;a.p=Object.assign({theme:h&&h()},l),a.o=/go\d/.test(o),l.className=m.apply(a,r)+(o?" "+o:""),t&&(l.ref=n);let d=e;return e[0]&&(d=l.as||e,delete l.as),f&&d[0]&&f(l),p(d,l)}return t?t(s):s}}var g=(e,t)=>"function"==typeof e?e(t):e,b=(t=0,()=>(++t).toString()),v=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},w="default",k=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return k(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},j=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},M=(e,t=w)=>{C[t]=k(C[t]||N,e),j.forEach(([e,a])=>{e===t&&a(C[t])})},E=e=>Object.keys(C).forEach(t=>M(e,t)),A=(e=w)=>t=>{M(t,e)},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=e=>(t,a)=>{let r,s=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||b()}))(t,e,a);return A(s.toasterId||(r=s.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===r))))({type:2,toast:s}),s.id},I=(e,t)=>S("blank")(e,t);I.error=S("error"),I.success=S("success"),I.loading=S("loading"),I.custom=S("custom"),I.dismiss=(e,t)=>{let a={type:3,toastId:e};t?A(t)(a):E(a)},I.dismissAll=e=>I.dismiss(void 0,e),I.remove=(e,t)=>{let a={type:4,toastId:e};t?A(t)(a):E(a)},I.removeAll=e=>I.remove(void 0,e),I.promise=(e,t,a)=>{let r=I.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?g(t.success,e):void 0;return s?I.success(s,{id:r,...a,...null==a?void 0:a.success}):I.dismiss(r),e}).catch(e=>{let s=t.error?g(t.error,e):void 0;s?I.error(s,{id:r,...a,...null==a?void 0:a.error}):I.dismiss(r)}),e};var L=1e3,D=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,P=x`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,O=x`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,$=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${P} 0.15s ease-out forwards;
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
    animation: ${O} 0.15s ease-out forwards;
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
`,H=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${T} 1s linear infinite;
`,U=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,_=x`
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
}`,q=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${_} 0.2s ease-out forwards;
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
`,B=y("div")`
  position: absolute;
`,R=y("div")`
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
}`,F=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${V} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,G=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(F,null,t):t:"blank"===a?null:s.createElement(R,null,s.createElement(H,{...r}),"loading"!==a&&s.createElement(B,null,"error"===a?s.createElement($,{...r}):s.createElement(q,{...r})))},W=y("div")`
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
`,K=y("div")`
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
`];return{animation:t?`${x(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${x(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},n=s.createElement(G,{toast:e}),l=s.createElement(K,{...e.ariaProps},g(e.message,e));return s.createElement(W,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof r?r({icon:n,message:l}):s.createElement(s.Fragment,null,n,l))});r=s.createElement,d.p=void 0,p=r,h=void 0,f=void 0;var Y=({id:e,className:t,style:a,onHeightUpdate:r,children:i})=>{let n=s.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return s.createElement("div",{ref:n,className:t,style:a},i)},Z=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:i,toasterId:n,containerStyle:l,containerClassName:o})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:a,pausedAt:r}=((e={},t=w)=>{let[a,r]=(0,s.useState)(C[t]||N),i=(0,s.useRef)(C[t]);(0,s.useEffect)(()=>(i.current!==C[t]&&r(C[t]),j.push([t,r]),()=>{let e=j.findIndex(([e])=>e===t);e>-1&&j.splice(e,1)}),[t]);let n=a.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...a,toasts:n}})(e,t),i=(0,s.useRef)(new Map).current,n=(0,s.useCallback)((e,t=L)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,a)},[]);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),s=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&I.dismiss(a.id);return}return setTimeout(()=>I.dismiss(a.id,t),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let l=(0,s.useCallback)(A(t),[t]),o=(0,s.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,s.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,s.useCallback)(()=>{r&&l({type:6,time:Date.now()})},[r,l]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:i}=t||{},n=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=n.findIndex(t=>t.id===e.id),o=n.filter((e,t)=>t<l&&e.visible).length;return n.filter(e=>e.visible).slice(...r?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+s,0)},[a]);return(0,s.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,n]),{toasts:a,handlers:{updateHeight:d,startPause:o,endPause:c,calculateOffset:u}}})(a,n);return s.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let n,l,o=a.position||t,d=c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}),u=(n=o.includes("top"),l=o.includes("center")?{justifyContent:"center"}:o.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...l});return s.createElement(Y,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?Z:"",style:u},"custom"===a.type?g(a.message,a):i?i(a):s.createElement(X,{toast:a,position:o}))}))},"default",0,I],74588)},95389,e=>{"use strict";let t=(0,e.i(18856).default)("external-link",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);e.s(["ExternalLink",0,t],95389)},52252,e=>{"use strict";let t=(0,e.i(18856).default)("file-text",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);e.s(["FileText",0,t],52252)},5644,e=>{"use strict";var t=e.i(48505),a=e.i(37643);let r="ici_admin_browser_session";e.s(["default",0,function(){let{data:e,status:s}=(0,a.useSession)();return(0,t.useEffect)(()=>{if("authenticated"!==s||!e?.user)return;let t=e.user.role;("ADMIN"===t||"SUPER_ADMIN"===t)&&(sessionStorage.getItem(r)||(0,a.signOut)({callbackUrl:"/admin/login"}))},[e,s]),null},"markAdminBrowserSession",0,function(){sessionStorage.setItem(r,"1")}])},2687,e=>{"use strict";let t=(0,e.i(18856).default)("calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);e.s(["Calendar",0,t],2687)},65783,e=>{"use strict";let t=(0,e.i(18856).default)("image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);e.s(["default",0,t])},59144,e=>{"use strict";let t=(0,e.i(18856).default)("users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]);e.s(["Users",0,t],59144)},21413,e=>{"use strict";let t=(0,e.i(18856).default)("graduation-cap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]);e.s(["GraduationCap",0,t],21413)},87910,e=>{"use strict";let t=(0,e.i(18856).default)("book-open",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);e.s(["BookOpen",0,t],87910)},32777,47580,38792,e=>{"use strict";var t=e.i(18856);let a=(0,t.default)("layout-dashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);e.s(["LayoutDashboard",0,a],32777);var r=e.i(99885),s=e.i(26960),i=e.i(17085),n=e.i(37643);let l=(0,t.default)("log-out",[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]);var o=e.i(44349),d=e.i(54017);e.s(["default",0,function({portalName:e,homeHref:t,navItems:a,userName:c,userMeta:u,logoutCallbackUrl:m}){let p=(0,i.usePathname)();return(0,r.jsxs)("aside",{className:d.portalSidebarClass,children:[(0,r.jsx)("div",{className:"shrink-0 p-5 sm:p-6 border-b border-white/10 min-w-0",children:(0,r.jsxs)(s.default,{href:t,className:"block group min-w-0",children:[(0,r.jsx)("p",{className:"text-brand-gold-400 text-xs font-semibold uppercase tracking-widest mb-1.5 group-hover:text-brand-gold-300 transition-colors truncate",children:"International Coaching Institute"}),(0,r.jsx)("p",{className:"font-display text-lg sm:text-xl text-white tracking-wide truncate",children:e})]})}),(0,r.jsx)("nav",{className:"portal-sidebar-nav flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain px-3 py-4",children:(0,r.jsx)("ul",{className:"space-y-1 pb-2",children:a.map(e=>{var t;let a=(t=e.href,e.exact?p===t:p===t||p.startsWith(`${t}/`)),i=e.icon,n=(0,o.default)("flex items-center gap-3 min-w-0 py-2.5 px-3 rounded-lg text-sm font-medium transition",a?d.portalNavActiveClass:d.portalNavInactiveClass);return(0,r.jsx)("li",{className:"min-w-0",children:e.external?(0,r.jsxs)("a",{href:e.href,target:"_blank",rel:"noopener noreferrer",className:n,children:[(0,r.jsx)(i,{size:18,className:(0,o.default)("shrink-0",a?"text-brand-gold-400":"text-white/60")}),(0,r.jsx)("span",{className:"truncate",children:e.label})]}):(0,r.jsxs)(s.default,{href:e.href,className:n,children:[(0,r.jsx)(i,{size:18,className:(0,o.default)("shrink-0",a?"text-brand-gold-400":"text-white/60")}),(0,r.jsx)("span",{className:"truncate",children:e.label})]})},e.href)})})}),(0,r.jsxs)("div",{className:"shrink-0 min-w-0 px-3 py-4 border-t border-white/10 bg-brand-navy-900",children:[c&&(0,r.jsxs)("div",{className:"mb-3 px-3 min-w-0",children:[(0,r.jsx)("p",{className:"text-sm text-white truncate font-medium",children:c}),u&&(0,r.jsx)("p",{className:"text-xs text-white/50 truncate mt-0.5",children:u})]}),(0,r.jsxs)("button",{type:"button",onClick:()=>(0,n.signOut)({callbackUrl:m}),className:(0,o.default)("flex items-center gap-2 w-full min-w-0 py-2.5 px-3 rounded-lg text-sm font-medium transition",d.portalNavInactiveClass),children:[(0,r.jsx)(l,{size:16,className:"shrink-0"}),(0,r.jsx)("span",{className:"truncate",children:"Log out"})]})]})]})}],47580);var c=e.i(48505),u=e.i(76),m=e.i(95389),p=e.i(58233);function h({title:e,userName:t,userMeta:a,siteHref:i="/",onMenuClick:n}){return(0,r.jsx)("header",{className:"shrink-0 z-20 border-b border-navy-100 bg-white/95 backdrop-blur-sm",children:(0,r.jsxs)("div",{className:"flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 min-h-[3.5rem]",children:[(0,r.jsxs)("div",{className:"flex items-center gap-3 min-w-0",children:[n&&(0,r.jsx)("button",{type:"button",onClick:n,className:"lg:hidden p-2 -ml-1 rounded-lg text-brand-navy-700 hover:bg-cream-100 transition-colors","aria-label":"Open navigation menu",children:(0,r.jsx)(p.Menu,{size:22})}),(0,r.jsxs)("div",{className:"min-w-0",children:[(0,r.jsx)("p",{className:"text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold-600 truncate",children:"International Coaching Institute"}),(0,r.jsx)("h1",{className:"font-display text-lg sm:text-xl text-brand-navy-900 truncate leading-tight",children:e})]})]}),(0,r.jsxs)("div",{className:"flex items-center gap-2 sm:gap-4 shrink-0",children:[(0,r.jsxs)(s.default,{href:i,target:"_blank",rel:"noopener noreferrer",className:"hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-brand-navy-700 hover:text-brand-gold-600 transition-colors",children:["View website",(0,r.jsx)(m.ExternalLink,{size:14,className:"shrink-0"})]}),t&&(0,r.jsxs)("div",{className:"text-right min-w-0 max-w-[10rem] sm:max-w-[14rem] pl-2 sm:pl-3 border-l border-navy-100",children:[(0,r.jsx)("p",{className:"text-xs sm:text-sm font-semibold text-brand-navy-900 truncate",children:t}),a&&(0,r.jsx)("p",{className:"text-[10px] sm:text-xs text-muted truncate",children:a})]})]})]})})}e.s(["default",0,function({sidebar:e,children:t,className:a,mobileTitle:s="Portal",headerUserName:i,headerUserMeta:n,siteHref:l="/"}){let[m,p]=(0,c.useState)(!1);return(0,c.useEffect)(()=>{if(!m)return;let e=e=>{"Escape"===e.key&&p(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",e),()=>{document.body.style.overflow="",window.removeEventListener("keydown",e)}},[m]),(0,r.jsxs)("div",{className:(0,o.default)(d.portalShellClass,a),children:[m&&(0,r.jsx)("button",{type:"button",className:"fixed inset-0 z-40 bg-black/50 lg:hidden","aria-label":"Close navigation menu",onClick:()=>p(!1)}),(0,r.jsxs)("div",{className:(0,o.default)(d.portalSidebarColumnClass,"fixed inset-y-0 left-0 z-50 w-[min(16rem,88vw)] transform transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-auto lg:translate-x-0",m?"translate-x-0":"-translate-x-full lg:translate-x-0"),children:[(0,r.jsx)("button",{type:"button",onClick:()=>p(!1),className:"lg:hidden absolute top-3 right-3 z-10 p-2 rounded-lg bg-brand-navy-800 text-white hover:bg-brand-navy-700","aria-label":"Close menu",children:(0,r.jsx)(u.X,{size:18})}),(0,r.jsx)("div",{className:"h-full min-h-0",onClick:e=>{e.target.closest("a, button")&&p(!1)},children:e})]}),(0,r.jsxs)("div",{className:"flex flex-col flex-1 min-w-0 min-h-0 h-full overflow-hidden",children:[(0,r.jsx)(h,{title:s,userName:i,userMeta:n,siteHref:l,onMenuClick:()=>p(!0)}),(0,r.jsx)("div",{className:d.portalMainContentClass,children:t})]})]})}],38792)},79145,e=>{"use strict";var t=e.i(99885),a=e.i(74588),r=e.i(5644);e.s(["default",0,function({children:e}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.default,{}),e,(0,t.jsx)(a.Toaster,{position:"top-right",toastOptions:{duration:4e3,style:{background:"#0f1f3d",color:"#fff",borderRadius:"12px"},success:{iconTheme:{primary:"#c9a227",secondary:"#0f1f3d"}},error:{iconTheme:{primary:"#ef4444",secondary:"#fff"}}}})]})}])},43454,e=>{"use strict";var t=e.i(99885),a=e.i(17085),r=e.i(32777),s=e.i(52252),i=e.i(18856);let n=(0,i.default)("newspaper",[["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",key:"39pd36"}],["rect",{width:"8",height:"4",x:"10",y:"6",rx:"1",key:"aywv1n"}]]);var l=e.i(2687),o=e.i(59144),d=e.i(21413),c=e.i(87910);let u=(0,i.default)("message-square-quote",[["path",{d:"M14 14a2 2 0 0 0 2-2V8h-2",key:"1r06pg"}],["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}],["path",{d:"M8 14a2 2 0 0 0 2-2V8H8",key:"1jzu5j"}]]);var m=e.i(65783),m=m,p=e.i(53380);let h=(0,i.default)("settings",[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),f=(0,i.default)("user-cog",[["path",{d:"M10 15H6a4 4 0 0 0-4 4v2",key:"1nfge6"}],["path",{d:"m14.305 16.53.923-.382",key:"1itpsq"}],["path",{d:"m15.228 13.852-.923-.383",key:"eplpkm"}],["path",{d:"m16.852 12.228-.383-.923",key:"13v3q0"}],["path",{d:"m16.852 17.772-.383.924",key:"1i8mnm"}],["path",{d:"m19.148 12.228.383-.923",key:"1q8j1v"}],["path",{d:"m19.53 18.696-.382-.924",key:"vk1qj3"}],["path",{d:"m20.772 13.852.924-.383",key:"n880s0"}],["path",{d:"m20.772 16.148.924.383",key:"1g6xey"}],["circle",{cx:"18",cy:"15",r:"3",key:"gjjjvw"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]),x=(0,i.default)("megaphone",[["path",{d:"M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",key:"q8bfy3"}],["path",{d:"M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14",key:"1853fq"}],["path",{d:"M8 6v8",key:"15ugcq"}]]);var y=e.i(47580),g=e.i(68862);let b=[{label:"Dashboard",href:"/admin",icon:r.LayoutDashboard,exact:!0},{label:"Pages Content",href:"/admin/pages",icon:s.FileText},{label:"Blog Posts",href:"/admin/blog",icon:n},{label:"Events",href:"/admin/events",icon:l.Calendar},{label:"Leads",href:"/admin/leads",icon:o.Users},{label:"Students",href:"/admin/students",icon:d.GraduationCap},{label:"Course Materials",href:"/admin/materials",icon:c.BookOpen},{label:"Testimonials",href:"/admin/testimonials",icon:u},{label:"Media Library",href:"/admin/media",icon:m.default},{label:"Newsletter",href:"/admin/newsletter",icon:x},{label:"Email Logs",href:"/admin/email-logs",icon:p.Mail},{label:"Site Settings",href:"/admin/settings",icon:h},{label:"Users",href:"/admin/users",icon:f,superAdminOnly:!0}];function v({userName:e,userRole:a}){let r=b.filter(e=>!e.superAdminOnly||"SUPER_ADMIN"===a);return(0,t.jsx)(y.default,{portalName:"Admin Portal",homeHref:"/admin",navItems:r,userName:e,userMeta:(0,g.formatEnumLabel)(a),logoutCallbackUrl:"/admin/login"})}var w=e.i(38792);e.s(["default",0,function({children:e,session:r}){return"/admin/login"===(0,a.usePathname)()?(0,t.jsx)("div",{className:"h-full min-h-0 overflow-y-auto",children:e}):(0,t.jsx)("div",{className:"h-full min-h-0",children:(0,t.jsx)(w.default,{mobileTitle:"Admin Portal",headerUserName:r?.user?.name,headerUserMeta:r?.user?.role?(0,g.formatEnumLabel)(r.user.role):void 0,siteHref:"/",sidebar:r?.user?(0,t.jsx)(v,{userName:r.user.name,userRole:r.user.role}):null,children:e})})}],43454)}]);