import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthorSection = (props: any) => {
  const [authorData, setAuthorData] = useState();
  const [authorWorks, setAuthorWorks] = useState<any[]>([]);
  const { authorId, currentTitleId } = props;
  const authorPhotos = authorData?.otherPhotos || null;
  const navigate = useNavigate();

  const fetchAuthorData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/authors/${authorId}`
      );
      console.log("THis is the author data fetched: ", response);
      setAuthorData(response.data.data);
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  };

  const fetchAuthorWorks = async () => {
    if (!authorData) {
      console.error("❌ No author data or author works!!");
      return;
    }

    const [mangaResponse, bookResponse] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/mangas/search/by-author/`, {
        params: { author: authorData._id },
      }),
      axios.get(`${import.meta.env.VITE_API_URL}/books/search/by-author/`, {
        params: { author: authorData._id },
      }),
    ]);

    const mangaItems = mangaResponse.data.data;
    const bookItems = bookResponse.data.data;

    const combinedItems = [...mangaItems, ...bookItems];

    console.log(mangaItems);
    console.log(bookItems);
    console.log(combinedItems);

    setAuthorWorks(combinedItems);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleClick = (titleId: any, titleType: any) => {
    console.log("This is the titleId: ", titleId);
    console.log("And this is the title type: ", titleType);

    if (titleType === "book") navigate(`details/${titleId}/book`);

    navigate(`/details/${titleId}/manga`);
  };

  useEffect(() => {
    fetchAuthorData();
  }, [authorId]);

  useEffect(() => {
    if (authorData) {
      fetchAuthorWorks();
    }
  }, [authorData]);

  return (
    <>
      {!authorId && (
        <>
          <div className="text-2xl font-secondary text-center mb-8">
            About the Author
          </div>{" "}
          {/* headline */}
          <div className="text-base font-primary text-center">
            No Author found for this title
          </div>{" "}
          {/* noAuthorMessage */}
        </>
      )}

      {!authorData &&
        authorId && ( // Only show loading if authorId exists
          <>
            <div className="text-2xl font-secondary text-center mb-8">
              About the Author
            </div>{" "}
            {/* headline */}
            <div className="text-lg font-primary text-center">
              Loading...
            </div>{" "}
            {/* loading */}
          </>
        )}

      {authorData && (
        <>
          <div className="text-2xl font-secondary text-center mb-8">
            About the Author
          </div>{" "}
          {/* headline */}
          <div className="flex justify-center items-start pb-48">
            {" "}
            {/* container */}
            <div className="h-[360px] w-[300px] border-4 border-white rounded-md mr-16 flex-shrink-0">
              {" "}
              {/* imageContainer */}
              <img
                src={authorData.photo}
                alt={authorData.name}
                className="h-full w-full"
              />{" "}
              {/* img */}
            </div>
            <div className="flex flex-col w-[70%]">
              {" "}
              {/* informationContainer */}
              <div className="flex items-center gap-40 pt-8 pb-4 font-primary text-lg">
                {" "}
                {/* information1 */}
                <div className="flex gap-2">
                  {" "}
                  {/* block */}
                  <p className="border-t border-b px-1">NAME</p> {/* field */}
                  <p>{authorData.name}</p>
                </div>
                <div className="flex gap-2">
                  {" "}
                  {/* block */}
                  <p className="border-t border-b px-1">BORN</p> {/* field */}
                  <p>
                    {formatDate(authorData.dateOfBirth)} •{" "}
                    {authorData.placeOfBirth}
                  </p>
                </div>
              </div>
              <div className="font-primary mt-8 pb-8 leading-relaxed">
                {" "}
                {/* information2 */}
                <p>{authorData.bio}</p>
              </div>
              <div className="mt-10 w-[1000px] flex flex-col items-center justify-center">
                {" "}
                {/* otherWorks */}
                <h3 className="mb-2">Other Works</h3>
                {authorWorks.length > 0 ? (
                  <ul className="grid grid-flow-col overflow-x-auto whitespace-nowrap w-[96%] gap-4">
                    {" "}
                    {/* allWorksContainer */}
                    {authorWorks.map((work, index) => (
                      <li
                        key={index}
                        className="h-[280px] w-[175px] flex flex-col rounded-md cursor-pointer justify-end relative hover:bg-gray-100 transition-all duration-300 text-black font-bold" // itemContainer
                        onClick={() => handleClick(work._id, work.type)}
                      >
                        <img
                          src={work.cover}
                          alt={work.name}
                          className="w-full h-[220px] rounded-t-md absolute left-0 top-0 mb-2"
                        />{" "}
                        {/* img */}
                        <div className="flex flex-col h-[60px] gap-2 justify-center">
                          {" "}
                          {/* itemInformation */}
                          <p className="mt-1 ml-1 text-sm">{work.name}</p>
                          <p className="mt-1 ml-1 text-sm">
                            {work.releaseYear}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No works found.</p>
                )}
              </div>
              <div className="mt-8 w-[1000px] flex flex-col items-center justify-center">
                {" "}
                {/* otherPhotos */}
                <h3>Other Photos</h3>
                {authorPhotos && authorPhotos.length > 0 ? (
                  <ul className="grid grid-flow-col overflow-x-auto whitespace-nowrap w-[96%] gap-4">
                    {" "}
                    {/* allWorksContainer */}
                    {authorPhotos.map((photo, index) => (
                      <li
                        key={index}
                        className="h-[350px] w-[250px] flex flex-col rounded-md cursor-pointer justify-end relative px-4"
                      >
                        {" "}
                        {/* photoContainer */}
                        <img
                          src={photo}
                          alt={`Photo ${index}`}
                          className="w-full h-full rounded-md"
                        />{" "}
                        {/* img */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No photos found.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AuthorSection;
