import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaBell } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import Avatar from "react-avatar";
import avatarImg from "../../assets/images/profile.png";
import styles from "../../styles/header.module.scss";
import { GoChevronDown } from "react-icons/go";
import { logout, resetState } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = ()=>{
    dispatch(logout());
    dispatch(resetState());
    navigate("/");
    window.location.reload(); 
  }
  return (
    <div className="d-flex align-items-center">
      <div className={styles.icon_circle}>
        <FaBell color="#767676" size="25px" />
      </div>
      <div className={styles.icon_circle}>
        <AiFillMessage color="#767676" size="25px" />
      </div>
      <div className={styles.icon_circle} onClick={()=> navigate("/profile")}>
        <Avatar src={avatarImg} size="25" round={true} />
      </div>
      <NavDropdown
        title={
          <span>
            <GoChevronDown size="20px" />
          </span>
        }
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item>Action</NavDropdown.Item>
        <NavDropdown.Item>Another action</NavDropdown.Item>
        <NavDropdown.Item>Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default Notifications;
