<template id="tempo">
  <div class="search container">
    <div class="alert alert-success" role="alert" v-if="alertSuccess">
      {{ serverNotification }}
    </div>
    <div class="alert alert-danger" role="alert" v-if="alertDanger">
      {{ serverNotification }}
    </div>

    <form class="form" name="form1" v-on:submit.prevent>
      <div class="form-group">
        <label
          for="input1"
          class="row justify-content-center text-title user-select-none"
          >TRY TO SEARCH MOVIE</label
        >
      </div>
      <div class="text-values">
        <div class="form-row justify-content-center">
          <div class="col-sm col-md-4 col-lg-3 col-xl-3 col-fluid-2">
            <input
              v-model="titles"
              type="text"
              id="titles"
              class="form-control text-center"
              placeholder="title"
            />
          </div>
          <div class="col-sm-2 col-md-2 col-lg-2 col-xl-1 col-fluid-1">
            <input
              type="number"
              v-model.number="years"
              id="years"
              class="form-control text-center"
              placeholder="year"
            />
          </div>
          <div v-if="!dismissCountDown">
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
    <transition name="smoothAnim">
      <div v-if="movieValue.Title" class="media-body media text-values">
        <div class="col" style="padding-left: 0px">
          <img class="imgPadd" :src="movieValue.Poster" alt />
          <h1 class="mt-0 media-body">{{ movieValue.Title }}</h1>
          <!-- <dl
            class="row row-cols-2 media-body container"
            style="padding-right: 0px; padding-left: 0px"
          >
            <dt
              class="col-5 col-sm-6 col-lg-6 col-xl-6 col-fluid-6 text-right"
              style="padding-left: 0px"
              v-if="movieValue.Title"
            >
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
            <dd
              class="text-left"
              style="padding-right: 0px; padding-left: 0px"
              v-bind="movieValue"
            >
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
          </dl> -->
          <table class="table table-borderless" style="line-height:1.3;">
            <tbody>
              <tr>
                <th class="text-right" scope="row">YEAR</th>
                <td class="text-left">
                  {{ movieValue.Year }}
                </td>
              </tr>
              <tr>
                <th class="text-right" scope="row">TYPE</th>
                <td class="text-left">
                  {{ movieValue.Type }}
                </td>
              </tr>
              <tr>
                <th class="text-right" scope="row">GENRE</th>
                <td class="text-left">
                  {{ movieValue.Genre }}
                </td>
              </tr>
              <tr>
                <th class="text-right" scope="row">ACTORS</th>
                <td class="text-left">
                  {{ movieValue.Actors }}
                </td>
              </tr>
              <tr>
                <th class="text-right" scope="row">DIRECTOR</th>
                <td class="text-left">
                  {{ movieValue.Director }}
                </td>
              </tr>
              <tr>
                <th class="text-right" scope="row">RUNTIME</th>
                <td class="text-left">
                  {{ movieValue.Runtime }}
                </td>
              </tr>
              <tr>
                <th class="text-right" scope="row">RELEASED</th>
                <td class="text-left">
                  {{ movieValue.Released }}
                </td>
              </tr>
              <tr>
                <th class="text-right" scope="row">DVD</th>
                <td class="text-left">
                  {{ movieValue.DVD }}
                </td>
              </tr>
              <tr>
                <th class="text-right" scope="row">RATED</th>
                <td class="text-left">
                  {{ movieValue.Rated }}
                </td>
              </tr>
              <tr>
                <th class="text-right" scope="row">IMDB_RATE</th>
                <td class="text-left">
                  {{ movieValue.imdbRating }}
                </td>
              </tr>
              <tr>
                <th class="text-right" scope="row">METASCORE</th>
                <td class="text-left">
                  {{ movieValue.Metascore }}
                </td>
              </tr>
            </tbody>
          </table>
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
        .post("api/v1/movies", {
          arrUserID: localStorage.userID,
          poster: this.movieValue.Poster,
          title: this.movieValue.Title,
          year: this.movieValue.Year,
          plot: this.movieValue.Plot,
          id: this.movieValue.imdbID,
        })
        .then((resp) => {
          console.log(resp);
          let data = resp.data;
          this.serverNotification = "movie added to COLLECTION";
          this.alertSuccess = true;
          this.alertDanger = false;

          this.movieValue = data;
          this.clickBtn = false;
          // console.log(
          //   "this.movieValue.data.doc._id:",
          //   this.movieValue.data.doc._id
          // );
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
        .post(`api/v1/reviews`, {
          user: localStorage.userID,
          movie: this.movieValue.data.doc._id,
        })
        .then((resp) => {
          console.log("reviews", resp);
          // console.log("user:", localStorage.userID);
          // console.log("movie:", this.movieValue.data.docs._id);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async searchMovie() {
      await axios
        .post("search", {
          t: this.titles,
          y: this.years,
        })
        .then((resp) => {
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
          .post("search/r", {
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
  font-size: 10%;
  width: 400;
}
.text-values {
  font-family: "Kufam", cursive;
  font-size: 10%;
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

.imgPadd {
  margin: 0 0 20px 0;
}

.soon-enter-active {
  transition: 0.9s;
}
.soon-enter,
.soon-leave-to {
  transform: translateX(150px);
  opacity: 0;
}
.smoothAnim-enter-active {
  transition: 0.9s;
}
.smoothAnim-enter,
.smoothAnim-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
