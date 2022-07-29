import { observable, action, decorate, runInAction } from "mobx";
import { API_KEY, API_URL } from "./Constant";

class Home {
  popularMovies = [];
  loaded = false;
  searchResults = [];
  searchTerm = "";
  currentPage = 1;

  fetchPopular(page) {
    runInAction(() => {
      this.loaded = false;
    });

    fetch(
      `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((res) => {
        return this.setPopular(res);
      });
  }

  fetchSearch(searchTerm, page) {
    runInAction(() => {
      this.loaded = false;
      this.currentPage = 1;
    });
    fetch(
      `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setSearch(res);
      });
  }

  setPopular(data) {
    this.popularMovies = data;
    this.loaded = true;
  }

  setSearch(data) {
    this.searchResults = data;
    this.loaded = true;
  }
}

decorate(Home, {
  popularMovies: observable,
  search: observable,
  currentPage: observable,
  searchTerm: observable,
  setPopular: action,
  setSearch: action,
  loaded: observable
});

const store = new Home();

export default store;
