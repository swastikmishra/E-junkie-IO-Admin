<template>
  <div id="pages">
  	<div class="columns is-multiline">
  		<div class="column is-12">
  			<div class="box details">
		  		<div class="box-title">
		  			Page Not Found
		  		</div>
		  		<div class="box-content" v-if="Pages">
		  		</div>
			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      Pages: null,
      totalPages: 0
    }
  },
  mounted: function(){
  },
  methods: {
  }
}
</script>
<style scoped>
.details .box-title{
	padding: 40vh 10px;
	margin-top: 2vh;
}
</style>
