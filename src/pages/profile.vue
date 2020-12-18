<template>
  <div class="profile container">
    <div class="alert alert-success" role="alert" v-if="alertSuccess">
      {{ serverNotification }}
    </div>
    <div class="alert alert-danger" role="alert" v-if="alertDanger">
      {{ serverNotification }}
    </div>

    <div class="container">
      <h1 class="media-body user-select-none">UPDATE PROFILE DATA</h1>
    </div>

    <hr />

    <div class="container row justify-content-center">
      <div class="form-group">
        <label class="justify-content-center text-title media-body"
          >PERSONAL DATA FORM</label
        >
        <div class="input-group-prepend">
          <span class="input-group-text">{{ getMe.name }}</span>
          <input
            v-model="name"
            type="text"
            placeholder="enter data"
            class="form-control justify-content-center text-center"
          />
        </div>

        <div class="input-group-prepend">
          <span class="input-group-text">{{ getMe.email }}</span>
          <input
            v-model.trim="email"
            placeholder="example@gmail.com"
            type="email"
            class="form-control justify-content-center text-center"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="">
          <button
            v-on:click.prevent="updData"
            type="submit"
            class="btn btn-outline-dark"
          >
            update data
          </button>
        </div>
      </div>

      <div class="input-group justify-content-center">
        <div class="form-group">
          <label class="justify-content-center text-title media-body"
            >PASSWORD FORM</label
          >
          <input
            v-model.trim="passwordCurrent"
            placeholder="current password"
            type="password"
            class="form-control text-center"
            id="passwordCurrent"
          />
          <input
            v-model.trim="password"
            placeholder="new password"
            type="password"
            class="form-control text-center"
            id="password"
          />
          <input
            v-model.trim="passwordConfirm"
            placeholder="confirm password"
            type="password"
            class="form-control text-center"
            id="passwordConfirm"
          />
          <div>
            <button
              v-on:click.prevent="updPass"
              type="submit"
              class="btn btn-outline-dark"
            >
              update password
            </button>
          </div>
        </div>
      </div>

      <div class="input-group justify-content-center">
        <div class="form-group">
          <label class="justify-content-center text-title media-body"
            >DELETE PROFILE FORM</label
          >
          <input
            v-model="emailDel"
            type="email"
            class="form-control text-center"
            placeholder="email"
          />
          <input
            v-model="passwordDel"
            type="password"
            class="form-control col-sm text-center"
            placeholder="password"
          />
          <div>
            <button
              v-on:click.prevent="tfauth"
              type="submit"
              class="btn btn-outline-danger"
            >
              delete profile
            </button>
          </div>
          <img :src="urlQRCode" alt="" />
          <div v-if="formQRCode" class="form-row justify-content-center">
            <input
              v-model="codeQRCode"
              type="text"
              class="form-control text-center col-sm col-md-2 col-lg-2 col-xl-2 col-fluid-2"
              placeholder="code"
            />
            <button
              v-on:click.prevent="delProfile"
              type="submit"
              class="btn btn-outline-danger"
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      jwt: [],
      name: [],
      email: [],
      password: [],
      emailDel: [],
      passwordDel: [],
      passwordConfirm: [],
      passwordCurrent: [],
      alertSuccess: false,
      alertDanger: false,
      serverNotification: [],
      codeQRCode: [],
      urlQRCode: [],
      b32secret: [],
      formQRCode: false,
      getMe: [],
    };
  },
  async mounted() {
    if (localStorage.jwt) this.jwt = localStorage.jwt;

    await axios
      .get(`https://127.0.0.1:3333/api/v1/users/me`, {
        id: localStorage.userID,
      })
      .then((resp) => {
        console.log(resp);
        // console.log(resp.data.data.doc);
        this.getMe = resp.data.data.doc;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    async updData() {
      await axios
        .patch(`https://127.0.0.1:3333/api/v1/users/updateMe`, {
          id: localStorage.userID,
          name: this.name,
          email: this.email,
        })
        .then((resp) => {
          console.log(resp);

          this.alertDanger = false;
          this.serverNotification = resp.data.status;
          this.alertSuccess = true;
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.data.message);

          if (error.response.data.error.codeName === "DuplicateKey") {
            this.serverNotification = "email is busy";
            this.alertDanger = true;
          } else {
            this.serverNotification = error.response.data.message;
            this.alertDanger = true;
          }
        });
    },
    async updPass() {
      await axios
        .patch(`https://127.0.0.1:3333/api/v1/users/updateMyPassword`, {
          id: localStorage.userID,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
          passwordCurrent: this.passwordCurrent,
        })
        .then((resp) => {
          console.log(resp);
          this.jwt = resp.data.token;
          this.password = [];
          this.passwordConfirm = [];
          this.passwordCurrent = [];

          this.alertDanger = false;
          this.serverNotification = resp.data.status;
          this.alertSuccess = true;
        })
        .catch((error) => {
          console.log(error);

          this.serverNotification = error.response.data.message;
          this.alertDanger = true;
        });
    },

    async tfauth() {
      await axios
        .post("https://127.0.0.1:3333/api/v1/users/tfauth", {
          email: this.emailDel,
          password: this.passwordDel,
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

    async delProfile() {
      await axios
        .patch(`https://127.0.0.1:3333/api/v1/users/deleteMe`, {
          id: localStorage.userID,
          base32secret: this.b32secret,
          codeQrcode: this.codeQRCode,
        })
        .then((resp) => {
          console.log("res", resp);
          this.serverNotification = resp.data.status;
          this.alertSuccess = true;
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.message);
          this.serverNotification = error.response.data.message;
          this.alertDanger = true;
        });
    },
  },
  watch: {
    jwt(newJWT) {
      localStorage.jwt = newJWT;
    },
  },
};
</script>

<style>
</style>
