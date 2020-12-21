<template>
  <div class="singup">
    <form>
      <div class="container text-values media-body">
        <h1 class="media-body user-select-none">Reset Password</h1>
        <hr />
        <div class="row justify-content-center media-body">
          <div class="form-group">
            <label class="user-select-none">new password</label>
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
              class="form-control text-center media-body"
              id="passwordConfirm"
            />
          </div>
        </div>
      </div>
    </form>
    <button @click="resetPass" type="submit" class="btn btn-outline-dark">
      submit
    </button>
    <div class="spec"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "resetPass",
  data() {
    return {
      name: [],
      nickname: "",
      email: [],
      password: [],
      passwordConfirm: [],
      jwt: [],
      userID: [],
    };
  },
  methods: {
    async resetPass() {
      await axios
        .patch(`api/v1/users/resetPassword/${this.$route.params.token}`, {
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        })
        .then((resp) => {
          console.log(resp);
          console.log(resp.data);
          this.jwt = resp.data.token;
          this.userID = resp.data.data.user._id;
          // console.log(this.jwt);
          // window.setTimeout(() => {
          //   location.assign(`/user/${this.userID}`);
          // }, 1);
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
    userID(newUserID) {
      localStorage.userID = newUserID;
    },
  },
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
