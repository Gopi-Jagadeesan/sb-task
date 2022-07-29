import React, { Component } from "react";
import { observer } from "mobx-react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MovieDetails from "./components/MovieDetails";
import "./styles/main.scss";

const App = observer(
  class extends Component {
    componentDidMount() {
      this.props.store.fetchPopular(this.props.store.currentPage);
    }

    handleInput = (e) => {
      let searchTerm = (this.props.store.searchTerm = e.target.value);
      if (searchTerm === 0) {
        this.props.store.fetchPopular(this.props.store.currentPage);
      } else {
        this.props.store.fetchSearch(searchTerm, this.props.store.currentPage);
      }
    };

    pageOnChange = (e) => {
      this.props.store.currentPage = e;
      if (this.props.store.searchTerm.length === 0) {
        this.props.store.fetchPopular(this.props.store.currentPage);
      } else {
        this.props.store.fetchSearch(
          this.props.store.searchTerm,
          this.props.store.currentPage
        );
      }
      this.scrollTop();
    };

    clearSearch = () => {
      this.props.store.searchTerm = "";
      this.props.store.currentPage = 1;
      this.props.store.fetchPopular(this.props.store.currentPage);
    };

    scrollTop = () => {
      window.scrollTo(0, 0);
    };

    render() {
      const { popularMovies, searchResults, loaded, searchTerm } = this.props.store;
      return (
        <div className="relative">
          <Switch>
            <Route exact path="/">
              <HomePage
                pageOnChange={this.pageOnChange}
                handleInput={this.handleInput}
                searchTerm={this.props.store.searchTerm}
                scrollTop={this.scrollTop}
              />
            </Route>
          </Switch>

          <Switch>
            {!loaded
              ? null
              : !searchTerm
              ? popularMovies.results.map((i) => (
                  <Route path={`/movie/${i.id}`} key={i.id}>
                    <MovieDetails id={i.id} scrollTop={this.scrollTop} />
                  </Route>
                ))
              : searchResults.results.map((i) => (
                  <Route path={`/movie/${i.id}`} key={i.id}>
                    <MovieDetails id={i.id} scrollTop={this.scrollTop} />
                  </Route>
                ))}
          </Switch>
        </div>
      );
    }
  }
);

export default App;
