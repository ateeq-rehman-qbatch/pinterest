import React, { useEffect } from "react";
import styles from "../styles/profile.module.scss";
import Avatar from "react-avatar";
import { FiDownload } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import NavDropdown from "react-bootstrap/NavDropdown";
import Tabs, { Tab } from "react-best-tabs";
import "react-best-tabs/dist/index.css";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/spinner/Spinner";
import { getUser } from "../redux/slices/authSlice";
import { getRandomColor, createImageFromInitials } from "../utils/Utils";
import UserPins from "../components/userPins/UserPins";
import Button from "../components/button/Button";

const UserProfile = () => {
  const path = window.location.pathname.split("/")[2];
  const { isLoading, getUserData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(path));
  }, [dispatch, path]);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="w-100 d-flex justify-content-center">
            <div className={styles.profile_main}>
              {getUserData.coverImg && (
                <div className={styles.profile_cover}>
                  <img src={getUserData.coverImg} alt="profile cover" />
                </div>
              )}
              <div className="d-flex align-items-center flex-column">
                <div className={styles.profile_image}>
                  <Avatar
                    src={
                      !getUserData.profileImg
                        ? createImageFromInitials(
                            500,
                            getUserData.name,
                            getRandomColor()
                          )
                        : getUserData.profileImg
                    }
                    alt="profile"
                    size="120"
                    round={true}
                  />
                </div>
                <div className={styles.profile_details}>
                  <h1>{getUserData.name}</h1>
                  <p>@marliotina</p>
                  <div className="d-flex align-items-center justify-content-center">
                    {getUserData.website && (
                      <a
                        href={getUserData.website}
                        className="fw-semibold text-dark mb-2"
                      >
                        {getUserData.website}
                      </a>
                    )}
                    {getUserData.website && getUserData.about && (
                      <span className="px-1">·</span>
                    )}
                    {getUserData.about && (
                      <span className="mb-2">{getUserData.about}</span>
                    )}
                  </div>
                  <div>
                    <span className="fw-semibold">3.5k followers</span>
                    <span className="px-1">·</span>
                    <span>3 following</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mt-3">
                    <div className={styles.circle_icon}>
                      <FiDownload size="25px" />
                    </div>
                    <div className="d-flex align-items-center mx-4">
                      <>
                        <Button
                          type="button"
                          name="Message"
                          btnClass="secondary"
                        />
                        <div className="ms-2">
                          <Button
                            type="button"
                            name="Follow"
                            btnClass="primary"
                          />
                        </div>
                      </>
                    </div>

                    <div className={styles.circle_icon}>
                      <NavDropdown
                        title={
                          <span>
                            <BsThreeDots size="25px" />
                          </span>
                        }
                        id="basic-nav-dropdown"
                      >
                        {["Block", "Report"].map((item, ind) => (
                          <NavDropdown.Item
                            className={`fw-bold ${styles.dropdown_item}`}
                            key={ind}
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
          <Tabs
            activeTab="1"
            className="mt-5"
            ulClassName="justify-content-center border-bottom-0"
            // onClick={(event, tab) => console.log(event, tab)}
          >
            <Tab title="Created" className="p-0 pb-2 fw-semibold">
              <div className="mt-3">
                <UserPins path={path} />
              </div>
            </Tab>
            <Tab title="Saved" className="ms-4 fw-semibold p-0 pb-2">
              <div className="mt-3">Tab 2 content</div>
            </Tab>
          </Tabs>
        </>
      )}
    </>
  );
};

export default UserProfile;
