import React, { useEffect } from "react";
import styles from "../../styles/home.module.scss";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { FiDownload, FiArrowUpRight } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getUserPin } from "../../redux/slices/pinSlice";
import { saveAs } from "file-saver";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import { getProfilePin } from "../../redux/slices/pinSlice";

const breakpointColumnsObj = {
  default: 5,
};

const UserPins = (props) => {
  const { path } = props;
  const navigate = useNavigate();
  const { isLoading, userPins } = useSelector((state) => state.pins);
  const { profilePinsData } = useSelector((state) => state.pins);

  const dispatch = useDispatch();

  useEffect(() => {
    if (path === undefined) {
      dispatch(getUserPin());
    } else {
      dispatch(getProfilePin(path));
    }
  }, [dispatch, path]);

  const downloadImage = (e, url) => {
    console.log(url, "url");
    e.preventDefault();
    axios({
      url: url,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      saveAs(res.data, "pinImage.jpg");
    });
  };
  return (
    <>
      {isLoading ? (
        <div className="loader">
          <Spinner />
        </div>
      ) : (
        <div className="container">
          <div className="d-flex align-items-center justify-content-center w-100">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className={styles.my_masonry_grid}
              columnClassName={styles.my_masonry_grid_column}
            >
              {(path === undefined ? userPins : profilePinsData).map(
                (data, ind) => {
                  return (
                    <div className={styles.cards_main} key={ind}>
                      <div
                        className="position-relative"
                        onClick={() => navigate(`/pin/${data._id}`)}
                      >
                        <img
                          src={data.pinImage?.secure_url}
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
                          <div
                            className={`${styles.category_details} float-end`}
                          >
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
                              <div className="dropdown">
                                <div
                                  className={`${styles.icon_circle} dropdown-toggle`}
                                >
                                  <FiDownload />
                                </div>
                                <div className="dropdown-menu">
                                  <div className={styles.social_share}></div>
                                </div>
                              </div>
                              <div className={styles.icon_circle}>
                                <NavDropdown
                                  title={
                                    <span>
                                      <BsThreeDots size="20px" />
                                    </span>
                                  }
                                  id="basic-nav-dropdown"
                                  className="mx-4 fw-bold"
                                >
                                  {[
                                    "Hide Pin",
                                    "DownLoad Image",
                                    "Report Pin",
                                  ].map((item, ind) => (
                                    <NavDropdown.Item
                                      className={`fw-bold ${styles.dropdown_item}`}
                                      key={ind}
                                      onClick={
                                        ind === 1
                                          ? (e) => downloadImage(e, data.imgUrl)
                                          : ""
                                      }
                                    >
                                      {item}
                                    </NavDropdown.Item>
                                  ))}
                                </NavDropdown>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </Masonry>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPins;
