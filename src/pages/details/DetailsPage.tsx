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
      <div className="p-5 mt-40 pb-32 font-raleway text-white flex flex-col items-center relative z-10">
        <div className="w-[90%] flex bg-amber-900">
          <div className="h-[350px] w-[300px] rounded-md flex-shrink-0 mr-10">
            <img
              src={titleData.cover}
              alt={titleData.name}
              className="w-full rounded-md"
            />
          </div>
          <div className="w-full pl-4 pr-4">
            <div className="flex">
              <div>
                <h1 className="text-5xl font-bold">{titleData.name}</h1>
              </div>
              <div className="flex gap-10 ml-110">
                <Rating titleData={titleData} />
              </div>
            </div>
            <div className="mt-15">
              <p className="font-serif font-extralight leading-relaxed ">
                {titleData.description}
              </p>
            </div>
            <div className="flex relative mt-12 mb-4">
              {" "}
              <div>
                <div className="inline-flex mr-15">
                  <h3 className="text-2xl text-gray-400 mr-2">Author</h3>{" "}
                  <h3 className="text-2xl">{titleData.authorName}</h3>
                </div>
                <div className="inline-flex">
                  <h3 className="text-2xl text-gray-400 mr-2">Released</h3>
                  <h3 className="text-2xl">{titleData.releaseYear}</h3>
                </div>
              </div>
              <div className="absolute right-[10%] z-10">
                <AddButton titleData={titleData} />
              </div>
              
            </div>
            <div className="pl-1">
        <div className="flex mt-2 mb-4 items-center gap-2 font-impact font-light tracking-wide">
          {titleData?.genre?.map((genre, index) => (
            <p
              key={index}
              className="text-sm border-1 rounded-[18px] px-6 py-2 text-white"
            >
              {genre}
            </p>
          ))}
        </div>
      </div>
          </div>
        </div>
        <div className="w-[90%] flex flex-col mt-30 mb-8">
          <AdditionalInformation titleData={titleData} />
        </div>
        <div className="w-[90%]">
          <div className=" text-3xl mb-4 bg-cyan-600 flex align-middle justify-center">Other covers</div> {/* sectionName */}
          <div className="flex overflow-x-auto items-center w-full h-[260px] whitespace-nowrap gap-4 pb-4">
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
          <AuthorSection authorId={authorId} currentTitleId={itemId} />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Details;
