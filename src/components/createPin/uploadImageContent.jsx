import React, { useState } from "react";
import styles from "../../styles/createpin.module.scss";
import Avatar from "react-avatar";
import profile from "../../assets/images/profile.png";
import TextareaAutosize from "react-textarea-autosize";
import Picker from "emoji-picker-react";
import NavDropdown from "react-bootstrap/NavDropdown";

const UploadImageContent = (props) => {
  const { handleChange, ind, title, destLink } = props;
  const [descriptionStr, setDescriptionStr] = useState("");
  const [showAltText, setShowAltText] = useState(false);

  const emojiSelect = (e, emojiObject) => {
    setDescriptionStr((prevInput) => prevInput + emojiObject.emoji);
  };
  return (
    <>
      <div className={styles.title_textarea}>
        <TextareaAutosize
          rows={1}
          className="mt-5"
          placeholder="Add Your Title"
          onChange={(e) => handleChange(ind, e)}
          value={title}
          name="title"
        />
      </div>
      <div className="d-flex align-items-center mt-4">
        <Avatar src={profile} size="45" round={true} />
        <div className={styles.profile_name}>
          <p>Profile Name</p>
        </div>
      </div>
      <div className={`${styles.desc_textarea} mt-4 d-flex align-items-center`}>
        <TextareaAutosize
          rows={1}
          placeholder="Tell everyone what your Pin is about"
          onChange={(e) => {
            handleChange(ind, e);
            setDescriptionStr(e.target.value);
          }}
          value={descriptionStr}
          name="desc"
        />
        <div>
          <NavDropdown
            title="😃"
            id="basic-nav-dropdown"
            drop="start"
            className="fs-3"
          >
            <NavDropdown.Item className={`fw-bold ${styles.dropdown_item}`}>
              <Picker onEmojiClick={emojiSelect} />
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
      <div className={styles.addalt_btn}>
        {showAltText ? (
          <div className={`${styles.destination_link} mt-0`}>
            <TextareaAutosize
              rows="1"
              className="mt-0 fst-italic"
              placeholder="Explain what people can see in the Pin"
            />
          </div>
        ) : (
          <button onClick={() => setShowAltText(true)}>Add alt text</button>
        )}
      </div>
      <div className={styles.destination_link}>
        <TextareaAutosize
          rows="1"
          className="mt-5"
          placeholder="Add a destination link"
          onChange={(e) => handleChange(ind, e)}
          value={destLink}
          name="destLink"
        />
      </div>
    </>
  );
};

export default UploadImageContent;
