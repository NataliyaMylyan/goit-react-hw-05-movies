import React from "react";
import { useState, useEffect } from "react";
import api from "../../api/api.js";
import MoviesList from "../MoviesList/MoviesList.jsx";
import Loader from "../Loader/Loader.jsx";
// import PropTypes from "prop-types";
import s from "./homePage.module.css";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { results } = await api.fetchMovieTrending("trendingMovies");
        setTrendingMovies(results);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Trending today</h2>
      {!loading && (
        <ul className={s.list}>
          {trendingMovies.map((movie) => (
            <MoviesList movie={movie} key={movie.id} />
          ))}
          {loading && <Loader />}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
