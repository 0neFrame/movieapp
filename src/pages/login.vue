<template>
  <div id="login" class="login">
    <form>
      <div class="container text-values">
        <div class="justify-content-center marg20 user-select-none">
          <p>If you haven't account</p>
          <router-link to="/singup">
            <button type="submit" class="btn btn-outline-dark">
              Create account
            </button>
          </router-link>
        </div>
        <div class="row justify-content-center">
          <div class="form-group justify-content-center user-select-none">
            <label for="exampleInputEmail1">Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control text-center"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <!-- <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            > -->
          </div>
          <div class="form-group user-select-none">
            <label for="exampleInputPassword1">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control col-sm text-center"
              id="exampleInputPassword1"
            />
          </div>
        </div>
        <!-- <router-link to="/"> -->
        <button
          @click.prevent="logIn"
          type="submit"
          class="marg20 btn btn-outline-dark"
        >
          log in
        </button>
        <!-- </router-link> -->
        <div class="spec"></div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // name: "login",
  data() {
    return {
      email: [],
      password: [],
      jwt: [],
      userID: []
    };
  },
  mounted() {
    if (localStorage.jwt) this.jwt = localStorage.jwt;
    if (localStorage.userID) this.userID = localStorage.userID;

    const FB = [];
    window.fbAsyncInit = function() {
      FB.init({
        appId: "{your-app-id}",
        cookie: true,
        xfbml: true,
        version: "{api-version}"
      });

      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    FB.getLoginStatus(function(response) {
      FB.statusChangeCallback(response);
    });
  },
  methods: {
    async logIn() {
      await axios
        .post("http://127.0.0.1:3333/api/v1/users/login", {
          email: this.email,
          password: this.password
        })
        .then(resp => {
          console.log(resp);
          console.log(resp.data.data.user);
          console.log(resp.data.data.user._id);
          this.jwt = resp.data.token;
          this.userID = resp.data.data.user._id;
          console.log(this.jwt);
          window.setTimeout(() => {
            location.assign("/");
          }, 900);
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  },
  watch: {
    jwt(newJWT) {
      localStorage.jwt = newJWT;
    },
    userID(newUserID) {
      localStorage.userID = newUserID;
    }
  }
};
</script>

<style>
/* @import url("https://fonts.googleapis.com/css2?family=Kufam:ital,wght@0,400;0,700;1,900&display=swap");

.text-title {
  font-family: "Kufam", cursive;
  font-size: 150%;
  width: 400;
}
.text-values {
  font-family: "Kufam", cursive;
  font-size: 100%;
} */
/* 
.marg20 {
  margin: 20px 20px 20px 20px;
}

.spec {
  padding: 3vh 0 50vh 0;
}
 */
/* #login {
  background: rgb(158, 30, 30);
  background: linear-gradient(
    90deg,
    rgb(124, 122, 126) 0%,
    rgb(216, 230, 30) 100%
  );
} */
</style>
