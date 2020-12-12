<template id="tempo">
  <div class="search container">
    <div class="alert alert-success" role="alert" v-if="alertSuccess">
      {{ serverNotification }}
    </div>
    <div class="alert alert-danger" role="alert" v-if="alertDanger">
      {{ serverNotification }}
    </div>

    <form class="form media-body" name="form1" v-on:submit.prevent>
      <div class="form-group col-12">
        <label
          for="input1"
          class="row justify-content-center text-title user-select-none"
          >TRY TO SEARCH MOVIE</label
        >
      </div>
      <div class="container text-values">
        <div class="form-row justify-content-center">
          <div class="col-4">
            <input
              v-model="titles"
              type="text"
              id="titles"
              class="form-control text-center"
              placeholder="title"
            />
          </div>
          <div class="col-3">
            <input
              type="number"
              v-model.number="years"
              id="years"
              class="form-control text-center"
              placeholder="year"
            />
          </div>
          <div class>
            <button
              v-on:click.enter="searchMovie"
              class="btn btn-outline-dark text-values"
            >
              search
            </button>
            <button
              v-on:click="randomMovie"
              class="btn btn-outline-light text-values"
            >
              random
            </button>
          </div>
        </div>
      </div>
    </form>
    <div class="media-body">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="warning"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        <p>movie will be found after few seconds...</p>
        <b-progress
          variant="warning"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        ></b-progress>
      </b-alert>
    </div>
    <transition name="soon">
      <h1
        class="spec text-title text-center user-select-none"
        v-if="!movieValue.Title"
      >
        comin soon...
        <h5>maybe...</h5>
      </h1>
    </transition>
    <transition name="valM">
      <div v-if="movieValue.Title" class="media text-values">
        <img
          :src="movieValue.Poster"
          class="align-self-center mr-3 col-sm-0"
          alt
        />
        <div class="media-body">
          <h1 class="mt-0">{{ movieValue.Title }}</h1>
          <dl class="row container">
            <dt class="col-sm-2 con-sm-1" v-if="movieValue.Title">
              <p>TYPE</p>
              <p>DIRECTOR</p>
              <p>GENRE</p>
              <p>RUNTIME</p>
              <p>YEAR</p>
              <p>RELEASED</p>
              <p>DVD</p>
              <p>RATED</p>
              <p>IMDB_RATE</p>
              <p>METASCORE</p>
            </dt>
            <dd class="col-sm-10 row-sm-1" v-bind="movieValue">
              <p>{{ movieValue.Type }}</p>
              <p>{{ movieValue.Director }}</p>
              <p>{{ movieValue.Genre }}</p>
              <p>{{ movieValue.Runtime }}</p>
              <p>{{ movieValue.Year }}</p>
              <p>{{ movieValue.Released }}</p>
              <p>{{ movieValue.DVD }}</p>
              <p>{{ movieValue.Rated }}</p>
              <p>{{ movieValue.imdbRating }}</p>
              <p>{{ movieValue.Metascore }}</p>
            </dd>
          </dl>
          <div class="btntoadd">
            <button
              v-if="jwt"
              v-on:click.prevent="addMovie"
              class="btnMyMovie btn btn-outline-dark"
            >
              add in COLLECTION
            </button>
          </div>
          <!-- <div v-else class="btnfordel">
              <button
                v-on:click="delMovie"
                class="btnMyMovie btn btn-outline-danger"
              >
                Delete form Collaction
              </button>
            </div> -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "search",
  data() {
    return {
      titles: [],
      years: [],
      movieValue: [],
      clickBtn: true,
      jwt: localStorage.jwt,
      dismissSecs: 15,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      alertSuccess: false,
      alertDanger: false,
      serverNotification: [],
    };
  },
  // async mounted() {
  //   axios.defaults.headers.common["Authorization"] = this.jwt;
  // },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    async addMovie() {
      await axios
        .post("https://127.0.0.1:3333/api/v1/movies", {
          id: this.movieValue.imdbID,
          poster: this.movieValue.Poster,
          title: this.movieValue.Title,
          plot: this.movieValue.Plot,
          arrUserID: localStorage.userID,
        })
        .then((resp) => {
          console.log(resp);
          let data = resp.data;
          this.serverNotification = "movie added to COLLECTION";
          this.alertSuccess = true;
          this.alertDanger = false;

          this.movieValue = data;
          this.clickBtn = false;
          // console.log("this.movieValue", this.movieValue.data);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
          if (error.response.data.error.keyPattern.id === 1) {
            this.serverNotification = "this movie in COLLECTION";
            this.alertDanger = true;
          } else {
            this.serverNotification = error;
            this.alertDanger = true;
            this.alertSuccess = false;
          }
        });

      await axios
        .post(`https://127.0.0.1:3333/api/v1/reviews`, {
          user: localStorage.userID,
          movie: this.movieValue.data.docs._id,
        })
        .then((resp) => {
          console.log(resp);
          // console.log("user:", localStorage.userID);
          // console.log("movie:", this.movieValue.data.docs._id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async searchMovie() {
      await axios
        .post("https://127.0.0.1:3333/search", {
          t: this.titles,
          y: this.years,
        })
        .then((resp) => {
          console.log("resp", resp.data.Error);
          let data = resp.data;
          if (data.Error) {
            this.serverNotification = resp.data.Error;
            this.alertDanger = true;
          } else {
            this.alertDanger = false;
            this.alertSuccess = false;
          }

          this.movieValue = resp.data;
        })
        .catch((error) => {
          console.log(error);
          if (error) {
            this.serverNotification = error;
            this.alertDanger = true;
          } else {
            this.alertDanger = false;
            this.alertSuccess = false;
          }
        });
    },

    async randomMovie() {
      this.alertDanger = false;
      this.alertSuccess = false;
      this.dismissCountDown = this.dismissSecs;
      this.movieValue = [];
      // console.log(`value: ${this.movieValue.Title}, ${this.movieValue.Year}`);
      // console.log(`response: ${this.movieValue.Response}`);
      do {
        await axios
          .post("https://127.0.0.1:3333/search/r", {
            i: `tt${Math.floor(Math.random() * 10000000 + 1)}`,
          })
          .then((resp) => {
            // console.log(`frontend post: ${resp.data.Title}, ${resp.data.Year}`);
            // console.log(`response: ${this.movieValue.Response}`);
            this.movieValue = resp.data;
            if (this.movieValue.Response === "True") this.dismissCountDown = 0;
          })
          .catch((error) => {
            console.log(error);
          });
      } while (this.movieValue.Response === "False");
    },
  },
};
</script>

<style>
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

.spec {
  padding: 25vh 0 50vh 0;
}

.btnMyMovie {
  margin: 1vh 0 5vh 0;
}

.media-body {
  margin: 20px 0 0 0;
}

@media (max-width: 475px) {
  .container {
    max-width: min-content;
  }
}

.soon-enter-active {
  transition: 0.9s;
}
.soon-enter,
.soon-leave-to {
  transform: translateX(150px);
  opacity: 0;
}
.valM-enter-active {
  transition: 0.9s;
}
.valM-enter,
.valM-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
