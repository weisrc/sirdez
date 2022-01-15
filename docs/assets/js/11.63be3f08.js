(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{410:function(t,e,s){"use strict";s.r(e);var a=s(57),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"number"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#number"}},[t._v("#")]),t._v(" Number")]),t._v(" "),s("p",[t._v("All numbers are stored in big-endian using "),s("code",[t._v("DataView")]),t._v(" methods for its "),s("a",{attrs:{href:"https://v8.dev/blog/dataview",target:"_blank",rel:"noopener noreferrer"}},[t._v("performance"),s("OutboundLink")],1),t._v(". There are two variants of numbers which have similar performance with different bundle size footprints.")]),t._v(" "),s("h2",{attrs:{id:"variants"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#variants"}},[t._v("#")]),t._v(" Variants")]),t._v(" "),s("p",[s("code",[t._v("sd.number")]),t._v(" have an implementation for each of the following. It has a mapping to find the "),s("code",[t._v("sd.SerDes")]),t._v(" for a given "),s("code",[t._v("kind")]),t._v(" and "),s("code",[t._v("bitSize")]),t._v(". Using number will need to include all the below in the bundle.")]),t._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),s("p",[t._v("There is no input validation. Passing bad values will result it to return "),s("code",[t._v("undefined")]),t._v(". Thus calling it will throw an error.")])]),t._v(" "),s("p",[s("code",[t._v("sd.evalNumber")]),t._v(" is code generating factory that can create the following. Instead of mapping to a "),s("code",[t._v("sd.SerDes")]),t._v(", it evokes "),s("code",[t._v("new Function")]),t._v(" to create the "),s("code",[t._v("sd.SerDes")]),t._v(", hence the bundle size will be smaller.")]),t._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),s("p",[t._v("There is no input validation. Passing bad values will result in either errors when invoking the returned "),s("code",[t._v("sd.SerDes")]),t._v(" or while generating it, or unexpected behaviors. Please fully use the power of TypeScript to prevent this.")])]),t._v(" "),s("p",[t._v("For non-dynamic numbers, please use "),s("code",[t._v("sd.<kind><size>")]),t._v(" if you are using a few, or "),s("code",[t._v("sd.eval<Kind><size>")]),t._v(" if you are using most to reduce bundle size.")]),t._v(" "),s("h2",{attrs:{id:"mappings"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mappings"}},[t._v("#")]),t._v(" Mappings")]),t._v(" "),s("p",[t._v("Both factories requires a "),s("code",[t._v("kind")]),t._v(" and a "),s("code",[t._v("bitSize")]),t._v(".")]),t._v(" "),s("p",[t._v("Truth table for "),s("code",[t._v("sd.number")]),t._v(" and "),s("code",[t._v("sd.evalNumber")]),t._v(".")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("kind")]),t._v(" "),s("th",[t._v("bitSize")]),t._v(" "),s("th",[t._v("returns")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("uint")]),t._v(" "),s("td",[t._v("8")]),t._v(" "),s("td",[s("code",[t._v("sd.uint8")])])]),t._v(" "),s("tr",[s("td",[t._v("uint")]),t._v(" "),s("td",[t._v("16")]),t._v(" "),s("td",[s("code",[t._v("sd.uint16")])])]),t._v(" "),s("tr",[s("td",[t._v("uint")]),t._v(" "),s("td",[t._v("32")]),t._v(" "),s("td",[s("code",[t._v("sd.uint32")])])]),t._v(" "),s("tr",[s("td",[t._v("bigUint")]),t._v(" "),s("td",[t._v("64")]),t._v(" "),s("td",[s("code",[t._v("sd.bigUint64")])])]),t._v(" "),s("tr",[s("td",[t._v("int")]),t._v(" "),s("td",[t._v("8")]),t._v(" "),s("td",[s("code",[t._v("sd.int8")])])]),t._v(" "),s("tr",[s("td",[t._v("int")]),t._v(" "),s("td",[t._v("16")]),t._v(" "),s("td",[s("code",[t._v("sd.int16")])])]),t._v(" "),s("tr",[s("td",[t._v("int")]),t._v(" "),s("td",[t._v("32")]),t._v(" "),s("td",[s("code",[t._v("sd.int32")])])]),t._v(" "),s("tr",[s("td",[t._v("bigInt")]),t._v(" "),s("td",[t._v("64")]),t._v(" "),s("td",[s("code",[t._v("sd.bigInt64")])])]),t._v(" "),s("tr",[s("td",[t._v("float")]),t._v(" "),s("td",[t._v("32")]),t._v(" "),s("td",[s("code",[t._v("sd.float32")])])]),t._v(" "),s("tr",[s("td",[t._v("float")]),t._v(" "),s("td",[t._v("64")]),t._v(" "),s("td",[s("code",[t._v("sd.float64")])])])])]),t._v(" "),s("p",[t._v("All number data types have been exported. So avoid using "),s("code",[t._v("sd.number")]),t._v(" or "),s("code",[t._v("sd.evalNumber")]),t._v(" for statically.")]),t._v(" "),s("h2",{attrs:{id:"usage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usage"}},[t._v("#")]),t._v(" Usage")]),t._v(" "),s("p",[t._v("Statically using numbers.")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" toBytes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fromBytes "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" sd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("uint8"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" toBytes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fromBytes "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" sd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("evalUint8"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("Dynamically using numbers.")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" toBytes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fromBytes "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" sd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("number")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"uint"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" toBytes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fromBytes "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" sd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("evalNumber")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"uint"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"specifications"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#specifications"}},[t._v("#")]),t._v(" Specifications")]),t._v(" "),s("p",[t._v("All numbers are "),s("em",[t._v("directly")]),t._v(" serialized in big-endian at the location of pointer "),s("code",[t._v("sd.Context#i")]),t._v(" to then increment the pointer by the byte size of the datatype.")])])}),[],!1,null,null,null);e.default=n.exports}}]);