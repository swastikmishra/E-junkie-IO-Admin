webpackJsonp([3],{axvv:function(t,s){},lO7g:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i={name:"Home",data:()=>({Website:null,User:null,WebsiteStats:null,loader:null}),created:function(){this.loader=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})},mounted:function(){var t=this;this.axios.post(window.Config.API.endpoint+"website",{}).then(s=>{setTimeout(()=>{t.loader&&t.loader.close()},1e3),t.Website=s.data,t.Website.ssl?t.Website.domain="https://"+t.Website.domain:t.Website.domain="http://"+t.Website.domain}).catch(s=>{t.axios.errors.push(s)}),this.axios.post(window.Config.API.endpoint+"websiteStats",{}).then(s=>{t.WebsiteStats=s.data,t.WebsiteStats.recently_added_pages_count=t.WebsiteStats.recently_added_pages.length}).catch(s=>{t.axios.errors.push(s)})}},a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"homepage"}},[e("div",{staticClass:"columns is-multiline"},[e("div",{staticClass:"column is-4"},[e("div",{staticClass:"box details"},[e("div",{staticClass:"box-title"},[t._v("\n\t\t  \t\t\tWebsite Details\n\t\t  \t\t\t"),e("router-link",{attrs:{to:"/settings"}},[e("i",{staticClass:"icon ion-md-settings"})])],1),t._v(" "),t.Website?e("div",{staticClass:"box-content"},[e("img",{attrs:{src:t.Website.logo}}),t._v(" "),e("p",[t._v(t._s(t.Website.title))]),t._v(" "),e("p",[e("a",{attrs:{href:t.Website.domain,target:"_blank"}},[t._v(t._s(t.Website.domain))])]),t._v(" "),e("p",{staticStyle:{clear:"both"}},[t._v("Created On : "),e("span",[t._v(t._s(t.Website.created_at))])])]):t._e()])]),t._v(" "),e("div",{staticClass:"column is-4"},[e("div",{staticClass:"box details"},[e("div",{staticClass:"box-title"},[t._v("\n\t\t  \t\t\tWebsite Stats\n\t\t  \t\t")]),t._v(" "),t.WebsiteStats?e("div",{staticClass:"box-content"},[e("p",[t._v("Total Pages "),e("span",[t._v(t._s(t.WebsiteStats.totalPages))])]),t._v(" "),e("p",[t._v("Last Edit "),e("span",[t._v(t._s(t.WebsiteStats.last_edit.timestamp))])]),t._v(" "),e("p",[t._v("Theme "),e("span",[t._v(t._s(t.Website.theme))])])]):t._e()])]),t._v(" "),e("div",{staticClass:"column is-4"},[e("div",{staticClass:"box details"},[e("div",{staticClass:"box-title"},[t._v("\n\t\t  \t\t\tShortcuts\n\t\t  \t\t")]),t._v(" "),e("div",{staticClass:"box-content"},[e("router-link",{staticClass:"btnLink button",attrs:{to:"/page/new"}},[e("i",{staticClass:"el-icon-circle-plus"}),t._v(" Add New Page")]),t._v(" "),e("router-link",{staticClass:"btnLink button",attrs:{to:"/templates"}},[e("i",{staticClass:"el-icon-edit"}),t._v(" Edit Templates")])],1)])]),t._v(" "),e("div",{staticClass:"column is-6"},[e("div",{staticClass:"box details"},[e("div",{staticClass:"box-title"},[t._v("\n\t\t  \t\t\tRecently Added Pages\n\t\t  \t\t")]),t._v(" "),t.WebsiteStats?e("div",{staticClass:"box-content"},t._l(t.WebsiteStats.recently_added_pages,function(s,i){return e("p",[e("router-link",{attrs:{to:"/page/"+i}},[t._v(t._s(s.title)+" "),e("span",[t._v(t._s(s.created_at))])])],1)})):t._e()])]),t._v(" "),e("div",{staticClass:"column is-6"},[e("div",{staticClass:"box details"},[e("div",{staticClass:"box-title"},[t._v("\n\t\t  \t\t\tRecently Edited Pages\n\t\t  \t\t")]),t._v(" "),t.WebsiteStats?e("div",{staticClass:"box-content"},t._l(t.WebsiteStats.recently_edited_pages,function(s,i){return e("p",[e("router-link",{attrs:{to:"/page/"+i}},[t._v(t._s(s.title)+" "),e("span",[t._v(t._s(s.updated_at))])])],1)})):t._e()])])])])},staticRenderFns:[]};var n=e("VU/8")(i,a,!1,function(t){e("axvv")},"data-v-7bdcebe1",null);s.default=n.exports}});
//# sourceMappingURL=3.529614a594b411b9f139.js.map