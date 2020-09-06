<template id="tempo">
  <div id="app">
    <form class="margin40" name="form1" v-on:submit.prevent="onSubmit">
      <div class="form-group text-align col-12">
        <label for="input1" class="row justify-content-center text-title">TRY TO SEARCH MOVIE</label>
      </div>
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
            <button v-on:click="search" type="submit" class="btn btn-dark">SEARCH</button>
          </div>
        </div>
      </div>
    </form>

    <transition name="soon">
      <h1 class="spec media-body text-title justify-content-center text-center" v-if="!dataM.Title">
        comin soon...
        <h5>maybe...</h5>
      </h1>
    </transition>
    <div class="media text-values">
      <img :src="dataM.Poster" class="align-self-start mr-3 col-xs col-sm-0" alt />
      <div class="media-body">
        <h1 class="mt-0" v-bind="dataM">{{ dataM.Title }}</h1>
        <dl class="row media-values">
          <dt class="col-sm-1 con-sm-1" v-if="dataM.Title">
            <p>Type</p>
            <p>Director</p>
            <p>Writer</p>
            <p>Actors</p>
            <p>Genre</p>
            <p>Year</p>
            <p>Runtime</p>
            <p>Released</p>
            <p>DVD</p>
            <p>Rated</p>
            <p>IMDB_Rate</p>
            <p>Metascore</p>
          </dt>
          <dd class="col-sm-10 row-sm-1" v-bind="dataM">
            <p>{{ dataM.Type }}</p>
            <p>{{ dataM.Director }}</p>
            <p>{{ dataM.Writer }}</p>
            <p>{{ dataM.Actors }}</p>
            <p>{{ dataM.Genre }}</p>
            <p>{{ dataM.Year }}</p>
            <p>{{ dataM.Runtime }}</p>
            <p>{{ dataM.Released }}</p>
            <p>{{ dataM.DVD }}</p>
            <p>{{ dataM.Rated }}</p>
            <p>{{ dataM.imdbRating }}</p>
            <p>{{ dataM.Metascore }}</p>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  props: ["dataM"],
  data() {
    return {
      titles: [],
      years: [],
      titleQ: [],
      yearQ: [],
      resp: []
    };
  },
  components: {},
  mounted() {
    fetch(
      `${process.env.VUE_APP_API_URL_TITLE}/?apikey=${process.env.VUE_APP_API_KEY}`
    )
      .then(res => res.json())
      .then(json => {
        this.dataM = json;
        this.resp = console.log(json.keys);
      });
  },

  methods: {
    search: function(e) {
      this.titleQ = this.titles;
      this.yearQ = this.years;
      if (e) {
        fetch(
          `${process.env.VUE_APP_API_URL_TITLE}/?apikey=${process.env.VUE_APP_API_KEY}&t=${this.titleQ}&y=${this.yearQ}`
        )
          .then(res => res.json())
          .then(json => {
            this.dataM = json;
            this.resp = console.log(json.keys);
          });
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kufam:ital,wght@0,400;0,700;1,900&display=swap");

label {
  padding: 20px 0 0 20px;
}
.spec {
  padding: 225px 0px 225px 0px;
}
.media-body {
  margin: 20px 0 0 0;
}
.text-title {
  font-family: "Kufam", cursive;
  font-size: 150%;
  width: 400;
}
.text-values {
  font-family: "Kufam", cursive;
  font-size: 100%;
}
#app {
  background: rgb(131, 58, 180);
  background: linear-gradient(
    90deg,
    rgb(124, 118, 128) 0%,
    rgba(29, 253, 190, 1) 100%
  );
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
