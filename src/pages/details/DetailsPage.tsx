import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdditionalInformation from "./components/AdditionalInformation";
import Rating from "./components/Rating";
import AddButton from "./components/AddButton";
import Header from "../../components/Header";
import AuthorSection from "./components/AuthorSection";
import Footer from "../../components/Footer";

const Details = () => {
  const { itemId, itemType } = useParams();
  const [titleData, setTitleData] = useState(null);

  if (!itemId || !itemType) {
    console.error("Missing itemId or itemType");
    return;
  }

  useEffect(() => {
    const fetchTitleData = async () => {
      try {
        if (itemType === "book") {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/books/${itemId}`,
            {
              headers: {
                "Cache-Control": "no-cache",
              },
            }
          );
          setTitleData(response.data.data);
          console.log(response.data);
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/mangas/${itemId}`,
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
        setTitleData(response.data.data);
        console.log(response.data);
      } catch (err) {
        console.error("ERROR:", err);
      }
    };
    fetchTitleData();
  }, [itemId, itemType]);

  if (!titleData) {
    return <div> Loading...</div>;
  }

  const authorId: string = titleData.author;

  return (
    <>
      <Header />
      <div className="w-full ml-20 mt-32 pb-32 font-raleway text-white flex flex-col items-center relative z-10">
        {" "}
        {/* superContainer */}
        <div className="w-[90%] flex">
          {" "}
          {/* childComponent */}
          <div className="h-[350px] w-[300px] rounded-md flex-shrink-0">
            {" "}
            {/* coverContainer */}
            <img
              src={titleData.cover}
              alt={titleData.name}
              className="w-full rounded-md"
            />{" "}
            {/* img */}
          </div>
          <div className="w-full pl-4 pr-4">
            {" "}
            {/* information1 */}
            <div className="flex relative">
              {" "}
              {/* top-container */}
              <div>
                <h1 className="text-5xl font-secondary">{titleData.name}</h1>{" "}
                {/* titleName */}
              </div>
              <div className="flex gap-10 absolute right-[12%]">
                {" "}
                {/* ratingContainer */}
                <Rating titleData={titleData} />
              </div>
            </div>
            <div className="mt-8">
              {" "}
              {/* descriptionContainer */}
              <p className="font-primary leading-relaxed">
                {titleData.description}
              </p>{" "}
              {/* p */}
            </div>
            <div className="flex relative mt-12 mb-4">
              {" "}
              {/* author-released-button */}
              <div>
                <div className="inline-flex">
                  {" "}
                  {/* minibox */}
                  <h3 className="text-base text-gray-400 mr-1">Author</h3>{" "}
                  {/* field */}
                  <h3>{titleData.authorName}</h3>
                </div>
                <div className="inline-flex">
                  {" "}
                  {/* minibox */}
                  <h3 className="text-base text-gray-400 mr-1">
                    Released
                  </h3>{" "}
                  {/* field */}
                  <h3>{titleData.releaseYear}</h3>
                </div>
              </div>
              <div className="absolute right-[10%] z-10">
                {" "}
                {/* additionButton */}
                <AddButton titleData={titleData} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] flex flex-col mt-8 mb-8">
          {" "}
          {/* otherInfoContainer */}
          <AdditionalInformation titleData={titleData} />
        </div>
        <div className="w-[90%]">
          {" "}
          {/* otherConversSection */}
          <div className="font-bold pb-2">Other covers</div> {/* sectionName */}
          <div className="flex overflow-x-auto items-center w-full h-[260px] whitespace-nowrap gap-4 pb-4">
            {" "}
            {/* imagesContainer */}
            {titleData.otherCovers.map((cover, index) => (
              <img
                src={cover}
                key={index}
                alt={`Cover ${index}`}
                className="w-[165px] h-[240px] rounded-md"
              />
            ))}
          </div>
        </div>
        <div className="w-[90%] mt-12">
          {" "}
          {/* authorSection */}
          <AuthorSection authorId={authorId} currentTitleId={itemId} />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Details;
