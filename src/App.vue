<template>
  <div id="app">
    <form class="margin40" name="form1" v-on:submit.prevent="onSubmit">
      <div class="form-group text-align col-12">
        <label for="input1" class="row justify-content-center">TRY TO SEARCH MOVIE</label>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-5">
            <input
              v-model="items"
              type="text"
              id="input1"
              class="form-control"
              placeholder="Enter movie title"
            />
          </div>
          <div class>
            <button v-on:click="search" type="submit" class="btn btn-dark">SEARCH</button>
          </div>
        </div>
      </div>
    </form>

    <div class="media">
      <img src class="align-self-start mr-3 col-sm-2" alt />

      <div class="media-body">
        <h1 class="mt-0" v-bind="dataM">{{dataM.Title}}</h1>
        <dl class="row media-values">
          <dt class="col-sm-3 con-sm-1">
            <p>Year</p>
            <p>Type</p>
            <p>Genre</p>
            <p>Runtime</p>
            <p>Released</p>
            <p>DVD</p>
            <p>Director</p>
            <p>Writer</p>
            <p>Actors</p>
            <p>Rated</p>
            <p>Metascore</p>
            <p>IMDB_Rating</p>
          </dt>
          <dd class="col-sm-9 row-sm-1" v-bind="dataM">
            <p>{{dataM.Year}}</p>
            <p>{{dataM.Type}}</p>
            <p>{{dataM.Genre}}</p>
            <p>{{dataM.Runtime}}</p>
            <p>{{dataM.Released}}</p>
            <p>{{dataM.DVD}}</p>
            <p>{{dataM.Director}}</p>
            <p>{{dataM.Writer}}</p>
            <p>{{dataM.Actors}}</p>
            <p>{{dataM.Rated}}</p>
            <p>{{dataM.Metascore}}</p>
            <p>{{dataM.imdbRating}}</p>
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
      items: "",
      query: ""
    };
  },
  components: {},
  mounted() {
    fetch(
      `${process.env.VUE_APP_API_URL_TITLE}/?apikey=${process.env.VUE_APP_API_KEY}&t=${this.query}`
    )
      .then(res => res.json())
      .then(json => {
        this.dataM = json;
      });
  },

  methods: {
    search: function(e) {
      this.query = this.items;

      const mPoster = document.querySelector("img");
      mPoster.setAttribute("src", this.dataM.Poster);

      if (e) {
        fetch(
          `${process.env.VUE_APP_API_URL_TITLE}/?apikey=${process.env.VUE_APP_API_KEY}&t=${this.query}`
        )
          .then(res => res.json())
          .then(json => {
            this.dataM = json;
          });
      }
    }
  }
};
</script>

<style>
.margin40 {
  margin: 20px;
}
.media {
  margin-left: 25px;
  margin-right: 40px;
}
.media-values {
  margin-top: 20px;
}

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
