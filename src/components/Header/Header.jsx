import React from "react";
import styles from "../../styles/header.module.scss";
import Login from "../auth/Login";
import Menu from "./Menu";
import Notifications from "./Notifications";
import Search from "./Search";
import { user } from "../auth/CheckUser";

const Header = () => {
  return (
    <div className={styles.header_main}>
      <div className="d-flex align-items-center justify-content-between w-100">
        <Menu user={user} />
        <Search />
        {user ? <Notifications /> : <Login />}
      </div>
    </div>
  );
};

export default Header;
