import { useState } from "react";
import classes from "./MultipleImagesUpload.module.css";

const MultipleImagesUploader = ({ onSelectImages, headline }: any) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e: any) => {
    const selectedFiles = Array.from(e.target.files);
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...imageUrls]);
    onSelectImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleRemoveImage = (index: any) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className={classes.container}>
      <p>{headline}</p>
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg, image/webp"
        multiple
        onChange={handleImageChange}
        className={classes.theInput}
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
