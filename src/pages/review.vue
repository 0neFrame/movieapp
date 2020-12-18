<template id="tempo">
  <div class="container">
    <img class="align-self-center" :src="movieData.poster" alt />
    <div class="media text-values">
      <div class="col">
        <h1 class="col media-body">
          {{ movieData.title }} ({{ movieData.year }})
        </h1>
        <div class="row row-cols-1 justify-content-center">
          <div
            class="col-sm col-md-5 col-lg-4 col-xl-4 col-fluid-3"
            v-if="seen"
          >
            <b-form-rating v-model="rating" stars="10"></b-form-rating>
            <p v-if="rating" class="mt-2">My rating: {{ rating }}</p>
            <p v-else class="mt-2">Haven't rating</p>
          </div>
          <div class="col-sm col-md-5 col-lg-4 col-xl-4 col-fluid-3" v-else>
            <b-form-rating
              v-model="reviewData.rating"
              stars="10"
              disabled
            ></b-form-rating>
            <p v-if="reviewData.rating" class="mt-2">
              My rating: {{ reviewData.rating }}
            </p>
            <p v-else class="mt-2">Haven't rating</p>
          </div>

          <div class="col">
            <transition name="valM">
              <p v-if="!seen" class="text-break text-left">
                My review: {{ reviewData.review }}
              </p>
            </transition>
            <textarea
              v-if="seen"
              v-model="review"
              class="overflow-auto"
              type="text"
              maxlength="300"
              cols="27"
              rows="10"
              placeholder="max length - 300"
            />
          </div>

          <div class="col" v-if="this.$route.params.userId === lsUserID">
            <button
              v-if="seen"
              v-on:click.prevent="saveReview"
              data-toggle="button"
              aria-pressed="false"
              class="btnMyMovie btn btn-outline-dark"
            >
              save
            </button>
            <button
              v-if="!seen"
              v-on:click="editReview"
              data-toggle="button"
              aria-pressed="false"
              class="btnMyMovie btn btn-outline-dark"
            >
              edit
            </button>
            <div class="">
              <router-link
                :to="{
                  name: 'user',
                  params: { userId: lsUserID },
                  name: 'movies',
                }"
                replace
              >
                <button class="btnMyMovie btn btn-outline-dark">
                  back to COLLECTION
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "review",
  data() {
    return {
      lsUserID: localStorage.userID,
      review: "",
      rating: null,
      seen: false,
      movieData: [],
      reviewData: [],
    };
  },
  async mounted() {
    await axios
      .get(`https://127.0.0.1:3333/api/v1/movies/${this.$route.params.movieId}`)
      .then((resp) => {
        let doc = resp.data.data.doc;
        console.log(doc);
        this.movieData = doc;
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(
        `https://127.0.0.1:3333/api/v1/users/${this.$route.params.userId}/movies/${this.$route.params.movieId}/reviews`
      )
      .then((resp) => {
        let doc = resp.data.doc;
        this.reviewData = doc[0];
        console.log("reviewData: ", resp);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    async saveReview() {
      this.seen = false;
      await axios
        .patch(`https://127.0.0.1:3333/api/v1/reviews/${this.reviewData.id}`, {
          review: this.review,
          rating: this.rating,
        })
        .then((resp) => {
          let doc = resp.data.data.doc;
          this.reviewData = doc;
          console.log(doc);
        })
        .catch((error) => {
          console.log(error);
        });

      await axios
        .get(
          `https://127.0.0.1:3333/api/v1/users/${this.$route.params.userId}/movies/${this.$route.params.movieId}/reviews`
        )
        .then((resp) => {
          let doc = resp.data.doc;
          this.reviewData = doc[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editReview() {
      this.seen = true;
      this.review = this.reviewData.review;
      this.rating = this.reviewData.rating;
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

textarea {
  padding: 10px 10px 10px 10px;
  box-sizing: border-box;
  border: 3px solid rgb(0, 0, 0);
  border-radius: 1px;
  background-color: #ffffffc7;
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
