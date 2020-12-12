<template id="tempo">
  <div class="container">
    <div class="media text-values">
      <div class="media-body">
        <img
          :src="movieData.poster"
          class="align-self-center mr-3 col-sm-0 "
          alt
        />
      </div>
      <div class="media-body">
        <h1 class="mt-0">{{ movieData.title }}</h1>
        <div class="container">
          <div v-if="seen">
            <b-form-rating v-model="rating" stars="10"></b-form-rating>
            <p v-if="rating" class="mt-2">My rating: {{ rating }}</p>
            <p v-else class="mt-2">Haven't rating</p>
          </div>
          <div>
            <div v-if="!seen">
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
          </div>

          <div class="container">
            <transition name="valM">
              <p v-if="!seen" class="container text-break text-left">
                My review: {{ reviewData.review }}
              </p>
            </transition>
            <textarea
              v-if="seen"
              v-model="review"
              class="overflow-auto"
              type="text"
              maxlength="300"
              cols="50"
              rows="10"
              placeholder="enter your text - max length = 300"
            />
          </div>

          <div v-if="this.$route.params.userId === lsUserID">
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
        let docs = resp.data.docs;
        this.reviewData = docs[0];
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
        })
        .catch((error) => {
          console.log(error);
        });

      await axios
        .get(
          `https://127.0.0.1:3333/api/v1/users/${this.$route.params.userId}/movies/${this.$route.params.movieId}/reviews`
        )
        .then((resp) => {
          let docs = resp.data.docs;
          this.reviewData = docs[0];
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
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
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
