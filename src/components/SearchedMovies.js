import React, { Component } from "react";
import { observer } from "mobx-react";
import store from "../store/homePage";
import Pagination from "rc-pagination";

const imageNotFound500 = require("../assets/images/imageNotFound500.png");

const SearchedMovies = observer(
  class extends Component {
    render() {
      const { searchResults, loaded } = store;
      const { pageOnChange } = this.props;
      return (
        <section>
          {loaded ? (
            <div className="movies-grid">
              {searchResults.results.map(
                ({
                  id,
                  poster_path,
                  original_title,
                  vote_average
                }) => (
                  <div
                    className="movie-item infos-container"
                    key={id}
                    onClick={() => {
                      window.location.href = `/movie/${id}`;
                    }}
                  >
                    <div className="movie-info"><span className="movie-text">{original_title}</span></div>
                    <div className="movie-info">
                      <span className="movie-text" style={{ color: "#e7c531" }}>&#9733;</span>{" "}
                      {vote_average} / 10
                    </div>
                      <img
                        src={
                          poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : `${imageNotFound500}`
                        }
                        alt={`Movie Poster`}
                      />
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="isLoading">Loading...</div>
          )}
          <div className="pagination">
            <Pagination
              total={searchResults.total_results}
              pageSize={20}
              onChange={pageOnChange}
            />
          </div>
        </section>
      );
    }
  }
);

export default SearchedMovies;
