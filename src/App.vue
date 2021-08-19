<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <Head id="head" />
    <RealPlayer id="player" />
    <router-view id="router" />
  </div>
</template>
<script>
import Head from "@/components/Head";
import RealPlayer from "@/components/RealPlayer";
export default {
  components: { Head, RealPlayer }
};
</script>

<style lang='scss'>
@import url(./assets/css/base.css);
#app {
  height: 100vh;
}
#router {
  height: calc(100vh - 6rem);
}
#head ~ #router {
  padding-top: 3rem;
}
#player + #router {
  padding-bottom: 3rem;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}*/
</style>
