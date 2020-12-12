<template>
  <div id="login">
    <!-- <form> -->

    <div class="container text-values">
      <div class="alert alert-success" role="alert" v-if="alertSuccess">
        {{ serverNotification }}
      </div>
      <div class="alert alert-danger" role="alert" v-if="alertDanger">
        {{ serverNotification }}
      </div>
      <form class="form media-body" name="form1" v-on:submit.prevent>
        <div class="container text-values media-body">
          <div class="form-row justify-content-center">
            <div class="form-group user-select-none col-4">
              <label for="exampleInputEmail1">email address</label>
              <input
                v-model="email"
                type="email"
                class="form-control text-center"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group user-select-none col-3">
              <label for="exampleInputPassword1">password</label>
              <input
                v-model="password"
                type="password"
                class="form-control col-sm text-center"
                id="password"
              />
            </div>
            <div class="form-group align-self-end" v-on:submit.prevent>
              <button @click="tfauth" type="submit" class="btn btn-outline-dark">
                submit
              </button>
            </div>
          </div>
          <img :src="urlQRCode" alt="" />
          <div v-if="formQRCode" class="form-row justify-content-center">
            <input
              v-model="codeQRCode"
              type="text"
              class="form-control text-center col-2"
              placeholder="code"
            />
            <button
              @click.prevent="logIn"
              type="submit"
              class="btn btn-outline-dark"
            >
              log in
            </button>
          </div>
        </div>
      </form>

      <div class="form-group user-select-none media-body">
        <label class="pd20r">don't remember password? press on</label>
        <button
          @click.prevent="forgotPass"
          type="submit"
          class="marg20 btn btn-outline-danger"
        >
          forgot password
        </button>
      </div>
    </div>
    <!-- </form> -->
    <div class="justify-content-center marg20 user-select-none media-body">
      <div class="form-group user-select-none">
        <label class="pd20r">you've facebook? press on</label>
        <!-- <button
          @click.prevent="facebook"
          type="submit"
          class="marg20 btn btn-outline-primary"
        >
          facebook
        </button> -->
        <a href="https://127.0.0.1:3333/api/v1/auth/facebook" target="_blank"
          >facebook</a
        >
      </div>
      <div class="justify-content-center marg20 user-select-none media-body">
        <div class="form-group user-select-none">
          <label class="pd20r">haven't account? press on</label>
          <router-link to="/singup">
            <button type="submit" class="btn btn-outline-dark">
              Create Account
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="spec"></div>
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
      codeQRCode: [],
      urlQRCode: [],
      b32secret: [],
      formQRCode: false,
      alertSuccess: false,
      alertDanger: false,
      serverNotification: [],
    };
  },
  mounted() {
    if (localStorage.jwt) this.jwt = localStorage.jwt;
    if (localStorage.userID) this.userID = localStorage.userID;
  },
  methods: {
    async forgotPass() {
      await axios
        .post("https://127.0.0.1:3333/api/v1/users/forgotPassword", {
          email: this.email,
        })
        .then((resp) => {
          console.log("resp", resp);
          let data = resp.data;
          this.serverNotification = data.message;
          this.alertSuccess = true;
          this.alertDanger = false;
        })
        .catch((error) => {
          console.log("error", error);
          this.serverNotification = error.response.data.message;
          this.alertDanger = true;
          this.alertSuccess = false;
        });
    },
    async tfauth() {
      await axios
        .post("https://127.0.0.1:3333/api/v1/users/tfauth", {
          email: this.email,
          password: this.password,
        })
        .then((resp) => {
          console.log("resp", resp);
          console.log(resp.data);
          console.log(resp.data.base32secret);
          console.log(resp.data.data_url);
          this.b32secret = resp.data.base32secret;
          this.urlQRCode = resp.data.data_url;
          this.formQRCode = true;
        })
        .catch((error) => {
          console.log("error", error);
          this.serverNotification = error.response.data.message;
          this.alertDanger = true;
          this.alertSuccess = false;
        });
    },
    async logIn() {
      await axios
        .post("https://127.0.0.1:3333/api/v1/users/login", {
          email: this.email,
          password: this.password,
          base32secret: this.b32secret,
          codeQrcode: this.codeQRCode,
        })
        .then((resp) => {
          console.log("resp", resp);
          let data = resp.data;

          this.serverNotification = data.status;
          this.alertSuccess = true;
          this.alertDanger = false;

          this.jwt = data.token;
          this.userID = data.data.user._id;
          console.log(this.jwt);
          window.setTimeout(() => {
            location.assign(`/search`);
          }, 1);
        })
        .catch((error) => {
          console.log("error", error);
          this.serverNotification = error.response.data.message;
          this.alertDanger = true;
          this.alertSuccess = false;
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
.pd20r {
  padding-right: 10px;
}
</style>
