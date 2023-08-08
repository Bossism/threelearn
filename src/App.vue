<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <Lifangti msg="Welcome to Your Vue.js App"/> -->
    <MouseMove3 msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Lifangti from './components/Lifangti.vue'
import MouseMove3 from './components/MouseMove3.vue'
// import XianZhi from './components/XianZhi.vue'

export default {
  name: 'App',
  components: {
    // Lifangti
    MouseMove3
    // XianZhi
  },
  methods: {
      yourFunction() {
        this.$router.push('buju');
        console.log('route to buju.vue')
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
