<template id="tempo">
  <div class="container">
    <div class="media text-values">
      <img
        :src="comMovieValue[indexValue].poster"
        class="align-self-center mr-3 col-sm-0"
        alt
      />
      <div class="media-body">
        <h1 class="mt-0">{{ comMovieValue[indexValue].title }}</h1>
        <div>
          <div>
            <transition name="valM">
              <p v-if="!seen" class>
                My comment: {{ comMovieValue[indexValue].comment }}
              </p>
            </transition>
            <textarea
              v-if="seen"
              v-model="comment"
              class="overflow-auto"
              type="text"
              maxlength="300"
              cols="50"
              rows="10"
              placeholder="enter your text"
            />
          </div>
          <button
            v-if="seen"
            v-on:click="addComment"
            data-toggle="button"
            aria-pressed="false"
            class="btnMyMovie btn btn-outline-dark"
          >
            Save
          </button>
          <button
            v-if="!seen"
            v-on:click="editComment"
            data-toggle="button"
            aria-pressed="false"
            class="btnMyMovie btn btn-outline-dark"
          >
            Edit
          </button>
          <div class>
            <router-link to="/movies">
              <button class="btnMyMovie btn btn-outline-dark">
                Back to Collaction
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "review",
  data() {
    return {
      titles: [],
      years: [],
      indexValue: 0,
      comment: "",
      seen: false
    };
  },
  methods: {
    ...mapActions(["addMyMovieFunc"]),
    ...mapMutations(["addMyMovie"]),

    addComment() {
      this.seen = false;
      this.comMovieValue[this.indexValue].comment = this.comment;
    },
    editComment() {
      this.seen = true;
    }
  },
  computed: {
    ...mapGetters(["comMovieValue"])
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

textarea {
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
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
