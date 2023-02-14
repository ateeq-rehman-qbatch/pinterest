import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../../styles/header.module.scss";

const Search = () => {
  return (
    <div className={styles.header_search}>
      <FaSearch color="#767676" />
      <input type="search" placeholder="Search" />
    </div>
  );
};

export default Search;
