import React from 'react';
import styles from "../../styles/header.module.scss";
import logo from "../../assets/images/pinterestLogo.svg";
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Menu = () => {
    return (
        <div className={`d-flex align-items-center ${styles.menu_main}`}>
            <div className={styles.icon_circle}>
                <img src={logo} alt="pinterest" />
            </div>
            <Button variant="dark">Home</Button>
            <NavDropdown title="Create" id="basic-nav-dropdown" className="mx-4 fw-bold">
                <NavDropdown.Item className={`fw-bold ${styles.dropdown_item}`}>Create Idea Pin</NavDropdown.Item>
                <NavDropdown.Item className={`fw-bold ${styles.dropdown_item}`}>
                    Create Pin
                </NavDropdown.Item>
            </NavDropdown>
        </div>
    )
}

export default Menu;