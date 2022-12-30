import React, { useState, useEffect } from "react";
import styles from "../../styles/home.module.scss";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { FiDownload, FiArrowUpRight } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
// import { pinterestData } from "../../pinterestData";
import Avatar from "react-avatar";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const breakpointColumnsObj = {
  default: 5,
};

const HomeCards = () => {
  const navigate = useNavigate();
  const [pinData, setPinData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://mongoapi-rtbr.vercel.app/api/pin"
      );
      setPinData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.my_masonry_grid}
          columnClassName={styles.my_masonry_grid_column}
        >
          {pinData.map((data, ind) => (
            <div className={styles.cards_main} key={ind}>
              <div className="position-relative">
                <img
                  src={data.pinImg}
                  alt="happy"
                  style={{
                    height:
                      data.height === "small"
                        ? "228px"
                        : data.height === "medium"
                        ? "298px"
                        : "418px",
                  }}
                />
                <div className={styles.overlay}>
                  <div className={styles.category_details}>
                    <NavDropdown
                      title={data.category}
                      id="basic-nav-dropdown"
                      className={"fw-bold"}
                    >
                      <NavDropdown.Item
                        className={`fw-bold ${styles.dropdown_item}`}
                      >
                        Create Idea Pin
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className={`fw-bold ${styles.dropdown_item}`}
                      >
                        Create Pin
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Button>Save</Button>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <a href={data.webLink}>
                      <div className={styles.pin_link}>
                        <FiArrowUpRight size="18" />
                        <p>{data.webName}</p>
                      </div>
                    </a>
                    <div className={styles.download_icons}>
                      <div>
                        <FiDownload />
                      </div>
                      <div>
                        <BsThreeDots />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.pin_title}>
                <div
                  className={data.title === "" ? "d-none" : ""}
                  onClick={() => navigate(`/pin/${data._id}`)}
                >
                  <p>{data.title}</p>
                </div>
                <div
                  className={
                    data.profileImg === ""
                      ? "d-none"
                      : `d-flex align-items-center ${styles.pin_profile}`
                  }
                >
                  <Avatar src={data.profileImg} size="35" round={true} />
                  <p>{data.profileName}</p>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      )}
    </>
  );
};

export default HomeCards;
