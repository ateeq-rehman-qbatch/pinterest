import React, { useEffect } from "react";
import styles from "../styles/pinInfo.module.scss";
import PinMenu from "../components/PinInfo/PinMenu";
import PinContent from "../components/PinInfo/PinContent";
import PinImage from "../components/PinInfo/PinImage";
import Comments from "../components/PinInfo/Comments";
import { useSelector, useDispatch } from "react-redux";
import { getSiglePin } from "../redux/slices/pinSlice";
import Spinner from "../components/spinner/Spinner";

const PinInfo = () => {
  const path = window.location.pathname.split("/")[2];
  const { isLoading, pin } = useSelector((state) => state.pins);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getSiglePin(path));
  }, [dispatch, path]);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <Spinner />
        </div>
      ) : (
        <div className={styles.pinInfo_main}>
          <div className={styles.pin_card}>
            <div className="row">
              <div className="col-md-6">
                <PinImage data={pin} />
              </div>
              <div className="col-md-6">
                <div className={styles.pin_details}>
                  <PinMenu />
                  <PinContent data={pin} />
                  <Comments />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PinInfo;
