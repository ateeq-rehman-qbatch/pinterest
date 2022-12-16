import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaBell } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import Avatar from 'react-avatar';
import avatarImg from "../../assets/images/profile.png";
import styles from "../../styles/header.module.scss";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Notifications = () => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" className={styles.profile_tooltip} {...props}>
            Accounts and more options
        </Tooltip>
    );
    return (
        <div className="d-flex align-items-center">
            <div className={styles.icon_circle}>
                <FaBell color='#767676' size="25px" />
            </div>
            <div className={styles.icon_circle}>
                <AiFillMessage color='#767676' size="25px" />
            </div>
            <div className={styles.icon_circle}>
                <Avatar src={avatarImg} size="25" round={true} />
            </div>
            <OverlayTrigger
                placement="bottom"
                overlay={renderTooltip}
            >
                <NavDropdown title="" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                </NavDropdown>
            </OverlayTrigger>
        </div>
    )
}

export default Notifications;