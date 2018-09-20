<template>
  <div id="pages">
  	<div class="columns is-multiline">
  		<div class="column is-12">
  			<div class="box details">
		  		<div class="box-title">
		  			<i class="icon ion-md-document"></i>
		  			Pages
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
		  			<div class="columns" v-for="Page,K in Pages">
		  				<div class="column is-1">
		  					<router-link :to="`/page/${K}`">
		  						<i class="icon ion-md-open"></i>
	  						</router-link>
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
      totalPages: 0
    }
  },
  mounted: function(){
  	var self = this
  	this.axios.post('http://localhost/CMS/api/pages', {
      user: 'peepalfarm',
    })
    .then(response => {
    	self.Pages = response.data
    	for(var key in self.Pages){
    		if(self.Pages.hasOwnProperty(key)) self.totalPages++
    	}
    })
    .catch(e => {
      console.log(e)
    })
  },
  methods: {
  	togglePageVisibility: function(c, o){
  		var loading = this.$loading({
          lock: true,
          text: 'Updating',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var self = this
  		this.axios.post('http://localhost/CMS/api/page/visibility', {
	      user: 'peepalfarm',
	      key : c,
	      page: o
	    })
	    .then(response => {
	    	self.Pages = response.data
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
  	deletePage: function(c){
  		var loading = this.$loading({
          lock: true,
          text: 'Updating',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var self = this
  		this.axios.post('http://localhost/CMS/api/page/delete', {
	      user: 'peepalfarm',
	      key : c,
	    })
	    .then(response => {
	    	self.Pages = response.data
	    	self.totalPages = 0
	    	for(var key in self.Pages){
	    		if(self.Pages.hasOwnProperty(key)) self.totalPages++
	    	}
		    self.$message({
	          showClose: true,
	          message: 'Page deleted !',
	          type: 'danger'
	        });
	        setTimeout(() => {
	          loading.close();
	        }, 100);
	    })
	    .catch(e => {
	      setTimeout(() => {
	          loading.close();
	        }, 100);
	    })
  	}
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
