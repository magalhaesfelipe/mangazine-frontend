import { useEffect, useState } from "react";

const ImageUploader = ({ onSelectImage, headline }: any) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      onSelectImage(file); // Pass the file to the parent component
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div className="w-[140px] relative flex flex-col ml-10">
      {" "}
      {/* container */}
      <p>{headline}</p>
      <div
        onClick={handleClick}
        className={`w-[135px] h-[200px] border-2 border-dashed rounded-md cursor-pointer relative mt-2 ${
          imagePreview ? "border-transparent" : ""
        }`} // uploadArea with conditional class
      >
        {!imagePreview && (
          <span className="text-sm text-center absolute top-[45%] left-[3%] whitespace-nowrap">
            Click to upload
          </span> // placeholder
        )}
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/webp"
          onChange={handleImageChange}
          className="hidden" // fileInput
          id="fileInput"
        />
      </div>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Image Preview"
          className="w-full h-full rounded-md absolute" // image
        />
      )}
    </div>
  );
};

export default ImageUploader;
