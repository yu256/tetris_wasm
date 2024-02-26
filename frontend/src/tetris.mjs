
var Module = (() => {
  var _scriptDir = import.meta.url;
  
  return (
async function(moduleArg = {}) {

var m=moduleArg,aa,q;m.ready=new Promise((a,b)=>{aa=a;q=b});var ba=Object.assign({},m),ca="object"==typeof window,w="function"==typeof importScripts,da="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,x="",ea,fa,ha;
if(da){const {createRequire:a}=await import("module");var require=a(import.meta.url),fs=require("fs"),ia=require("path");w?x=ia.dirname(x)+"/":x=require("url").fileURLToPath(new URL("./",import.meta.url));ea=(b,c)=>{b=ja(b)?new URL(b):ia.normalize(b);return fs.readFileSync(b,c?void 0:"utf8")};ha=b=>{b=ea(b,!0);b.buffer||(b=new Uint8Array(b));return b};fa=(b,c,d,e=!0)=>{b=ja(b)?new URL(b):ia.normalize(b);fs.readFile(b,e?void 0:"utf8",(g,f)=>{g?d(g):c(e?f.buffer:f)})};
process.argv.slice(2)}else if(ca||w)w?x=self.location.href:"undefined"!=typeof document&&document.currentScript&&(x=document.currentScript.src),_scriptDir&&(x=_scriptDir),x.startsWith("blob:")?x="":x=x.substr(0,x.replace(/[?#].*/,"").lastIndexOf("/")+1),ea=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.send(null);return b.responseText},w&&(ha=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)}),fa=(a,b,c)=>{var d=new XMLHttpRequest;
d.open("GET",a,!0);d.responseType="arraybuffer";d.onload=()=>{200==d.status||0==d.status&&d.response?b(d.response):c()};d.onerror=c;d.send(null)};m.print||console.log.bind(console);var y=m.printErr||console.error.bind(console);Object.assign(m,ba);ba=null;var z;m.wasmBinary&&(z=m.wasmBinary);"object"!=typeof WebAssembly&&ka("no native wasm support detected");var la,ma=!1,na,B,C,oa,D,E,pa,qa;
function ra(){var a=la.buffer;m.HEAP8=na=new Int8Array(a);m.HEAP16=C=new Int16Array(a);m.HEAPU8=B=new Uint8Array(a);m.HEAPU16=oa=new Uint16Array(a);m.HEAP32=D=new Int32Array(a);m.HEAPU32=E=new Uint32Array(a);m.HEAPF32=pa=new Float32Array(a);m.HEAPF64=qa=new Float64Array(a)}var sa=[],ta=[],ua=[];function va(){var a=m.preRun.shift();sa.unshift(a)}var G=0,wa=null,H=null;
function ka(a){m.onAbort?.(a);a="Aborted("+a+")";y(a);ma=!0;a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");q(a);throw a;}var xa=a=>a.startsWith("data:application/octet-stream;base64,"),ja=a=>a.startsWith("file://"),I;if(m.locateFile){if(I="tetris.wasm",!xa(I)){var ya=I;I=m.locateFile?m.locateFile(ya,x):x+ya}}else I=(new URL("tetris.wasm",import.meta.url)).href;
function za(a){if(a==I&&z)return new Uint8Array(z);if(ha)return ha(a);throw"both async and sync fetching of the wasm failed";}function Aa(a){if(!z&&(ca||w)){if("function"==typeof fetch&&!ja(a))return fetch(a,{credentials:"same-origin"}).then(b=>{if(!b.ok)throw`failed to load wasm binary file at '${a}'`;return b.arrayBuffer()}).catch(()=>za(a));if(fa)return new Promise((b,c)=>{fa(a,d=>b(new Uint8Array(d)),c)})}return Promise.resolve().then(()=>za(a))}
function Ba(a,b,c){return Aa(a).then(d=>WebAssembly.instantiate(d,b)).then(d=>d).then(c,d=>{y(`failed to asynchronously prepare wasm: ${d}`);ka(d)})}function Ca(a,b){var c=I;return z||"function"!=typeof WebAssembly.instantiateStreaming||xa(c)||ja(c)||da||"function"!=typeof fetch?Ba(c,a,b):fetch(c,{credentials:"same-origin"}).then(d=>WebAssembly.instantiateStreaming(d,a).then(b,function(e){y(`wasm streaming compile failed: ${e}`);y("falling back to ArrayBuffer instantiation");return Ba(c,a,b)}))}
var Da=a=>{for(;0<a.length;)a.shift()(m)};class Ea{constructor(a){this.H=a-24}}var Fa=0,Ga=0,Ha={},Ia=a=>{for(;a.length;){var b=a.pop();a.pop()(b)}};function Ja(a){return this.fromWireType(D[a>>2])}
var J={},K={},Ka={},L,N=(a,b,c)=>{function d(h){h=c(h);if(h.length!==a.length)throw new L("Mismatched type converter count");for(var k=0;k<a.length;++k)M(a[k],h[k])}a.forEach(function(h){Ka[h]=b});var e=Array(b.length),g=[],f=0;b.forEach((h,k)=>{K.hasOwnProperty(h)?e[k]=K[h]:(g.push(h),J.hasOwnProperty(h)||(J[h]=[]),J[h].push(()=>{e[k]=K[h];++f;f===g.length&&d(e)}))});0===g.length&&d(e)},La,O=a=>{for(var b="";B[a];)b+=La[B[a++]];return b},P,Ma=a=>{throw new P(a);};
function Na(a,b,c={}){var d=b.name;if(!a)throw new P(`type "${d}" must have a positive integer typeid pointer`);if(K.hasOwnProperty(a)){if(c.oa)return;throw new P(`Cannot register type '${d}' twice`);}K[a]=b;delete Ka[a];J.hasOwnProperty(a)&&(b=J[a],delete J[a],b.forEach(e=>e()))}function M(a,b,c={}){if(!("argPackAdvance"in b))throw new TypeError("registerType registeredInstance requires argPackAdvance");return Na(a,b,c)}
var Oa=a=>{throw new P(a.F.I.G.name+" instance already deleted");},Pa=!1,Qa=()=>{},Ra=(a,b,c)=>{if(b===c)return a;if(void 0===c.K)return null;a=Ra(a,b,c.K);return null===a?null:c.ia(a)},Sa={},Q=[],Ta=()=>{for(;Q.length;){var a=Q.pop();a.F.S=!1;a["delete"]()}},R,S={},Ua=(a,b)=>{if(void 0===b)throw new P("ptr should not be undefined");for(;a.K;)b=a.V(b),a=a.K;return S[b]},Va=(a,b)=>{if(!b.I||!b.H)throw new L("makeClassHandle requires ptr and ptrType");if(!!b.L!==!!b.J)throw new L("Both smartPtrType and smartPtr must be specified");
b.count={value:1};return T(Object.create(a,{F:{value:b,writable:!0}}))},T=a=>{if("undefined"===typeof FinalizationRegistry)return T=b=>b,a;Pa=new FinalizationRegistry(b=>{b=b.F;--b.count.value;0===b.count.value&&(b.J?b.L.N(b.J):b.I.G.N(b.H))});T=b=>{var c=b.F;c.J&&Pa.register(b,{F:c},b);return b};Qa=b=>{Pa.unregister(b)};return T(a)};function Wa(){}
var Xa=(a,b)=>Object.defineProperty(b,"name",{value:a}),Ya=(a,b,c)=>{if(void 0===a[b].P){var d=a[b];a[b]=function(){if(!a[b].P.hasOwnProperty(arguments.length))throw new P(`Function '${c}' called with an invalid number of arguments (${arguments.length}) - expects one of (${a[b].P})!`);return a[b].P[arguments.length].apply(this,arguments)};a[b].P=[];a[b].P[d.W]=d}},Za=(a,b)=>{if(m.hasOwnProperty(a))throw new P(`Cannot register public name '${a}' twice`);m[a]=b},$a=a=>{if(void 0===a)return"_unknown";
a=a.replace(/[^a-zA-Z0-9_]/g,"$");var b=a.charCodeAt(0);return 48<=b&&57>=b?`_${a}`:a};function ab(a,b,c,d,e,g,f,h){this.name=a;this.constructor=b;this.T=c;this.N=d;this.K=e;this.ja=g;this.V=f;this.ia=h;this.qa=[]}var bb=(a,b,c)=>{for(;b!==c;){if(!b.V)throw new P(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);a=b.V(a);b=b.K}return a};
function cb(a,b){if(null===b){if(this.Z)throw new P(`null is not a valid ${this.name}`);return 0}if(!b.F)throw new P(`Cannot pass "${db(b)}" as a ${this.name}`);if(!b.F.H)throw new P(`Cannot pass deleted object as a pointer of type ${this.name}`);return bb(b.F.H,b.F.I.G,this.G)}
function eb(a,b){if(null===b){if(this.Z)throw new P(`null is not a valid ${this.name}`);if(this.Y){var c=this.$();null!==a&&a.push(this.N,c);return c}return 0}if(!b||!b.F)throw new P(`Cannot pass "${db(b)}" as a ${this.name}`);if(!b.F.H)throw new P(`Cannot pass deleted object as a pointer of type ${this.name}`);if(!this.X&&b.F.I.X)throw new P(`Cannot convert argument of type ${b.F.L?b.F.L.name:b.F.I.name} to parameter type ${this.name}`);c=bb(b.F.H,b.F.I.G,this.G);if(this.Y){if(void 0===b.F.J)throw new P("Passing raw pointer to smart pointer is illegal");
switch(this.va){case 0:if(b.F.L===this)c=b.F.J;else throw new P(`Cannot convert argument of type ${b.F.L?b.F.L.name:b.F.I.name} to parameter type ${this.name}`);break;case 1:c=b.F.J;break;case 2:if(b.F.L===this)c=b.F.J;else{var d=b.clone();c=this.ra(c,fb(()=>d["delete"]()));null!==a&&a.push(this.N,c)}break;default:throw new P("Unsupporting sharing policy");}}return c}
function gb(a,b){if(null===b){if(this.Z)throw new P(`null is not a valid ${this.name}`);return 0}if(!b.F)throw new P(`Cannot pass "${db(b)}" as a ${this.name}`);if(!b.F.H)throw new P(`Cannot pass deleted object as a pointer of type ${this.name}`);if(b.F.I.X)throw new P(`Cannot convert argument of type ${b.F.I.name} to parameter type ${this.name}`);return bb(b.F.H,b.F.I.G,this.G)}function hb(a){return this.fromWireType(E[a>>2])}
function ib(a,b,c,d,e,g,f,h,k,n,l){this.name=a;this.G=b;this.Z=c;this.X=d;this.Y=e;this.pa=g;this.va=f;this.fa=h;this.$=k;this.ra=n;this.N=l;e||void 0!==b.K?this.toWireType=eb:(this.toWireType=d?cb:gb,this.M=null)}
var jb=(a,b)=>{if(!m.hasOwnProperty(a))throw new L("Replacing nonexistant public symbol");m[a]=b;m[a].W=void 0},kb,lb=(a,b)=>{var c=[];return function(){c.length=0;Object.assign(c,arguments);if(a.includes("j")){var d=m["dynCall_"+a];d=c&&c.length?d.apply(null,[b].concat(c)):d.call(null,b)}else d=kb.get(b).apply(null,c);return d}},U=(a,b)=>{a=O(a);var c=a.includes("j")?lb(a,b):kb.get(b);if("function"!=typeof c)throw new P(`unknown function pointer with signature ${a}: ${b}`);return c},mb,pb=a=>{a=
ob(a);var b=O(a);V(a);return b},qb=(a,b)=>{function c(g){e[g]||K[g]||(Ka[g]?Ka[g].forEach(c):(d.push(g),e[g]=!0))}var d=[],e={};b.forEach(c);throw new mb(`${a}: `+d.map(pb).join([", "]));},rb=(a,b)=>{for(var c=[],d=0;d<a;d++)c.push(E[b+4*d>>2]);return c};function sb(a){for(var b=1;b<a.length;++b)if(null!==a[b]&&void 0===a[b].M)return!0;return!1}
function tb(a){var b=Function;if(!(b instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);var c=Xa(b.name||"unknownFunctionName",function(){});c.prototype=b.prototype;c=new c;a=b.apply(c,a);return a instanceof Object?a:c}
function ub(a,b,c,d,e,g){var f=b.length;if(2>f)throw new P("argTypes array size mismatch! Must at least get return value and 'this' types!");var h=null!==b[1]&&null!==c,k=sb(b);c="void"!==b[0].name;d=[a,Ma,d,e,Ia,b[0],b[1]];for(e=0;e<f-2;++e)d.push(b[e+2]);if(!k)for(e=h?1:2;e<b.length;++e)null!==b[e].M&&d.push(b[e].M);k=sb(b);e=b.length;var n="",l="";for(f=0;f<e-2;++f)n+=(0!==f?", ":"")+"arg"+f,l+=(0!==f?", ":"")+"arg"+f+"Wired";n=`\n        return function (${n}) {\n        if (arguments.length !== ${e-
2}) {\n          throwBindingError('function ' + humanName + ' called with ' + arguments.length + ' arguments, expected ${e-2}');\n        }`;k&&(n+="var destructors = [];\n");var p=k?"destructors":"null",r="humanName throwBindingError invoker fn runDestructors retType classParam".split(" ");h&&(n+="var thisWired = classParam['toWireType']("+p+", this);\n");for(f=0;f<e-2;++f)n+="var arg"+f+"Wired = argType"+f+"['toWireType']("+p+", arg"+f+");\n",r.push("argType"+f);h&&(l="thisWired"+(0<l.length?", ":
"")+l);n+=(c||g?"var rv = ":"")+"invoker(fn"+(0<l.length?", ":"")+l+");\n";if(k)n+="runDestructors(destructors);\n";else for(f=h?1:2;f<b.length;++f)g=1===f?"thisWired":"arg"+(f-2)+"Wired",null!==b[f].M&&(n+=g+"_dtor("+g+");\n",r.push(g+"_dtor"));c&&(n+="var ret = retType['fromWireType'](rv);\nreturn ret;\n");let [t,u]=[r,n+"}\n"];t.push(u);b=tb(t).apply(null,d);return Xa(a,b)}var vb=a=>{a=a.trim();const b=a.indexOf("(");return-1!==b?a.substr(0,b):a};
class wb{constructor(){this.O=[void 0];this.aa=[]}get(a){return this.O[a]}has(a){return void 0!==this.O[a]}}
var W=new wb,xb=a=>{a>=W.ba&&0===--W.get(a).ga&&(W.O[a]=void 0,W.aa.push(a))},yb=a=>{if(!a)throw new P("Cannot use deleted val. handle = "+a);return W.get(a).value},fb=a=>{switch(a){case void 0:return 1;case null:return 2;case !0:return 3;case !1:return 4;default:a={ga:1,value:a};var b=W.aa.pop()||W.O.length;W.O[b]=a;return b}},zb={name:"emscripten::val",fromWireType:a=>{var b=yb(a);xb(a);return b},toWireType:(a,b)=>fb(b),argPackAdvance:8,readValueFromPointer:Ja,M:null},db=a=>{if(null===a)return"null";
var b=typeof a;return"object"===b||"array"===b||"function"===b?a.toString():""+a},Ab=(a,b)=>{switch(b){case 4:return function(c){return this.fromWireType(pa[c>>2])};case 8:return function(c){return this.fromWireType(qa[c>>3])};default:throw new TypeError(`invalid float width (${b}): ${a}`);}},Bb=(a,b,c)=>{switch(b){case 1:return c?d=>na[d>>0]:d=>B[d>>0];case 2:return c?d=>C[d>>1]:d=>oa[d>>1];case 4:return c?d=>D[d>>2]:d=>E[d>>2];default:throw new TypeError(`invalid integer width (${b}): ${a}`);}},
Cb="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,Db="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0,Eb=(a,b)=>{var c=a>>1;for(var d=c+b/2;!(c>=d)&&oa[c];)++c;c<<=1;if(32<c-a&&Db)return Db.decode(B.subarray(a,c));c="";for(d=0;!(d>=b/2);++d){var e=C[a+2*d>>1];if(0==e)break;c+=String.fromCharCode(e)}return c},Fb=(a,b,c)=>{c??=2147483647;if(2>c)return 0;c-=2;var d=b;c=c<2*a.length?c/2:a.length;for(var e=0;e<c;++e)C[b>>1]=a.charCodeAt(e),b+=2;C[b>>1]=0;return b-d},Gb=
a=>2*a.length,Hb=(a,b)=>{for(var c=0,d="";!(c>=b/4);){var e=D[a+4*c>>2];if(0==e)break;++c;65536<=e?(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023)):d+=String.fromCharCode(e)}return d},Ib=(a,b,c)=>{c??=2147483647;if(4>c)return 0;var d=b;c=d+c-4;for(var e=0;e<a.length;++e){var g=a.charCodeAt(e);if(55296<=g&&57343>=g){var f=a.charCodeAt(++e);g=65536+((g&1023)<<10)|f&1023}D[b>>2]=g;b+=4;if(b+4>c)break}D[b>>2]=0;return b-d},Jb=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=
d&&57343>=d&&++c;b+=4}return b},Kb=(a,b)=>{var c=K[a];if(void 0===c)throw a=b+" has unknown type "+pb(a),new P(a);return c},Lb=()=>{if("object"==typeof crypto&&"function"==typeof crypto.getRandomValues)return c=>crypto.getRandomValues(c);if(da)try{var a=require("crypto");if(a.randomFillSync)return c=>a.randomFillSync(c);var b=a.randomBytes;return c=>(c.set(b(c.byteLength)),c)}catch(c){}ka("initRandomDevice")},Mb=a=>(Mb=Lb())(a);
L=m.InternalError=class extends Error{constructor(a){super(a);this.name="InternalError"}};for(var Nb=Array(256),Ob=0;256>Ob;++Ob)Nb[Ob]=String.fromCharCode(Ob);La=Nb;P=m.BindingError=class extends Error{constructor(a){super(a);this.name="BindingError"}};
Object.assign(Wa.prototype,{isAliasOf:function(a){if(!(this instanceof Wa&&a instanceof Wa))return!1;var b=this.F.I.G,c=this.F.H;a.F=a.F;var d=a.F.I.G;for(a=a.F.H;b.K;)c=b.V(c),b=b.K;for(;d.K;)a=d.V(a),d=d.K;return b===d&&c===a},clone:function(){this.F.H||Oa(this);if(this.F.U)return this.F.count.value+=1,this;var a=T,b=Object,c=b.create,d=Object.getPrototypeOf(this),e=this.F;a=a(c.call(b,d,{F:{value:{count:e.count,S:e.S,U:e.U,H:e.H,I:e.I,J:e.J,L:e.L}}}));a.F.count.value+=1;a.F.S=!1;return a},["delete"](){this.F.H||
Oa(this);if(this.F.S&&!this.F.U)throw new P("Object already scheduled for deletion");Qa(this);var a=this.F;--a.count.value;0===a.count.value&&(a.J?a.L.N(a.J):a.I.G.N(a.H));this.F.U||(this.F.J=void 0,this.F.H=void 0)},isDeleted:function(){return!this.F.H},deleteLater:function(){this.F.H||Oa(this);if(this.F.S&&!this.F.U)throw new P("Object already scheduled for deletion");Q.push(this);1===Q.length&&R&&R(Ta);this.F.S=!0;return this}});m.getInheritedInstanceCount=()=>Object.keys(S).length;
m.getLiveInheritedInstances=()=>{var a=[],b;for(b in S)S.hasOwnProperty(b)&&a.push(S[b]);return a};m.flushPendingDeletes=Ta;m.setDelayFunction=a=>{R=a;Q.length&&R&&R(Ta)};
Object.assign(ib.prototype,{ka(a){this.fa&&(a=this.fa(a));return a},ea(a){this.N?.(a)},argPackAdvance:8,readValueFromPointer:hb,fromWireType:function(a){function b(){return this.Y?Va(this.G.T,{I:this.pa,H:c,L:this,J:a}):Va(this.G.T,{I:this,H:a})}var c=this.ka(a);if(!c)return this.ea(a),null;var d=Ua(this.G,c);if(void 0!==d){if(0===d.F.count.value)return d.F.H=c,d.F.J=a,d.clone();d=d.clone();this.ea(a);return d}d=this.G.ja(c);d=Sa[d];if(!d)return b.call(this);d=this.X?d.ha:d.pointerType;var e=Ra(c,
this.G,d.G);return null===e?b.call(this):this.Y?Va(d.G.T,{I:d,H:e,L:this,J:a}):Va(d.G.T,{I:d,H:e})}});mb=m.UnboundTypeError=((a,b)=>{var c=Xa(b,function(d){this.name=b;this.message=d;d=Error(d).stack;void 0!==d&&(this.stack=this.toString()+"\n"+d.replace(/^Error(:[^\n]*)?\n/,""))});c.prototype=Object.create(a.prototype);c.prototype.constructor=c;c.prototype.toString=function(){return void 0===this.message?this.name:`${this.name}: ${this.message}`};return c})(Error,"UnboundTypeError");
W.O.push({value:void 0},{value:null},{value:!0},{value:!1});Object.assign(W,{ba:W.O.length});m.count_emval_handles=()=>{for(var a=0,b=W.ba;b<W.O.length;++b)void 0!==W.O[b]&&++a;return a};
var Qb={j:(a,b,c)=>{var d=new Ea(a);E[d.H+16>>2]=0;E[d.H+4>>2]=b;E[d.H+8>>2]=c;Fa=a;Ga++;throw Fa;},e:a=>{var b=Ha[a];delete Ha[a];var c=b.elements,d=c.length,e=c.map(h=>h.na).concat(c.map(h=>h.ta)),g=b.$,f=b.N;N([a],e,function(h){c.forEach((k,n)=>{var l=h[n],p=k.la,r=k.ma,t=h[n+d],u=k.sa,v=k.ua;k.read=F=>l.fromWireType(p(r,F));k.write=(F,X)=>{var A=[];u(v,F,t.toWireType(A,X));Ia(A)}});return[{name:b.name,fromWireType:k=>{for(var n=Array(d),l=0;l<d;++l)n[l]=c[l].read(k);f(k);return n},toWireType:(k,
n)=>{if(d!==n.length)throw new TypeError(`Incorrect number of tuple elements for ${b.name}: expected=${d}, actual=${n.length}`);for(var l=g(),p=0;p<d;++p)c[p].write(l,n[p]);null!==k&&k.push(f,l);return l},argPackAdvance:8,readValueFromPointer:Ja,M:f}]})},r:()=>{},v:(a,b,c,d)=>{b=O(b);M(a,{name:b,fromWireType:function(e){return!!e},toWireType:function(e,g){return g?c:d},argPackAdvance:8,readValueFromPointer:function(e){return this.fromWireType(B[e])},M:null})},p:(a,b,c,d,e,g,f,h,k,n,l,p,r)=>{l=O(l);
g=U(e,g);h&&=U(f,h);n&&=U(k,n);r=U(p,r);var t=$a(l);Za(t,function(){qb(`Cannot construct ${l} due to unbound types`,[d])});N([a,b,c],d?[d]:[],function(u){u=u[0];if(d){var v=u.G;var F=v.T}else F=Wa.prototype;u=Xa(l,function(){if(Object.getPrototypeOf(this)!==X)throw new P("Use 'new' to construct "+l);if(void 0===A.R)throw new P(l+" has no accessible constructor");var nb=A.R[arguments.length];if(void 0===nb)throw new P(`Tried to invoke ctor of ${l} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(A.R).toString()}) parameters instead!`);
return nb.apply(this,arguments)});var X=Object.create(F,{constructor:{value:u}});u.prototype=X;var A=new ab(l,u,X,r,v,g,h,n);if(A.K){var Y;(Y=A.K).da??(Y.da=[]);A.K.da.push(A)}v=new ib(l,A,!0,!1,!1);Y=new ib(l+"*",A,!1,!1,!1);F=new ib(l+" const*",A,!1,!0,!1);Sa[a]={pointerType:Y,ha:F};jb(t,u);return[v,Y,F]})},q:(a,b,c,d,e,g)=>{var f=rb(b,c);e=U(d,e);N([],[a],function(h){h=h[0];var k=`constructor ${h.name}`;void 0===h.G.R&&(h.G.R=[]);if(void 0!==h.G.R[b-1])throw new P(`Cannot register multiple constructors with identical number of parameters (${b-
1}) for class '${h.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);h.G.R[b-1]=()=>{qb(`Cannot construct ${h.name} due to unbound types`,f)};N([],f,n=>{n.splice(1,0,null);h.G.R[b-1]=ub(k,n,null,e,g);return[]});return[]})},l:(a,b,c,d,e,g,f,h,k)=>{var n=rb(c,d);b=O(b);b=vb(b);g=U(e,g);N([],[a],function(l){function p(){qb(`Cannot call ${r} due to unbound types`,n)}l=l[0];var r=`${l.name}.${b}`;b.startsWith("@@")&&(b=Symbol[b.substring(2)]);h&&
l.G.qa.push(b);var t=l.G.T,u=t[b];void 0===u||void 0===u.P&&u.className!==l.name&&u.W===c-2?(p.W=c-2,p.className=l.name,t[b]=p):(Ya(t,b,r),t[b].P[c-2]=p);N([],n,function(v){v=ub(r,v,l,g,f,k);void 0===t[b].P?(v.W=c-2,t[b]=v):t[b].P[c-2]=v;return[]});return[]})},u:a=>M(a,zb),n:(a,b,c)=>{b=O(b);M(a,{name:b,fromWireType:d=>d,toWireType:(d,e)=>e,argPackAdvance:8,readValueFromPointer:Ab(b,c),M:null})},c:(a,b,c,d,e)=>{b=O(b);-1===e&&(e=4294967295);e=h=>h;if(0===d){var g=32-8*c;e=h=>h<<g>>>g}var f=b.includes("unsigned")?
function(h,k){return k>>>0}:function(h,k){return k};M(a,{name:b,fromWireType:e,toWireType:f,argPackAdvance:8,readValueFromPointer:Bb(b,c,0!==d),M:null})},b:(a,b,c)=>{function d(g){return new e(na.buffer,E[g+4>>2],E[g>>2])}var e=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][b];c=O(c);M(a,{name:c,fromWireType:d,argPackAdvance:8,readValueFromPointer:d},{oa:!0})},g:a=>{M(a,zb)},m:(a,b)=>{b=O(b);var c="std::string"===b;M(a,{name:b,fromWireType:function(d){var e=
E[d>>2],g=d+4;if(c)for(var f=g,h=0;h<=e;++h){var k=g+h;if(h==e||0==B[k]){if(f){var n=f;var l=B,p=n+(k-f);for(f=n;l[f]&&!(f>=p);)++f;if(16<f-n&&l.buffer&&Cb)n=Cb.decode(l.subarray(n,f));else{for(p="";n<f;){var r=l[n++];if(r&128){var t=l[n++]&63;if(192==(r&224))p+=String.fromCharCode((r&31)<<6|t);else{var u=l[n++]&63;r=224==(r&240)?(r&15)<<12|t<<6|u:(r&7)<<18|t<<12|u<<6|l[n++]&63;65536>r?p+=String.fromCharCode(r):(r-=65536,p+=String.fromCharCode(55296|r>>10,56320|r&1023))}}else p+=String.fromCharCode(r)}n=
p}}else n="";if(void 0===v)var v=n;else v+=String.fromCharCode(0),v+=n;f=k+1}}else{v=Array(e);for(h=0;h<e;++h)v[h]=String.fromCharCode(B[g+h]);v=v.join("")}V(d);return v},toWireType:function(d,e){e instanceof ArrayBuffer&&(e=new Uint8Array(e));var g,f="string"==typeof e;if(!(f||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Int8Array))throw new P("Cannot pass non-string to std::string");var h;if(c&&f)for(g=h=0;g<e.length;++g){var k=e.charCodeAt(g);127>=k?h++:2047>=k?h+=2:55296<=
k&&57343>=k?(h+=4,++g):h+=3}else h=e.length;g=h;h=Pb(4+g+1);k=h+4;E[h>>2]=g;if(c&&f){if(f=k,k=g+1,g=B,0<k){k=f+k-1;for(var n=0;n<e.length;++n){var l=e.charCodeAt(n);if(55296<=l&&57343>=l){var p=e.charCodeAt(++n);l=65536+((l&1023)<<10)|p&1023}if(127>=l){if(f>=k)break;g[f++]=l}else{if(2047>=l){if(f+1>=k)break;g[f++]=192|l>>6}else{if(65535>=l){if(f+2>=k)break;g[f++]=224|l>>12}else{if(f+3>=k)break;g[f++]=240|l>>18;g[f++]=128|l>>12&63}g[f++]=128|l>>6&63}g[f++]=128|l&63}}g[f]=0}}else if(f)for(f=0;f<g;++f){n=
e.charCodeAt(f);if(255<n)throw V(k),new P("String has UTF-16 code units that do not fit in 8 bits");B[k+f]=n}else for(f=0;f<g;++f)B[k+f]=e[f];null!==d&&d.push(V,h);return h},argPackAdvance:8,readValueFromPointer:hb,M(d){V(d)}})},i:(a,b,c)=>{c=O(c);if(2===b){var d=Eb;var e=Fb;var g=Gb;var f=()=>oa;var h=1}else 4===b&&(d=Hb,e=Ib,g=Jb,f=()=>E,h=2);M(a,{name:c,fromWireType:k=>{for(var n=E[k>>2],l=f(),p,r=k+4,t=0;t<=n;++t){var u=k+4+t*b;if(t==n||0==l[u>>h])r=d(r,u-r),void 0===p?p=r:(p+=String.fromCharCode(0),
p+=r),r=u+b}V(k);return p},toWireType:(k,n)=>{if("string"!=typeof n)throw new P(`Cannot pass non-string to C++ string type ${c}`);var l=g(n),p=Pb(4+l+b);E[p>>2]=l>>h;e(n,p+4,l+b);null!==k&&k.push(V,p);return p},argPackAdvance:8,readValueFromPointer:Ja,M(k){V(k)}})},d:(a,b,c,d,e,g)=>{Ha[a]={name:O(b),$:U(c,d),N:U(e,g),elements:[]}},a:(a,b,c,d,e,g,f,h,k)=>{Ha[a].elements.push({na:b,la:U(c,d),ma:e,ta:g,sa:U(f,h),ua:k})},w:(a,b)=>{b=O(b);M(a,{wa:!0,name:b,argPackAdvance:0,fromWireType:()=>{},toWireType:()=>
{}})},o:(a,b,c)=>{a=yb(a);b=Kb(b,"emval::as");var d=[];a=b.toWireType(d,a);d.length&&(E[c>>2]=fb(d));return a},y:xb,f:a=>{4<a&&(W.get(a).ga+=1)},x:a=>{var b=yb(a);Ia(b);xb(a)},k:(a,b)=>{a=Kb(a,"_emval_take_value");a=a.readValueFromPointer(b);return fb(a)},h:()=>{ka("")},t:a=>{var b=B.length;a>>>=0;if(2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);var e=Math;d=Math.max(a,d);a:{e=(e.min.call(e,2147483648,d+(65536-d%65536)%65536)-la.buffer.byteLength+65535)/65536;
try{la.grow(e);ra();var g=1;break a}catch(f){}g=void 0}if(g)return!0}return!1},s:(a,b)=>{Mb(B.subarray(a,a+b));return 0}},Z=function(){function a(c){Z=c.exports;la=Z.z;ra();kb=Z.B;ta.unshift(Z.A);G--;m.monitorRunDependencies?.(G);0==G&&(null!==wa&&(clearInterval(wa),wa=null),H&&(c=H,H=null,c()));return Z}var b={a:Qb};G++;m.monitorRunDependencies?.(G);if(m.instantiateWasm)try{return m.instantiateWasm(b,a)}catch(c){y(`Module.instantiateWasm callback failed with error: ${c}`),q(c)}Ca(b,function(c){a(c.instance)}).catch(q);
return{}}(),ob=a=>(ob=Z.C)(a),Pb=a=>(Pb=Z.D)(a),V=a=>(V=Z.E)(a),Rb;H=function Sb(){Rb||Tb();Rb||(H=Sb)};
function Tb(){function a(){if(!Rb&&(Rb=!0,m.calledRun=!0,!ma)){Da(ta);aa(m);if(m.onRuntimeInitialized)m.onRuntimeInitialized();if(m.postRun)for("function"==typeof m.postRun&&(m.postRun=[m.postRun]);m.postRun.length;){var b=m.postRun.shift();ua.unshift(b)}Da(ua)}}if(!(0<G)){if(m.preRun)for("function"==typeof m.preRun&&(m.preRun=[m.preRun]);m.preRun.length;)va();Da(sa);0<G||(m.setStatus?(m.setStatus("Running..."),setTimeout(function(){setTimeout(function(){m.setStatus("")},1);a()},1)):a())}}
if(m.preInit)for("function"==typeof m.preInit&&(m.preInit=[m.preInit]);0<m.preInit.length;)m.preInit.pop()();Tb();


  return moduleArg.ready
}
);
})();
export default Module;