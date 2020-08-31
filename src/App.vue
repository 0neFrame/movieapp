<template>
  <div id="app">
    <form class="margin40" name="form1">
      <div class="form-group text-align col-12">
        <label for="input1" class="row justify-content-center">TRY TO SEARCH MOVIE</label>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-5">
            <input type="search" class="form-control" id="input1" placeholder="Enter movie title"/>
          </div>
          <div class>
            <button type="submit" class="btn btn-dark">SEARCH</button>
          </div>
        </div>
      </div>
    </form>

    <div class="media">
      <img src="./img/search.png" class="align-self-start mr-3" alt />
      <div class="media-body">
        <h1 class="mt-0"></h1>
        <dl class="row">
          <dt class="col-sm-1 con-xl-3 "></dt>
          <dd class="col-sm-11 row-sm-2 "></dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {},
  mounted() {
    this.fetchMovies();
  },
  methods: {
    ...mapActions("movies", ["fetchMovies"])
  }
};
</script>

<style>
.margin40 {
  margin: 20px;
}
.media {
  margin-left: 25px;
  margin-right: 25px;
}
.media-values {
  margin-top: 16px;
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
