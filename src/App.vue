<template>
  <div id="app">
    <div class="container" id="nav">
      <a v-if="jwt">
        <router-link
          :to="{ name: 'user', params: { userId: lsUserID }, name: 'search' }"
          replace
          >SEARCH
        </router-link>
        ᛫
        <router-link
          :to="{ name: 'user', params: { userId: lsUserID }, name: 'profile' }"
          replace
          >PROFILE
        </router-link>
        ᛫
        <router-link
          :to="{ name: 'user', params: { userId: lsUserID }, name: 'movies' }"
          replace
          >COLLECTION
        </router-link>
        <router-link to="/">
          <button
            type="submit"
            class="btnMyMovie btn btn-outline-dark mb-2"
            @click="logOut"
          >
            LOG OUT
          </button>
        </router-link>
      </a>
      <a v-else class="d-flex">
        <router-link to="/login" class="ml-auto p-2">
          <button type="submit" class="btnMyMovie btn btn-outline-dark mb-2">
            LOG IN
          </button>
        </router-link>
      </a>
    </div>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      jwt: localStorage.jwt,
      lsUserID: localStorage.userID,
    };
  },
  methods: {
    logOut() {
      this.jwt = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("userID");
      window.setTimeout(() => {
        location.assign("/");
      }, 1);
    },
  },
  mounted() {
    axios.defaults.headers.common["Authorization"] = this.jwt;
  },
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

/* .login {
  text-align: right;
} */

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #000000;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
