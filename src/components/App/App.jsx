import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Navigation from "../Navigation/Navigation.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import Loader from "../Loader/Loader.jsx";
// import HomePage from "../HomePage/Homepage.jsx";
// import MovieDetailsPage from "../MovieDetailsPage/MovieDetailsPage.jsx";
// import MoviesPage from "../MoviesPage/MoviesPage.jsx";
// import s from "./app.module.css";

const HomePage = lazy(() =>
  import("../HomePage/Homepage" /* webpackChunkName: "HomePage" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "../MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "MovieDetailsPage" */
  )
);
const MoviesPage = lazy(() =>
  import("../MoviesPage/MoviesPage" /* webpackChunkName: "MoviesPage" */)
);

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
