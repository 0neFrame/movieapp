<template>
  <div class="home container">
    <div class="text-title user-select-none"></div>

    <div class="spec text-title user-select-none">
      <label class>TRY TO SEARCH MOVIE or press =></label>
      <transition name="soon">
        <router-link to="/search">
          <button v-on:click="randomMovie" class="btn btn-outline-dark">
            RANDOM
          </button>
        </router-link>
      </transition>

      <div class="container">
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
            <transition name="soon">
              <router-link to="/search">
                <button v-on:click="searchMovie" class="btn btn-outline-dark">
                  search
                </button>
              </router-link>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1>
        <hr />
      </h1>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      titles: [],
      years: []
    };
  },
  methods: {
    ...mapActions(["fetchMovie", "fetchRandomMovie"]),

    searchMovie() {
      this.fetchMovie([this.years, this.titles]);
    },
    randomMovie() {
      this.fetchRandomMovie();
    }
  }
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
.soon-enter-active {
  transition: 0.9s;
}
.soon-enter,
.soon-leave-to {
  transform: translateX(150px);
  opacity: 0;
}
</style>
