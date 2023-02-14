import React from "react";
import styles from "../../styles/header.module.scss";
import logo from "../../assets/images/pinterestLogo.svg";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { GoChevronDown } from "react-icons/go";
import { useNavigate } from "react-router";

const Menu = (props) => {
  const navigate = useNavigate();
  return (
    <div className={`d-flex align-items-center ${styles.menu_main}`}>
      <div className={styles.icon_circle}>
        <img src={logo} alt="pinterest" />
      </div>
      <Button variant="dark" onClick={() => navigate("/")}>
        Home
      </Button>
      {props.user ? (
        <NavDropdown
          title={
            <span>
              Create <GoChevronDown size="20px" />
            </span>
          }
          id="basic-nav-dropdown"
          className="mx-4 fw-bold"
        >
          <NavDropdown.Item className={`fw-bold ${styles.dropdown_item}`}>
            Create Idea Pin
          </NavDropdown.Item>
          <NavDropdown.Item
            className={`fw-bold ${styles.dropdown_item}`}
            onClick={() => navigate("/pin-builder")}
          >
            Create Pin
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        ""
      )}
    </div>
  );
};

export default Menu;
