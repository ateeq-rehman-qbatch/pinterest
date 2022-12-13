import React from 'react';
import styles from "../../styles/header.module.scss";
import Menu from './Menu';
import Notifications from './Notifications';
import Search from './Search';

const Header = () => {
    return (
        <div className={styles.header_main}>
            <div className='d-flex align-items-center w-100'>
                <Menu />
                <Search />
                <Notifications />
            </div>
        </div>
    )
}

export default Header;