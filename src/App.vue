<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body:before{
  content: "";
  position: fixed;
  top: -10px;
  left: 0;
  width: 100%;
  height: 10px;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, .8);
  z-index: 100;
}
</style>
