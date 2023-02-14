import React, { useEffect, useState } from "react";
import styles from "../styles/profile.module.scss";
import Avatar from "react-avatar";
import Tabs, { Tab } from "react-best-tabs";
import "react-best-tabs/dist/index.css";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/spinner/Spinner";
import { getMe } from "../redux/slices/authSlice";
import { getRandomColor, createImageFromInitials } from "../utils/Utils";
import UserPins from "../components/userPins/UserPins";
import Modal from "react-bootstrap/Modal";
import ImageCrop from "../components/imageCrop/ImageCrop";
import { useNavigate } from "react-router";
import Button from "../components/button/Button";

const Profile = () => {
  const [show, setShow] = useState(false);
  const { isLoading, singleUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

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
              <div className={styles.profile_cover}>
                {singleUser.coverImg &&<img src={singleUser.coverImg} alt="profile cover" />}
                <div className={styles.add_cover} onClick={() => setShow(true)}>
                  <h2>+</h2>
                </div>
              </div>
              <div className="d-flex align-items-center flex-column">
                <div className={styles.profile_image}>
                  <Avatar
                    src={
                      !singleUser.profileImg
                        ? createImageFromInitials(
                            500,
                            singleUser.name,
                            getRandomColor()
                          )
                        : singleUser.profileImg
                    }
                    alt="profile"
                    size="120"
                    round={true}
                  />
                </div>
                <div className={styles.profile_details}>
                  <h1>{singleUser.name}</h1>
                  <p>@marliotina</p>
                  <div className="d-flex align-items-center justify-content-center">
                    {singleUser.website && (
                      <a
                        href={singleUser.website}
                        className="fw-semibold text-dark mb-2"
                      >
                        {singleUser.website}
                      </a>
                    )}
                    {singleUser.website && singleUser.about && (
                      <span className="px-1">·</span>
                    )}
                    {singleUser.about && (
                      <span className="mb-2">{singleUser.about}</span>
                    )}
                  </div>
                  <div>
                    <span className="fw-semibold">3.5k followers</span>
                    <span className="px-1">·</span>
                    <span>3 following</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mt-3">
                    <div className="d-flex align-items-center mx-4">
                      
                        <>
                          <Button
                            type="button"
                            name="Share"
                            btnClass="secondary"
                          />
                          <div className="ms-2">
                            <Button
                              type="button"
                              name="Edit Profile"
                              btnClass="secondary"
                              onClick={() => navigate("/edit-profile")}
                            />
                          </div>
                        </>
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
                <UserPins />
              </div>
            </Tab>
            <Tab title="Saved" className="ms-4 fw-semibold p-0 pb-2">
              <div className="mt-3">Tab 2 content</div>
            </Tab>
          </Tabs>
        </>
      )}
      {/* add cover modal */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="cover-modal"
      >
        <Modal.Header
          closeButton
          className="border-bottom-0 pb-0 pt-4 pe-4"
        ></Modal.Header>
        <Modal.Body className={styles.cover_modal}>
          <ImageCrop setShow={setShow} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
