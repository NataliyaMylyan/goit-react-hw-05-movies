import { useState, useEffect, Suspense } from "react";
import {
  useParams,
  useNavigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import Cast from "../Cast/Cast.jsx";
import Reviews from "../Reviews/Reviews.jsx";
import Loader from "../Loader/Loader.jsx";
import api from "../../api/api.js";
import s from "./movieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await api.fetchMovieDescription(movieId);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  const { poster_path, title, release_date, vote_average, overview, genres } =
    movie;
  const year = release_date ? release_date.split("-")[0] : "";
  const isActive = ({ isActive }) => (isActive ? `${s.active}` : "");

  return (
    <>
      <button className={s.button} onClick={() => navigate("/")}>
        <span className={s.back}>GO BACK</span>
      </button>
      <div className={s.container}>
        {loading && <Loader />}
        <div className={s.poster}>
          {poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              width="250"
            />
          ) : (
            <h2>No Image:(</h2>
          )}
        </div>
        <div className={s.wrapper}>
          <h2 className={s.title}>
            {title} ({year})
          </h2>
          <p className={s.text}>User score: {vote_average * 10}%</p>
          <h3 className={s.overview}>Overview</h3>
          <p className={s.text}>{overview}</p>
          <h3 className={s.genres}>Genres</h3>
          {genres ? (
            <p className={s.text}>{genres.map(({ name }) => name).join(" ")}</p>
          ) : (
            <h3>No Genres Found(</h3>
          )}

          <h3 className={s.adinfo}>Additional information:</h3>

          <ul className={s.list}>
            <li className={s.listItem}>
              <NavLink to="cast" className={isActive}>
                <span className={s.span}> Cast</span>
              </NavLink>
            </li>
            <li className={s.listItem}>
              <NavLink to="reviews" className={isActive}>
                <span className={s.span}>Reviews</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="cast" element={movie && <Cast movieId={movieId} />} />
            <Route
              path="reviews"
              element={movie && <Reviews movieId={movieId} />}
            />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default MovieDetailsPage;
