import React, { useState, useEffect } from "react";
import styles from "../styles/createpin.module.scss";
import UplaodImage from "../components/createPin/UploadImage";
import UploadImageContent from "../components/createPin/uploadImageContent";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPins } from "../redux/slices/pinSlice";
import Spinner from "../components/spinner/Spinner";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsThreeDots } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const CreatePin = () => {
  const [pinData, setPinData] = useState([
    { title: "", desc: "", destLink: "", size: "" },
  ]);
  console.log(pinData,"pindata");
  const [pinImage, setPinImage] = useState("");
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.pins);
  const status = localStorage.getItem("status");

  const sendData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (files.length === 0) {
      toast.error("Please upload image");
    } else {
      if (isLoading) {
       return <div className="loader">
          <Spinner />;
        </div>;
      } else {
        formData.append("category", "Computer");
        formData.append("height", pinData[0].size);
        formData.append("webName", "pinterest");
        formData.append("title", pinData[0].title);
        formData.append("desc", pinData[0].desc);
        formData.append("webLink", pinData[0].destLink);
        formData.append("pinImage", pinImage);
        dispatch(createPins(formData));

        if (status === "200") {
          toast.success("Pin uploaded successfully");
          setPinData([{ title: "", desc: "", destLink: "", size: "" }]);
          setFiles([]);
        }
      }
    }
    setTimeout(() => {
      localStorage.setItem("status", "");
    }, 1000);
  };
  useEffect(() => {
    const TransformFileData = () => {
      const reader = new FileReader();

      if (files[0]) {
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          setPinImage(reader.result);
        };
      } else {
        setPinImage("");
      }
    };
    TransformFileData();
  }, [files]);

  const addCard = () => {
    setPinData([{ title: "", desc: "", destLink: "", size: "" }, ...pinData]);
    setFiles([]);
    window.scroll(0, 0);
  };
  const removeCards = (index) => {
    const rows = [...pinData];
    rows.splice(index, 1);
    setPinData(rows);
  };
  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...pinData];
    list[index][name] = value;
    setPinData(list);
  };

  function duplicate() {
    setPinData([{ title: pinData.title, desc: pinData.desc, destLink: pinData.destLink, size: pinData.size}, ...pinData]);
  }
  return (
    <div className={styles.createPin_main}>
      <div className={styles.add_card} onClick={addCard}>
        <h2>+</h2>
      </div>
      {pinData.map((item, ind) => {
        const { title, destLink, size } = item;
        return (
          <div className={styles.createPin_card}  key={ind}>
            <form onSubmit={sendData}>
              <div className="row">
                <div className="col-md-5">
                  <div className={styles.icon_circle}>
                    <NavDropdown
                      title={
                        <span>
                          <BsThreeDots size="25px" color="#767676" />
                        </span>
                      }
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item
                        className="fw-bold dropdown_item"
                        onClick={removeCards}
                      >
                        Delete
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="fw-bold dropdown_item"
                        onClick={duplicate}
                      >
                        Duplicate
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                  <UplaodImage setFiles={setFiles} files={files}  />
                </div>
                <div className="col-md-7 ps-5">
                  <div className="float-end">
                    <InputGroup className={`mb-3 ${styles.size_select}`}>
                      <Form.Select
                        aria-label="Default select"
                        onChange={(e) => handleChange(ind, e)}
                        name="size"
                        required
                        value={size}
                      >
                        <option value="">Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </Form.Select>
                      <Button type="submit">Publish</Button>
                    </InputGroup>
                  </div>
                  <UploadImageContent
                    handleChange={handleChange}
                    ind={ind}
                    title={title}
                    destLink={destLink}
                  />
                </div>
              </div>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default CreatePin;
