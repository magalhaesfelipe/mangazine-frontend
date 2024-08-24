import { useEffect, useState } from "react";
import classes from './style.module.css';

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
    <div>
      <label>Cover:</label>
      <div>
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          onChange={handleImageChange}
        />
      </div>
      {imagePreview && (
        <div>
          <img src={imagePreview} alt="Image Preview" className={classes.image} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
