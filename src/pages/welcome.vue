<template>
  <div class="about">
    <div class="container">
      <div class="spec text-title">
        <h1>WELCOME {{ userData.name }}</h1>
        <h3>and enjoy it!</h3>
      </div>
      <div>
        <h1>
          <hr />
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "welcome",
  data() {
    return {
      jwt: [],
      userID: [],
      provider: [],
      userData: [],
      alertSuccess: false,
      alertDanger: false,
      serverNotification: [],
    };
  },

  async mounted() {
    await axios
      .post("https://127.0.0.1:3333/api/v1/auth/profile", {
        userID: this.$route.params.userId,
      })
      .then((resp) => {
        console.log("resp", resp);
        // this.serverNotification = resp.data.status;
        // this.alertSuccess = true;
        // this.alertDanger = false;

        this.jwt = resp.data.token;
        this.userID = resp.data.data.user._id;
        this.userData = resp.data.data.user;
        this.provider = resp.data.data.user.provider;
        // console.log("userData", this.userData);
        window.setTimeout(() => {
          location.assign(`/search`);
        }, 2000);
      })
      .catch((error) => {
        console.log("error", error);
        // this.serverNotification = error.response.data.message;
        // this.alertDanger = true;
        // this.alertSuccess = false;
      });
  },
  watch: {
    jwt(newJWT) {
      localStorage.jwt = newJWT;
    },
    userID(newUserID) {
      localStorage.userID = newUserID;
    },
    provider(newProvider) {
      localStorage.provider = newProvider;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kufam:ital,wght@0,400;0,700;1,900&display=swap");

.spec {
  padding: 25vh 0 50vh 0;
}

.text-title {
  font-family: "Kufam", cursive;
  font-size: 150%;
  width: 400;
}
</style>
