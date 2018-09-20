7<template>
  <div id="page">
  	<div class="columns is-multiline">
      <div style="margin-bottom: -10px;" class="column is-12 has-text-right" v-if="Page">
        <h2>{{Page.yaml.title}}</h2>
        <el-alert
          title="You can preview the page once you save"
          type="info"
          show-icon
          v-if="showNewPageInfo">
        </el-alert>
        <el-button @click="saveChanges()" size="small"  icon="el-icon-circle-check"type="success" plain :loading="savingPage">Save Changes</el-button>
        <el-button @click="$router.push({ path: '/pages' })" size="small" icon="el-icon-circle-close" type="danger" plain>Discard Changes</el-button>
      </div>
  		<div v-bind:class="{ 'column': true, 'is-6': (editor || frontmatter) && preview, 'is-12': showNewPageInfo, 'is-11': !preview, 'is-1': !editor && !frontmatter && preview}">
  			<div class="box details">
		  		<div class="box-title">
		  			<i @click="frontmatter = !frontmatter" :class="{'active':frontmatter, 'icon':true, 'ion-md-arrow-dropdown-circle':!frontmatter, 'ion-md-arrow-dropup-circle':frontmatter}"></i>
		  			Frontmatter
		  		</div>
		  		<div class="box-content frontmatter" v-if="frontmatter && Page">
            <p>Page <el-input placeholder="Page" clearable size="mini" v-model="key"></el-input></p>
            <p>Title <el-input placeholder="Title" clearable size="mini" v-model="Page.yaml.title"></el-input></p>
            <p>Description <el-input placeholder="Description" clearable size="mini" v-model="Page.yaml.description"></el-input></p>
            <p>Author <el-input placeholder="Author" clearable size="mini" v-model="Page.yaml.author"></el-input></p>
            <p>Keywords <el-input placeholder="Keywords" clearable size="mini" v-model="Page.yaml.keywords"></el-input></p>
            <p>Template <el-input placeholder="Template" clearable size="mini" v-model="Page.yaml.template"></el-input></p>
		  		</div>
			</div>
  			<div class="box details content">
		  		<div class="box-title">
		  			<i @click="editor = !editor" :class="{'active':editor, 'icon':true, 'ion-md-arrow-dropdown-circle':!editor, 'ion-md-arrow-dropup-circle':editor}"></i>
		  			Content
		  		</div>
		  		<div class="box-content" v-if="editor && Page">
            <div class="columns is-multiline has-text-centered" style="margin-bottom: 0px;">
              <div class="column is-3">
                <span class="title">Editor Height</span>
                <el-select v-model="editorHeight" placeholder="Editor Height(lines)" size="mini">
                  <el-option
                    v-for="item in availableEditorHeight"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
              <div class="column is-3">
                <span class="title">Wordwrap</span>
                <el-switch
                  style="display: inline-block;margin-right: 10px;margin-top: -3px;"
                  v-model="wordWrap"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text=""
                  inactive-text="">
                </el-switch>
              </div>
              <div class="column is-3">
                <span class="title">Font Size</span>
                <el-input-number :min="10" :max="20" :step="2" size="mini" v-model="selectedFontSize"></el-input-number>
              </div>
              <div class="column is-3">
                <span class="title">Theme</span>
                <el-select v-model="selectedTheme" placeholder="Select Theme" size="mini">
                  <el-option
                    v-for="item in availableThemes"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div v-bind:style="{ fontSize: selectedFontSize + 'px' }">
              <textarea id="pageEditorTextarea" @input="updateChanges" v-model="Page.content"></textarea>
            </div>
		  		</div>
			</div>
  		</div>
  		<div v-if="!showNewPageInfo" v-bind:class="{ 'column': true, 'is-6': (editor || frontmatter) && preview, 'is-11': !editor && !frontmatter, 'is-1': (editor || frontmatter) && !preview}">
  			<div class="box details">
		  		<div class="box-title">
		  			<i @click="preview = !preview" :class="{'active':preview, 'icon':true, 'ion-md-arrow-dropright-circle':preview, 'ion-md-arrow-dropleft-circle': !preview}"></i>
		  			Preview
            <span v-if="!editor && !frontmatter">(Desktop)</span>
            <span v-else>(Mobile)</span>
		  		</div>
		  		<div class="box-content" v-if="Page">
		  			<iframe id="previewIframe" class="previewIframe"></iframe>
		  		</div>
			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'Page',
  data () {
    return {
    	key: this.$route.params.page,
    	Page: {
        content : "",
        yaml : {
          title: "",
          description: "",
          author: "",
          keywords: "",
          template: "static",
        }
      },
    	editor: true,
    	preview: true,
    	frontmatter: true,
      iframeElement: null,
      converter: null,
      savingPage: false,
      showNewPageInfo: false,
      codeMirror: null,
      selectedTheme: 'monokai',
      selectedFontSize: 14,
      wordWrap: false,
      availableThemes: [
        'default','3024-day','3024-night','abcdef','ambiance','base16-dark','base16-light','bespin','blackboard','cobalt','colorforth','darcula','dracula','duotone-dark','duotone-light','eclipse','elegant','erlang-dark','gruvbox-dark','hopscotch','icecoder','idea','isotope','lesser-dark','liquibyte','lucario','material','mbo','mdn-like','midnight','monokai','neat','neo','night','oceanic-next','panda-syntax','paraiso-dark','paraiso-light','pastel-on-dark','railscasts','rubyblue','seti','shadowfox','solarized dark','solarized light','the-matrix','tomorrow-night-bright','tomorrow-night-eighties','ttcn','twilight','vibrant-ink','xq-dark','xq-light','yeti','zenburn',
      ],
      loader: null,
      editorHeight: 10,
      availableEditorHeight: [10, 15, 20, 25, 30, 35, 40, 45, 50],
    }
  },
  mounted: function(){
    if(typeof Storage !== "undefined"){
      var EditorPrefs = JSON.parse(localStorage.getItem("EditorPrefs"))
      if(EditorPrefs){
        this.preview =  EditorPrefs.preview
        this.editor =  EditorPrefs.editor
        this.frontmatter =  EditorPrefs.frontmatter
        this.selectedTheme =  EditorPrefs.selectedTheme
        this.wordWrap =  EditorPrefs.wordWrap
        this.editorHeight =  EditorPrefs.editorHeight
        this.selectedFontSize =  EditorPrefs.selectedFontSize
      }
    }
    if(this.key == "new") this.frontmatter = true
    this.$notify.info({
      title: 'Ctrl+S',
      message: 'Save the page by pressing Ctrl + S'
    });
  	var self = this
    this.converter = new showdown.Converter()
    window.addEventListener('keydown', self.keyboardEvent, false)
    if(self.key == "new"){
      self.showNewPageInfo = true
      self.injectCodeMirror()
      return false;
    } 
    this.loader = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
  	this.axios.post(window.Config.API.endpoint+'page', {
        key : self.key,
      })
      .then(response => {
        setTimeout(() => {
          if(self.loader) self.loader.close();
        }, 500);
      	self.Page = response.data
        self.key = self.Page.key
        self.injectCodeMirror()
        self.updateIframe()
      })
      .catch(e => {
      })
  },
  watch: {
  	preview: function(val){ 
  		if(!this.editor && !this.frontmatter && !this.preview)
  			this.editor = true
      this.storePrefs()
  	},
  	editor: function(val){ 
		  if(!this.editor && !this.frontmatter && !this.preview)
  			this.editor = true
        this.injectCodeMirror()
      this.storePrefs()
  	},
  	frontmatter: function(val){ 
  		if(!this.editor && !this.frontmatter && !this.preview)
  			this.editor = true
      this.storePrefs()
  	},
    selectedTheme: function(val){
      if(this.myCodeMirror)
        this.myCodeMirror.setOption("theme", val);
      this.storePrefs()
    },
    wordWrap: function(val){
      if(this.myCodeMirror)
        this.myCodeMirror.setOption("lineWrapping", val);
      this.storePrefs()
    },
    editorHeight: function(val){
      val = parseInt(val)
      if(this.myCodeMirror)
        this.myCodeMirror.setSize(null, val*this.myCodeMirror.defaultTextHeight())
      this.storePrefs()
    }
  },
  methods: {
    storePrefs: function(){
      var EditorPrefs = {
        preview: this.preview,
        editor: this.editor,
        frontmatter: this.frontmatter,
        selectedTheme: this.selectedTheme,
        wordWrap: this.wordWrap,
        editorHeight: this.editorHeight,
        selectedFontSize: this.selectedFontSize
      }
      if(typeof Storage !== "undefined"){
        localStorage.setItem("EditorPrefs", JSON.stringify(EditorPrefs));
      }
    },
    keyboardEvent: function(ev){
        if(ev.key == "s" && ev.ctrlKey){
          ev.preventDefault()
          if(this.savingPage) return false
          this.saveChanges()
        }
    },
    updateChanges: function(){
      if(this.showNewPageInfo) return false;
      this.iframeElement.contentDocument.getElementById('editor_live_mark').innerHTML = this.converter.makeHtml(this.Page.content);
    },
  	saveChanges: function(){
      if(this.myCodeMirror == null) return false
      this.savingPage = true
  		var loading = this.$loading({
        lock: true,
        text: 'Updating',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var self = this
      var tmpKey = self.Page.yaml.title.toLowerCase()+".md"
  		this.axios.post(window.Config.API.endpoint+'page/save', {
	      page: {
          yaml: self.Page.yaml,
          content: self.myCodeMirror.getValue()
        },
        key: (self.key == "new" ? self.Page.yaml.title.toLowerCase()+".md" : self.key ),
	    })
	    .then(response => {
	        setTimeout(() => {
	          loading.close();
	        }, 100);
        self.savingPage = false
        self.$message({
          showClose: true,
          message: 'Page saved successfully.',
          type: 'success'
        });
        self.showNewPageInfo = false
        self.Page = response.data
        self.key = self.Page.key
        self.updateIframe()
	    })
	    .catch(e => {
	      setTimeout(() => {
	          loading.close();
	        }, 100);
        self.savingPage = false
	    })
  	},
    injectCodeMirror: function(){
      var self = this
      setTimeout(function(){
        var map = CodeMirror.keyMap.sublime;
        var tA = document.getElementById("pageEditorTextarea")
        self.myCodeMirror = CodeMirror(function(elt) {
            tA.parentNode.replaceChild(elt, tA);
        }, {value: self.Page.content,
            lineNumbers: true,
            mode: "text/html",
            keyMap: "sublime",
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            tabSize: 2,
            theme: "monokai",
        }); 
        self.myCodeMirror.setSize(null, self.editorHeight*self.myCodeMirror.defaultTextHeight())
        self.myCodeMirror.setOption("theme", self.selectedTheme);
        self.myCodeMirror.setOption("lineWrapping", self.wordWrap);
        self.myCodeMirror.on('change',function(cMirror){
          self.Page.content = cMirror.getValue()
          self.updateChanges()
        });
      }, 
      1000)
    },
    updateIframe: function(){
      var self = this
      setTimeout(function(){
        if(!self.iframeElement)
          self.iframeElement = document.getElementById('previewIframe')
        self.iframeElement.contentDocument.open();
        self.iframeElement.contentDocument.write(self.Page.page);
        self.iframeElement.contentDocument.close();
      }, 1000)
    }
  },
  destroyed: function(){
    window.removeEventListener('keydown', this.keyboardEvent)
  },
}
</script>

<style scoped>
.icon{
	margin-right: -24px;
	cursor: pointer;
}
.icon:hover{
	color: #ff9800;
}
.icon.active{
	color: #8BC34A;
}
.is-1 .icon{
    float: none;
    margin: 0 auto;
}
.is-1 .box-title{
	font-size: 0px;
}
.box.details .box-title{
	padding: 4px;
}
.box.details{
	margin-bottom: 10px;
}
.content .box-content{
	padding: 2px !important;
}
.content .box-title{
	margin-bottom: 0px !important;
}
.content textarea{
	width: 100%;
	resize: none;
	min-height: 600px;
	outline: none;
  font-family: Source Code Pro;
  font-size: 14px;
}
.previewIframe{
	width: 100%;
    min-height: 645px;
    background: #efefef;
    border-radius: 4px;
}
.frontmatter p{
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  line-height: 25px;
}
.el-input .el-input__inner{
  border-radius: 2px;
  background: #1f2b3d;
  color: white;
  border: none;
  font-size: 25px;
  margin-top: 20px;
  padding: 0px;
}
h2{
  display: inline-block;
  width: fit-content;
  margin-right: 20px;
  font-size: 20px;
  color: white;
  vertical-align: middle;
  float: left;
}
.el-button{
  display: inline-block;
}
.CodeMirror-scroll{
  min-height: 600px;
}
.content .title{
  color: #fff;
  font-size: 14px;
  display: block;
  margin-top: 5px;
  font-weight: normal;
  margin-bottom: 5px;
}
</style>
<style>
/*.CodeMirror {
  height: auto;
}*/
</style>
