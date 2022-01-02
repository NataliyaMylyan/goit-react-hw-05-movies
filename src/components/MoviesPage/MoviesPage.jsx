import { useState, useEffect } from "react";
import Searchbar from "../Searchbar/Searchbar.jsx";
import api from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import MoviesList from "../MoviesList/MoviesList.jsx";
import Loader from "../Loader/Loader.jsx";
import s from "./moviesPage.module.css";

const MoviesPage = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    setLoading(true);
    async function fetchData() {
      try {
        const { results } = await api.fetchMovieSearchQuery(searchQuery);
        setMovie(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchQuery]);

  const handleQueryChange = (query) => {
    setSearchQuery(query);
    navigate(`?query=${query}`);
  };

  return (
    <div>
      <Searchbar onSubmit={handleQueryChange} />
      <button className={s.button} onClick={() => navigate("/")}>
        GO BACK
      </button>
      {loading && <Loader />}
      <ul className={s.list}>
        {movie.map((film) => (
          <MoviesList movie={film} key={film.id} />
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
