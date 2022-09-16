<template>
  <div id="app">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  /* background-color: rgb(37,37,38); */
}
/* 浅色主题 */
/* .vscode-light body {
    background: white;
    color: black;
} */
/* 深色主题 */
.vscode-dark body {
    background: #252526;
    color: white;
}
/* 高对比度主题 */
.vscode-high-contrast body {
    background: rgb(37,37,38);
    color: red;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  position: fixed;
}
</style>
