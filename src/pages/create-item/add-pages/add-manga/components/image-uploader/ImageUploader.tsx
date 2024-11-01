import { useEffect, useState } from "react";
import classes from "./ImageUploader.module.css";

const ImageUploader = ({ onSelectImage }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      onSelectImage(file); // Pass the file to the parent component
    }
  };

  return (
    <div className={classes.container}>
      <label>Cover:</label>
      <div>
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          onChange={handleImageChange}
          className={classes.fileInput}
          id="fileInput"
        />
        <label htmlFor="fileInput" className={classes.customButton}>
          Choose Image
        </label>
      </div>
      {imagePreview && (
        <div className={classes.imageContainer}>
          <img
            src={imagePreview}
            alt="Image Preview"
            className={classes.image}
          />
        </div>
      )}
        <span className={classes.fileName}>
          {image ? image.name : "No file chosen"}
        </span>
    </div>
  );
};

export default ImageUploader;
