import classes from "./AuthorForm.module.css";
import { useState } from "react";
import axios from "axios";
import FormInput from "./components/form-input/FormInput";
import ImageUploader from "../components/image-uploader/ImageUploader";
import MultipleImagesUploader from "../components/multiple-images-uploader/MultipleImagesUpload";
import Header from "../../../../components/header/Header";

const AuthorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    dateOfBirth: "",
    placeOfBirth: "",
    photo: "",
    otherPhotos: [],
  });

  console.log(formData);

  const [imageSelected, setImageSelected] = useState(null); // STATE TO STORE SELECTED IMAGE
  const [otherImagesSelected, setOtherImagesSelected] = useState([]);
  const [isUploading, setIsUploading] = useState(false); // STATE TO TRACK IMAGE UPLOAD STATUS
  const [isSuccess, setIsSuccess] = useState(false); // STATE TO TRACK SUCCESSFUL CREATION

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "dateOfBirth") {
      // Remove all no-digit characters
      const numericValue = value.replace(/\D/g, "");

      // Format as MM/DD/YYYY
      let formattedDate = numericValue;
      if (numericValue.length > 2) {
        formattedDate = `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
      }
      if (numericValue.length > 4) {
        formattedDate = `${formattedDate.slice(0, 5)}/${formattedDate.slice(
          5
        )}`;
      }

      if (formattedDate.length > 10) {
        // 01/01/2024
        formattedDate = formattedDate.slice(0, 10);
      }

      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // UPLOAD ONE IMAGE
  const uploadImage = async () => {
    if (!imageSelected) {
      alert("Please select an image before submitting.");
      setIsUploading(false);
      return null;
    }

    const imageData = new FormData();
    imageData.append("file", imageSelected);
    imageData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        imageData
      );
      const imageUrl = response.data.secure_url;
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  // UPLOAD MULTIPLE IMAGES
  const uploadMultipleImages = async () => {
    console.log("OTHER IMAGES SELECTED: ", otherImagesSelected);
    if (!otherImagesSelected || otherImagesSelected.length === 0) {
      alert("No images selected. Please select at least one image to upload.");
      setIsUploading(false);
      return null;
    }

    const imagesUrls = [];

    for (const file of otherImagesSelected) {
      const oneImageData = new FormData();
      oneImageData.append("file", file);
      oneImageData.append("upload_preset", uploadPreset);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          oneImageData
        );
        imagesUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading multiple images: ", error);
      }
    }
    return imagesUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true); // SET TO TRUE BEFORE IMAGE UPLOAD STARTS

    const [month, day, year] = formData.dateOfBirth.split("/");
    const parsedDate = new Date(`${year}-${month}-${day}`);

    const updatedFormData = { ...formData, dateOfBirth: parsedDate };

    const coverUrl = await uploadImage();

    if (coverUrl) {
      updatedFormData.photo = coverUrl;
    } else {
      alert("Image upload failed. Please try again.");
      setIsUploading(false);
      return;
    }

    const otherCoversUrls = await uploadMultipleImages();

    if (otherCoversUrls) {
      updatedFormData.otherPhotos = otherCoversUrls;
    } else {
      alert("Image upload failed. Please try again.");
      setIsUploading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/authors`,
        updatedFormData
      );

      console.log("RESPONSE: ", response);

      if (response.status === 201) {
        console.log("Author created successfully");
        setIsSuccess(true);
        setIsUploading(false);
      } else {
        console.error("Failed to create author:", response.statusText);
        setIsUploading(false);
      }
    } catch (err) {
      console.error("Error creating author: ", err);
    }

    console.log("FormData sent: ", updatedFormData);

    setFormData({
      name: "",
      bio: "",
      dateOfBirth: "",
      placeOfBirth: "",
      photo: "",
      otherPhotos: [],
    });
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <div className={classes.isSuccess}>Author created!</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={classes.container}>
        <div className={classes.secondContainer}>
          <h2>Create a new Author</h2>
          <form className={classes.theForm} onSubmit={handleSubmit}>
            <div className={classes.firstHalf}>
              <FormInput
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={true}
              />

              <FormInput
                label="Date of Birth"
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required={true}
              />

              <FormInput
                label="Place of Birth"
                type="text"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                required={true}
              />

              <div>
                <p>Bio</p>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  className={classes.description}
                />
              </div>
            </div>

            <ImageUploader onSelectImage={setImageSelected} headline="Photo" />
            <button
              type="submit"
              disabled={isUploading}
              className={classes.submitButton}
            >
              {isUploading ? "Uploading..." : "Submit"}
            </button>
          </form>
          <div className={classes.secondHalf}>
            <div className={classes.coversUpload}>
              <MultipleImagesUploader
                onSelectImages={setOtherImagesSelected}
                headline="Other Photos"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorForm;
