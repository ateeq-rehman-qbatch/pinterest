import React, { useState } from "react";
import styles from "../../styles/pinInfo.module.scss";
import Avatar from "react-avatar";
import profile from "../../assets/images/profile.png";
import InputEmoji from "react-input-emoji";

const Input = (props) => {
  const [text, setText] = useState("");
  const { setShowInput } = props;
  function handleOnEnter(text) {
    console.log("enter", text);
  }
  return (
    <>
      <div className={`${styles.add_comment} d-flex align-items-center`}>
        <div>
          <Avatar src={profile} size="40" round={true} />
        </div>
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Reply"
        />
      </div>
      <div className={styles.cancel_btn}>
        <button onClick={()=>setShowInput(false)}>Cancel</button>
      </div>
    </>
  );
};

export default Input;
