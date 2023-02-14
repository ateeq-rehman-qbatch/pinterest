import React, { useState } from "react";
import Avatar from "react-avatar";
import profile from "../../assets/images/profile.png";
import { FaHeart } from "react-icons/fa";
import { BsThreeDots, BsHandThumbsUpFill } from "react-icons/bs";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "../../styles/pinInfo.module.scss";
import Input from "./Input";

const Comment = () => {
  const [showInput, setShowInput] = useState(false);
  return (
    <>
      <div className="d-flex my-3">
        <div>
          <Avatar src={profile} size="30" round={true} />
        </div>
        <div className="ms-2 w-100">
          <div className={` ${styles.comment_name}`}>
            <span>
              Profile Name
              <span className={styles.comment}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit
                beatae eveniet quos voluptates tempore ipsa minus est deserunt
                nobis sapiente!
              </span>
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className={`d-flex align-items-center ${styles.likes_reply}`}>
              <p>3mo</p>
              <p onClick={() => setShowInput(true)}>Reply</p>
              <div className="d-flex align-items-center">
                <div className={styles.comment_circle}>
                  <FaHeart size="13px" color="#767676" />
                </div>
                <span>3</span>
              </div>
              <div className={styles.comment_circle}>
                <NavDropdown
                  title={
                    <span>
                      <BsThreeDots color="#767676" size="15px" />
                    </span>
                  }
                  id="basic-nav-dropdown"
                >
                  {["Report this content", "Block user"].map((item, ind) => (
                    <NavDropdown.Item
                      className={`fw-bold ${styles.dropdown_item}`}
                      key={ind}
                    >
                      {item}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </div>
            </div>
            <div className={`${styles.helpful} d-flex align-items-center`}>
              <BsHandThumbsUpFill color="#767676" size="13px" />
              <p>Helpful</p>
            </div>
          </div>
          {showInput ? (
            <>{showInput ? <Input setShowInput={setShowInput} /> : ""}</>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
