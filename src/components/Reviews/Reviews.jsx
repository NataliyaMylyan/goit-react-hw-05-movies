import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api.js";
import s from "./reviews.module.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await api.fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [movieId]);

  return (
    <div>
      <h3 className={s.title}>Reviews:</h3>

      {reviews.results && (
        <ul className={s.list}>
          {reviews.results.map((data) => (
            <li className={s.listItem} key={data.id}>
              <p className={s.author}>Author: {data.author}</p>
              <p className={s.content}>{data.content}</p>
            </li>
          ))}
        </ul>
      )}
      {!reviews && <h2>No Information Found </h2>}
    </div>
  );
}
export default Reviews;
