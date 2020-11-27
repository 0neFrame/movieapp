<template>
  <div class="profile">
    <div class="container">
      <h1 class="media-body">UPDATE PROFILE DATA</h1>
    </div>
    <div class="row justify-content-center">
      <div class="form-group">
        <label class="justify-content-center text-title media-body"
          >PERSONAL DATA FORM</label
        >

        <div class="input-group-prepend">
          <span class="input-group-text">your name</span>
          <input
            v-model="name"
            type="text"
            placeholder="enter name"
            class="form-control justify-content-center text-center"
          />
        </div>

        <div class="input-group-prepend">
          <span class="input-group-text">email </span>
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
          <div class="">
            <button
              v-on:click.prevent="updPass"
              type="submit"
              class="btn btn-outline-dark"
            >
              update password
            </button>
          </div>
          <div class="media-body">
            <button
              v-on:click.prevent="delProf"
              type="submit"
              class="btn btn-outline-danger media-body"
            >
              delete profile
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
      passwordConfirm: [],
      passwordCurrent: [],
    };
  },
  mounted() {
    if (localStorage.jwt) this.jwt = localStorage.jwt;
  },
  methods: {
    async updData() {
      await axios
        .patch(`http://127.0.0.1:3333/api/v1/users/updateMe`, {
          id: this.$route.params.userId,
          name: this.name,
          email: this.email,
        })
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updPass() {
      await axios
        .patch(`http://127.0.0.1:3333/api/v1/users/updateMyPassword`, {
          id: this.$route.params.userId,
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async delProf() {
      await axios
        .patch(`http://127.0.0.1:3333/api/v1/users/deleteMe`, {
          id: this.$route.params.userId,
        })
        .then((resp) => {
          console.log("res", resp);
        })
        .catch((error) => {
          console.log(error);
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

<style id="profile">
</style>
