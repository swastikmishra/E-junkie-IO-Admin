webpackJsonp([1],{oLUT:function(e,t){},pMNZ:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={name:"Page",data(){return{key:this.$route.params.page,Page:{content:"",yaml:{title:"",description:"",author:"",keywords:"",template:"static"}},editor:!0,preview:!0,frontmatter:!0,iframeElement:null,converter:null,savingPage:!1,showNewPageInfo:!1,codeMirror:null,selectedTheme:"monokai",selectedFontSize:14,wordWrap:!1,availableThemes:["default","3024-day","3024-night","abcdef","ambiance","base16-dark","base16-light","bespin","blackboard","cobalt","colorforth","darcula","dracula","duotone-dark","duotone-light","eclipse","elegant","erlang-dark","gruvbox-dark","hopscotch","icecoder","idea","isotope","lesser-dark","liquibyte","lucario","material","mbo","mdn-like","midnight","monokai","neat","neo","night","oceanic-next","panda-syntax","paraiso-dark","paraiso-light","pastel-on-dark","railscasts","rubyblue","seti","shadowfox","solarized dark","solarized light","the-matrix","tomorrow-night-bright","tomorrow-night-eighties","ttcn","twilight","vibrant-ink","xq-dark","xq-light","yeti","zenburn"],loader:null,editorHeight:10,availableEditorHeight:[10,15,20,25,30,35,40,45,50]}},mounted:function(){if("undefined"!=typeof Storage){var e=JSON.parse(localStorage.getItem("EditorPrefs"));e&&(this.preview=e.preview,this.editor=e.editor,this.frontmatter=e.frontmatter,this.selectedTheme=e.selectedTheme,this.wordWrap=e.wordWrap,this.editorHeight=e.editorHeight,this.selectedFontSize=e.selectedFontSize)}"new"==this.key&&(this.frontmatter=!0),this.$notify.info({title:"Ctrl+S",message:"Save the page by pressing Ctrl + S"});var t=this;if(this.converter=new showdown.Converter,window.addEventListener("keydown",t.keyboardEvent,!1),"new"==t.key)return t.showNewPageInfo=!0,t.injectCodeMirror(),!1;this.loader=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),this.axios.post(window.Config.API.endpoint+"page",{key:t.key}).then(e=>{setTimeout(()=>{t.loader&&t.loader.close()},500),t.Page=e.data,t.key=t.Page.key,t.injectCodeMirror(),t.updateIframe()}).catch(e=>{})},watch:{preview:function(e){this.editor||this.frontmatter||this.preview||(this.editor=!0),this.storePrefs()},editor:function(e){this.editor||this.frontmatter||this.preview||(this.editor=!0),this.injectCodeMirror(),this.storePrefs()},frontmatter:function(e){this.editor||this.frontmatter||this.preview||(this.editor=!0),this.storePrefs()},selectedTheme:function(e){this.myCodeMirror&&this.myCodeMirror.setOption("theme",e),this.storePrefs()},wordWrap:function(e){this.myCodeMirror&&this.myCodeMirror.setOption("lineWrapping",e),this.storePrefs()},editorHeight:function(e){e=parseInt(e),this.myCodeMirror&&this.myCodeMirror.setSize(null,e*this.myCodeMirror.defaultTextHeight()),this.storePrefs()}},methods:{storePrefs:function(){var e={preview:this.preview,editor:this.editor,frontmatter:this.frontmatter,selectedTheme:this.selectedTheme,wordWrap:this.wordWrap,editorHeight:this.editorHeight,selectedFontSize:this.selectedFontSize};"undefined"!=typeof Storage&&localStorage.setItem("EditorPrefs",JSON.stringify(e))},keyboardEvent:function(e){if("s"==e.key&&e.ctrlKey){if(e.preventDefault(),this.savingPage)return!1;this.saveChanges()}},updateChanges:function(){if(this.showNewPageInfo)return!1;this.iframeElement.contentDocument.getElementById("editor_live_mark").innerHTML=this.converter.makeHtml(this.Page.content)},saveChanges:function(){if(null==this.myCodeMirror)return!1;this.savingPage=!0;var e=this.$loading({lock:!0,text:"Updating",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),t=this;t.Page.yaml.title.toLowerCase();this.axios.post(window.Config.API.endpoint+"page/save",{page:{yaml:t.Page.yaml,content:t.myCodeMirror.getValue()},key:"new"==t.key?t.Page.yaml.title.toLowerCase()+".md":t.key}).then(i=>{setTimeout(()=>{e.close()},100),t.savingPage=!1,t.$message({showClose:!0,message:"Page saved successfully.",type:"success"}),t.showNewPageInfo=!1,t.Page=i.data,t.key=t.Page.key,t.updateIframe()}).catch(i=>{setTimeout(()=>{e.close()},100),t.savingPage=!1})},injectCodeMirror:function(){var e=this;setTimeout(function(){CodeMirror.keyMap.sublime;var t=document.getElementById("pageEditorTextarea");e.myCodeMirror=CodeMirror(function(e){t.parentNode.replaceChild(e,t)},{value:e.Page.content,lineNumbers:!0,mode:"text/html",keyMap:"sublime",autoCloseBrackets:!0,matchBrackets:!0,showCursorWhenSelecting:!0,tabSize:2,theme:"monokai"}),e.myCodeMirror.setSize(null,e.editorHeight*e.myCodeMirror.defaultTextHeight()),e.myCodeMirror.setOption("theme",e.selectedTheme),e.myCodeMirror.setOption("lineWrapping",e.wordWrap),e.myCodeMirror.on("change",function(t){e.Page.content=t.getValue(),e.updateChanges()})},1e3)},updateIframe:function(){var e=this;setTimeout(function(){e.iframeElement||(e.iframeElement=document.getElementById("previewIframe")),e.iframeElement.contentDocument.open(),e.iframeElement.contentDocument.write(e.Page.page),e.iframeElement.contentDocument.close()},1e3)}},destroyed:function(){window.removeEventListener("keydown",this.keyboardEvent)}},o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"page"}},[i("div",{staticClass:"columns is-multiline"},[e.Page?i("div",{staticClass:"column is-12 has-text-right",staticStyle:{"margin-bottom":"-10px"}},[i("h2",[e._v(e._s(e.Page.yaml.title))]),e._v(" "),e.showNewPageInfo?i("el-alert",{attrs:{title:"You can preview the page once you save",type:"info","show-icon":""}}):e._e(),e._v(" "),i("el-button",{attrs:{size:"small",icon:"el-icon-circle-check",type:"success",plain:"",loading:e.savingPage},on:{click:function(t){e.saveChanges()}}},[e._v("Save Changes")]),e._v(" "),i("el-button",{attrs:{size:"small",icon:"el-icon-circle-close",type:"danger",plain:""},on:{click:function(t){e.$router.push({path:"/pages"})}}},[e._v("Discard Changes")])],1):e._e(),e._v(" "),i("div",{class:{column:!0,"is-6":(e.editor||e.frontmatter)&&e.preview,"is-12":e.showNewPageInfo,"is-11":!e.preview,"is-1":!e.editor&&!e.frontmatter&&e.preview}},[i("div",{staticClass:"box details"},[i("div",{staticClass:"box-title"},[i("i",{class:{active:e.frontmatter,icon:!0,"ion-md-arrow-dropdown-circle":!e.frontmatter,"ion-md-arrow-dropup-circle":e.frontmatter},on:{click:function(t){e.frontmatter=!e.frontmatter}}}),e._v("\n\t\t  \t\t\tFrontmatter\n\t\t  \t\t")]),e._v(" "),e.frontmatter&&e.Page?i("div",{staticClass:"box-content frontmatter"},[i("p",[e._v("Page "),i("el-input",{attrs:{placeholder:"Page",clearable:"",size:"mini"},model:{value:e.key,callback:function(t){e.key=t},expression:"key"}})],1),e._v(" "),i("p",[e._v("Title "),i("el-input",{attrs:{placeholder:"Title",clearable:"",size:"mini"},model:{value:e.Page.yaml.title,callback:function(t){e.$set(e.Page.yaml,"title",t)},expression:"Page.yaml.title"}})],1),e._v(" "),i("p",[e._v("Description "),i("el-input",{attrs:{placeholder:"Description",clearable:"",size:"mini"},model:{value:e.Page.yaml.description,callback:function(t){e.$set(e.Page.yaml,"description",t)},expression:"Page.yaml.description"}})],1),e._v(" "),i("p",[e._v("Author "),i("el-input",{attrs:{placeholder:"Author",clearable:"",size:"mini"},model:{value:e.Page.yaml.author,callback:function(t){e.$set(e.Page.yaml,"author",t)},expression:"Page.yaml.author"}})],1),e._v(" "),i("p",[e._v("Keywords "),i("el-input",{attrs:{placeholder:"Keywords",clearable:"",size:"mini"},model:{value:e.Page.yaml.keywords,callback:function(t){e.$set(e.Page.yaml,"keywords",t)},expression:"Page.yaml.keywords"}})],1),e._v(" "),i("p",[e._v("Template "),i("el-input",{attrs:{placeholder:"Template",clearable:"",size:"mini"},model:{value:e.Page.yaml.template,callback:function(t){e.$set(e.Page.yaml,"template",t)},expression:"Page.yaml.template"}})],1)]):e._e()]),e._v(" "),i("div",{staticClass:"box details content"},[i("div",{staticClass:"box-title"},[i("i",{class:{active:e.editor,icon:!0,"ion-md-arrow-dropdown-circle":!e.editor,"ion-md-arrow-dropup-circle":e.editor},on:{click:function(t){e.editor=!e.editor}}}),e._v("\n\t\t  \t\t\tContent\n\t\t  \t\t")]),e._v(" "),e.editor&&e.Page?i("div",{staticClass:"box-content"},[i("div",{staticClass:"columns is-multiline has-text-centered",staticStyle:{"margin-bottom":"0px"}},[i("div",{staticClass:"column is-3"},[i("span",{staticClass:"title"},[e._v("Editor Height")]),e._v(" "),i("el-select",{attrs:{placeholder:"Editor Height(lines)",size:"mini"},model:{value:e.editorHeight,callback:function(t){e.editorHeight=t},expression:"editorHeight"}},e._l(e.availableEditorHeight,function(e){return i("el-option",{key:e,attrs:{label:e,value:e}})}))],1),e._v(" "),i("div",{staticClass:"column is-3"},[i("span",{staticClass:"title"},[e._v("Wordwrap")]),e._v(" "),i("el-switch",{staticStyle:{display:"inline-block","margin-right":"10px","margin-top":"-3px"},attrs:{"active-color":"#13ce66","inactive-color":"#ff4949","active-text":"","inactive-text":""},model:{value:e.wordWrap,callback:function(t){e.wordWrap=t},expression:"wordWrap"}})],1),e._v(" "),i("div",{staticClass:"column is-3"},[i("span",{staticClass:"title"},[e._v("Font Size")]),e._v(" "),i("el-input-number",{attrs:{min:10,max:20,step:2,size:"mini"},model:{value:e.selectedFontSize,callback:function(t){e.selectedFontSize=t},expression:"selectedFontSize"}})],1),e._v(" "),i("div",{staticClass:"column is-3"},[i("span",{staticClass:"title"},[e._v("Theme")]),e._v(" "),i("el-select",{attrs:{placeholder:"Select Theme",size:"mini"},model:{value:e.selectedTheme,callback:function(t){e.selectedTheme=t},expression:"selectedTheme"}},e._l(e.availableThemes,function(e){return i("el-option",{key:e,attrs:{label:e,value:e}})}))],1)]),e._v(" "),i("div",{style:{fontSize:e.selectedFontSize+"px"}},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:e.Page.content,expression:"Page.content"}],attrs:{id:"pageEditorTextarea"},domProps:{value:e.Page.content},on:{input:[function(t){t.target.composing||e.$set(e.Page,"content",t.target.value)},e.updateChanges]}})])]):e._e()])]),e._v(" "),e.showNewPageInfo?e._e():i("div",{class:{column:!0,"is-6":(e.editor||e.frontmatter)&&e.preview,"is-11":!e.editor&&!e.frontmatter,"is-1":(e.editor||e.frontmatter)&&!e.preview}},[i("div",{staticClass:"box details"},[i("div",{staticClass:"box-title"},[i("i",{class:{active:e.preview,icon:!0,"ion-md-arrow-dropright-circle":e.preview,"ion-md-arrow-dropleft-circle":!e.preview},on:{click:function(t){e.preview=!e.preview}}}),e._v("\n\t\t  \t\t\tPreview\n            "),e.editor||e.frontmatter?i("span",[e._v("(Mobile)")]):i("span",[e._v("(Desktop)")])]),e._v(" "),e.Page?i("div",{staticClass:"box-content"},[i("iframe",{staticClass:"previewIframe",attrs:{id:"previewIframe"}})]):e._e()])])])])},staticRenderFns:[]};var r=i("VU/8")(a,o,!1,function(e){i("uQzt"),i("oLUT")},"data-v-59a24109",null);t.default=r.exports},uQzt:function(e,t){}});
//# sourceMappingURL=1.72f14b4be8907691270e.js.map