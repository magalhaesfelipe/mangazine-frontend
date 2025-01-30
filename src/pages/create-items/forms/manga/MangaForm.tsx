import { useState } from "react";
import axios from "axios";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import ImageUploader from "../components/ImageUploader";
import MultipleImagesUploader from "../components/MultipleImagesUpload";
import { useNavigate } from "react-router-dom";
import AuthorSearchbar from "../components/AuthorSearchbar";

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
    "Mature",
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
    <>
      <Header />
      <div className="text-white flex flex-col items-center ml-5 mr-5">
        {" "}
        {/* container */}
        <div className="secondContainer">
          <h2 className="mb-16 mt-20 text-3xl font-secondary">
            Add a New Manga
          </h2>{" "}
          {/* h2 */}
          <form className="flex items-end" onSubmit={handleSubmit}>
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
              <div className="col-span-2">
                <p>Description</p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
                />
              </div>
            </div>
            <ImageUploader onSelectImage={setImageSelected} headline="Cover" />
            <AuthorSearchbar onSelectAuthor={setAuthorSelected} />
            <button
              type="submit"
              disabled={isUploading}
              className="bg-green-500 flex items-center justify-center text-white px-6 py-3 ml-10 rounded-lg border border-transparent font-bold cursor-pointer hover:bg-green-700 transition-all duration-100"
            >
              {isUploading ? "Uploading..." : "Submit"}
            </button>
          </form>
          <div className="relative mt-12 h-[350px] w-full flex flex-row items-start justify-center pb-[200px]">
            {" "}
            {/* secondHalf */}
            <div className="w-[500px] h-[280px] ml-2">
              {" "}
              {/* coversUpload */}
              <MultipleImagesUploader
                onSelectImages={setOtherImagesSelected}
                headline={"Other cover"}
              />
            </div>
            <div className="ml-[300px] mt-8">
              {" "}
              {/* genreContainer - Added mt-8 */}
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
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
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
                )}{" "}
                {/* message */}
                <div className="grid grid-cols-2 gap-x-4">
                  {" "}
                  {/* blockContainer */}
                  {formData.genre.map((genre, index) => (
                    <div key={index} className="flex items-center">
                      {" "}
                      {/* genreTagContainer - flex for alignment */}
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

export default MangaFormPage;
