<template>
  <div id="app">
    <div class="container" id="nav">
      <a v-if="user">
        <router-link to="/">MAIN</router-link> ᛫
        <!-- <router-link to="/about">About</router-link> ᛫ -->
        <router-link to="/profile">PROFILE</router-link> ᛫
        <router-link to="/movies">MOVIES</router-link>
        <router-link class="login" to="/">
          <button
            type="submit"
            class="btnMyMovie btn btn-outline-dark"
            @click="logOut"
          >
            LOG OUT
          </button>
        </router-link>
      </a>
      <a class="login" v-else>
        <router-link id="login" to="/login">
          <button type="submit" class="btnMyMovie btn btn-outline-dark">
            LOG IN
          </button>
        </router-link>
      </a>
    </div>
    <router-view />
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      user: localStorage.jwt
    };
  },
  methods: {
    logOut() {
      this.user = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("userID");
      window.setTimeout(() => {
        location.assign("/");
      }, 100);
    }
  }
  // async mounted() {
  //   await axios
  //     .post("http://127.0.0.1:3333/api/v1/movies", {
  //       jwt: localStorage.jwt
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kufam:ital,wght@0,400;0,700;1,900&display=swap");

#app {
  font-family: "Kufam", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(158, 30, 30);
  background: linear-gradient(
    90deg,
    rgb(124, 122, 126) 0%,
    rgb(216, 230, 30) 100%
  );
}

.login {
  display: flex;
  height: 15px;
  flex-direction: column;
  align-self: center;
}

#nav {
  /* display: flex;
  align-items: center;
  height: 300px; */

  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #000000;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
