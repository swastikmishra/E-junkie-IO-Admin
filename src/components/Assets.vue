<template>
  <div id="assets">
  	<el-dialog
      title="Assets"
      :visible.sync="assetsDialogVisible"
      :fullscreen="true">
      <div class="columns is-multiline">
        <div class="column is-8">
          <el-input
            placeholder="Search Assets"
            v-model="searchText"
            clearable>
          </el-input>
          <table class="table is-striped is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Url</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="asset,k in Assets" v-if="asset.visible">
                <th>{{asset.asset}}</th>
                <th><a :href="asset.url" target="_preview">{{asset.url}}</a></th>
                <th>
                  <abbr title="Preview Asset"><el-button @click="viewAsset(asset.url)" type="info" icon="ion-md-open"></el-button></abbr>
                  <abbr title="Copy URL"><el-button v-clipboard:copy="asset.url" v-clipboard:success="urlCopied" type="link" icon="ion-ios-copy"></el-button></abbr>
                  <abbr title="Delete Asset"><el-button @click="deleteAsset(asset.key)" type="danger" icon="el-icon-delete"></el-button></abbr>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="column is-3">
          <el-upload
            class="upload-demo"
            drag
            :action="upploadAction"
            ref="assetUpload"
            :file-list="fileList"
            list-type="picture"
            :data="data"
            :on-success="assetsUploaded"
            :on-progress="assetsUploadProgress"
            multiple>
            <!-- :auto-upload="false"> -->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <div class="el-upload__tip" slot="tip">jpg/png/gif/mp4/webm/css/js files with a size less than 5mb</div>
          </el-upload>  
          <el-progress v-if="uploadPercentage != 0" :text-inside="true" :stroke-width="18" :percentage="uploadPercentage" status="success"></el-progress>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="Preview"
      :visible.sync="showPreviewDialog"
      width="50%"
      center>
      <img :src="previewUrl">
      <span slot="footer" class="dialog-footer">
        <el-button @click="showPreviewDialog = false">Cancel</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'Assets',
  data () {
    return {
      assetsDialogVisible : false,
      showPreviewDialog: false,
      Assets: null,
      previewUrl: null,
      fileList: [],
      data:{},
      uploadPercentage: 0,
      upploadAction: window.Config.API.endpoint+"assets/save",
      searchText: null,
      loader: null,
    }
  },
  created: function(){
    var self = this
    this.$bus.$on('showAssets', (x) => {
      self.assetsDialogVisible = !self.assetsDialogVisible
    })
  },
  mounted: function(){
    this.getAssets()
  },
  methods: {
    getAssets: function(){
      this.loader = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var self = this
      this.axios.post(window.Config.API.endpoint+'assets', {})
        .then(response => {
          setTimeout(() => {
            if(self.loader) self.loader.close();
          }, 500);
          self.Assets = response.data
          for(var kk in self.Assets)
            self.Assets[kk].visible = true
        })
        .catch(e => {
        })
    },
    deleteAsset: function(key){
      var self = this
       this.loader = this.$loading({
        lock: true,
        text: 'Deleting Asset',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.axios.post(window.Config.API.endpoint+'assets/delete', { key: key })
        .then(response => {
          self.Assets = response.data
          for(var kk in self.Assets)
            self.Assets[kk].visible = true
          setTimeout(() => {
            if(self.loader) self.loader.close();
          }, 500);
        })
        .catch(e => {
        })
    },
    assetsUploaded: function(r, f, fl){
      if(r.status || r.status == false){
        this.$message({
          showClose: true,
          message: r.error,
          type: 'error'
        });
      }else{
        this.$message({
          message: 'Asset successfully uploaded',
          type: 'success',
          showClose: true,
        });
        this.Assets = r
        for(var kk in this.Assets)
            this.Assets[kk].visible = true
        }
      this.uploadPercentage=0
    },
    assetsUploadProgress: function(e, f, fl){
      this.uploadPercentage = e.percent
    },
    viewAsset: function(p){
      this.previewUrl = (p)
      this.showPreviewDialog = true
    },
    filterAssets: function(){
      if(!this.searchText){
        for(var kk in this.Assets) this.Assets[kk].visible = true
      }else{
        for(var kk in this.Assets){
          if(this.Assets[kk].asset.indexOf(this.searchText) != -1)          
            this.Assets[kk].visible = true
          else
            this.Assets[kk].visible = false
        }
      }
    },
    urlCopied: function(e){
      this.$message({
          message: 'Copied Asset URL',
          type: 'success',
          showClose: true,
        });
    }
  },
  watch: {
    searchText: function (val) {
      if(val == "")
        this.searchText = null
      this.filterAssets()
    },
  }
}
</script>
<style scoped>
.el-dialog{
  background: #3e3e3e !important;
  color: #fff !important;
}
.el-dialog__header, .el-dialog__title{
  color: #eee !important;
}
.el-dialog__body{
  color: white;
}
.el-dialog__body{
  text-align: center;
}
.el-button{
  padding: 5px !important;
  margin: 2px;
}
.card{
  display: inline-block;
  max-width: 300px;
  margin-right: 10px;
  cursor: pointer;
}
.card .title.is-4{
  font-size: 14px;
}
</style>
