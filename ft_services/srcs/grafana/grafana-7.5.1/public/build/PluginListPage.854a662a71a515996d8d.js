(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{"6jYb":function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var r=n("q1tI"),a=n.n(r),c=n("EKT6"),i=n("kDLi");function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var p=function(e){function t(){return s(this,t),l(this,f(t).apply(this,arguments))}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,e),n=t,(r=[{key:"render",value:function(){var e=this.props,t=e.searchQuery,n=e.linkButton,r=e.setSearchQuery,o=e.target,s={href:n.href};return o&&(s.target=o),a.a.createElement("div",{className:"page-action-bar"},a.a.createElement("div",{className:"gf-form gf-form--grow"},a.a.createElement(c.a,{labelClassName:"gf-form--has-input-icon",inputClassName:"gf-form-input width-20",value:t,onChange:r,placeholder:"Search by name or type"})),a.a.createElement("div",{className:"page-action-bar__spacer"}),a.a.createElement(i.LinkButton,s,n.title))}}])&&u(n.prototype,r),o&&u(n,o),t}(r.PureComponent)},KFLF:function(e,t,n){"use strict";var r=n("q1tI"),a=n.n(r),c=n("R7n3"),i=n("Csm0"),o=function(e){var t=e.plugin;return a.a.createElement("li",{className:"card-item-wrapper","aria-label":i.selectors.pages.PluginsList.listItem},a.a.createElement("a",{className:"card-item",href:"plugins/".concat(t.id,"/")},a.a.createElement("div",{className:"card-item-header"},a.a.createElement("div",{className:"card-item-type"},t.type),a.a.createElement("div",{className:"card-item-badge"},a.a.createElement(c.a,{status:t.signature})),t.hasUpdate&&a.a.createElement("div",{className:"card-item-notice"},a.a.createElement("span",{"bs-tooltip":"plugin.latestVersion"},"Update available!"))),a.a.createElement("div",{className:"card-item-body"},a.a.createElement("figure",{className:"card-item-figure"},a.a.createElement("img",{src:t.info.logos.small})),a.a.createElement("div",{className:"card-item-details"},a.a.createElement("div",{className:"card-item-name"},t.name),a.a.createElement("div",{className:"card-item-sub-name"},"By ".concat(t.info.author.name))))))};t.a=function(e){var t=e.plugins;return a.a.createElement("section",{className:"card-section card-list-layout-list"},a.a.createElement("ol",{className:"card-list","aria-label":i.selectors.pages.PluginsList.list},t.map((function(e,t){return a.a.createElement(o,{plugin:e,key:"".concat(e.name,"-").concat(t)})}))))}},mGjS:function(e,t,n){"use strict";n.r(t),function(e){n.d(t,"PluginListPage",(function(){return y}));var r=n("q1tI"),a=n.n(r),c=n("0cfB"),i=n("/MKj"),o=n("ZGyg"),s=n("6jYb"),u=n("KFLF"),l=n("jGYO"),f=n("lzJ5"),m=n("y6t6"),p=n("y6L2"),g=n("Y8YH"),d=n("Csm0"),h=n("xLfX");function b(e,t,n,r,a,c,i){try{var o=e[c](i),s=o.value}catch(e){return void n(e)}o.done?t(s):Promise.resolve(s).then(r,a)}function v(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var c=e.apply(t,n);function i(e){b(c,r,a,i,o,"next",e)}function o(e){b(c,r,a,i,o,"throw",e)}i(void 0)}))}}var y=function(e){var t=e.hasFetched,n=e.navModel,r=e.plugins,c=e.setPluginsSearchQuery,i=e.searchQuery,l=e.loadPlugins;Object(g.a)(v(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l();case 1:case"end":return e.stop()}}),e)}))),[l]);return a.a.createElement(o.a,{navModel:n,"aria-label":d.selectors.pages.PluginsList.page},a.a.createElement(o.a.Contents,{isLoading:!t},a.a.createElement(a.a.Fragment,null,a.a.createElement(s.a,{searchQuery:i,setSearchQuery:function(e){return c(e)},linkButton:{href:"https://grafana.com/plugins?utm_source=grafana_plugin_list",title:"Find more plugins on Grafana.com"},target:"_blank"}),a.a.createElement(h.a,null,a.a.createElement(a.a.Fragment,null,a.a.createElement("br",null),a.a.createElement("p",null,"Note that ",a.a.createElement("strong",null,"unsigned front-end datasource and panel plugins")," are still usable, but this is subject to change in the upcoming releases of Grafana"))),t&&r&&a.a.createElement(u.a,{plugins:r}))))};var E={loadPlugins:l.c,setPluginsSearchQuery:p.g};t.default=Object(c.hot)(e)(Object(i.connect)((function(e){return{navModel:Object(f.a)(e.navIndex,"plugins"),plugins:Object(m.b)(e.plugins),searchQuery:Object(m.c)(e.plugins),hasFetched:e.plugins.hasFetched}}),E)(y))}.call(this,n("3UD+")(e))},xLfX:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return w}));var r=n("q1tI"),a=n.n(r),c=n("Csm0"),i=n("kDLi"),o=n("R7n3"),s=n("y6t6"),u=n("jGYO"),l=n("aBYM"),f=n.n(l),m=n("/MKj"),p=n("0cfB"),g=n("kDDq");function d(){var e=v(["\n                    margin-top: 0;\n                  "]);return d=function(){return e},e}function h(){var e=v(["\n                margin-top: ",";\n              "]);return h=function(){return e},e}function b(){var e=v(["\n            list-style-type: circle;\n          "]);return b=function(){return e},e}function v(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function y(e,t,n,r,a,c,i){try{var o=e[c](i),s=o.value}catch(e){return void n(e)}o.done?t(s):Promise.resolve(s).then(r,a)}function E(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var c=e.apply(t,n);function i(e){y(c,r,a,i,o,"next",e)}function o(e){y(c,r,a,i,o,"throw",e)}i(void 0)}))}}var j={loadPluginsErrors:u.d},w=Object(p.hot)(e)(Object(m.connect)((function(e){return{errors:Object(s.a)(e.plugins)}}),j)((function(e){var t=e.loadPluginsErrors,n=e.errors,r=e.children,s=Object(i.useTheme)();return f()(E(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t();case 2:case"end":return e.stop()}}),e)}))),[u.c]).loading||0===n.length?null:a.a.createElement(i.InfoBox,{"aria-label":c.selectors.pages.PluginsList.signatureErrorNotice,severity:"warning",urlTitle:"Read more about plugin signing",url:"https://grafana.com/docs/grafana/latest/plugins/plugin-signatures/"},a.a.createElement("div",null,a.a.createElement("p",null,"We have encountered"," ",a.a.createElement("a",{href:"https://grafana.com/docs/grafana/latest/developers/plugins/backend/",target:"_blank",rel:"noreferrer"},"data source backend plugins")," ","that are unsigned. Grafana Labs cannot guarantee the integrity of unsigned plugins and recommends using signed plugins only."),"The following plugins are disabled and not shown in the list below:",a.a.createElement(i.List,{items:n,className:Object(g.css)(b()),renderItem:function(e){return a.a.createElement("div",{className:Object(g.css)(h(),s.spacing.sm)},a.a.createElement(i.HorizontalGroup,{spacing:"sm",justify:"flex-start",align:"center"},a.a.createElement("strong",null,e.pluginId),a.a.createElement(o.a,{status:Object(o.c)(e.errorCode),className:Object(g.css)(d())})))}}),r))})))}).call(this,n("3UD+")(e))},y6t6:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return a})),n.d(t,"c",(function(){return c}));var r=function(e){var t=new RegExp(e.searchQuery,"i");return e.plugins.filter((function(e){return t.test(e.name)||t.test(e.info.author.name)||t.test(e.info.description)}))},a=function(e){return e.errors},c=function(e){return e.searchQuery}}}]);
//# sourceMappingURL=PluginListPage.854a662a71a515996d8d.js.map