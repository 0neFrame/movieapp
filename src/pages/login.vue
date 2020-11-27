<template>
  <div id="login">
    <form>
      <div class="container text-values">
        <div class="justify-content-center marg20 user-select-none media-body">
          <p class="media-body">if you haven't account</p>
          <router-link to="/singup">
            <button type="submit" class="btn btn-outline-dark">
              Create Account
            </button>
          </router-link>
        </div>
        <div class="row justify-content-center media-body">
          <div class="form-group justify-content-center user-select-none">
            <label for="exampleInputEmail1">email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control text-center"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="form-group user-select-none">
            <label for="exampleInputPassword1">password</label>
            <input
              v-model="password"
              type="password"
              class="form-control col-sm text-center"
              id="exampleInputPassword1"
            />
          </div>
        </div>
        <!-- <div class="form-group user-select-none">
          <button
            @click.prevent="forgotPass"
            type="submit"
            class="marg20 btn btn-outline-danger"
          >
            forgot password
          </button>
        </div> -->
        <button
          @click.prevent="logIn"
          type="submit"
          class="marg20 btn btn-outline-dark"
        >
          log in
        </button>
        <div class="spec"></div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      email: [],
      password: [],
      jwt: [],
      userID: [],
    };
  },
  mounted() {
    if (localStorage.jwt) this.jwt = localStorage.jwt;
    if (localStorage.userID) this.userID = localStorage.userID;
  },
  methods: {
    // async forgotPass() {},
    async logIn() {
      await axios
        .post("http://127.0.0.1:3333/api/v1/users/login", {
          email: this.email,
          password: this.password,
        })
        .then((resp) => {
          this.jwt = resp.data.token;
          this.userID = resp.data.data.user._id;
          console.log(this.jwt);
          window.setTimeout(() => {
            location.assign(`/user/${this.userID}/search`);
          }, 1);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
  watch: {
    jwt(newJWT) {
      localStorage.jwt = newJWT;
    },
    userID(newUserID) {
      localStorage.userID = newUserID;
    },
  },
};
</script>

<style>
</style>
