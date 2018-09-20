<template>
  <div id="assets">
  	<el-dialog
      title="Assets"
      :visible.sync="assetsDialogVisible"
      :fullscreen="true">
      <div class="columns is-multiline">
        <div class="column is-8">
          <div class="card" v-for="asset,k in Assets">
            <el-button @click="deleteAsset(asset.key)" type="danger" icon="el-icon-delete" circle></el-button>
            <div class="card-image" @click="viewImage(asset.url)" >
              <figure class="image is-4by3">
                <img :src="asset.url">
              </figure>
            </div>
            <div class="card-content">
                <div class="media-content">
                  <p class="title is-4">{{asset.asset}}</p>
                </div>
            </div>
          </div>
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
      data:{
        user: 'peepalfarm'
      },
      uploadPercentage: 0,
      upploadAction: window.Config.API.endpoint+"assets/save",
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
      var self = this
      this.axios.post(window.Config.API.endpoint+'assets', {
          user: 'peepalfarm',
        })
        .then(response => {
          self.Assets = response.data
        })
        .catch(e => {
        })
    },
    deleteAsset: function(key){
      var self = this
      this.axios.post(window.Config.API.endpoint+'assets/delete', {
          user: 'peepalfarm',
          key: key,
        })
        .then(response => {
          self.Assets = response.data
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
      }
      this.uploadPercentage=0
    },
    assetsUploadProgress: function(e, f, fl){
      this.uploadPercentage = e.percent
    },
    viewImage: function(p){
      this.previewUrl = (p)
      this.showPreviewDialog = true
    }
  }
}
</script>
<style scoped>
.el-dialog{
  background: #3e3e3e;
  color: #fff;
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
  padding: 12px !important;
  float: right;
  z-index: 999999;
  position: relative;
  margin: 5px;
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
