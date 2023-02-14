import React, { useState } from "react";
import styles from "../../styles/pinInfo.module.scss";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import Comment from "./Comment";
import Reply from "./Reply";
import Avatar from "react-avatar";
import profile from "../../assets/images/profile.png";
import InputEmoji from "react-input-emoji";

const Comments = () => {
  const [text, setText] = useState("");
  const [showComment, setShowComment] = useState(true);

  function handleOnEnter(text) {
    console.log("enter", text);
  }
  return (
    <div className={styles.comments_main}>
      <div className="d-flex align-items-center">
        <h5>7 Comments</h5>
        {showComment ? (
          <span
            className={`${styles.icon_circle2} ms-1`}
            onClick={() => setShowComment(!showComment)}
          >
            <GoChevronDown size="30px" />
          </span>
        ) : (
          <span
            className={`${styles.icon_circle2} ms-1`}
            onClick={() => setShowComment(!showComment)}
          >
            <GoChevronRight size="30px" />
          </span>
        )}
      </div>
      {showComment ? (
        <>
          <Comment />
          <Reply />
          <div className={styles.seemore_btn}>
            <button>See more</button>
          </div>
        </>
      ) : (
        ""
      )}
      <div className={`${styles.add_comment} d-flex align-items-center`}>
        <div>
          <Avatar src={profile} size="40" round={true} />
        </div>
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Add a comment"
        />
      </div>
    </div>
  );
};

export default Comments;
