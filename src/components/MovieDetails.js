import React, { Component } from "react";
import { observer } from "mobx-react";
import movieStore from "../store/moviesPage";
import "../styles/movie.scss";

const imageNotFound500 = require("../assets/images/imageNotFound500.png");

const MovieDetails = observer(
  class extends Component {
    componentDidMount() {
      movieStore.fetchAll(this.props.id);
    }

    render() {
      const { loaded, details } = movieStore;

      const languageNames = new Intl.DisplayNames(["en"], {
        type: "language"
      });

      return (
        <div className="relative">
          {loaded && details.length !== 0 ? (
            <>
              <div className="movie-grid">
                <div className="infos-grid">
                  <div
                    className="back-button"
                    onClick={() => {
                      window.location.replace(`/`);
                    }}
                  >
                    &#x2190; Back
                  </div>
                  <div className="movie-title relative">{details.title}</div>
                  <div className="movie-infos">
                    <span className="highlight-label">Ratings : </span>
                    <span className="movie-votings">
                      {" "}
                      {details.vote_average.toFixed(2)} / 10
                    </span>
                  </div>

                  <div className="movie-tagline">
                    {details.tagline ? details.tagline : null}
                  </div>

                  <div className="movie-overview">{details.overview}</div>
                  <div className="movie-highlights">
                    <span className="highlight-label">Release Date : </span>
                    <span className="highlight-text">
                      {details.release_date}
                    </span>
                  </div>
                  <div className="movie-highlights">
                    <span className="highlight-label">
                      Original Language :{" "}
                    </span>
                    <span className="highlight-text">
                      {languageNames.of(details.original_language)}
                    </span>
                  </div>
                </div>
                <div className="movie-img">
                  <img
                    src={
                      details.poster_path
                        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                        : `${imageNotFound500}`
                    }
                    alt="Movie img"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="isLoading">Loading</div>
          )}
        </div>
      );
    }
  }
);

export default MovieDetails;
