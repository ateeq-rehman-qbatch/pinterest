import React from 'react';
import styles from "../../styles/home.module.scss";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { FiDownload, FiArrowUpRight } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { pinterestData } from '../../pinterestData';

const HomeCards = () => {
    return (
        <>
            {pinterestData.map((data, ind) => (
                <div className={styles.cards_main} key={ind} style={{ ...cardStyles[data.height] }}>
                    <img src={data.img} alt="happy" style={{ height: data.height === "small" ? "228px" : data.height === "medium" ? "298px" : "418px" }} />
                    <div className={styles.overlay}>
                        <div className={styles.category_details}>
                            <NavDropdown title={data.category} id="basic-nav-dropdown" className={"fw-bold"}>
                                <NavDropdown.Item className={`fw-bold ${styles.dropdown_item}`}>Create Idea Pin</NavDropdown.Item>
                                <NavDropdown.Item className={`fw-bold ${styles.dropdown_item}`}>
                                    Create Pin
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Button>Save</Button>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <a href={data.link}><div className={styles.pin_link}>
                                <FiArrowUpRight size="18" /><p>{data.website}</p>
                            </div></a>
                            <div className={styles.download_icons}>
                                <div>
                                    <FiDownload />
                                </div>
                                <div>
                                    <BsThreeDots />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

const cardStyles = {
    small: {
        gridRowEnd: "span 26",
    },
    medium: {
        gridRowEnd: "span 33",
    },
    large: {
        gridRowEnd: "span 45",
    },
}

export default HomeCards;