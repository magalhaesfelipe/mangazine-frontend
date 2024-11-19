import classes from "./BookForm.module.css";
import { useState } from "react";
import axios from "axios";
import FormInput from "./components/form-input/FormInput";
import ImageUploader from "./components/image-uploader/ImageUploader";
import MultipleImagesUploader from "./components/multiple-images-uploader/MultipleImagesUpload";
import AuthorSearchbar from "./components/author-search/AuthorSearchbar";

const BookForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    authorName: "",
    releaseYear: "",
    description: "",
    pages: "",
    publishedBy: "",
    genre: [],
    type: "",
    author: "",
    cover: "",
    otherCovers: [],
  });

  const [coverSelected, setCoverSelected] = useState(null); // STATE TO STORE SELECTED IMAGE
  const [otherCoversSelected, setOtherCoversSelected] = useState([]);
  const [authorSelected, setAuthorSelected] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // STATE TO TRACK IMAGE UPLOAD STATUS
  const [isSuccess, setIsSuccess] = useState(false); // STATE TO TRACK SUCCESSFUL CREATION

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  console.log(formData);
  console.log("Author selected: ", authorSelected);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // UPLOAD ONE IMAGE
  const uploadImage = async () => {
    if (!coverSelected) {
      alert("Please select an image before submitting.");
      setIsUploading(false);
      return null;
    }

    const imageData = new FormData();
    imageData.append("file", coverSelected);
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
    if (!otherCoversSelected || otherCoversSelected.length === 0) {
      alert("Please select some images before submitting.");
      setIsUploading(false);
      return null;
    }

    const uploadedUrls = [];

    for (const file of otherCoversSelected) {
      const oneImageData = new FormData();
      oneImageData.append("file", file);
      oneImageData.append("upload_preset", uploadPreset);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          oneImageData
        );
        uploadedUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading multiple images: ", error);
      }
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsUploading(true); // SET TO TRUE BEFORE IMAGE UPLOAD STARTS

    const coverUrl = await uploadImage();

    if (coverUrl) {
      formData.cover = coverUrl;
    } else {
      alert("Image upload failed. Please try again.");
      setIsUploading(false);
      return;
    }

    const otherCoversUrls = await uploadMultipleImages();

    if (otherCoversUrls) {
      formData.otherCovers = otherCoversUrls;
    } else {
      alert("Other covers not selected.");
      setIsUploading(false);
      return;
    }

    if (authorSelected) {
      formData.author = authorSelected;
    } else {
      alert("No author selected.");
      setIsUploading(false);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/books`,
        formData
      );

      if (response.status === 201) {
        console.log("Book added successfully");
        setIsSuccess(true);
        setIsUploading(false);
      } else {
        console.error("Failed to add book:", response.statusText);
        setIsUploading(false);
      }
    } catch (err) {
      console.error("Error adding title: ", err);
    }

    console.log("FormData sent: ", formData);

    setFormData({
      name: "",
      authorName: "",
      releaseYear: "",
      description: "",
      pages: "",
      publishedBy: "",
      genre: [],
      type: "",
      author: "",
      cover: "",
      otherCovers: [],
    });
  };

  const genreOptions = [
    "Adventure",
    "Fantasy",
    "Action",
    "Drama",
    "Comedy",
    "Romance",
    "Slice of Life",
    "Distopian",
    "Mystery",
    "Psychological",
    "Tragedy",
    "Horror",
    "Thriller",
    "Supernatural",
    "Sci Fi",
    "Historical",
    "Western",
    "Dark Fantasy",
    "Isekai",
    "Yaoi",
    "Yuri",
    "Sports",
    "Biographical",
  ];

  return (
    <div className={classes.container}>
      {isSuccess && <div className={classes.successPrompt}>Title created!</div>}
      <div className={classes.secondContainer}>
        <h2>Create a New Book</h2>
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
              label="Author Name"
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              required={true}
            />
            <FormInput
              label="Release Year"
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              required={true}
            />

            <FormInput
              label="Pages"
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              required={true}
            />
            <FormInput
              label="Published By"
              type="text"
              name="publishedBy"
              value={formData.publishedBy}
              onChange={handleChange}
              required={false}
            />

            <div>
              <p>Description</p>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className={classes.description}
              />
            </div>
          </div>

          <div className={classes.genreContainer}>
            <p>Genre</p>
            <select
              name="genre"
              multiple
              value={formData.genre}
              onChange={(e) => {
                const selectedValues = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                const uniqueGenres = [
                  ...new Set([...formData.genre, ...selectedValues]),
                ];

                setFormData((prevData) => ({
                  ...prevData,
                  genre: uniqueGenres,
                }));
                console.log(formData.genre);
              }}
              className={classes.genreSelect}
            >
              {genreOptions.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            <div className={classes.selectedGenres}>
              {formData.genre.length > 0 && (
                <p className={classes.message}>Selected Genres:</p>
              )}
              <div className={classes.blockContainer}>
                {formData.genre.map((genre, index) => (
                  <div className={classes.genreTagContainer}>
                    <p key={index} className={classes.genreName}>
                      {genre}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          genre: prevData.genre.filter((g) => g !== genre),
                        }));
                      }}
                      className={classes.removeGenreButton}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ImageUploader onSelectImage={setCoverSelected} />
          <AuthorSearchbar onSelectAuthor={setAuthorSelected} />
        </form>
        <div className={classes.secondHalf}>
          <div className={classes.coversUpload}>
            <MultipleImagesUploader
              onSelectImages={setOtherCoversSelected}
              headline={"Other covers"}
            />
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className={classes.submitButton}
          >
            {isUploading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
