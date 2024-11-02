import classes from "./MangaFormPage.module.css";
import { useState } from "react";
import axios from "axios";
import FormInput from "./components/form-input/FormInput";
import FormSelect from "./components/form-select/FormSelect";
import GenreSelector from "./components/genre-selector/GenreSelector";
import ImageUploader from "./components/image-uploader/ImageUploader";
import MultipleImagesUploader from "./components/multiple-images-uploader/MultipleImagesUpload";

const MangaFormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    authorName: "",
    releaseYear: "",
    description: "",
    chapters: "",
    publishedBy: "",
    genre: [],
    demographic: "",
    status: "",
    type: "",
    alternativeName: "",
    author: "",
    cover: "",
    otherCovers: [],
  });

  console.log(formData);

  const [imageSelected, setImageSelected] = useState(null); // STATE TO STORE SELECTED IMAGE
  const [isUploading, setIsUploading] = useState(false); // STATE TO TRACK IMAGE UPLOAD STATUS
  const [isSuccess, setIsSuccess] = useState(false); // STATE TO TRACK SUCCESSFUL CREATION

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      const imageUrl = response.data.secure_url; //
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsUploading(true); // SET TO TRUE BEFORE IMAGE UPLOAD STARTS

    const imageUrl = await uploadImage();
    if (imageUrl) {
      formData.cover = imageUrl;
    } else {
      alert("Image upload failed. Please try again.");
      setIsUploading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/mangas`,
        formData
      );

      if (response.status === 201) {
        console.log("Title added successfully");
        setIsSuccess(true);
        setIsUploading(false);
      } else {
        console.error("Failed to add title:", response.statusText);
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
      chapters: "",
      publishedBy: "",
      genre: [],
      demographic: "",
      status: "",
      type: "",
      alternativeName: "",
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

  const typeOptions = ["Manga", "Manhwa", "Manhua", "Comics"];
  const statusOptions = ["Ongoing", "Completed", "Hiatus"];
  const demographicOptions = [
    "Shounen",
    "Seinen",
    "Shojo",
    "Josei",
    "Kodomomuke",
    "Seijin",
  ];

  return (
    <div className={classes.container}>
      {isSuccess && <div className={classes.successPrompt}>Title created!</div>}
      <div className={classes.secondContainer}>
        <h2>Add a New Manga</h2>
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
              label="Chapters"
              type="number"
              name="chapters"
              value={formData.chapters}
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

            <FormInput
              label="Alternative Name"
              type="text"
              name="alternateName"
              value={formData.alternativeName}
              onChange={handleChange}
              required={false}
            />

            <FormSelect
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={typeOptions}
            />
            <FormSelect
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
            />
            <FormSelect
              label="Demographic"
              name="demographic"
              value={formData.demographic}
              onChange={handleChange}
              options={demographicOptions}
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
          <ImageUploader onSelectImage={setImageSelected} />
        </form>
        <div className={classes.secondHalf}>
          <div className={classes.coversUpload}>
            <MultipleImagesUploader />
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

export default MangaFormPage;
