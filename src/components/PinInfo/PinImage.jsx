import React from "react";
import styles from "../../styles/pinInfo.module.scss";

const PinImage = (props) => {
  const { data } = props;
  return (
    <div className={styles.pin_img}>
      <img src={data.pinImage?.secure_url} alt="pin" />
    </div>
  );
};

export default PinImage;
