<template>
  <div id="settings">
    <div class="columns is-multiline">
      <div class="column is-6">
        <div class="box details">
          <div class="box-title">
            <i class="icon ion-ios-person"></i>
            Account Settings
          </div>
          <div class="box-content">
            <el-form ref="account" :model="account" v-if="account" label-width="100px">
              <el-form-item label="Username">
                <el-input :disabled="true" v-model="account.username" clearable></el-input>
              </el-form-item>
              <el-form-item label="Name">
                <el-input v-model="account.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="Email">
                <el-input v-model="account.email" clearable></el-input>
              </el-form-item>
              <el-form-item label="Password">
                <el-input type="password" v-model="account.password" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveChanges('account')">Save</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>  
      </div>

      <div class="column is-6">
        <div class="box details">
          <div class="box-title">
            <i class="icon ion-ios-cog"></i>
            Website Settings
          </div>
          <div class="box-content">
          <el-form ref="website" :model="website" v-if="website" label-width="100px">
              <el-form-item label="Domain">
                <el-input v-model="website.domain" clearable></el-input>
              </el-form-item>
              <el-form-item label="SSL">
                <el-switch v-model="website.ssl"></el-switch>
              </el-form-item>
              <el-form-item>
              <p style="font-size: 14px;">Site wide properties (Access them through {Site} template variables)</p>
              </el-form-item>
              <el-form-item label="Title">
                <el-input v-model="website.title" clearable></el-input>
              </el-form-item>
              <el-form-item label="Author">
                <el-input v-model="website.author" clearable></el-input>
              </el-form-item>
              <el-form-item label="Description">
                <el-input v-model="website.description" clearable></el-input>
              </el-form-item>
              <el-form-item label="Logo">
                <el-input v-model="website.logo" placeholder="Upload logo in assets and paste the link here" clearable></el-input>
              </el-form-item>
              <el-form-item label="Keywords">
                <el-input v-model="website.keywords" clearable></el-input>
              </el-form-item>
              <el-form-item label="Homepage">
                <el-input v-model="website.home" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveChanges('website')">Save</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>  
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      account: null,
      website: null,
    }
  },
  mounted: function(){
    var self = this
    this.axios.post(window.Config.API.endpoint+'settings', {
    })
    .then(response => {
      self.account = response.data.account
      self.website = response.data.website
    })
    .catch(e => {
    })
  },
  watch: {
  },
  methods: {
    saveChanges: function(key){
      var loading = this.$loading({
        lock: true,
        text: 'Updating',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var self = this
      var data = {}
      if(key == "account"){
        data.account = self.account
      }else{
        data.website = self.website
      }
      this.axios.post(window.Config.API.endpoint+'settings/save', {
        settings: data
      })
      .then(response => {
        setTimeout(() => {
          loading.close();
        }, 100);
        self.account = response.data.account
        self.website = response.data.website
        self.$message({
          showClose: true,
          message: 'Settings saved successfully.',
          type: 'success'
        });
      })
      .catch(e => {
        setTimeout(() => {
            loading.close();
          }, 100);
      })
    },
  },
  destroyed: function(){
  },
}
</script>

<style>
.details label{
  color: #fff !important;
}
</style>