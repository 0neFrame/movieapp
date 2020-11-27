<template>
  <div class="singup">
    <form>
      <div class="container text-values">
        <h1>Create Account</h1>
        <hr />
        <div class="row justify-content-center">
          <div class="form-group">
            <label for="exampleEmail1">email address</label>
            <input
              v-model.trim="email"
              placeholder="example@gmail.com"
              type="email"
              class="form-control justify-content-center text-center"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="form-group">
            <label for="examplePassword1">password</label>
            <input
              v-model.trim="password"
              placeholder="minimum 8 characters"
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
          </div>
          <div class="input-group row justify-content-center">
            <div class="input-group-prepend">
              <span class="input-group-text">your name</span>
            </div>
            <input
              v-model="name"
              type="text"
              placeholder="Your name"
              class="form-control col-sm-3 text-center"
            />
          </div>
        </div>
      </div>
    </form>
    <button @click="singUp" type="submit" class="btn btn-outline-dark">
      submit
    </button>
    <div class="spec"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "singup",
  data() {
    return {
      name: [],
      nickname: "",
      email: [],
      password: [],
      passwordConfirm: [],
      jwt: [],
      userID: []
    };
  },
  methods: {
    async singUp() {
      await axios
        .post("http://127.0.0.1:3333/api/v1/users/singup", {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm
        })
        .then(resp => {
          console.log(resp);
          this.jwt = resp.data.token;
          this.userID = resp.data.data.user._id;
          // console.log(this.jwt);
          window.setTimeout(() => {
            location.assign(`/user/${this.userID}`);
          }, 700);
        })
        .catch(error => {
          console.log(error);
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kufam:ital,wght@0,400;0,700;1,900&display=swap");

.text-title {
  font-family: "Kufam", cursive;
  font-size: 150%;
  width: 400;
}
.text-values {
  font-family: "Kufam", cursive;
  font-size: 100%;
}

button {
  margin: 20px 20px 20px 20px;
}

.spec {
  padding: 0 0 50vh 0;
}
</style>
