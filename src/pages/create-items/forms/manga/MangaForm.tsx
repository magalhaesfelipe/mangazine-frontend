import classes from "./MangaForm.module.css";
import { useState } from "react";
import axios from "axios";
import FormInput from "./components/form-input/FormInput";
import FormSelect from "./components/form-select/FormSelect";
import ImageUploader from "./../components/image-uploader/ImageUploader";
import MultipleImagesUploader from "./../components/multiple-images-uploader/MultipleImagesUpload";
import { useNavigate } from "react-router-dom";
import AuthorSearchbar from "../components/author-search/AuthorSearchbar";

const MangaFormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    authorName: "",
    releaseYear: "",
    description: "",
    chapters: "",
    publishedBy: "",
    genre: [],
    type: "",
    demographic: "",
    status: "",
    alternativeName: "",
    author: "",
    cover: "",
    otherCovers: [],
  });

  const [imageSelected, setImageSelected] = useState(null); // STATE TO STORE SELECTED IMAGE
  const [otherImagesSelected, setOtherImagesSelected] = useState([]);
  const [authorSelected, setAuthorSelected] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // STATE TO TRACK IMAGE UPLOAD STATUS
  const navigate = useNavigate();

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    if (!otherImagesSelected || otherImagesSelected.length === 0) {
      alert("Please select some images before submitting.");
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
      alert("Image upload failed. Please try again.");
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
        `${import.meta.env.VITE_API_URL}/mangas`,
        formData
      );

      console.log("RESPONSE: ", response);
      const itemId = response.data.data._id;

      if (response.status === 201) {
        navigate(`/details/${itemId}/manga/`);
        console.log("Manga created successfully");
        setIsUploading(false);
      } else {
        console.error("Failed to create manga:", response.statusText);
        setIsUploading(false);
      }
    } catch (err) {
      console.error("Error creating manga: ", err);
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
      type: "",
      demographic: "",
      status: "",
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
    "Adult",
    "Mature"
  ];

  const typeOptions = ["manga", "manhwa", "manhua", "comics"];
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
              name="alternativeName"
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

          <ImageUploader onSelectImage={setImageSelected} headline="Cover" />
          <AuthorSearchbar onSelectAuthor={setAuthorSelected} />
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
                headline={"Other cover"}
              />
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
          </div>
        </div>
      </div>
  );
};

export default MangaFormPage;
