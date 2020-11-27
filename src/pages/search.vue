<template id="tempo">
  <div class="search container">
    <form class="form" name="form1" v-on:submit.prevent>
      <div class="form-group col-12">
        <label
          for="input1"
          class="row justify-content-center text-title user-select-none"
          >TRY TO SEARCH MOVIE</label
        >
        <button
          v-on:click="randomMovie"
          class="btn btn-outline-dark text-values"
        >
          random
        </button>
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
              v-on:click="searchMovie"
              class="btn btn-outline-dark text-values"
            >
              search
            </button>
          </div>
        </div>
      </div>
    </form>
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
              v-if="user"
              v-on:click.prevent="addMovie"
              class="btnMyMovie btn btn-outline-dark"
            >
              add in collaction
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
      user: localStorage.jwt,
    };
  },
  // async mounted() {
  //   await axios
  //     .post("http://127.0.0.1:3333/api/v1/users/login", {
  //       jwt: localStorage.jwt
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // },
  methods: {
    async addMovie() {
      await axios
        .post("http://127.0.0.1:3333/api/v1/movies", {
          id: this.movieValue.imdbID,
          poster: this.movieValue.Poster,
          title: this.movieValue.Title,
          plot: this.movieValue.Plot,
          jwt: localStorage.jwt,
          userUnqID: localStorage.userID,
        })
        .then((resp) => {
          console.log(resp);
          this.movieValue = resp.data;
          this.clickBtn = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // async delMovie() {
    //   this.clickBtn = true;

    //   console.log(`del movie! - 1`);

    //   await axios
    //     .post("http://127.0.0.1:3333/search/del", {
    //       id: this.movieValue.imdbID
    //     })
    //     .then(resp => {
    //       console.log(`post ID movie: ${this.movieValue.imdbID}, ${resp}`);
    //       console.log(`del movie! - 2`);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },

    async searchMovie() {
      await axios
        .post("http://127.0.0.1:3333/search", {
          t: this.titles,
          y: this.years,
        })
        .then((resp) => {
          console.log(`frontend post: ${resp.data.Title}, ${resp.data.Year}`);
          this.movieValue = resp.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async randomMovie() {
      await axios
        .post("http://127.0.0.1:3333/search/r", {
          i: `tt${Math.floor(Math.random() * 10000000 + 1)}`,
        })
        .then((resp) => {
          this.movieValue = resp.data;
          console.log(`frontend post: ${resp.data.Title}, ${resp.data.Year}`);
        })
        .catch((error) => {
          console.log(error);
        });
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
