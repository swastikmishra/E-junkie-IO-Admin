<template>
  <div id="templates">
  	<div class="columns is-multiline">
  		<div :class="{'column': true, 'is-2': showTemplates, 'is-1': !showTemplates}">
  			<div class="box details">
		  		<div class="box-title">
		  			<i class="icon ion-md-brush"></i>
		  			<i @click="showTemplates = !showTemplates" :class="{'active':showTemplates, 'icon is-pulled-right':true, 'ion-md-arrow-dropright-circle':!showTemplates, 'ion-md-arrow-dropleft-circle':showTemplates}"></i>
		  			Templates
		  		</div>
		  		<div class="box-content templatesList" v-if="Templates && showTemplates">
		  			<el-button type="danger" plain @click="getTemplate('new')">Add New Template</el-button>
		  			<el-button type="danger" v-for="template, k  in Templates" plain @click="getTemplate(template)">{{template}}</el-button>
		  		</div>
			</div>
  		</div>

  		<div :class="{'column editor': true, 'is-10': showTemplates, 'is-11': !showTemplates}">
  			<div class="box details">
		  		<div class="box-title">
		  			<i class="icon ion-md-create"></i>
		  			<!-- <i @click="editor = !editor" :class="{'active':editor, 'icon is-pulled-right':true, 'ion-md-arrow-dropdown-circle':!editor, 'ion-md-arrow-dropup-circle':editor}"></i> -->
		  			Editor 
		  			<el-input v-if="Template"
					  placeholder="Template Name"
					  v-model="Template.key"
					  size="mini"
					  clearable>
					</el-input>
					<el-button v-if="Template" @click="saveTemplate()" size="small"  icon="el-icon-circle-check"type="success" plain :loading="savingTemplate">Save</el-button>
		  			<el-button v-if="Template" @click="deleteTemplate()" size="small"  icon="el-icon-delete"type="warning" plain :loading="savingTemplate">Delete</el-button>
	    			<el-button v-if="Template" @click="Template= null" size="small" icon="el-icon-circle-close" type="danger" plain>Discard</el-button>
		  		</div>
		  		<div class="box-content" v-if="editor && Template">
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
		  				<textarea id="templateEditorTextarea" v-model="Template.template"></textarea>
	  				</div>
		  		</div>
			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'Templates',
  data () {
    return {
      	Templates: null,
      	Template: null,
      	showTemplates: true,
		editor: true,
		preview: false,
		savingTemplate: false,
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
  watch: {
  	Template: function(val){
  	},
  	editor: function(val){ 
		if(!this.editor && !this.showTemplates && !this.preview)
  			this.editor = true
		this.injectCodeMirror()
  	},
  	showTemplates: function(val){ 
  		if(!this.editor && !this.showTemplates && !this.preview)
  			this.editor = true
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
  mounted: function(){
  	if(typeof Storage !== "undefined"){
      var EditorPrefs = JSON.parse(localStorage.getItem("TemplateEditorPrefs"))
      if(EditorPrefs){
        this.selectedTheme =  EditorPrefs.selectedTheme
        this.wordWrap =  EditorPrefs.wordWrap
        this.editorHeight =  EditorPrefs.editorHeight
        this.selectedFontSize =  EditorPrefs.selectedFontSize
      }
    }
   	this.$notify.info({
      title: 'Ctrl+S',
      message: 'Save changes by pressing Ctrl + S'
    });
  	var self = this
  	this.loader = this.$loading({
	    lock: true,
	    text: 'Loading',
	    spinner: 'el-icon-loading',
	    background: 'rgba(0, 0, 0, 0.7)'
	  });
    this.converter = new showdown.Converter()
    window.addEventListener('keydown', self.keyboardEvent, false)
  	this.axios.post(window.Config.API.endpoint+'templates', {
    })
    .then(response => {
    	self.Templates = response.data
    	setTimeout(() => {
          if(self.loader) self.loader.close();
        }, 500);
    })
    .catch(e => {
      console.log(e)
    })
  },
  methods: {
  	storePrefs: function(){
      var EditorPrefs = {
        selectedTheme: this.selectedTheme,
        wordWrap: this.wordWrap,
        editorHeight: this.editorHeight,
        selectedFontSize: this.selectedFontSize
      }
      if(typeof Storage !== "undefined"){
        localStorage.setItem("TemplateEditorPrefs", JSON.stringify(EditorPrefs));
      }
    },
  	keyboardEvent: function(ev){
        if(ev.key == "s" && ev.ctrlKey){
          ev.preventDefault()
          if(this.savingTemplate) return false
          this.saveTemplate()
        }
    },
  	getTemplate: function(c){
  		if(c == "new"){
  			this.Template = {
  				key: "new",
  				template: ""
  			}
  			setTimeout(this.injectCodeMirror, 200);
  			return false;
  		}
  		var loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var self = this
  		this.axios.post(window.Config.API.endpoint+'template', {
	      key : c,
	    })
	    .then(response => {
	    	self.Template = response.data
	    	self.injectCodeMirror()
	        setTimeout(() => {
	          loading.close();
	        }, 100);
	    })
	    .catch(e => {
	      setTimeout(() => {
	          loading.close();
	        }, 100);
	    })
  	},
  	saveTemplate: function(c){
        var self = this
  		if(self.Template.key == "new"){
			self.$message({
	          showClose: true,
	          message: 'Not a valid template name',
	          type: 'warning'
	        });
  			return false	
  		} 
  		if(!this.myCodeMirror) return false
		this.savingTemplate = true
  		var loading = this.$loading({
          lock: true,
          text: 'Saving',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var self = this
  		this.axios.post(window.Config.API.endpoint+'template/save', {
	      key : self.Template.key,
	      template: self.myCodeMirror.getValue()
	    })
	    .then(response => {
	    	self.Template = response.data.Template
	    	self.Templates = response.data.Templates
	    	self.$message({
	          showClose: true,
	          message: 'Template saved successfully',
	          type: 'success'
	        });
	        setTimeout(() => {
	          loading.close();
	        }, 100);
			this.savingTemplate = false
	    })
	    .catch(e => {
	      setTimeout(() => {
	          loading.close();
	        }, 100);
			this.savingTemplate = false
	    })
  	},
  	deleteTemplate: function(c){
  		this.savingTemplate = true
  		var loading = this.$loading({
          lock: true,
          text: 'Deleting',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var self = this
  		this.axios.post(window.Config.API.endpoint+'template/delete', {
	      key : self.Template.key,
	    })
	    .then(response => {
	    	self.Templates = response.data
	    	self.Template = null
	    	self.$message({
	          showClose: true,
	          message: 'Template deleted !',
	          type: 'danger'
	        });
	        setTimeout(() => {
	          loading.close();
	        }, 100);
			this.savingTemplate = false
	    })
	    .catch(e => {
	      setTimeout(() => {
	          loading.close();
	        }, 100);
			this.savingTemplate = false
	    })
  	},
  	injectCodeMirror: function(){
  		var self = this
  		if(this.Template.template);
  		else if(this.Template.key == "new");
  		else{
  			self.$message({
	          showClose: true,
	          message: 'Can\'t load template!',
	          type: 'warning'
	        });
	        this.Template = null
  			return false;
  		}
  		setTimeout(function(){
			var map = CodeMirror.keyMap.sublime;
    		var tA = document.getElementById("templateEditorTextarea")
    		if(!document.getElementById("templateEditorTextarea").parentNode.children[1])
    			self.myCodeMirror = null
	    		if(self.myCodeMirror){
    			self.myCodeMirror.setValue(self.Template.template)
    			return false;	
    		}
			self.myCodeMirror = CodeMirror(function(elt) {
				var newEle = tA.cloneNode(true);
				tA.parentNode.appendChild(newEle);
  				tA.parentNode.replaceChild(elt, newEle);
			}, {value: self.Template.template,
				lineNumbers: true,
			    mode: "text/html",
			    keyMap: "sublime",
			    autoCloseBrackets: true,
			    matchBrackets: true,
			    showCursorWhenSelecting: true,
			    tabSize: 2,
			    theme: "monokai",
			    matchTags: {bothTags: true},
				extraKeys: {"Ctrl-J": "toMatchingTag"},
			});
			self.myCodeMirror.setSize(null, self.editorHeight*self.myCodeMirror.defaultTextHeight())
	        self.myCodeMirror.setOption("theme", self.selectedTheme);
	        self.myCodeMirror.setOption("lineWrapping", self.wordWrap);
	  	}, 
		1000)
  	}
  },
  destroyed: function(){
    window.removeEventListener('keydown', this.keyboardEvent)
  },
}
</script>

<style scoped>
.is-1 .icon{
    float: none;
    margin: 0 auto;
}
.is-1 .box-title{
	font-size: 0px;
}
.box.details .box-title{
	text-align: center;
}
.box.details .box-title .el-tag{
	float: right;
	margin-top: -5px;
}
.box-content a{
    color: #44ccc0;
    font-size: 16px;
}
.box-content span{
	font-size: 14px;
    border-radius: 2px;
    margin: 0px 0px;
    display: inline-block;
    padding: 0px;
    /*border: 1px solid #607D8B;*/
    /*border: none;*/
    color: #fff;
    /*float: right;*/
    /*margin-right: 10px;*/
}
.box-content .columns{
	margin-bottom: 0px;
}
.box-content span b{
	background: #009688;
	color: white;
	padding: 0px 5px;
	font-weight: normal;
	/*float: right;*/
	border-radius: 3px;
	margin-left: 5px;
}
.editor textarea{
	width: 100%;
	resize: none;
	min-height: 600px;
	outline: none;
  	font-family: Source Code Pro;
  	font-size: 14px;
  	margin-top: 10px;
  	border-radius: 3px;
}
.editor button{
    float: right;
}
.el-switch__label{
	color: #ddd !important;
}
.el-switch__label.is-active{
	color: #fff !important;
}
.box-content .el-switch, .box-content .deleteBtn{
	display: inline-block;
}
.box-content .deleteBtn{
    /*float: right;*/
    color: #FF5722;
    font-size: 20px;
    cursor: pointer;
}
.el-button{
	display: block;
    width: 100%;
    margin: 10px 0px !importa;
}
i.is-pulled-right{
	margin-right: 0px;
}
.icon{
	cursor: pointer;
	margin: 0px;
}
.icon:hover{
	color: #ff9800;
}
.icon.active{
	color: #8BC34A;
}
.editor button{
	display: inline-block;
	width: fit-content;
    margin: 0px 5px;
}
.el-select{
	max-width: 140px;
}
#templateEditorTextarea{
	display: none;
}
.el-input--mini{
	display: inline-block;
	width: fit-content;
	margin-left: 20px;
}
.templatesList button{
	margin: 10px 0px !important;
}
.editor .title{
  color: #fff;
  font-size: 14px;
  display: block;
  margin-top: 5px;
  font-weight: normal;
  margin-bottom: 5px;
}
</style>