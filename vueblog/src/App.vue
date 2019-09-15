<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>
<script>
import Login from './components/login'
export default {
  name: 'App',
  components: {
    Login
  }
}
</script>
<style>
  #app{
    margin:0;
    padding:0;
  }
</style>
