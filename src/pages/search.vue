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
          RANDOM
        </button>
      </div>
      <div class="container text-values">
        <div class="form-row justify-content-center">
          <div class="col-4">
            <input
              v-model="titles"
              type="text"
              id="input1"
              class="form-control text-center"
              placeholder="title"
            />
          </div>
          <div class="col-3">
            <input
              type="number"
              v-model.number="years"
              id="input1"
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
            <dt class="col-sm-1 con-sm-1" v-if="movieValue.Title">
              <p>Type</p>
              <p>Director</p>
              <p>Genre</p>
              <p>Runtime</p>
              <p>Year</p>
              <p>Released</p>
              <p>DVD</p>
              <p>Rated</p>
              <p>IMDB_Rate</p>
              <p>Metascore</p>
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
          <router-link to="/user/s/movies">
            <button
              v-on:click.once="addMyMovieClick"
              data-toggle="button"
              aria-pressed="false"
              class="btnMyMovie btn btn-outline-dark"
            >
              Add in My Collaction
            </button>
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "search",
  data() {
    return {
      titles: [],
      years: []
    };
  },
  methods: {
    ...mapActions(["fetchMovie", "fetchRandomMovie", "addMyMovieFunc"]),
    ...mapMutations(["addMyMovie"]),

    addMyMovieClick() {
      this.addMyMovieFunc();
    },
    searchMovie() {
      this.fetchMovie([this.years, this.titles]);
    },
    randomMovie() {
      this.fetchRandomMovie();
    }
  },
  computed: {
    ...mapGetters(["movieValue", "postsValue", "comMovieValue"])
  }
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

label {
  padding: 0px 0px 0px 20px;
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
