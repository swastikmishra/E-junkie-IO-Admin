<template>
  <div id="sidebar">
    <router-link to="/"><i class="icon ion-md-analytics"></i> Dashboard</router-link>
    <router-link to="/pages"><i class="icon ion-md-document"></i> Pages</router-link>
    <router-link to="/themes"><i class="icon ion-md-color-palette"></i> Themes</router-link>
    <router-link to="/templates"><i class="icon ion-md-brush"></i> Templates</router-link>
    <a @click="showAssets()"><i class="icon ion-ios-albums"></i> Assets</a>
    <router-link to="/settings"><i class="icon ion-md-settings"></i> Settings</router-link>
    <router-link to="/integrations"><i class="icon ion-md-infinite"></i> Integrations</router-link>
    <a href="/logout"><i class="icon ion-md-hand"></i> Logout</a>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      assetsDialogVisible: false,
    }
  },
  methods: {
    showAssets: function(){
      this.assetsDialogVisible = !this.assetsDialogVisible
      this.$bus.$emit('showAssets', this.assetsDialogVisible)
      // this.a.app.$bus.$emit('logged', 'User logged')
    }
  }
}
</script>

<style scoped>
#sidebar{
  height: 100vh;
  background: #1e293d;
  width: 155px;
  padding-top: 10px;
  position: fixed;
  left: 0px;
  top: 50px;
}
#sidebar a{
  display: block;
  width: 100%;
  padding: 10px;
  font-family: Montserrat;
  font-size: 14px;
  line-height: 27px;
  color: #424e66;
}
#sidebar a:hover{
  color: #8bc34a;
}
#sidebar a i{
  font-size: 24px;
}
#sidebar .router-link-exact-active{
  color: #8bc34a;
}
</style>

