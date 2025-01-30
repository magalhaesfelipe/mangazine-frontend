import { useState } from "react";
import axios from "axios";
import FormInput from "./components/FormInput";
import ImageUploader from "../components/ImageUploader";
import MultipleImagesUploader from "../components/MultipleImagesUpload";
import Header from "../../../../components/Header";

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

  {
    isSuccess ? (
      <>
        <Header />
        <div className="text-white text-4xl absolute top-[300px] left-[600px]">
          Author created!
        </div>
      </>
    ) : (
      <>
        <Header />
        <div className="text-white flex flex-col items-center mt-[170px]">
          <div className="secondContainer">
            <h2 className="mb-20 text-3xl">Create a new Author</h2>
            <form className="flex items-end" onSubmit={handleSubmit}>
              <div className="grid grid-cols-5 gap-x-5 mb-4">
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
                <div className="col-span-2">
                  <p>Bio</p>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
                  />
                </div>
              </div>
              <ImageUploader
                onSelectImage={setImageSelected}
                headline="Photo"
              />
              <button
                type="submit"
                disabled={isUploading}
                className="bg-green-500 flex items-center justify-center text-white px-6 py-3 m-5 ml-10 rounded-lg border border-transparent font-bold cursor-pointer hover:bg-green-700 transition-all duration-100"
              >
                {isUploading ? "Uploading..." : "Submit"}
              </button>
            </form>
            <div className="relative mt-10 h-[200px] w-full flex justify-center items-center">
              <div className="w-[500px] h-[280px] ml-20">
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
  }
};

export default AuthorForm;
