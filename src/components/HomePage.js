import React from "react";
import PopularMovies from "./PopularMovies";
import SearchedMovies from "./SearchedMovies";
import "../styles/homepage.scss";
import "rc-pagination/assets/index.css";
import "../styles/pagination.scss";

const HomePage = (props) => {
  const { searchTerm, handleInput } = props;
  return (
    <div className="relative">
      <div className="search-input">
        <input
          type="text"
          name="search"
          style={{ width: "-webkit-fill-available" }}
          value={searchTerm}
          onChange={handleInput}
          placeholder="Search Movies..."
        />
      </div>
      {searchTerm.length === 0 ? <PopularMovies {...props} /> : <SearchedMovies {...props} />}
    </div>
  );
};

export default HomePage;
