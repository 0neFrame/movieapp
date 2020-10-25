<template>
  <div class="myMovie text-values">
    <div v-if="comMovieValue[0].poster" class="addNewMyMovie">
      <div class="container row col justify-content-center">
        <div
          v-for="(value, index) in comMovieValue"
          :key="(value, index)"
          :id="index"
          class="card"
          style="width: 18rem;"
        >
          <img
            :src="comMovieValue[index].poster"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text">{{ comMovieValue[index].plot }}</p>
          </div>
          <div :id="index">
            <b-form-rating v-model="valueStars"></b-form-rating>
            <p v-if="valueStars" class="mt-2">My Rating: {{ valueStars }}</p>
            <p v-if="!valueStars" class="mt-2">Haven't Rating</p>
          </div>
          <!-- <router-link to="/review">
            <a :href="comMovieValue[index].id">
            <button
              :id="index"
              v-on:click="addIndexMovie"
              type="submit"
              class="col btn btn-outline-dark"
            >view</button>
            </a>
          </router-link>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "movies",
  data() {
    return {
      // valueStars: null,
      indexMovie: []
    };
  },
  methods: {
    addIndexMovie() {
      // this.indexMovie = this.button.index;
      // console.log(this.indexMovie, this.comMovieValue[this.indexMovie]);
    }
  },
  computed: {
    ...mapGetters(["comMovieValue", "postsValue"]),

    valueStars: {
      get() {
        return this.comMovieValue.valueStars;
      },
      set(val) {
        this.$store.commit("prePostsMovie", val);
      }
    }
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

.submit {
  margin: 20px 0px 20px 0px;
}

.btn1 {
  margin-left: 5px;
  padding: 0px 20px 0px 20px;
}
.card {
  margin: 10px 0px 0px 1px;
}
.spec {
  padding: 25vh 0 50vh 0;
}
</style>
