import { useState } from "react";
import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import s from "./searchbar.module.css";

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = ({ target: { value } }) => {
    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      toast("Enter your query!");
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <ImSearch />
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          value={searchQuery}
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
