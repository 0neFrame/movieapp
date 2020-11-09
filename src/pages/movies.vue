<template>
  <div class="myMovie text-values">
    <div v-if="movieColl" class="addNewMyMovie">
      <div class="container row col justify-content-center">
        <div
          v-for="(value, index) in allMovie"
          :key="(value, index)"
          :id="index"
          class="card"
          style="width: 18rem;"
        >
          <img :src="allMovie[index].poster" class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text">{{ allMovie[index].plot }}</p>
          </div>
          <!-- <div :id="index">
            <b-form-rating v-model="allMovie[index].rating"></b-form-rating>
            <p v-if="allMovie[index].rating" class="mt-2">
              My Rating: {{ allMovie[index].rating }}
            </p>
            <p v-else class="mt-2">Haven't Rating</p>
          </div> -->
          <form class="btnsforcollaction">
            <!-- <a :href="allMovie[index]._id"> -->
            <!-- <router-link to="/review">
                <button
                  id="addbtn"
                  :name="[index]"
                  :value="allMovie[index]._id"
                  v-on:click.prevent="addReview"
                  type="submit"
                  class="col btn btn-outline-dark"
                >
                  review
                </button>
              </router-link> -->
            <!-- </a> -->
            <button
              id="delbtn"
              :name="[index]"
              :value="allMovie[index]._id"
              v-on:click.prevent="delMovie"
              type="submit"
              class="col btn btn-outline-danger"
            >
              x
            </button>
          </form>
        </div>
      </div>
    </div>
    <div v-else class="emptycollaction user-select-none">
      <h1>WHERE IS MY MIDN?</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "movies",
  data() {
    return {
      // valueStars: null,
      indexMovie: [],
      allMovie: [],
      movieColl: false
    };
  },
  async mounted() {
    await axios
      .get("http://127.0.0.1:3333/api/v1/movies")
      .then(resp => {
        let docs = resp.data.docs;
        this.allMovie = [];
        docs.forEach(el => {
          console.log(el);
          if (el.user.id === localStorage.userID) this.allMovie.unshift(el);
        });
        if (resp.data.results > 0) this.movieColl = true;
        else this.movieColl = false;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    async delMovie() {
      const idMovie = await document.activeElement.value;
      await axios.delete(`http://127.0.0.1:3333/api/v1/movies/${idMovie}`);
      console.log("DELETED");

      await axios
        .get("http://127.0.0.1:3333/api/v1/movies")
        .then(resp => {
          let docs = resp.data.docs;
          this.allMovie = [];
          docs.forEach(el => {
            console.log(el);
            if (el.user.id === localStorage.userID) this.allMovie.unshift(el);
          });
          if (resp.data.results > 0) this.movieColl = true;
          else this.movieColl = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addReview() {}
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
.emptycollaction {
  padding: 25vh 0 55vh 0;
}
</style>
