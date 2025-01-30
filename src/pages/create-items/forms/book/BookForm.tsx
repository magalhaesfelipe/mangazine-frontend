import { useState } from "react";
import axios from "axios";
import FormInput from "./components/FormInput";
import ImageUploader from "../components/ImageUploader";
import MultipleImagesUploader from "../components/MultipleImagesUpload";
import AuthorSearchbar from "../components/AuthorSearchbar";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header";

const BookForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    authorName: "",
    releaseYear: "",
    description: "",
    pages: "",
    publishedBy: "",
    genre: [],
    author: "",
    cover: "",
    otherCovers: [],
  });

  const [coverSelected, setCoverSelected] = useState(null); // STATE TO STORE SELECTED IMAGE
  const [otherCoversSelected, setOtherCoversSelected] = useState([]);
  const [authorSelected, setAuthorSelected] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // STATE TO TRACK IMAGE UPLOAD STATUS
  const navigate = useNavigate();

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  console.log("Author selected: ", authorSelected);

  const handleChange = (e: any) => {
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

      console.log("RESPONSE: ", response);
      const itemId = response.data.data._id;

      if (response.status === 201) {
        navigate(`/details/${itemId}/book/`);
        console.log("Book created successfully");
        setIsUploading(false);
      } else {
        console.error("Failed to create book:", response.statusText);
        setIsUploading(false);
      }
    } catch (err) {
      console.error("Error creating book: ", err);
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
    "Parody",
    "Satire",
    "Farce",
    "Psychological Fiction",
    "Novel",
    "Magical Realism",
    "Epic Fiction",
    "Dystopian",
    "Political",
    "Fable",
    "Urban Fiction",
  ];

  return (
    <>
      <Header />
      <div className="text-white flex flex-col items-center ml-5 mr-5">
        {" "}
        {/* container */}
        <div className="secondContainer">
          <h2 className="mb-16 mt-20 text-3xl font-secondary">
            Create a New Book
          </h2>{" "}
          {/* h2 */}
          <form className="flex items-baseline" onSubmit={handleSubmit}>
            {" "}
            {/* theForm */}
            <div className="grid grid-cols-5 gap-x-5 mb-4">
              {" "}
              {/* firstHalf */}
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
              <div className="col-span-2">
                {" "}
                {/* Description */}
                <p>Description</p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-black" // description
                />
              </div>
            </div>
            <ImageUploader onSelectImage={setCoverSelected} headline="Cover" />
            <AuthorSearchbar onSelectAuthor={setAuthorSelected} />
            <button
              type="submit"
              disabled={isUploading}
              className="bg-green-500 flex items-center justify-center text-white px-6 py-3 ml-10 rounded-lg border border-transparent font-bold cursor-pointer hover:bg-green-700 transition-all duration-100" // submitButton
            >
              {isUploading ? "Uploading..." : "Submit"}
            </button>
          </form>
          <div className="relative mt-24 h-[350px] w-full flex flex-row items-start justify-center pb-[200px]">
            {" "}
            {/* secondHalf */}
            <div className="w-[500px] h-[280px] ml-2">
              {" "}
              {/* coversUpload */}
              <MultipleImagesUploader
                onSelectImages={setOtherCoversSelected}
                headline={"Other covers"}
              />
            </div>
            <div className="ml-[300px] mr-5">
              {" "}
              {/* genreContainer */}
              <p className="mb-2">Genre</p>
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
                }}
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-black" // genreSelect
              >
                {genreOptions.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <div className="mt-4">
                {" "}
                {/* selectedGenres */}
                {formData.genre.length > 0 && (
                  <p className="mb-2">Selected Genres:</p>
                )}
                <div className="grid grid-cols-2 gap-x-4">
                  {" "}
                  {/* blockContainer */}
                  {formData.genre.map((genre, index) => (
                    <div key={index} className="flex flex-col">
                      {" "}
                      {/* genreTagContainer */}
                      <div className="flex items-center">
                        {" "}
                        {/* Use flexbox for alignment */}
                        <p className="border border-gray-300 rounded-md px-2 py-1 mr-2 text-sm">
                          {genre} {/* genreName */}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prevData) => ({
                              ...prevData,
                              genre: prevData.genre.filter((g) => g !== genre),
                            }));
                          }}
                          className="text-white bg-black rounded-full h-4 w-4 flex items-center justify-center cursor-pointer" // removeGenreButton
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookForm;
