import React from "react";
import styles from "../../styles/components.module.scss";

const Button = (props) => {
  const { name, type, btnClass, onClick } = props;
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={
          btnClass === "primary" ? styles.btn_primary : styles.btn_secondary
        }
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
