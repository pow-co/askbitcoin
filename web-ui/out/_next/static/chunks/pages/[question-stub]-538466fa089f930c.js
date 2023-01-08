(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[490],{87109:function(e,t,n){"use strict";n.d(t,{Z:function(){return b}});var r=n(63366),o=n(87462),s=n(67294),i=n(86010),a=n(27192),c=n(98216),l=n(15861),u=n(47167),p=n(74423),d=n(90948),h=n(28979);function f(e){return(0,h.Z)("MuiInputAdornment",e)}var x,m=(0,n(76087).Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),v=n(33616),y=n(85893);const j=["children","className","component","disablePointerEvents","disableTypography","position","variant"],g=(0,d.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`position${(0,c.Z)(n.position)}`],!0===n.disablePointerEvents&&t.disablePointerEvents,t[n.variant]]}})((({theme:e,ownerState:t})=>(0,o.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:e.palette.action.active},"filled"===t.variant&&{[`&.${m.positionStart}&:not(.${m.hiddenLabel})`]:{marginTop:16}},"start"===t.position&&{marginRight:8},"end"===t.position&&{marginLeft:8},!0===t.disablePointerEvents&&{pointerEvents:"none"})));var b=s.forwardRef((function(e,t){const n=(0,v.Z)({props:e,name:"MuiInputAdornment"}),{children:d,className:h,component:m="div",disablePointerEvents:b=!1,disableTypography:w=!1,position:Z,variant:P}=n,k=(0,r.Z)(n,j),_=(0,p.Z)()||{};let O=P;P&&_.variant,_&&!O&&(O=_.variant);const S=(0,o.Z)({},n,{hiddenLabel:_.hiddenLabel,size:_.size,disablePointerEvents:b,position:Z,variant:O}),C=(e=>{const{classes:t,disablePointerEvents:n,hiddenLabel:r,position:o,size:s,variant:i}=e,l={root:["root",n&&"disablePointerEvents",o&&`position${(0,c.Z)(o)}`,i,r&&"hiddenLabel",s&&`size${(0,c.Z)(s)}`]};return(0,a.Z)(l,f,t)})(S);return(0,y.jsx)(u.Z.Provider,{value:null,children:(0,y.jsx)(g,(0,o.Z)({as:m,ownerState:S,className:(0,i.Z)(C.root,h),ref:t},k,{children:"string"!==typeof d||w?(0,y.jsxs)(s.Fragment,{children:["start"===Z?x||(x=(0,y.jsx)("span",{className:"notranslate",children:"\u200b"})):null,d]}):(0,y.jsx)(l.Z,{color:"text.secondary",children:d})}))})}))},26729:function(e){"use strict";var t=Object.prototype.hasOwnProperty,n="~";function r(){}function o(e,t,n){this.fn=e,this.context=t,this.once=n||!1}function s(e,t,r,s,i){if("function"!==typeof r)throw new TypeError("The listener must be a function");var a=new o(r,s||e,i),c=n?n+t:t;return e._events[c]?e._events[c].fn?e._events[c]=[e._events[c],a]:e._events[c].push(a):(e._events[c]=a,e._eventsCount++),e}function i(e,t){0===--e._eventsCount?e._events=new r:delete e._events[t]}function a(){this._events=new r,this._eventsCount=0}Object.create&&(r.prototype=Object.create(null),(new r).__proto__||(n=!1)),a.prototype.eventNames=function(){var e,r,o=[];if(0===this._eventsCount)return o;for(r in e=this._events)t.call(e,r)&&o.push(n?r.slice(1):r);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(e)):o},a.prototype.listeners=function(e){var t=n?n+e:e,r=this._events[t];if(!r)return[];if(r.fn)return[r.fn];for(var o=0,s=r.length,i=new Array(s);o<s;o++)i[o]=r[o].fn;return i},a.prototype.listenerCount=function(e){var t=n?n+e:e,r=this._events[t];return r?r.fn?1:r.length:0},a.prototype.emit=function(e,t,r,o,s,i){var a=n?n+e:e;if(!this._events[a])return!1;var c,l,u=this._events[a],p=arguments.length;if(u.fn){switch(u.once&&this.removeListener(e,u.fn,void 0,!0),p){case 1:return u.fn.call(u.context),!0;case 2:return u.fn.call(u.context,t),!0;case 3:return u.fn.call(u.context,t,r),!0;case 4:return u.fn.call(u.context,t,r,o),!0;case 5:return u.fn.call(u.context,t,r,o,s),!0;case 6:return u.fn.call(u.context,t,r,o,s,i),!0}for(l=1,c=new Array(p-1);l<p;l++)c[l-1]=arguments[l];u.fn.apply(u.context,c)}else{var d,h=u.length;for(l=0;l<h;l++)switch(u[l].once&&this.removeListener(e,u[l].fn,void 0,!0),p){case 1:u[l].fn.call(u[l].context);break;case 2:u[l].fn.call(u[l].context,t);break;case 3:u[l].fn.call(u[l].context,t,r);break;case 4:u[l].fn.call(u[l].context,t,r,o);break;default:if(!c)for(d=1,c=new Array(p-1);d<p;d++)c[d-1]=arguments[d];u[l].fn.apply(u[l].context,c)}}return!0},a.prototype.on=function(e,t,n){return s(this,e,t,n,!1)},a.prototype.once=function(e,t,n){return s(this,e,t,n,!0)},a.prototype.removeListener=function(e,t,r,o){var s=n?n+e:e;if(!this._events[s])return this;if(!t)return i(this,s),this;var a=this._events[s];if(a.fn)a.fn!==t||o&&!a.once||r&&a.context!==r||i(this,s);else{for(var c=0,l=[],u=a.length;c<u;c++)(a[c].fn!==t||o&&!a[c].once||r&&a[c].context!==r)&&l.push(a[c]);l.length?this._events[s]=1===l.length?l[0]:l:i(this,s)}return this},a.prototype.removeAllListeners=function(e){var t;return e?(t=n?n+e:e,this._events[t]&&i(this,t)):(this._events=new r,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=n,a.EventEmitter=a,e.exports=a},23168:function(e,t,n){"use strict";n(50029);var r=n(72640),o=n(59499),s=(n(87794),n(67294)),i=(n(41664),n(2734)),a=n(98396),c=n(86886),l=n(15861),u=n(47739),p=n(35294),d=n(18972),h=n(74231),f=(n(73955),n(87536)),x=n(95496),m=n(38456),v=n.n(m),y=n(10043),j=n.n(y),g=n(73400),b=(n(71978),n(32107)),w=(n(62055),n(94552),n(74202)),Z=n(65444),P=n(61320),k=n.n(P),_=n(52838),O=n(82864),S=n(20132),C=n(11163),A=(n(30120),n(17550),n(84059),n(85893));function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){(0,o.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var q=h.Ry().shape({name:h.Z_().required("Comment Field is Required")});t.Z=function(e){e.commentAdd,e.handleCommentLikes,e.handleReplayLikes;var t=e.post,n=(e.replyAdd,e.answer),o=(0,i.Z)(),h=(0,C.useRouter)(),m=t.tx_id,y=t.content,P=t.author,E=t.difficulty,I=(t.answers,t.created_at,t.timestamp),L=s.useState(!1),z=(0,r.Z)(L,2),T=z[0],D=z[1],M=((0,g.Ds)().enqueueSnackbar,(0,S.Z)().borderRadius,(0,a.Z)(o.breakpoints.down("md")),s.useState(null)),N=(0,r.Z)(M,2),W=N[0],U=N[1],F=function(e){D(!1),U(!1)},V=s.useState(null),B=(0,r.Z)(V,2),Q=(B[0],B[1],(0,f.cI)({resolver:(0,x.X)(q)}));Q.handleSubmit,Q.formState.errors,Q.reset;return console.log("__TIMESTAMP",I),(0,A.jsx)(b.Z,{onClick:function(e){e.stopPropagation(),h.push("/".concat(n?"answers":"questions","/").concat(m))},children:(0,A.jsxs)(c.ZP,{container:!0,spacing:1,children:[(0,A.jsx)(c.ZP,{item:!0,xs:12,children:(0,A.jsxs)(c.ZP,{container:!0,wrap:"nowrap",alignItems:"center",spacing:1,children:[(0,A.jsx)(c.ZP,{item:!0,children:(null===P||void 0===P?void 0:P.email)&&(0,A.jsx)(w.Z,{alt:"User 1",src:null!==P&&void 0!==P&&P.email?"https://bitpic.network/u/".concat(P.email):"https://bitpic.network/u/unknown"})}),(0,A.jsx)(c.ZP,{item:!0,xs:!0,zeroMinWidth:!0,children:(0,A.jsxs)(c.ZP,{container:!0,alignItems:"center",spacing:1,children:[(0,A.jsx)(c.ZP,{item:!0,children:P&&(0,A.jsx)(l.Z,{align:"left",variant:"h5",component:"div",children:P?P.name:"Anonymous"})}),(0,A.jsx)(c.ZP,{item:!0,children:(0,A.jsx)(l.Z,{align:"left",variant:"caption",children:(0,A.jsx)("a",{target:"_blank",rel:"noopener",href:"https://whatsonchain.com/tx/".concat(m),children:k()(I).format("MMM Do YYYY, h:mm:ss a")})})})]})}),(0,A.jsxs)(c.ZP,{item:!0,children:[(0,A.jsx)(u.Z,{sx:{borderRadius:"12px"},onClick:function(e){e.stopPropagation()},children:(0,A.jsx)(w.Z,{variant:"rounded",sx:R(R(R({},o.typography.commonAvatar),o.typography.smallAvatar),{},{background:"dark"===o.palette.mode?o.palette.dark.main:o.palette.secondary.light,color:"dark"===o.palette.mode?o.palette.dark.light:o.palette.secondary.dark,zIndex:1,transition:"all .2s ease-in-out",'&[aria-controls="menu-list-grow"],&:hover':{background:o.palette.secondary.main,color:o.palette.secondary.light}}),"aria-controls":"menu-post","aria-haspopup":"true",children:(0,A.jsx)(O.Z,{fontSize:"inherit"})})}),(0,A.jsx)(p.Z,{id:"menu-post",anchorEl:W,keepMounted:!0,open:Boolean(W),onClose:F,variant:"selectedMenu",anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:(0,A.jsx)(d.Z,{onClick:function(e){return e.stopPropagation(),D(!0),!1},children:"View QR Code"})})]})]})}),(0,A.jsxs)(c.ZP,{item:!0,xs:12,sx:{"& > p":R(R({},o.typography.body1),{},{mb:0})},children:[(0,A.jsx)(v(),{remarkPlugins:[j()],children:y}),(0,A.jsx)("br",{}),(0,A.jsx)(Z.p,{tx_id:m,currency:"USD",value:.05,open:T,onClose:F})]}),(0,A.jsxs)(c.ZP,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"space-arround",fullWidth:!0,sx:{mt:0,height:69,color:"dark"===o.palette.mode?"grey.700":"grey.800"},children:[(0,A.jsx)(c.ZP,{xs:3,md:4,item:!0,sx:{h:"100%",w:"100%",display:"flex",justifyContent:"center"}}),(0,A.jsx)(c.ZP,{xs:6,md:4,justifyContent:"center",item:!0,sx:{h:"100%",w:"100%",display:"flex",justifyContent:"center"},children:(0,A.jsx)(_.Z,{txid:m,content:y,difficulty:E})})]})]})})}},47045:function(e,t,n){"use strict";n(50029);var r=n(72640),o=n(59499),s=(n(87794),n(67294)),i=(n(41664),n(2734)),a=n(98396),c=n(86886),l=n(15861),u=n(47739),p=n(35294),d=n(18972),h=n(83321),f=n(74231),x=(n(73955),n(87536)),m=n(95496),v=n(38456),y=n.n(v),j=n(10043),g=n.n(j),b=n(73400),w=(n(71978),n(32107)),Z=(n(62055),n(94552),n(74202)),P=n(65444),k=n(52838),_=n(82864),O=n(69418),S=n(20132),C=n(11163),A=n(30120),E=(n(17550),n(84059),n(85893));function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?R(Object(n),!0).forEach((function(t){(0,o.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var I=f.Ry().shape({name:f.Z_().required("Comment Field is Required")});t.Z=function(e){e.commentAdd,e.handleCommentLikes,e.handleReplayLikes;var t=e.post,n=(e.replyAdd,e.answer),o=(0,i.Z)(),f=(0,C.useRouter)(),v=t.tx_id,j=t.content,R=t.author,L=t.difficulty,z=t.answers,T=(t.created_at,t.timestamp),D=s.useState(!1),M=(0,r.Z)(D,2),N=M[0],W=M[1],U=((0,b.Ds)().enqueueSnackbar,(0,S.Z)().borderRadius,(0,a.Z)(o.breakpoints.down("md")),s.useState(null)),F=(0,r.Z)(U,2),V=F[0],B=F[1],Q=function(e){W(!1),B(!1)},X=s.useState(null),$=(0,r.Z)(X,2),Y=($[0],$[1],function(e){e.stopPropagation()}),H=(0,x.cI)({resolver:(0,m.X)(I)});H.handleSubmit,H.formState.errors,H.reset;return(0,E.jsx)(w.Z,{onClick:function(e){e.stopPropagation(),f.push("/".concat(n?"answers":"questions","/").concat(v))},children:(0,E.jsxs)(c.ZP,{container:!0,spacing:1,children:[(0,E.jsx)(c.ZP,{item:!0,xs:12,children:(0,E.jsxs)(c.ZP,{container:!0,wrap:"nowrap",alignItems:"center",spacing:1,children:[(0,E.jsx)(c.ZP,{item:!0,children:(0,E.jsx)(Z.Z,{alt:"User 1",src:null!==R&&void 0!==R&&R.email?"https://bitpic.network/u/".concat(R.email):"https://bitpic.network/u/unknown"})}),(0,E.jsx)(c.ZP,{item:!0,xs:!0,zeroMinWidth:!0,children:(0,E.jsxs)(c.ZP,{container:!0,alignItems:"center",spacing:1,children:[(0,E.jsx)(c.ZP,{item:!0,children:(0,E.jsx)(l.Z,{align:"left",variant:"h5",component:"div",children:R?R.name:"Anonymous"})}),(0,E.jsx)(c.ZP,{item:!0,children:(0,E.jsx)(l.Z,{align:"left",variant:"caption",children:(0,E.jsx)("a",{target:"_blank",rel:"noopener",href:"https://whatsonchain.com/tx/".concat(v),children:A.ou.fromSeconds(parseInt(T)).toRelative().toString()})})})]})}),(0,E.jsxs)(c.ZP,{item:!0,children:[(0,E.jsx)(u.Z,{sx:{borderRadius:"12px"},onClick:function(e){e.stopPropagation(),B(e.currentTarget)},children:(0,E.jsx)(Z.Z,{variant:"rounded",sx:q(q(q({},o.typography.commonAvatar),o.typography.smallAvatar),{},{background:"dark"===o.palette.mode?o.palette.dark.main:o.palette.secondary.light,color:"dark"===o.palette.mode?o.palette.dark.light:o.palette.secondary.dark,zIndex:1,transition:"all .2s ease-in-out",'&[aria-controls="menu-list-grow"],&:hover':{background:o.palette.secondary.main,color:o.palette.secondary.light}}),"aria-controls":"menu-post","aria-haspopup":"true",children:(0,E.jsx)(_.Z,{fontSize:"inherit"})})}),(0,E.jsx)(p.Z,{id:"menu-post",anchorEl:V,keepMounted:!0,open:Boolean(V),onClose:Q,variant:"selectedMenu",anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:(0,E.jsx)(d.Z,{onClick:function(e){return e.stopPropagation(),W(!0),!1},children:"View QR Code"})})]})]})}),(0,E.jsxs)(c.ZP,{item:!0,xs:12,sx:{"& > p":q(q({},o.typography.body1),{},{mb:0})},children:[(0,E.jsx)(y(),{remarkPlugins:[g()],children:j}),(0,E.jsx)("br",{}),(0,E.jsx)(P.p,{tx_id:v,currency:"USD",value:.05,open:N,onClose:Q})]}),(0,E.jsxs)(c.ZP,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"space-arround",fullWidth:!0,sx:{mt:0,height:69,color:"dark"===o.palette.mode?"grey.700":"grey.800"},children:[(0,E.jsx)(c.ZP,{xs:3,md:4,item:!0,sx:{h:"100%",w:"100%",display:"flex",justifyContent:"center"}}),(0,E.jsx)(c.ZP,{xs:2,md:4,item:!0,sx:{h:"100%",w:"100%",display:"flex",justifyContent:"center"},children:(0,E.jsx)(h.Z,{onClick:Y,variant:"text",color:"inherit",startIcon:(0,E.jsx)(O.Z,{color:"secondary"}),children:z?z.length:0})}),(0,E.jsx)(c.ZP,{xs:6,md:4,justifyContent:"center",item:!0,sx:{h:"100%",w:"100%",display:"flex",justifyContent:"center"},children:(0,E.jsx)(k.Z,{txid:v,content:j,difficulty:L})})]})]})})}},5268:function(e,t,n){"use strict";n.r(t);var r=n(50029),o=n(87794),s=n.n(o),i=n(67294),a=n(83321),c=n(86886),l=n(15861),u=n(26447),p=n(87357),d=(n(41664),n(9008)),h=n(32107),f=(n(47045),n(23168)),x=n(61507),m=n(862),v=n(32152),y=n(30698),j=n(49684),g=n(11163),b=n(10612),w=n(73400),Z=n(4174),P=n(85893),k=function(){var e=(0,i.useState)(""),t=e[0],n=e[1];window.postAnswer=q;var o=(0,j.Z)(),k=(o.user,o.wallet),_=o.isLoggedIn,O=(0,g.useRouter)().query,S=(0,w.Ds)().enqueueSnackbar;console.log("question by stub",O);(0,Z.h)("questions.by-stub.".concat(O["question-stub"],".answer"),(function(e){console.log("on answer",e),S("new answer: ".concat(e.content))}));var C=(0,y.Ek)("/question-by-stub/".concat(O["question-stub"]),t),A=C.data,E=C.error,R=C.refresh;C.loading;function q(e,t){return I.apply(this,arguments)}function I(){return(I=(0,r.Z)(s().mark((function e(t,n){var o,i,c,l;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=JSON.stringify({question_tx_id:t,content:n}),_){e.next=4;break}return S("Please, Log In",{anchorOrigin:{vertical:"top",horizontal:"center"},variant:"error"}),e.abrupt("return");case 4:e.prev=4,e.t0=k,e.next="relayx"===e.t0?8:"twetch"===e.t0?18:"handcash"===e.t0?19:20;break;case 8:return e.next=10,relayone.send({opReturn:["onchain","1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN","answer",o],currency:"USD",amount:.0218,to:"1MqPZFc31jUetZ5hxVtG4tijJSugAcSZCQ"});case 10:return i=e.sent,i.amount,i.currency,i.identity,i.paymail,c=i.rawTx,i.satoshis,l=i.txid,console.log(i),S("Answer Posted",{anchorOrigin:{vertical:"top",horizontal:"center"},variant:"success",action:function(){return(0,P.jsx)(a.Z,{variant:"text",href:"https://whatsonchain.com/tx/".concat(l),children:"View"})}}),(0,r.Z)(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.ZP.get("https://askbitcoin.ai/api/v1/answers/".concat(l));case 3:R(),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error("api.answers.show.error",e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))(),(0,r.Z)(s().mark((function e(){var t,n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.ZP.post("https://askbitcoin.ai/api/v1/transactions",{transaction:c});case 3:t=e.sent,n=t.data,console.log("postTransactionResponse",n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error("postTransactionResponse",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))(),(0,r.Z)(s().mark((function e(){var t,n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.ZP.post("https://askbitcoin.ai/api/v1/answers",{transaction:c});case 3:t=e.sent,n=t.data,console.log("postTransactionResponse",n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error("postTransactionResponse",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))(),e.abrupt("break",22);case 18:case 19:return e.abrupt("break",22);case 20:return console.error("No wallet selected"),e.abrupt("return");case 22:e.next=27;break;case 24:e.prev=24,e.t1=e.catch(4),S("Error Posting Answer: ".concat(e.t1.message),{anchorOrigin:{vertical:"top",horizontal:"center"},variant:"error"});case 27:case"end":return e.stop()}}),e,null,[[4,24]])})))).apply(this,arguments)}var L=[];if(E)return console.error("ERROR",E),(0,P.jsx)("p",{children:"Error"});if(!A)return(0,P.jsx)("p",{children:(0,P.jsx)(b.Z,{id:"loading"})});var z=A.question,T=z.answers;return T=(T=T.map((function(e){return Object.assign(e,{difficulty:e.boostpow_proofs.reduce((function(e,t){return e+t.difficulty}),0)})}))).sort((function(e,t){return e.difficulty>t.difficulty?1:-1})),(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(d.default,{children:[(0,P.jsx)("meta",{name:"title",content:"Ask Bitcoin - ".concat(z.content)},"title"),(0,P.jsx)("meta",{property:"og:locale",content:"en_US"}),(0,P.jsx)("meta",{property:"og:type",content:"website"}),(0,P.jsx)("meta",{property:"og:url",content:"https://askbitcoin.ai/".concat(z.url_stub)},"og_url"),(0,P.jsx)("meta",{property:"og:title",content:"Ask Bitcoin - ".concat(z.content)},"og_title"),(0,P.jsx)("meta",{property:"og:description",content:"Top Answers Ranked by Proof of Work to the Question ".concat(z.content)}),(0,P.jsx)("meta",{property:"twitter:url",content:"https://askbitcoin.ai/".concat(z.url_stub)},"twitter_url"),(0,P.jsx)("meta",{property:"twitter:title",content:"Ask Bitcoin - ".concat(z.content)},"twitter_title"),(0,P.jsx)("meta",{property:"twitter:description",content:"Top Answers Ranked by Proof of Work to the Question ".concat(z.content)},"twitter_description")]}),(0,P.jsxs)(h.Z,{children:[(0,P.jsx)(x.Z,{post:z}),(0,P.jsx)(m.Z,{question:z.tx_id,submit:q,placeholder:"Add your answer"}),(0,P.jsxs)(c.ZP,{container:!0,sx:{pb:"16px"},spacing:1,children:[(0,P.jsx)(c.ZP,{item:!0,xs:6,children:(0,P.jsx)(l.Z,{align:"right",variant:"h2",children:(0,P.jsx)(b.Z,{id:"answers-pow"})})}),(0,P.jsx)(c.ZP,{item:!0,xs:6,children:(0,P.jsx)(v.Z,{handleFilter:function(e){n(e.query)}})})]}),T.map((function(e){return(0,P.jsx)(f.Z,{answer:!0,post:e},e.tx_id)}))]}),(0,P.jsx)(h.Z,{children:(0,P.jsxs)(u.Z,{direction:"column",justifyContent:"flex-end",children:[(0,P.jsx)(p.Z,{sx:{padding:"2em"},children:(0,P.jsx)(l.Z,{sx:{p:"16px"},align:"center",variant:"h2",children:"Recent Answers"})}),(null===L||void 0===L?void 0:L.answers)&&L.answers.map((function(e){return(0,P.jsx)(f.Z,{post:e},e.id)}))]})})]})};k.Layout="authGuard",t.default=k},8582:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[question-stub]",function(){return n(5268)}])}},function(e){e.O(0,[231,810,283,26,774,888,179],(function(){return t=8582,e(e.s=t);var t}));var t=e.O();_N_E=t}]);