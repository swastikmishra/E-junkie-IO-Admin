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
                <div class="box theme">
                  <button class="delete is-medium" v-if="Theme.key != selectedTheme" @click="deleteTheme(Theme.key)"></button>
                  <img :src="Theme.thumbnail">
                  <div class="content">
                    <h3>{{Theme.name}}</h3>
                    <p>{{Theme.author}}</p>
                    <a class="button is-link is-outlined" :href="Theme.demo" target="_blank">Demo</a>
                    <a class="button is-info is-outlined" :href="Theme.homepage" target="_blank">Homepage</a>
                  </div>
                  <button class="button is-primary is-fullwidth" v-if="Theme.key != selectedTheme" @click="selectTheme(Theme.key)"><i class="ion-md-checkmark"></i> Select</button>
                  <button class="button is-success is-fullwidth" v-else><i class="ion-md-thumbs-up"></i> Selected</button>
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
    	self.selectedTheme = response.data.selectedTheme
      self.renderThemes()
    })
    .catch(e => {
      console.log(e)
    })
  },
  methods: {
    renderThemes: function(){
      for(var x in this.Themes){
        if(!this.Themes[x].thumbnail) this.Themes[x].thumbnail = "https://carepharmaceuticals.com.au/wp-content/uploads/sites/19/2018/02/placeholder-600x400.png";
      }
    },
  	selectTheme: function(c){
  		var loading = this.$loading({
          lock: true,
          text: 'Updating',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var self = this
  		this.axios.post(window.Config.API.endpoint+'theme/save', {
	      key : c,
	    })
	    .then(response => {
        self.Themes = response.data.themes
        self.selectedTheme = response.data.selectedTheme	
        self.renderThemes()
		    self.$message({
	          showClose: true,
	          message: 'Theme selected',
	          type: 'success'
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
    deleteTheme: function(c){
      var loading = this.$loading({
          lock: true,
          text: 'Updating',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var self = this
      this.axios.post(window.Config.API.endpoint+'theme/delete', {
        key : c,
      })
      .then(response => {
        self.Themes = response.data.themes
        self.selectedTheme = response.data.selectedTheme  
        self.renderThemes()
        self.$message({
            showClose: true,
            message: 'Theme deleted',
            type: 'success'
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
.theme{
  padding: 0px;
  margin-bottom: 10px;
}
.theme img{
  display: block;
  width: 100%;
  float: unset;
  max-width: 100%;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  margin-bottom: 10px;
}
.theme .content{
  padding: 10px;
  margin-bottom: 0px;
}
.theme h3{
  font-size: 16px;
  font-weight: normal;
}
.theme p{
  font-size: 14px;
  color: #607D8B;
}
.theme a{
  font-size: 14px;
}
.theme .is-outlined{
  width: 49%;
}
.theme .is-fullwidth{
  border-radius: 0px;
  font-size: 15px;
}
.theme .is-success{
  background-color: #4CAF50;
}
.theme .is-primary{
  background-color: #209cee;
}
.theme .is-warning{
  background-color: #F44336;
  color: white;
}
.theme i{
  float: left;
  margin-right: 10px;
}
.theme .delete{
  float: right;
  margin-bottom: -29px;
  margin-right: 10px;
  margin-top: 5px;
}
</style>
