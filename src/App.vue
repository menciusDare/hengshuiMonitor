<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
    created() {
    window.addEventListener('beforeunload',()=>{
      sessionStorage.setItem('storeDatas', JSON.stringify(this.$store.state))
    })
    
    try{
      sessionStorage.getItem('storeDatas') && this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem('storeDatas'))))
    }catch(err) {
      console.log(err);
    }
    sessionStorage.removeItem("storeDatas");
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    background: #F6F7FB;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 14px;
    color: #333;
    min-width: 1250px;
  /*text-align: center;*/
  /*color: #2c3e50;*/
}
</style>
