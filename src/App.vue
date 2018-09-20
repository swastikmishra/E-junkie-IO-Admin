<template>
  <div id="app">
    <navbar></navbar>
    <sidebar></sidebar>
    <assets></assets>
    <div class="main-content">
      <transition name="el-fade-in">
        <router-view>
        </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Assets from './components/Assets'
export default {
  name: 'App',
  components: {
    'Navbar' : Navbar,
    'Sidebar' : Sidebar,
    'Assets' : Assets,
  }
}
</script>

<style>
.main-content{
  padding-left: 165px;
  padding-top: 10px;
  padding-right: 15px;
}
</style>
