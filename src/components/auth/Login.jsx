import React, { useState, useEffect } from "react";
import styles from "../../styles/header.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import logo from "../../assets/images/pinterestLogo.svg";
import Form from "react-bootstrap/Form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  resetState,
  login,
  googleLogin,
} from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const [show, setShow] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm();
  const clientId =
    "332221955948-ij07nvi7mqvq17t8dnfoa9fi806trr1v.apps.googleusercontent.com";
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    if (loginModal) {
      dispatch(login(data));
    } else {
      dispatch(registerUser(data));
    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
    if (isError) {
      toast.error(message);
      dispatch(resetState());
    }
    if (isSuccess) {
      setShow(false);
      if (loginModal) {
        toast.success("Successfully Login..");
      } else {
        toast.success("Successfully Registered..");
      }
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      if (formState.isSubmitSuccessful) {
        reset({ email: "", password: "", age: "" });
      }
      dispatch(resetState());
    }
  }, [
    isSuccess,
    isError,
    message,
    dispatch,
    formState,
    reset,
    navigate,
    loginModal,
  ]);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch(googleLogin({ data: { result, token } }));
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
  };
  return (
    <>
      <div className={`${styles.login_btn} d-flex align-items-center`}>
        <Button
          onClick={() => {
            setShow(true);
            setLoginModal(true);
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            setShow(true);
            setLoginModal(false);
          }}
        >
          Sign up
        </Button>
      </div>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header
          closeButton
          className="border-bottom-0 pb-0"
        ></Modal.Header>
        <Modal.Body className={`${styles.modal_main} pt-0`}>
          <img src={logo} alt="pinterest" />
          <h2>Welcome to Pinterest</h2>
          {!loginModal && <p>Find new ideas to try</p>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            {!loginModal && (
              <Form.Group className="mb-1 mt-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Name"
                  {...register("name")}
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-1 mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email")}
                required
              />
            </Form.Group>
            <Form.Group className="mb-1 position-relative">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showIcon ? "text" : "password"}
                placeholder="Create a password"
                {...register("password")}
                required
              />
              {showIcon ? (
                <AiFillEye
                  className={styles.eye_icon}
                  onClick={() => setShowIcon(!showIcon)}
                />
              ) : (
                <AiFillEyeInvisible
                  className={styles.eye_icon}
                  onClick={() => setShowIcon(!showIcon)}
                />
              )}
            </Form.Group>
            {loginModal ? (
              <p className={styles.alreay_member}>Forgot your password?</p>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Age"
                  {...register("age")}
                  required
                />
              </Form.Group>
            )}
            {isLoading ? (
              <Button>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            ) : (
              <Button type="submit">{loginModal ? "Login" : "Continue"}</Button>
            )}
            <h6 className="text-center my-2">OR</h6>
            <GoogleLogin
              clientId={clientId}
              buttonText="Google Sign In"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </Form>
          <div onClick={() => setLoginModal(!loginModal)}>
            <p className={styles.alreay_member}>
              {loginModal
                ? "Not on Pinterest yet? Sign up"
                : "Already a member? Login"}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
