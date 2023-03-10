import React, { useEffect } from "react";
import styles from "../styles/home.module.scss";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { FiDownload, FiArrowUpRight } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import Avatar from "react-avatar";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getPins } from "../redux/slices/pinSlice";
import { GoChevronDown } from "react-icons/go";
import { saveAs } from "file-saver";
import axios from "axios";
import Spinner from "../components/spinner/Spinner";
import { user } from "../components/auth/CheckUser";
import { toast } from "react-toastify";
import { getRandomColor, createImageFromInitials } from "../utils/Utils";

const breakpointColumnsObj = {
  default: 5,
};

const Home = () => {
  const navigate = useNavigate();
  const { isLoading, pinsApi } = useSelector((state) => state.pins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPins());
  }, [dispatch]);

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
              {pinsApi
                .slice(0)
                .reverse()
                .map((data, ind) => {
                  return (
                    <div className={styles.cards_main} key={ind}>
                      <div
                        className="position-relative"
                        onClick={() => {
                          user
                            ? navigate(`/pin/${data._id}`)
                            : toast.error("Please login...");
                        }}
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
                          <div className={styles.category_details}>
                            <NavDropdown
                              title={
                                <span>
                                  {data.category}
                                  <GoChevronDown size="20px" color="#fff" />
                                </span>
                              }
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
                                  ].map((item, index) => (
                                    <NavDropdown.Item
                                      className={`fw-bold ${styles.dropdown_item}`}
                                      key={index}
                                      onClick={
                                        index === 1
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
                      <div className={styles.pin_title}>
                        <div
                          className={data.title === "" ? "d-none" : ""}
                          onClick={() => {
                            user
                              ? navigate(`/pin/${data._id}`)
                              : toast.error("Please login...");
                          }}
                        >
                          <p>{data.title}</p>
                        </div>
                        <div
                          className={
                            data.profileImg === ""
                              ? "d-none"
                              : `d-flex align-items-center ${styles.pin_profile}`
                          }
                          onClick={() => {
                            user
                              ? navigate(`/profile/${data.user}`)
                              : toast.error("Please login...");
                          }}
                        >
                          <Avatar
                            src={
                              data.profileImg
                                ? data.profileImg
                                : createImageFromInitials(
                                    500,
                                    data.profileName,
                                    getRandomColor()
                                  )
                            }
                            size="35"
                            round={true}
                          />
                          <p>{data.profileName}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Masonry>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
