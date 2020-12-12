<template>
  <div class="myMovie text-values">
    <h6 class="media-body" v-if="sortBy" v-on:click="sort">
      sorting by titles - a -> z
    </h6>
    <h6 class="media-body" v-else v-on:click="sort">
      sorting by titles - z -> a
    </h6>
    <div v-if="movieColl" class="addNewMyMovie">
      <div class="container row col justify-content-center">
        <div
          v-for="(value, index) in allMovie"
          :key="(value, index)"
          :id="index"
          class="card"
          style="width: 18rem"
        >
          <img :src="allMovie[index].poster" class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text">{{ allMovie[index].plot }}</p>
          </div>
          <form class="btnsforcollaction">
            <router-link
              :to="{
                name: 'user',
                params: { userId: lsUserID },
                name: 'movies',
                params: { movieId: allMovie[index]._id },
                name: 'review',
              }"
              replace
            >
              <button
                v-on:click="addReview"
                type="submit"
                class="col btn btn-outline-dark"
                :value="allMovie[index]._id"
              >
                review
              </button>
            </router-link>
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
      lsUserID: localStorage.userID,
      indexMovie: [],
      allMovie: [],
      movieColl: false,
      haveUser: false,
      sortBy: true,
    };
  },
  async mounted() {
    await axios
      .get("https://127.0.0.1:3333/api/v1/movies")
      .then((resp) => {
        console.log(resp);
        let docs = resp.data.docs;
        this.allMovie = [];
        docs.forEach((el) => {
          function checkAvailability(arr, val) {
            return arr.some((arrVal) => val === arrVal);
          }
          // if (checkAvailability(el.arrUserID, localStorage.userID)) {
          if (checkAvailability(el.arrUserID, this.$route.params.userId)) {
            this.allMovie.push(el);
          }
        });
        if (this.allMovie.length > 0) this.movieColl = true;
        else this.movieColl = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // async delMovie() {
    //   const idMovie = await document.activeElement.value;
    //   await axios.delete(`https://127.0.0.1:3333/api/v1/movies/${idMovie}`);
    //   console.log("DELETED");
    //   await axios
    //     .get("https://127.0.0.1:3333/api/v1/movies")
    //     .then((resp) => {
    //       let docs = resp.data.docs;
    //       this.allMovie = [];
    //       docs.forEach((el) => {
    //         function checkAvailability(arr, val) {
    //           return arr.some((arrVal) => val === arrVal);
    //         }
    //         if (checkAvailability(el.userUnqID, localStorage.userID)) {
    //           this.allMovie.push(el);
    //         }
    //       });
    //       if (this.allMovie.length > 0) this.movieColl = true;
    //       else this.movieColl = false;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    async sort() {
      if (this.sortBy) {
        this.sortBy = false;
        await axios.get("https://127.0.0.1:3333/api/v1/movies").then((resp) => {
          console.log(resp);
          let docs = resp.data.docs;
          this.allMovie = [];
          docs.forEach((el) => {
            function checkAvailability(arr, val) {
              return arr.some((arrVal) => val === arrVal);
            }
            if (checkAvailability(el.arrUserID, this.$route.params.userId)) {
              this.allMovie.unshift(el);
            }
          });
        });
      } else {
        this.sortBy = true;
        await axios.get("https://127.0.0.1:3333/api/v1/movies").then((resp) => {
          console.log(resp);
          let docs = resp.data.docs;
          this.allMovie = [];
          docs.forEach((el) => {
            function checkAvailability(arr, val) {
              return arr.some((arrVal) => val === arrVal);
            }
            if (checkAvailability(el.arrUserID, this.$route.params.userId)) {
              this.allMovie.push(el);
            }
          });
        });
      }
    },
    async addReview() {},
    // const idMovie = await document.activeElement.value;
    // await axios
    //   .post(`https://127.0.0.1:3333/api/v1/reviews`, {
    //     user: localStorage.userID,
    //     // user: this.$route.params.userId,
    //     movie: idMovie,
    //   })
    //   .then((resp) => {
    //     console.log(resp);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // },
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
.emptycollaction {
  padding: 25vh 0 55vh 0;
}
</style>
