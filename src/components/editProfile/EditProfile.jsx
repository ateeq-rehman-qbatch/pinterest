import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import styles from "../../styles/profile.module.scss";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Input from "../input/Input";
import Button from "../button/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, resetState } from "../../redux/slices/authSlice";
import { getRandomColor, createImageFromInitials } from "../../utils/Utils";
import { getMe } from "../../redux/slices/authSlice";
import Spinner from "../spinner/Spinner";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [show, setShow] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState();
  const { register, handleSubmit, setValue } = useForm();
  const { isLoading,isSuccess, singleUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const TransformFileData = () => {
      const formData = new FormData();
      const reader = new FileReader();

      if (profilePhoto) {
        reader.readAsDataURL(profilePhoto);
        reader.onloadend = () => {
          formData.append("profileImg", reader.result);
          dispatch(updateProfile(formData));
          setShow(false);
        };
      }
    };
    TransformFileData();
    dispatch(getMe());
    setValue("name", singleUser.name);
    setValue("about", singleUser.about);
    setValue("website", singleUser.website);
  }, [dispatch, profilePhoto, setValue, singleUser.name, singleUser.about, singleUser.website]);

  const onSubmit = (data) => {
    dispatch(updateProfile(data));
  };
  if(isSuccess){
    toast.success("Profile Updated..");
    dispatch(resetState())
  }

  return isLoading ? (
    <div className="loader">
      <Spinner />
    </div>
  ) : (
    <>
      <div className="d-flex align-items-center flex-column mt-5">
        <div className="w-50">
          <h3 className="fw-semibold">Public profile</h3>
          <p>
            Add details about your business profile. People on Pinterest will be
            able to see this information, so don't share anything private!
          </p>
          <div className={styles.change_img}>
            <p className="mb-1">Photo</p>
            <div className="d-flex align-items-center">
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
                size="75"
                round={true}
              />
              <Button
                type="button"
                name="Change"
                onClick={() => setShow(true)}
              />
            </div>
          </div>
          <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Name"
                type="text"
                placeholder="Type your name"
                register={register("name")}
                required={true}
              />
              <Input
                label="About"
                placeholder="Tell your story"
                register={register("about")}
                textarea="textarea"
              />
              <Input
                label="Website"
                type="text"
                placeholder="Add a link to drive traffic to your site"
                register={register("website")}
              />
              <Button type="submit" btnClass="primary" name="Save" />
            </Form>
          </div>
        </div>
      </div>
      {/* add cover modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Body className="d-flex flex-column align-items-center">
          <h3 className="text-center fw-semibold pt-2">Change your picture</h3>

          <input
            type="file"
            id="files"
            style={{ display: "none" }}
            onChange={(e) => setProfilePhoto(e.target.files[0])}
          />
          <label htmlFor="files" className={styles.upload_profile}>
            Choose Photo
          </label>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProfile;
