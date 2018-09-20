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
		  		<div class="box-content" v-if="Templates && showTemplates">
		  			<el-button type="danger" plain @click="getTemplate('new')">Add New Template</el-button>
		  			<el-button type="danger" v-for="template, k  in Templates" plain @click="getTemplate(template)">{{template}}</el-button>
		  		</div>
			</div>
  		</div>

  		<div :class="{'column editor': true, 'is-6': (preview && !showTemplates), 'is-9': (!preview && showTemplates), 'is-5': editor, 'is-1': !editor, 'is-10': (!preview && !showTemplates)}">
  			<div class="box details">
		  		<div class="box-title">
		  			<i class="icon ion-md-create"></i>
		  			<i @click="editor = !editor" :class="{'active':editor, 'icon is-pulled-right':true, 'ion-md-arrow-dropdown-circle':!editor, 'ion-md-arrow-dropup-circle':editor}"></i>
		  			Editor 
		  			<el-input v-if="Template"
					  placeholder="Template Name"
					  v-model="Template.key"
					  size="mini"
					  clearable>
					</el-input>
		  		</div>
		  		<div class="box-content" v-if="Template && editor">
		  			<div style="margin-bottom: 10px; display: block; text-align:right;">
		  				<el-switch
						  style="display: inline-block;margin-right: 10px;margin-top: -3px;"
						  v-model="wordWrap"
						  active-color="#13ce66"
						  inactive-color="#ff4949"
						  active-text="Wordwrap"
						  inactive-text="">
						</el-switch>
		  				<el-input-number :min="10" :max="20" :step="2" size="mini" v-model="selectedFontSize"></el-input-number>
		  				<el-select v-model="selectedTheme" placeholder="Select Theme" size="mini">
							<el-option
							  v-for="item in availableThemes"
							  :key="item"
							  :label="item"
							  :value="item">
							</el-option>
						</el-select>
						<el-button @click="saveTemplate()" size="small"  icon="el-icon-circle-check"type="success" plain :loading="savingTemplate">Save</el-button>
			  			<el-button @click="deleteTemplate()" size="small"  icon="el-icon-delete"type="warning" plain :loading="savingTemplate">Delete</el-button>
	        			<el-button @click="Template= null" size="small" icon="el-icon-circle-close" type="danger" plain>Discard</el-button>
        			</div>
        			<div v-bind:style="{ fontSize: selectedFontSize + 'px' }">
		  				<textarea id="templateEditorTextarea" v-model="Template.template"></textarea>
	  				</div>
		  		</div>
			</div>
  		</div>

  		<div :class="{'column': true, 'is-5': preview, 'is-1': !preview, 'is-10': (!showTemplates && !editor)}">
  			<div class="box details">
		  		<div class="box-title">
		  			<i class="icon ion-md-eye"></i>
		  			<i @click="preview = !preview" :class="{'active':preview, 'icon is-pulled-right':true, 'ion-md-arrow-dropdown-circle':!preview, 'ion-md-arrow-dropup-circle':preview}"></i>
		  			Preview 
		  			<span v-if="!editor">(Desktop)</span>
		            <span v-else>(Mobile)</span>
		  		</div>
		  		<div class="box-content" v-if="Template && preview">
		  			<iframe id="previewIframe" class="previewIframe"></iframe>
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
    }
  },
  watch: {
  	preview: function(val){ 
  		if(!this.editor && !this.showTemplates && !this.preview)
  			this.editor = true
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
  		this.myCodeMirror.setOption("theme", val);
  	},
  	wordWrap: function(val){
  		this.myCodeMirror.setOption("lineWrapping", val);
  	}
  },
  mounted: function(){
   	// this.$notify.info({
   //    title: 'Ctrl+S',
   //    message: 'Save the page by pressing Ctrl + S'
   //  });
  	var self = this
    this.converter = new showdown.Converter()
    window.addEventListener('keydown', self.keyboardEvent, false)
  	this.axios.post('http://localhost/CMS/api/templates', {
      user: 'peepalfarm',
    })
    .then(response => {
    	self.Templates = response.data
    })
    .catch(e => {
      console.log(e)
    })
  },
  methods: {
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
  				key: "",
  				template: ""
  			}
	    	this.injectCodeMirror()
  			return false;
  		}
  		var loading = this.$loading({
          lock: true,
          text: 'Updating',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var self = this
  		this.axios.post('http://localhost/CMS/api/template', {
	      user: 'peepalfarm',
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
  		this.axios.post('http://localhost/CMS/api/template/save', {
	      user: 'peepalfarm',
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
  		this.axios.post('http://localhost/CMS/api/template/delete', {
	      user: 'peepalfarm',
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
  		setTimeout(function(){
			var map = CodeMirror.keyMap.sublime;
    		var tA = document.getElementById("templateEditorTextarea")
    		if(self.myCodeMirror){
    			self.myCodeMirror.setValue(self.Template.template)
    			return false;	
    		}
	 		self.myCodeMirror = CodeMirror(function(elt) {
  				tA.parentNode.replaceChild(elt, tA);
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
    /*float: right;*/
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
    margin: 10px 0px;
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
</style>
