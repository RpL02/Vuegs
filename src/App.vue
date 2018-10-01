<template>

  <div id="app">
        
  <b-navbar type="dark" variant="primary" toggleable>
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-navbar-nav>
        <b-link class="nav-link" to="/">Bugs</b-link>
        <b-link class="nav-link" to="new">NewBug</b-link>
        <b-link class="nav-link" to="build">ForBuild</b-link>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue/dist/bootstrap-vue.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
  
.space-top{
    margin-top: 60px;
  }
</style>
