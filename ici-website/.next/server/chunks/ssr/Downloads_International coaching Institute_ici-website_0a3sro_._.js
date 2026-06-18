module.exports=[7697,a=>{"use strict";a.s(["portalCardClass",0,"bg-white rounded-2xl shadow-md border border-navy-100","portalCardPadding",0,"p-6 md:p-8","portalEyebrowClass",0,"text-brand-gold-600 text-xs font-semibold uppercase tracking-widest","portalFieldLabelClass",0,"block text-sm font-bold text-brand-navy-900 uppercase tracking-wider","portalInputClass",0,"w-full bg-cream-50 border border-navy-100 rounded-xl px-4 py-3 text-sm text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body","portalLabelClass",0,"block text-xs font-semibold uppercase tracking-wider text-brand-gold-700 mb-1.5","portalMainClass",0,"flex-1 min-w-0 min-h-0 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto overflow-x-hidden overscroll-contain","portalMobileBarClass",0,"lg:hidden shrink-0 flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-brand-navy-900 text-white","portalNavActiveClass",0,"bg-brand-gold-500/20 text-brand-gold-400","portalNavInactiveClass",0,"text-white/80 hover:bg-brand-navy-800 hover:text-white","portalPrimaryBtnClass",0,"inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-brand-navy-900 hover:bg-brand-navy-800 rounded-xl transition-colors disabled:opacity-50","portalSecondaryBtnClass",0,"inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-brand-navy-900 border border-navy-100 bg-white hover:bg-cream-50 rounded-xl transition-colors disabled:opacity-50","portalSectionTitleClass",0,"font-display text-xl text-brand-navy-900","portalShellClass",0,"flex flex-col lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] h-full max-h-full min-h-0 overflow-hidden bg-cream-50 text-brand-navy-900 font-sans","portalSidebarClass",0,"grid grid-rows-[auto_minmax(0,1fr)_auto] h-full w-full min-w-0 overflow-hidden bg-brand-navy-900 text-white","portalTableWrapperClass",0,"overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0"])},46419,a=>{"use strict";let b,c;var d,e=a.i(79369);let f={data:""},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,i=/\n+/g,j=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?j(g,f):f+"{"+j(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=j(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f="-"==f[1]?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=j.p?j.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},k={},l=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+l(a[c]);return b}return a};function m(a){let b,c,d=this||{},e=a.call?a(d.p):a;return((a,b,c,d,e)=>{var f;let m=l(a),n=k[m]||(k[m]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(m));if(!k[n]){let b=m!==a?a:(a=>{let b,c,d=[{}];for(;b=g.exec(a.replace(h,""));)b[4]?d.shift():b[3]?(c=b[3].replace(i," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(i," ").trim();return d[0]})(a);k[n]=j(e?{["@keyframes "+n]:b}:b,c?"":"."+n)}let o=c&&k.g;return c&&(k.g=k[n]),f=k[n],o?b.data=b.data.replace(o,f):-1===b.data.indexOf(f)&&(b.data=d?f+b.data:b.data+f),n})(e.unshift?e.raw?(b=[].slice.call(arguments,1),c=d.p,e.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":j(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):e.reduce((a,b)=>Object.assign(a,b&&b.call?b(d.p):b),{}):e,d.target||f,d.g,d.o,d.k)}m.bind({g:1});let n,o,p,q=m.bind({k:1});function r(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:o&&o()},h),c.o=/go\d/.test(i),h.className=m.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),p&&j[0]&&p(h),n(j,h)}return b?b(e):e}}var s=(a,b)=>"function"==typeof a?a(b):a,t=(b=0,()=>(++b).toString()),u="default",v=(a,b)=>{let{toastLimit:c}=a.settings;switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,c)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:d}=b;return v(a,{type:+!!a.toasts.find(a=>a.id===d.id),toast:d});case 3:let{toastId:e}=b;return{...a,toasts:a.toasts.map(a=>a.id===e||void 0===e?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let f=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+f}))}}},w=[],x={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},y={},z=(a,b=u)=>{y[b]=v(y[b]||x,a),w.forEach(([a,c])=>{a===b&&c(y[b])})},A=a=>Object.keys(y).forEach(b=>z(a,b)),B=(a=u)=>b=>{z(b,a)},C={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=a=>(b,c)=>{let d,e=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||t()}))(b,a,c);return B(e.toasterId||(d=e.id,Object.keys(y).find(a=>y[a].toasts.some(a=>a.id===d))))({type:2,toast:e}),e.id},E=(a,b)=>D("blank")(a,b);E.error=D("error"),E.success=D("success"),E.loading=D("loading"),E.custom=D("custom"),E.dismiss=(a,b)=>{let c={type:3,toastId:a};b?B(b)(c):A(c)},E.dismissAll=a=>E.dismiss(void 0,a),E.remove=(a,b)=>{let c={type:4,toastId:a};b?B(b)(c):A(c)},E.removeAll=a=>E.remove(void 0,a),E.promise=(a,b,c)=>{let d=E.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?s(b.success,a):void 0;return e?E.success(e,{id:d,...c,...null==c?void 0:c.success}):E.dismiss(d),a}).catch(a=>{let e=b.error?s(b.error,a):void 0;e?E.error(e,{id:d,...c,...null==c?void 0:c.error}):E.dismiss(d)}),a};var F=1e3,G=q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,H=q`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,I=q`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,J=r("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${H} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${a=>a.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${I} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,K=q`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,L=r("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${a=>a.secondary||"#e0e0e0"};
  border-right-color: ${a=>a.primary||"#616161"};
  animation: ${K} 1s linear infinite;
`,M=q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,N=q`
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
}`,O=r("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${N} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${a=>a.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,P=r("div")`
  position: absolute;
`,Q=r("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,R=q`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,S=r("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${R} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,T=({toast:a})=>{let{icon:b,type:c,iconTheme:d}=a;return void 0!==b?"string"==typeof b?e.createElement(S,null,b):b:"blank"===c?null:e.createElement(Q,null,e.createElement(L,{...d}),"loading"!==c&&e.createElement(P,null,"error"===c?e.createElement(J,{...d}):e.createElement(O,{...d})))},U=r("div")`
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
`,V=r("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,W=e.memo(({toast:a,position:b,style:d,children:f})=>{let g=a.height?((a,b)=>{let d=a.includes("top")?1:-1,[e,f]=c?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*d}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*d}%,-1px) scale(.6); opacity:0;}
`];return{animation:b?`${q(e)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${q(f)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(a.position||b||"top-center",a.visible):{opacity:0},h=e.createElement(T,{toast:a}),i=e.createElement(V,{...a.ariaProps},s(a.message,a));return e.createElement(U,{className:a.className,style:{...g,...d,...a.style}},"function"==typeof f?f({icon:h,message:i}):e.createElement(e.Fragment,null,h,i))});d=e.createElement,j.p=void 0,n=d,o=void 0,p=void 0;var X=({id:a,className:b,style:c,onHeightUpdate:d,children:f})=>{let g=e.useCallback(b=>{if(b){let c=()=>{d(a,b.getBoundingClientRect().height)};c(),new MutationObserver(c).observe(b,{subtree:!0,childList:!0,characterData:!0})}},[a,d]);return e.createElement("div",{ref:g,className:b,style:c},f)},Y=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;a.s(["Toaster",0,({reverseOrder:a,position:b="top-center",toastOptions:d,gutter:f,children:g,toasterId:h,containerStyle:i,containerClassName:j})=>{let{toasts:k,handlers:l}=((a,b="default")=>{let{toasts:c,pausedAt:d}=((a={},b=u)=>{let[c,d]=(0,e.useState)(y[b]||x),f=(0,e.useRef)(y[b]);(0,e.useEffect)(()=>(f.current!==y[b]&&d(y[b]),w.push([b,d]),()=>{let a=w.findIndex(([a])=>a===b);a>-1&&w.splice(a,1)}),[b]);let g=c.toasts.map(b=>{var c,d,e;return{...a,...a[b.type],...b,removeDelay:b.removeDelay||(null==(c=a[b.type])?void 0:c.removeDelay)||(null==a?void 0:a.removeDelay),duration:b.duration||(null==(d=a[b.type])?void 0:d.duration)||(null==a?void 0:a.duration)||C[b.type],style:{...a.style,...null==(e=a[b.type])?void 0:e.style,...b.style}}});return{...c,toasts:g}})(a,b),f=(0,e.useRef)(new Map).current,g=(0,e.useCallback)((a,b=F)=>{if(f.has(a))return;let c=setTimeout(()=>{f.delete(a),h({type:4,toastId:a})},b);f.set(a,c)},[]);(0,e.useEffect)(()=>{if(d)return;let a=Date.now(),e=c.map(c=>{if(c.duration===1/0)return;let d=(c.duration||0)+c.pauseDuration-(a-c.createdAt);if(d<0){c.visible&&E.dismiss(c.id);return}return setTimeout(()=>E.dismiss(c.id,b),d)});return()=>{e.forEach(a=>a&&clearTimeout(a))}},[c,d,b]);let h=(0,e.useCallback)(B(b),[b]),i=(0,e.useCallback)(()=>{h({type:5,time:Date.now()})},[h]),j=(0,e.useCallback)((a,b)=>{h({type:1,toast:{id:a,height:b}})},[h]),k=(0,e.useCallback)(()=>{d&&h({type:6,time:Date.now()})},[d,h]),l=(0,e.useCallback)((a,b)=>{let{reverseOrder:d=!1,gutter:e=8,defaultPosition:f}=b||{},g=c.filter(b=>(b.position||f)===(a.position||f)&&b.height),h=g.findIndex(b=>b.id===a.id),i=g.filter((a,b)=>b<h&&a.visible).length;return g.filter(a=>a.visible).slice(...d?[i+1]:[0,i]).reduce((a,b)=>a+(b.height||0)+e,0)},[c]);return(0,e.useEffect)(()=>{c.forEach(a=>{if(a.dismissed)g(a.id,a.removeDelay);else{let b=f.get(a.id);b&&(clearTimeout(b),f.delete(a.id))}})},[c,g]),{toasts:c,handlers:{updateHeight:j,startPause:i,endPause:k,calculateOffset:l}}})(d,h);return e.createElement("div",{"data-rht-toaster":h||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:j,onMouseEnter:l.startPause,onMouseLeave:l.endPause},k.map(d=>{let h,i,j=d.position||b,k=l.calculateOffset(d,{reverseOrder:a,gutter:f,defaultPosition:b}),m=(h=j.includes("top"),i=j.includes("center")?{justifyContent:"center"}:j.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:c?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${k*(h?1:-1)}px)`,...h?{top:0}:{bottom:0},...i});return e.createElement(X,{id:d.id,key:d.id,onHeightUpdate:l.updateHeight,className:d.visible?Y:"",style:m},"custom"===d.type?s(d.message,d):g?g(d):e.createElement(W,{toast:d,position:j}))}))},"default",0,E],46419)},35420,a=>{"use strict";let b=(0,a.i(14613).default)("book-open",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);a.s(["BookOpen",0,b],35420)},49711,a=>{"use strict";let b=(0,a.i(14613).default)("graduation-cap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]);a.s(["GraduationCap",0,b],49711)},76033,a=>{"use strict";let b=(0,a.i(14613).default)("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);a.s(["User",0,b],76033)},97956,28706,a=>{"use strict";var b=a.i(14613);let c=(0,b.default)("layout-dashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);a.s(["LayoutDashboard",0,c],97956);var d=a.i(76679),e=a.i(15994),f=a.i(59382),g=a.i(74909);let h=(0,b.default)("log-out",[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]);var i=a.i(2341),j=a.i(7697);a.s(["default",0,function({portalName:a,homeHref:b,navItems:c,userName:k,userMeta:l,logoutCallbackUrl:m}){let n=(0,f.usePathname)();return(0,d.jsxs)("aside",{className:j.portalSidebarClass,children:[(0,d.jsx)("div",{className:"row-start-1 shrink-0 p-6 border-b border-white/10 min-w-0",children:(0,d.jsxs)(e.default,{href:b,className:"block group min-w-0",children:[(0,d.jsx)("p",{className:"text-brand-gold-400 text-xs font-semibold uppercase tracking-widest mb-1.5 group-hover:text-brand-gold-300 transition-colors truncate",children:"International Coaching Institute"}),(0,d.jsx)("h1",{className:"font-display text-xl text-white tracking-wide truncate",children:a})]})}),(0,d.jsx)("nav",{className:"row-start-2 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden overscroll-contain px-3 mt-4",children:(0,d.jsx)("ul",{className:"space-y-1",children:c.map(a=>{var b;let c=(b=a.href,a.exact?n===b:n===b||n.startsWith(`${b}/`)),f=a.icon,g=(0,i.default)("flex items-center gap-3 min-w-0 py-2.5 px-3 rounded-lg text-sm font-medium transition",c?j.portalNavActiveClass:j.portalNavInactiveClass);return(0,d.jsx)("li",{className:"min-w-0",children:a.external?(0,d.jsxs)("a",{href:a.href,target:"_blank",rel:"noopener noreferrer",className:g,children:[(0,d.jsx)(f,{size:18,className:(0,i.default)("shrink-0",c?"text-brand-gold-400":"text-white/60")}),(0,d.jsx)("span",{className:"truncate",children:a.label})]}):(0,d.jsxs)(e.default,{href:a.href,className:g,children:[(0,d.jsx)(f,{size:18,className:(0,i.default)("shrink-0",c?"text-brand-gold-400":"text-white/60")}),(0,d.jsx)("span",{className:"truncate",children:a.label})]})},a.href)})})}),(0,d.jsxs)("div",{className:"row-start-3 shrink-0 min-w-0 px-3 py-4 border-t border-white/10 overflow-hidden",children:[k&&(0,d.jsxs)("div",{className:"mb-3 px-3 min-w-0",children:[(0,d.jsx)("p",{className:"text-sm text-white truncate font-medium",children:k}),l&&(0,d.jsx)("p",{className:"text-xs text-white/50 truncate mt-0.5",children:l})]}),(0,d.jsxs)("button",{type:"button",onClick:()=>(0,g.signOut)({callbackUrl:m}),className:(0,i.default)("flex items-center gap-2 w-full min-w-0 py-2.5 px-3 rounded-lg text-sm font-medium transition",j.portalNavInactiveClass),children:[(0,d.jsx)(h,{size:16,className:"shrink-0"}),(0,d.jsx)("span",{className:"truncate",children:"Log out"})]})]})]})}],28706)},26559,a=>{"use strict";var b=a.i(76679),c=a.i(79369),d=a.i(2341),e=a.i(43953),f=a.i(45030),g=a.i(7697);a.s(["default",0,function({sidebar:a,children:h,className:i,mobileTitle:j="Menu"}){let[k,l]=(0,c.useState)(!1);return(0,c.useEffect)(()=>{if(!k)return;let a=a=>{"Escape"===a.key&&l(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",a),()=>{document.body.style.overflow="",window.removeEventListener("keydown",a)}},[k]),(0,b.jsxs)("div",{className:(0,d.default)(g.portalShellClass,i),children:[(0,b.jsxs)("div",{className:g.portalMobileBarClass,children:[(0,b.jsx)("button",{type:"button",onClick:()=>l(!0),className:"p-2 rounded-lg hover:bg-white/10 transition-colors","aria-label":"Open navigation menu",children:(0,b.jsx)(e.Menu,{size:22})}),(0,b.jsx)("span",{className:"text-sm font-semibold tracking-wide truncate",children:j}),(0,b.jsx)("div",{className:"w-10","aria-hidden":!0})]}),k&&(0,b.jsx)("button",{type:"button",className:"fixed inset-0 z-40 bg-black/50 lg:hidden","aria-label":"Close navigation menu",onClick:()=>l(!1)}),(0,b.jsx)("div",{className:(0,d.default)("fixed inset-y-0 left-0 z-50 w-[min(16rem,88vw)] max-w-full transform transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-auto lg:translate-x-0 lg:transform-none",k?"translate-x-0":"-translate-x-full lg:translate-x-0"),children:(0,b.jsxs)("div",{className:"relative h-full lg:h-auto",children:[(0,b.jsx)("button",{type:"button",onClick:()=>l(!1),className:"lg:hidden absolute top-3 right-3 z-10 p-2 rounded-lg bg-brand-navy-800 text-white hover:bg-brand-navy-700","aria-label":"Close menu",children:(0,b.jsx)(f.X,{size:18})}),(0,b.jsx)("div",{className:"h-full",onClick:a=>{a.target.closest("a, button")&&l(!1)},children:a})]})}),(0,b.jsx)("main",{className:g.portalMainClass,children:h})]})}])},69271,a=>{"use strict";var b=a.i(76679),c=a.i(46419);a.s(["default",0,function({children:a}){return(0,b.jsxs)(b.Fragment,{children:[a,(0,b.jsx)(c.Toaster,{position:"top-right",toastOptions:{className:"font-sans text-sm",style:{background:"#0A1F44",color:"#fff"},success:{iconTheme:{primary:"#C9A84C",secondary:"#0A1F44"}},error:{iconTheme:{primary:"#ef4444",secondary:"#0A1F44"}}}})]})}])},33701,a=>{"use strict";var b=a.i(76679),c=a.i(74909),d=a.i(35420),e=a.i(49711),f=a.i(97956);let g=(0,a.i(14613).default)("message-circle",[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]]);var h=a.i(76033),i=a.i(28706);let j=[{label:"Dashboard",href:"/dashboard",icon:f.LayoutDashboard,exact:!0},{label:"My Materials",href:"/dashboard/materials",icon:d.BookOpen},{label:"My Profile",href:"/dashboard/profile",icon:h.User},{label:"My Credential",href:"/dashboard/credential",icon:e.GraduationCap},{label:"Contact Support",href:"/contact",icon:g}];a.s(["default",0,function(){let{data:a}=(0,c.useSession)();return(0,b.jsx)(i.default,{portalName:"Student Portal",homeHref:"/dashboard",navItems:j,userName:a?.user?.name,userMeta:a?.user?.email??void 0,logoutCallbackUrl:"/login"})}],33701)}];

//# sourceMappingURL=Downloads_International%20coaching%20Institute_ici-website_0a3sro_._.js.map