import { useState } from "react";

const MultipleImagesUploader = ({ onSelectImages, headline }: any) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e: any) => {
    const selectedFiles = Array.from(e.target.files);
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...imageUrls]);
    onSelectImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleRemoveImage = (index: any) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="relative w-[780px]">
      {" "}
      {/* container */}
      <p className="text-xl">{headline}</p> {/* p */}
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg, image/webp"
        multiple
        onChange={handleImageChange}
        className="cursor-pointer" // theInput
      />
      <div className="pb-6 flex gap-4 p-2 items-center overflow-x-auto shadow-[-10px_0_10px_-5px_rgba(255,255,255,0.507),10px_0_10px_-5px_rgba(255,255,255,0.295)]">
        {" "}
        {/* imagePreviewContainer */}
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-center">
            {" "}
            {/* imagePreview */}
            <img
              src={image}
              alt={`preview ${index}`}
              className="h-[220px] w-[145px] rounded-md border-solid border-3 border-white mt-2" // image
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="mt-2 p-1 px-4 rounded-md border-0 bg-white cursor-pointer font-['var(--font1)']" // button
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleImagesUploader;
