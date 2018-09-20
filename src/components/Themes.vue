<template>
  <div id="themes">
  	<div class="columns is-multiline">
  		<div class="column is-12">
  			<div class="box details">
		  		<div class="box-title">
		  			<i class="icon ion-md-color-palette"></i>
		  			Downloaded Themes
		  		</div>
		  		<div class="box-content" v-if="Themes">
            <div class="columns is-multiline">
              <div class="column is-3" v-for="Theme in Themes">
                <div class="box">
                  <img :src="Theme.thumbnail">
                  <h3>{{Theme.name}}</h3>
                  <p>{{Theme.author}}</p>
                  <a :href="Theme.demo" target="_blank">Demo</a>
                  <a :href="Theme.homepage" target="_blank">Homepage</a>
                  <span class="tag is-success is-medium is-rounded" v-if="Theme.name == selectedTheme">Selected</span>
                </div>
              </div>
            </div>
		  		</div>
        </div>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'Themes',
  data () {
    return {
      Themes: null,
      selectedTheme: null,
      loader: null,
    }
  },
  mounted: function(){
  	var self = this
  	this.loader = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
  	this.axios.post(window.Config.API.endpoint+'themes', {})
    .then(response => {
    	setTimeout(() => {
			if(self.loader) self.loader.close();
		}, 500);
      self.Themes = response.data.themes
      for(var x in self.Themes){
        if(!self.Themes[x].thumbnail) self.Themes[x].thumbnail = "https://carepharmaceuticals.com.au/wp-content/uploads/sites/19/2018/02/placeholder-600x400.png";
      }
    	self.selectedTheme = response.data.selectedTheme
    })
    .catch(e => {
      console.log(e)
    })
  },
  methods: {
  	deletePage: function(c){
  		var loading = this.$loading({
          lock: true,
          text: 'Updating',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var self = this
  		this.axios.post(window.Config.API.endpoint+'page/delete', {
	      key : c,
	    })
	    .then(response => {
	    	self.Pages = response.data.Pages
	    	self.renderPages()
		    self.$message({
	          showClose: true,
	          message: 'Page deleted !',
	          type: 'danger'
	        });
	        setTimeout(() => {
	          loading.close();
	        }, 500);
	    })
	    .catch(e => {
	      setTimeout(() => {
	          loading.close();
	        }, 500);
	    })
  	}
  },
  watch: {
  }
}
</script>

<style scoped>
.box.details .box-title{
	text-align: left;
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
.el-button--success{
	float: right;
	margin-right: 15px;
	margin-top: -2px;
}
</style>
<style>
.box.details #searchTextInput{
    margin-left: 5px !important; 
    height: 25px !important; 
    border-radius: 3px !important; 
    background: #303f54 !important; 
    border: 1px solid #1a233c !important; 
    color: #eee !important; 
    padding-right: 0px;
}
</style>
