import React, { useEffect, useState } from "react";
import styles from "../styles/pinInfo.module.scss";
import Avatar from "react-avatar";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const PinInfo = () => {
  const [pinData, setPinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const path = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://mongoapi-rtbr.vercel.app/api/pin/${path}`
      );
      setPinData(response.data);
      setLoading(false);
    };
    fetchData();                        
  }, [path]);
  return (
    <>
      {loading ? (
        <div className="loader">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className={styles.pinInfo_main}>
          <div className={styles.pin_card}>
            <div className="row">
              <div className="col-md-6">
                <div className={styles.pin_img}>
                  <img src={pinData.pinImg} alt="pin" />
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.pin_content}>
                  <h1>{pinData.title}</h1>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Eum alias culpa minima quisquam quos magnam quam, possimus
                    tenetur vitae.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <Avatar src={pinData.profileImg} size="50" round={true} />
                      <div className={styles.profile_name}>
                        <p>{pinData.profileName}</p>
                        <p>11.3k followers</p>
                      </div>
                    </div>
                    <div>
                      <button>Follow</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PinInfo;
