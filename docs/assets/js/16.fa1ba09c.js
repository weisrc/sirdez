(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{416:function(e,t,i){"use strict";i.r(t);var o=i(58),s=Object(o.a)({},(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[i("h1",{attrs:{id:"design"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#design"}},[e._v("#")]),e._v(" Design")]),e._v(" "),i("p",[e._v("This section will cover the design of Sir Dez as well as its objectives. Reading the following will help you determine if Sir Dez is the binary serialization that fits your requriements.")]),e._v(" "),i("div",{staticClass:"custom-block tip"},[i("p",{staticClass:"custom-block-title"},[e._v("Why I authored this library?")]),e._v(" "),i("p",[e._v("I created Sir Dez because I wanted a compact performant binary serialization library with full TypeScript support that runs in Node, Deno and the browser for another project involving the WebCrypto API which only works with binary data.")])]),e._v(" "),i("h2",{attrs:{id:"typescript"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#typescript"}},[e._v("#")]),e._v(" TypeScript")]),e._v(" "),i("p",[e._v("TypeScript at first might seem like a pain to setup, but with the amount of tools available, a TypeScript project can easily be scafolded with a simple command while giving all of its benifits.")]),e._v(" "),i("ul",[i("li",[e._v("Better code suggestions")]),e._v(" "),i("li",[e._v("Compilation to many targets")]),e._v(" "),i("li",[e._v("Minimize runtime errors")]),e._v(" "),i("li",[e._v("Type error precognition")])]),e._v(" "),i("p",[e._v("Sir Dez fully supports TypeScript meaning if you define a "),i("code",[e._v("sd.Serdes")]),e._v(" and use it. TypeScript will warn you if you are using it with the wrong data type.")]),e._v(" "),i("h2",{attrs:{id:"bundle-size"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#bundle-size"}},[e._v("#")]),e._v(" Bundle Size")]),e._v(" "),i("p",[e._v("Sir Dez is fully tree-shakable with zero dependencies; the bundle will only include what you use. It can easily be tree-shaken because most of the code is atomic and decoupled. No worries, if you are using Sir Dez with a script tag, because Sir Dez' bundle size is only around 5 KiB and 2 KiB gzipped. The library also ships in many different bundles to fit your needs.")]),e._v(" "),i("h2",{attrs:{id:"portability"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#portability"}},[e._v("#")]),e._v(" Portability")]),e._v(" "),i("p",[e._v("The library is only using features available on most JavaScript runtimes, meaning it can run in multiple environments such as Node, Deno and the browser. Using common features also removes the need to bundle polyfills, thus reducing bundle size. The used features are:")]),e._v(" "),i("ul",[i("li",[i("code",[e._v("Uint8Array")])]),e._v(" "),i("li",[i("code",[e._v("DataView")])]),e._v(" "),i("li",[i("code",[e._v("TextEncoder")]),e._v(" for "),i("code",[e._v("sd.utf8#encode")])]),e._v(" "),i("li",[i("code",[e._v("TextDecoder")]),e._v(" for "),i("code",[e._v("sd.utf8#decode")])])]),e._v(" "),i("p",[e._v("In Node environment (override):")]),e._v(" "),i("ul",[i("li",[i("code",[e._v("Buffer.prototype.<encoding>Write")]),e._v(" for "),i("code",[e._v("sd.<encoding>#encode")])]),e._v(" "),i("li",[i("code",[e._v("Buffer.prototype.<encoding>Slice")]),e._v(" for "),i("code",[e._v("sd.<encoding>#decode")])])]),e._v(" "),i("div",{staticClass:"custom-block warning"},[i("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),i("p",[e._v("It is possible that in some node version, the above functions are not available. If it is the case and upgrading to a newer version is not possible, consider importing "),i("code",[e._v("sirdez/common")]),e._v(" instead.")])]),e._v(" "),i("h2",{attrs:{id:"performance"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#performance"}},[e._v("#")]),e._v(" Performance")]),e._v(" "),i("p",[e._v("Sir Dez aim to be as performant as possible in all environment. In fact, depending on the environment, different code will be used: when running in Node, Sir Dez will use Node's Buffer functions for encoding strings. This also explains the large performance gap for string intensive data types between Node and other environments such as the browser and Deno.")]),e._v(" "),i("h2",{attrs:{id:"compression"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#compression"}},[e._v("#")]),e._v(" Compression")]),e._v(" "),i("p",[e._v("Performance is great, but sending and storing data in a compact format is sometimes more important. Due to the flexibility of Sir Dez, you can store data in the most compact form possible without any elaborate compression algorithm to eliminate redundancy.")])])}),[],!1,null,null,null);t.default=s.exports}}]);