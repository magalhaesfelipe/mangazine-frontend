import { useEffect, useState } from "react";
import classes from "./ImageUploader.module.css";

const ImageUploader = ({ onSelectImage, headline }: any) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      onSelectImage(file); // Pass the file to the parent component
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div className={classes.container}>
      <p>{headline}</p>
      <div
        onClick={handleClick}
        className={`${classes.uploadArea} ${
          imagePreview ? classes.transparentBorder : ""
        }`}
      >
        {!imagePreview && (
          <span className={classes.placeholder}>Click to upload</span>
        )}
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/webp"
          onChange={handleImageChange}
          className={classes.fileInput}
          id="fileInput"
        />
      </div>
      {imagePreview && (
        <img src={imagePreview} alt="Image Preview" className={classes.image} />
      )}
    </div>
  );
};

export default ImageUploader;
