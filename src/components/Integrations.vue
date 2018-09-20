<template>
  <div id="integrations">
  	<div class="columns is-multiline">
      <div class="column is-12">
        <div class="box details">
          <div class="box-title">
            <i class="icon ion-ios-cart"></i>
            E-junkie
          </div>
          <div class="box-content" v-if="ejunkie">
            <el-form ref="ejunkie" :model="ejunkie" label-width="200px">
              <el-form-item label="Enable E-junkie Shop">
                <el-switch v-model="ejunkie.enabled"></el-switch>
              </el-form-item>
              <el-form-item label="Your Client ID">
                <el-input v-model.number="ejunkie.clientId"></el-input>
              </el-form-item>
              <p style="font-size: 14px;text-align: right;">Leave blank if you want to show Public products only.</p>
              <el-form-item label="E-junkie API Key">
                <el-input v-model="ejunkie.apiKey"></el-input>
              </el-form-item>
              <el-form-item label="Show Related Products">
                <el-input v-model.number="ejunkie.maxRelated"></el-input>
              </el-form-item>
              <el-form-item label="Shop Url Prefix">
                <el-input v-model="ejunkie.shop"></el-input>
              </el-form-item>
              <el-form-item label="Product Url Prefix">
                <el-input v-model="ejunkie.product"></el-input>
              </el-form-item>
              <el-form-item label="Hide out of stock products">
                <el-switch v-model="ejunkie.pref.hide_out_of_stock"></el-switch>
              </el-form-item>
              <el-form-item label="Hidden Products" v-if="ejunkie.clientId">
              	 <el-select v-model="ejunkie.pref.hidden" multiple placeholder="Select">
				    <el-option
				      v-for="item in ejunkie.products"
				      :key="item.number"
				      :label="item.name"
				      :value="item.number">
				    </el-option>
				  </el-select>
              </el-form-item>
              <el-form-item label="Pinned Up Products" v-if="ejunkie.clientId">
              	<el-select v-model="ejunkie.pref.pinned" multiple placeholder="Select">
				    <el-option
				      v-for="item in ejunkie.products"
				      :key="item.number"
				      :label="item.name"
				      :value="item.number">
				    </el-option>
				  </el-select>
              </el-form-item>
              <el-form-item label="Pinned Down Products" v-if="ejunkie.clientId">
              	<el-select v-model="ejunkie.pref.pinned_down" multiple placeholder="Select">
				    <el-option
				      v-for="item in ejunkie.products"
				      :key="item.number"
				      :label="item.name"
				      :value="item.number">
				    </el-option>
				  </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveChanges">Save</el-button>
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
  name: 'Integrations',
  data () {
    return {
      ejunkie: null,
      productDialogVisible: true,
    }
  },
  mounted: function(){
    var self = this
    this.axios.post(window.Config.API.endpoint+'integrations', {
    })
    .then(response => {
      self.ejunkie = response.data.ejunkie
    })
    .catch(e => {
    })
  },
  watch: {
  },
  methods: {
  	saveChanges: function(){
      var loading = this.$loading({
        lock: true,
        text: 'Updating',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var self = this
  		this.axios.post(window.Config.API.endpoint+'integrations/save', {
	      integrations: {"ejunkie":self.ejunkie}
	    })
	    .then(response => {
        setTimeout(() => {
          loading.close();
        }, 100);
        self.ejunkie = response.data.ejunkie  
        self.$message({
          showClose: true,
          message: 'Integration saved successfully.',
          type: 'success'
        });
	    })
	    .catch(e => {
	      setTimeout(() => {
	          loading.close();
	        }, 100);
        self.savingPage = false
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