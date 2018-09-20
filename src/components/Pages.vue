<template>
  <div id="pages">
  	<div class="columns is-multiline">
  		<div class="column is-12">
  			<div class="box details">
		  		<div class="box-title">
		  			<i class="icon ion-md-document"></i>
		  			Pages
		  			<el-input
			            placeholder="Search Pages"
			            v-model="searchText"
			            style="width: 200px"
			            id="searchTextInput"
			            clearable>
			          </el-input>
		  			<el-tag type="danger">{{totalPages}}</el-tag>
		  			<el-button @click="$router.push({ path: '/page/new' })" size="small" icon="el-icon-circle-plus" type="success" plain>Add New Page</el-button>
		  		</div>
		  		<div class="box-content" v-if="Pages">
		  			<div class="columns">
		  				<div class="column is-1"><p>Open</p></div>
	  					<div class="column is-5"><p>Title</p></div>
	  					<div class="column is-2"><p>Created At</p></div>
	  					<div class="column is-2"><p>Updated At</p></div>
	  					<div class="column is-1"><p>Visible</p></div>
	  					<div class="column is-1"><p>Delete</p></div>
	  				</div>
		  			<div class="columns" v-for="Page,K in Pages" v-if="Page.show">
		  				<div class="column is-1">
		  					<a target="_preview" :href="`${K.replace('.md', '')}`">
		  						<i class="icon ion-md-open"></i>
	  						</a>
  						</div>
  						<div class="column is-5">
		  					<router-link :to="`/page/${K}`">
		  						{{Page.title}}
	  						</router-link>
  						</div>
  						<div class="column is-2"><span>{{Page.created_at}}</span></div>
  						<div class="column is-2"><span>{{Page.updated_at}}</span></div>
		  				<div class="column is-1">
		  					<el-switch
							  v-model="Page.visible"
							  active-color="#13ce66"
							  inactive-color="#ff4949"
							  active-text=""
							  inactive-text=""
							  @change="togglePageVisibility(K, Page)">
							</el-switch>
		  				</div>
		  				<div class="column is-1">
		  					<i @click="deletePage(K)" class="icon ion-md-trash deleteBtn"></i>
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
  name: 'Pages',
  data () {
    return {
      Pages: null,
      totalPages: 0,
      loader: null,
      searchText: null,
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
  	this.axios.post(window.Config.API.endpoint+'pages', {})
    .then(response => {
    	setTimeout(() => {
			if(self.loader) self.loader.close();
		}, 500);
    	self.Pages = response.data.Pages
    	self.renderPages()
    })
    .catch(e => {
      console.log(e)
    })
  },
  methods: {
  	renderPages: function(){
  		this.totalPages = 0
  		for(var key in this.Pages){
    		if(this.Pages.hasOwnProperty(key)){
    			this.totalPages++	
    			this.Pages[key].show = true
    		} 
    	}
  	},
  	togglePageVisibility: function(c, o){
  		var loading = this.$loading({
          lock: true,
          text: 'Updating',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var self = this
  		this.axios.post(window.Config.API.endpoint+'page/visibility', {
	      key : c,
	      page: o
	    })
	    .then(response => {
	    	self.Pages = response.data.Pages
	    	self.renderPages()
	        setTimeout(() => {
	          loading.close();
	        }, 500);
	    })
	    .catch(e => {
	      setTimeout(() => {
	          loading.close();
	        }, 500);
	    })
  	},
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
  	},
  	filterPages: function(){
  		if(!this.searchText){
  			for(var kk in this.Pages) this.Pages[kk].show = true
  		}
  		else for(var kk in this.Pages) 
  			if(this.Pages[kk].title.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 || kk.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1) 
  				this.Pages[kk].show = true
  			else
  				this.Pages[kk].show = false
  	}
  },
  watch: {
    searchText: function (val) {
      if(val == "")
        this.searchText = null
      this.filterPages()
    },
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
