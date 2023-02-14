import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaChevronLeft } from "react-icons/fa";
import styles from "../../styles/profile.module.scss";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../utils/CanvasUtils";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/slices/authSlice";
import { readFile } from "../../utils/Utils";

const ImageCrop = (props) => {
  const { setShow } = props;
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const dispatch = useDispatch();
  const [zoom, setZoom] = useState(1);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  useEffect(() => {
    const onFileChange = async (e) => {
      let imageDataUrl = await readFile(files[0]);
      setImageSrc(imageDataUrl);
    };
    onFileChange();
  }, [files]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const formData = new FormData();
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      formData.append("coverImg", croppedImage);
      dispatch(updateProfile(formData));
      setShow(false);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, setShow, dispatch]);

  return (
    <>
      {imageSrc ? (
        <>
          <div className={styles.left_arrow} onClick={() => setImageSrc(null)}>
            <FaChevronLeft size={20} />
          </div>
          <h3>Crop cover</h3>
        </>
      ) : (
        <h3>Add a profile cover image</h3>
      )}

      {imageSrc ? (
        <>
          <div className={styles.cropper_container}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className={styles.crop_done}>
            <button onClick={showCroppedImage}>Done</button>
          </div>
        </>
      ) : (
        <div {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} />
          <FaCloudUploadAlt size={35} />
          <p className="mt-3">Drag and drop or click to upload your image</p>
          <button>Browse</button>
        </div>
      )}
    </>
  );
};
export default ImageCrop;
