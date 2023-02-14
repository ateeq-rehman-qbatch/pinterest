import React from "react";
import styles from "../../styles/pinInfo.module.scss";
import { BsThreeDots } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { GrLink } from "react-icons/gr";
import NavDropdown from "react-bootstrap/NavDropdown";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Copied link to your clipboard to share');

const PinMenu = () => {
  return (
    <>
    <div className={styles.pinInfo_menu}>
      <div className="d-flex align-items-center">
        <div className={styles.icon_circle}>
          <NavDropdown
            title={
              <span>
                <BsThreeDots size="25px" />
              </span>
            }
            id="basic-nav-dropdown"
            className="mx-4 fw-bold"
          >
            {[
              "DownLoad Image",
              "Hide Pin",
              "Report Pin",
              "Get Pin embed code",
            ].map((item, ind) => (
              <NavDropdown.Item
                className={`fw-bold ${styles.dropdown_item}`}
                key={ind}
              >
                {item}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </div>
        <div className={styles.icon_circle}>
          <FiDownload size="20px" />
        </div>
        <div className={styles.icon_circle}>
          <GrLink size="20px" onClick={() => {navigator.clipboard.writeText(window.location.href);notify()}} />
        </div>
      </div>
        <button>Save</button>
    </div>
    <Toaster />
    </>
  );
};

export default PinMenu;
