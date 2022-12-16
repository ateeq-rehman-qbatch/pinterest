import React from 'react';
import HomeCards from '../components/homeData/homeCards';
import styles from "../styles/home.module.scss";

const Home = () => {
    return (
        <div className={styles.home_main}>
            <HomeCards />
        </div>
    )
}

export default Home;