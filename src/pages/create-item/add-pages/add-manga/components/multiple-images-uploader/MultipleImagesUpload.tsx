import { useState } from "react";
import classes from "./MultipleImagesUpload.module.css";

const MultipleImagesUploader = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        multiple
        onChange={handleImageChange}
      />
      <div className={classes.imagePreviewContainer}>
        {images.map((image, index) => (
          <div key={index} className={classes.imagePreview}>
            <img src={image} alt={`preview ${index}`} />
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleImagesUploader;
