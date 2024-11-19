import { useState } from "react";
import classes from "./MultipleImagesUpload.module.css";

const MultipleImagesUploader = ({ onSelectImage, headline }: any) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileObjects = selectedFiles.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...imageUrls]);
    onSelectImage((prevImages) => [...prevImages, ...selectedFiles]); // Pass files to parent
  };

  const handleRemoveImage = (index: any) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className={classes.container}>
      <p>{headline}</p>
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg"
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
