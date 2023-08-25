import React from "react";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar({onSearch,searchTerm}) {

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.logo}>
        Movies App
      </Link>

      <div className={styles.right}>
        <div className={styles.search}>
          <input type="text" placeholder="Search Movie" value={searchTerm} onChange={onSearch} />
          <Search />
        </div>

        <p className={styles.link}>
          <Link to="/explore">Explore</Link>
        </p>
      </div>
    </div>
  );
}

export default Navbar;
