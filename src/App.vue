<template>
  <div id="app">
    <div class="container" id="nav">
      <router-link to="/">Main</router-link> ᛫
      <router-link to="/login">Log In</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #000000;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}

#app {
  background: rgb(158, 30, 30);
  background: linear-gradient(
    90deg,
    rgb(124, 122, 126) 0%,
    rgb(216, 230, 30) 100%
  );
}
</style>
