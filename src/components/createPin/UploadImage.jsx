import React from "react";
import { useDropzone } from "react-dropzone";
import styles from "../../styles/createpin.module.scss";
import { FaCloudUploadAlt } from "react-icons/fa";

function UplaodImage(props) {
  const { files, setFiles} = props;
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
  return (
    <>
      <section
        className={`${styles.upload_section} ${
          files.length !== 0 ? "px-0" : ""
        }`}
      >
        {files.length === 0 ? (
          <div {...getRootProps({ className: styles.dropzone })}>
            <input {...getInputProps()} />
            <FaCloudUploadAlt size={35} />
            <p>Drag and drop or click to upload your image</p>
            <div className={styles.upload_info}>
              <p>Recommendation: Use high-quality .jpg files less than 20MB</p>
              <p>
                <span>See guidlines</span> for high quality Pins
              </p>
            </div>
          </div>
        ) : (
          <aside className={styles.upload_img}><img src={files[0].preview} alt="preview" /></aside>
        )}
      </section>
    </>
  );
}

export default UplaodImage;
