import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api.js";
import s from "./cast.module.css";

function Cast() {
  const [cast, setCast] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await api.fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [movieId]);

  return (
    <div className={s.wrapper}>
      {cast.cast && (
        <ul className={s.list}>
          {cast.cast.map((performer) => (
            <li className={s.performer} key={performer.id}>
              <img
                src={`https://image.tmdb.org/t/p/w300${performer.profile_path}`}
                alt={performer.name}
                width="50"
              />
              <p className={s.performer}>{performer.name}</p>
              <p className={s.name}>Character: {performer.character}</p>
            </li>
          ))}
        </ul>
      )}
      {!cast.cast && <h2>No Information Found( {cast.length}</h2>}
    </div>
  );
}
export default Cast;
