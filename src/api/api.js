const axios = require("axios");

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = { api_key: "ea0f1310744e79134a1efd82c703b251" };

async function fetchMovies(url) {
  try {
    const { data } = await axios.get(url);
    // console.log("data = ", data);
    return data;
  } catch (error) {
    console.error("No results found");
  }
}
const fetchMovieTrending = function () {
  return fetchMovies(`/trending/movie/day?`);
};

const fetchMovieSearchQuery = function (searchQuery) {
  return fetchMovies(`/search/movie?&query=${searchQuery}`);
};

const fetchMovieDescription = function (movieId) {
  return fetchMovies(`/movie/${movieId}?&language=en-US`);
};

const fetchMovieCast = function (movieId) {
  return fetchMovies(`/movie/${movieId}/credits?&language=en-US`);
};

const fetchMovieReviews = async function (movieId) {
  return fetchMovies(`/movie/${movieId}/reviews?`);
};

// export function fetchMovieCast(movieId) {
//   return fetchWithErrorHandling(`/movie/${movieId}/credits?&language=en-US`);
// }

// export function fetchMovieReviews(movieId) {
//   return fetchWithErrorHandling(`/movie//${movieId}/reviews?`);
// }

// export function fetchMovieByQuery(query) {
//   return fetchWithErrorHandling(`/search/movie?&query=${query}&page=1`);
// }

// const fetchMovieTrending = async function () {
//   try {
//     const response = await axios.get(`/trending/movie/day?`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const fetchMovieSearchQuery = async function (searchQuery) {
//   try {
//     const response = await axios.get(`/search/movie?&query=${searchQuery}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const fetchMovieDescription = async function (movieId) {
//   try {
//     const response = await axios.get(`/movie/${movieId}?&language=en-US`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const fetchMovieCast = async function (movieId) {
//   try {
//     const response = await axios.get(
//       `/movie/${movieId}/credits?&language=en-US`
//     );
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const fetchMovieReviews = async function (movieId) {
//   try {
//     const response = await axios.get(`/movie/${movieId}/reviews?`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

const api = {
  fetchMovies,
  fetchMovieTrending,
  fetchMovieSearchQuery,
  fetchMovieDescription,
  fetchMovieCast,
  fetchMovieReviews,
};

export default api;

// https://api.themoviedb.org/3/movie/550?api_key=ea0f1310744e79134a1efd82c703b251

// async function fetchWithErrorHandling(url = '') {
//   try {
//     const { data } = await axios.get(url);
//     return data;
//   } catch (error) {
//     return error(`No movies found`);
//   }
// }

// const getImages = axios.create({
//   baseURL: "https://pixabay.com/api/",
//   params: {
//     key: "23855124-9744a76c55c8d410f772c2e55",
//     image_type: "photo",
//     orientation: "horizontal",
//   },
// });

// async function fetchImages(q = " ", page = 1, per_page = 12) {
//   const params = { q, page, per_page };
//   try {
//     const { data } = await getImages("", {
//       params,
//     });
//     return data;
//   } catch (error) {
//     console.error(`No results found for ${q}`);
//   }
// }

// const api = { fetchImages };
