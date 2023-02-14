import React from "react";
import styles from "../../styles/pinInfo.module.scss";
import Avatar from "react-avatar";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const PinContent = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const path = window.location.pathname.split("/")[2];

  return (
    <div className={styles.pin_content}>
      <a href="https://www.google.com">zedge.net</a>
      <h1>{data.title}</h1>
      <p>{data.desc}</p>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <Link to={`/profile/${path}`}>
            <Avatar src={data.profileImg} size="50" round={true} />
          </Link>
          <div className={styles.profile_name}>
            <p onClick={()=>navigate(`/profile/${path}`)}>{data.profileName}</p>
            <p>11.3k followers</p>
          </div>
        </div>
        <div>
          <button>Follow</button>
        </div>
      </div>
    </div>
  );
};

export default PinContent;
