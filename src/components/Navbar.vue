<template>
  <div id="navbar">
    <nav class="navbar is-fixed-top">
      <div class="navbar-brand">
        <h1><i class="icon ion-md-aperture"></i> Contenture</h1>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item">
            <i class="icon ion-md-happy"></i> Robin
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
    
    }
  }
}
</script>

<style scoped>
nav{
  background: #1e293d;
}
nav h1{
  background: rgba(0,0,0,0.3);
  color: white;
  padding: 14px;
  font-size: 16px;
  font-family: Montserrat;
  font-weight: lighter;
}
nav h1 i{
  font-size: 30px;
}
.navbar-item{
  color: #eee;
  font-family: Quicksand;
  font-weight: bold;
}
.navbar-item i{
  margin-right: 5px !important;
}
.navbar-item, .navbar-item:hover{
  background-color: #1e2a3d;
  color: #FFC107;
}
</style>

