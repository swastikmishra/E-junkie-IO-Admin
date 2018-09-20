<template>
  <div id="homepage">
  	<div class="columns is-multiline">
  		<div class="column is-4">
  			<div class="box details">
		  		<div class="box-title">
		  			Website Details
		  			<router-link to="/settings"><i class="icon ion-md-settings"></i></router-link>
		  		</div>
		  		<div class="box-content" v-if="Website">
			  		<img v-bind:src="Website.logo">
			  		<p>{{Website.title}}</p>
			  		<p><a v-bind:href="Website.domain" target="_blank">{{Website.domain}}</a></p>
			  		<p style="clear: both">Created On : <span>{{Website.created_at}}</span></p>
		  		</div>
			</div>
  		</div>

  		<div class="column is-4">
  			<div class="box details">
		  		<div class="box-title">
		  			Website Stats
		  		</div>
		  		<div class="box-content" v-if="WebsiteStats">
			  		<p>Total Pages <span>{{WebsiteStats.totalPages}}</span></p>
            <p>Last Edit <span>{{WebsiteStats.last_edit.timestamp}}</span></p>
			  		<p>Theme <span>{{Website.theme}}</span></p>
		  		</div>
			</div>
  		</div>
  		
  		<div class="column is-4">
  			<div class="box details">
		  		<div class="box-title">
		  			Shortcuts
		  		</div>
		  		<div class="box-content">
			  		<router-link to="/page/new" class="btnLink button"><i class="el-icon-circle-plus"></i> Add New Page</router-link>
			  		<router-link to="/templates" class="btnLink button"><i class="el-icon-edit"></i> Edit Templates</router-link>
		  		</div>
			</div>
  		</div>

  		<div class="column is-6">
  			<div class="box details">
		  		<div class="box-title">
		  			Recently Added Pages
		  		</div>
		  		<div class="box-content" v-if="WebsiteStats">
			  		<p v-for="pages,k in WebsiteStats.recently_added_pages"><router-link :to="`/page/${k}`">{{pages.title}} <span>{{pages.created_at}}</span></router-link></p>
		  		</div>
			</div>
  		</div>

  		<div class="column is-6">
  			<div class="box details">
		  		<div class="box-title">
		  			Recently Edited Pages
		  		</div>
		  		<div class="box-content" v-if="WebsiteStats">
			  		<p v-for="pages,k in WebsiteStats.recently_edited_pages"><router-link :to="`/page/${k}`">{{pages.title}} <span>{{pages.updated_at}}</span></router-link></p>
		  		</div>
			</div>
  		</div>

  	</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      Website: null,
      User: null,
      WebsiteStats: null,
      loader: null,
    }
  },
  created: function(){
  	this.loader = this.$loading({
	    lock: true,
	    text: 'Loading',
	    spinner: 'el-icon-loading',
	    background: 'rgba(0, 0, 0, 0.7)'
	  });
  },
  mounted: function(){
  	var self = this
  	this.axios.post(window.Config.API.endpoint+'website', {})
    .then(response => {
    	setTimeout(() => {
	      if(self.loader) self.loader.close();
	    }, 1000);
    	self.Website = response.data
    	if(self.Website.ssl) self.Website.domain = "https://"+self.Website.domain
    	else self.Website.domain = "http://"+self.Website.domain
    })
    .catch(e => {
      self.axios.errors.push(e)
    })

    this.axios.post(window.Config.API.endpoint+'websiteStats', {})
    .then(response => {
    	self.WebsiteStats = response.data
    	self.WebsiteStats.recently_added_pages_count = self.WebsiteStats.recently_added_pages.length
    })
    .catch(e => {
      self.axios.errors.push(e)
    })

  },
}
</script>

<style scoped>

</style>
