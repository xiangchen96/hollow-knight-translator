(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{RXBc:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return f}));a("a1Th"),a("Btvt"),a("I5cv"),a("9VmF"),a("OG14"),a("KKXr"),a("Vd3H"),a("Z2Ku"),a("L9s1"),a("Oyvg"),a("pIFo");var r=a("q1tI"),n=a.n(r),s=a("Wbzz"),o=a("Bl7J");var c=function(e){var t,a;a=e,(t=s).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a;var r;r=s;function s(){return e.apply(this,arguments)||this}var o=s.prototype;return o.renderIcon=function(){var e,t=this.props.value;if(["JP","FR","RU","PT","ES","IT","DE"].indexOf(t)>=0)e=t.toLowerCase();else switch(t){case"SC":e="cn";break;case"KO":e="kr";break;case"JA":e="jp";break;case"EN":e="gb";break;case"BP":e="br";break;case"ZH":e="cn";break;default:return null}var a="flag-icon flag-icon-"+e;return n.a.createElement("span",{className:a})},o.render=function(){var e=this.props,t=e.value,a=e.onSelect,r=e.selectedLanguages,s=r.includes(t)||"All"===t&&0===r.length;return n.a.createElement("div",{className:"flex flex-row justify-around rounded-full w-20 mr-4 my-2 px-3 py-1 active:bg-gray-500 hover:bg-gray-400 bg-gray-"+(s?"400":"200"),role:"button",onClick:function(){a&&a(t)}},this.renderIcon(),n.a.createElement("p",{className:"select-none"},t))},s}(r.Component);var l=function(e){var t,a;a=e,(t=s).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a;var r;r=s;function s(){return e.apply(this,arguments)||this}return s.prototype.render=function(){var e=this.props,t=e.onSelect,a=e.selectedLanguages,r=["JP","FR","RU","PT","SC","ES","KO","IT","JA","DE","EN","BP","ZH"];return r.sort(),r.unshift("All"),n.a.createElement("div",{className:"flex flex-row flex-wrap w-full justify-start py-2"},r.map((function(e){return n.a.createElement(c,{key:e,value:e,onSelect:t,selectedLanguages:a})})))},s}(r.Component);var i=/name="([^"]*)"/,u=/>(.*)</;function p(e,t){if("undefined"!=typeof window){t||(t=window.location.href),e=e.replace(/[[\]]/g,"\\$&");var a=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return a&&a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):""}return""}var f=function(e){var t,a;a=e,(t=c).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a;var r;r=c;function c(t){var a;(a=e.call(this,t)||this).onSelect=function(e){var t=a.state.selectedLanguages;"All"===e?t.length=0:t.includes(e)?t.splice(t.indexOf(e),1):t.push(e),a.setState({selectedLanguages:t},a.searchText())},a.renderIcon=function(e){var t;if(["JP","FR","RU","PT","ES","IT","DE"].indexOf(e)>=0)t=e.toLowerCase();else switch(e){case"SC":t="cn";break;case"KO":t="kr";break;case"JA":t="jp";break;case"EN":t="gb";break;case"BP":t="br";break;case"ZH":t="cn";break;default:t="cn"}return n.a.createElement("span",{className:"flag-icon flag-icon-"+t})},a.renderResults=function(){var e=a.state,t=e.results,r=e.showAlert,s=[];return t.sort().forEach((function(e){var t=e[0],o=e[1];o=o.trim(),t=t.trim(),s.push(n.a.createElement("div",{key:t+o,className:"flex-grow sm:w-1/2 md:w-1/3 lg:w-1/4 pr-2 py-2"},n.a.createElement("div",{className:"bg-gray-200 rounded px-2 py-2 shadow h-full"},n.a.createElement("div",{role:"button",className:"hover:bg-gray-400 hover:text-black text-gray-200 cursor-pointer px-2 rounded flex flex-row",onClick:function(){return a.setState({showAlert:!0},(function(){navigator.clipboard.writeText(o),setTimeout((function(){return a.setState({showAlert:!1})}),1e3)}))}},a.renderIcon(t),n.a.createElement("p",{className:"px-1"},r?"Copied!":"Copy text")),n.a.createElement("p",{className:"px-2 py-2"},o))))})),n.a.createElement("div",{className:"flex flex-row flex-wrap"},s)},a.renderSelector=function(){var e=a.state,t=e.variables,r=e.selectedVariable,s=[];return t.forEach((function(e){s.push(n.a.createElement("option",{key:e,value:e},e))})),n.a.createElement("select",{className:"block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500",value:r,required:!0,onChange:function(e){a.setState({selectedVariable:e.target.value},(function(){return a.searchText()}))}},s)};var r=p("langs").split(",");return 1===r.length&&""===r[0]&&(r=[]),a.state={selectedLanguages:r,inputText:p("search"),results:[],variables:[],selectedVariable:"",showAlert:!1},a}var f=c.prototype;return f.search=function(){var e=this,t=this.assets;if(t){var a=this.state.inputText;if(""===a)this.setState({variables:[]});else{for(var r=[],n=0;n<t.length;n+=1)if(t[n].toLowerCase().includes(a.toLowerCase())){var s=i.exec(t[n]);s&&s[1].length>0&&r.indexOf(s[1])<0&&s[1].toUpperCase()===s[1]&&r.push(s[1])}r.sort((function(e){return e.length})),this.setState({variables:r},(function(){return e.searchText()}))}}},f.searchText=function(){var e,t=this.assets,a=this.state,r=a.variables,n=a.selectedLanguages,s=this.state.selectedVariable||r[0],o=[];0===r.length||t.forEach((function(t){if(t.startsWith("LANGUAGE")&&(e=t.substring(10).trim()),t.includes('"'+s+'"')&&(0===n.length||n.includes(e))){var a=u.exec(t);if(a&&a[1].length>0){var r=("\t"+a[1]+"\n\n").replace(/&quot;/g,'"').replace(/&lt;/g,"");o.push([e,r])}}})),this.setState({results:o})},f.componentDidMount=function(){var e=this;this._isMounted=!0,fetch(Object(s.withPrefix)("/trimmedAssets.txt")).then((function(e){return e.text()})).then((function(t){e.assets=t.split("\n");var a=p("search");a&&e.setState({inputText:a},(function(){e.search()}))})),window.onpopstate=function(){if(e._isMounted&&window.location.href.includes("search=")){var t=window.location.href.split("search=")[1];e.setState({inputText:t,selectedVariable:""},(function(){e.search()}))}}},f.render=function(){var e=this,t=this.state,a=t.inputText,r=t.selectedLanguages;return n.a.createElement(o.a,null,n.a.createElement("div",null,n.a.createElement("form",null,n.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"text"},"Text to search for"),n.a.createElement("input",{className:"hidden",name:"langs",type:"text",value:r.join(","),readOnly:!0}),n.a.createElement("input",{id:"search",type:"text",name:"search",className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",value:a,placeholder:"Text",onChange:function(t){return e.setState({inputText:t.target.value})}}),n.a.createElement("input",{type:"submit",className:"hidden"})),n.a.createElement(l,{onSelect:this.onSelect,selectedLanguages:r}),this.renderSelector(),this.renderResults()))},c}(r.Component)}}]);
//# sourceMappingURL=component---src-pages-index-js-343ffea346452d33c37d.js.map