import axios from "@/plugins/axios";

const moviesStore = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async fetchMovies() {
      const response = await axios.get(submitQ);
      const data = response.data;

      const btn = document.querySelector("button");
      btn.onclick = function(e) {
        e.preventDefault();

        const form = document.forms["form1"];
        const input = form.elements["input1"];
        let inputV = input.value;

        function submitQ() {
          inputV;
          // document.getElementById("input1").reset();
        }

        form.addEventListener("submit", submitQ);

        const mPoster = document.querySelector("img");
        mPoster.setAttribute("src", data.Poster);

        const movieTitle = document.querySelector("h1");
        const mTitle = document.createElement("tagTitle");
        mTitle.textContent = data.Title;
        movieTitle.appendChild(mTitle);

        const keysName = Object.keys(data);
        keysName.forEach((el) => getValues(el, "dt"));
        const valuesName = Object.values(data);
        valuesName.forEach((el) => getValues(el, "dd"));

        function getValues(el, tag) {
          const a = document.querySelector(tag);
          const b = document.createElement(tag);
          b.textContent = el;
          b.setAttribute("class", "media-values");
          a.appendChild(b);
        }
      };
    },
  },
};

export default moviesStore;
