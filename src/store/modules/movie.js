export default {
  state: {
    movieData: [],
    posts: [],
    comMovie: []
  },
  getters: {
    movieValue: state => state.movieData,
    postsValue: state => state.posts,
    comMovieValue: state => state.comMovie
  },
  mutations: {
    UPD: (state, movieD) => (state.movieData = movieD),
    prePostsMovie: (state, movieD) =>
      state.posts.unshift({
        id: movieD.imdbID,
        poster: movieD.Poster,
        title: movieD.Title,
        plot: movieD.Plot,
        comment: "no comment",
        valueStars: null
      }),
    addMyMovie: state => state.comMovie.unshift(state.posts[0])
  },
  actions: {
    async fetchMovie({ commit }, [years, titles]) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL_TITLE}/?apikey=${process.env.VUE_APP_API_KEY}&t=${titles}&y=${years}`
      );
      const movieD = await res.json();
      // console.log(res);
      // console.log(movieD);
      commit("UPD", movieD);
      commit("prePostsMovie", movieD);
    },
    async fetchRandomMovie(
      { commit },
      tt = Math.floor(Math.random() * 10000000 + 1)
    ) {
      const res = await fetch(
        `${process.env.VUE_APP_API_URL_TITLE}/?apikey=${process.env.VUE_APP_API_KEY}&i=tt${tt}`
      );
      const movieD = await res.json();
      if (movieD.Response === "False") {
        this.fetchRandomMovie();
      } else {
        commit("UPD", movieD);
        commit("prePostsMovie", movieD);
      }
      console.log(res);
      console.log(movieD);
    },
    addMyMovieFunc({ commit }) {
      commit("addMyMovie");
    }
  }
};
