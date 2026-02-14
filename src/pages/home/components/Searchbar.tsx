import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface MangaItem {
  _id: string;
  name: string;
  authorName: string;
  releaseYear?: string;
  cover?: string;
  type: string;
}

interface BookItem {
  _id: string;
  name: string;
  authorName: string;
  releaseYear: string;
  cover?: string;
  type: string;
}

type SearchItem = MangaItem | BookItem;

interface SearchbarProps {
  placeholder: string;
}

const mangas = [
  {
    _id: 1,
    name: "Naruto",
    authorName: "Masashi Kishimoto",
    releaseYear: "2001",
    cover:
      "https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/3232072-01.jpg",
    type: "manga",
  },
  {
    _id: 2,
    name: "Naruto",
    authorName: "Masashi Kishimoto",
    releaseYear: "2001",
    cover:
      "https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/3232072-01.jpg",
    type: "manga",
  },
  {
    _id: 3,
    name: "Naruto",
    authorName: "Masashi Kishimoto",
    releaseYear: "2001",
    cover:
      "https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/3232072-01.jpg",
    type: "manga",
  },
  {
    _id: 4,
    name: "Naruto",
    authorName: "Masashi Kishimoto",
    releaseYear: "2001",
    cover:
      "https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/3232072-01.jpg",
    type: "manga",
  },
];

const Searchbar: React.FC<SearchbarProps> = ({ placeholder }) => {
  const [items, setItems] = useState<SearchItem[]>([]);
  const [showResults, setShowResults] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleSearch = async (event: any) => {
  //   const searchedName = event.target.value;

  //   if (searchedName.trim().length >= 3) {
  //     setLoading(true);

  //     try {
  //       const [mangaResponse, bookResponse] = await Promise.all([
  //         axios.get(`${import.meta.env.VITE_API_URL}/mangas/search/by-name/`, {
  //           params: { name: searchedName },
  //         }),
  //         axios.get(`${import.meta.env.VITE_API_URL}/books/search/by-name/`, {
  //           params: { name: searchedName },
  //         }),
  //       ]);

  //       const mangaItems = mangaResponse.data.items;
  //       const bookItems = bookResponse.data.items;

  //       const combinedItems = [...mangaItems, ...bookItems];

  //       console.log(mangaItems);
  //       console.log(bookItems);
  //       console.log(combinedItems);

  //       setItems(combinedItems);
  //       setShowResults(true);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     setShowResults(false); // Hide results if less than 3 characters are typed
  //   }
  // };

  // // Debounce function to limit the rate of API calls
  // const debounce = (func: Function, delay: number) => {
  //   let timeoutId: NodeJS.Timeout;
  //   return (...args: any) => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => func.apply(null, args), delay);
  //   };
  // };

  // const debouncedHandleSearch = debounce(handleSearch, 300); // Adjust delay

  const handleClick = (itemId: string, itemType: string) => {
    console.log(itemId);
    navigate(`/details/${itemId}/${itemType}`);
  };

  return (
    <div className="m-0 flex flex-col items-center justify-center p-0">
      <input
        type="text"
        placeholder={placeholder}
        // onChange={debouncedHandleSearch}
        className="font-kanit border-main-color h-10 w-[300px] border-0 border-[2.5px] bg-transparent pl-8 text-base text-gray-200 outline-none placeholder:text-gray-500"
      />
      {loading && <div className="mt-8 text-lg text-white">Loading...</div>}
      {showResults && !loading && (
        <div className="relative block w-[700px] justify-center">
          <div
            className={`absolute left-[-20px] mt-8 mb-8 grid h-auto w-auto grid-cols-2 content-center items-center justify-center gap-0 rounded-md bg-white/28 pt-2 pr-5 pb-10 pl-5 ${
              showResults ? "" : "hidden"
            }`}
          >
            {items.map((item, i) => (
              <div
                key={i}
                onClick={() => handleClick(item._id, item.type)}
                className="mt-5 mr-2 ml-2 flex w-96 cursor-pointer rounded-lg bg-white p-2 pr-8 text-black hover:bg-gray-200"
              >
                <div className="h-full w-30">
                  <img
                    src={item.cover}
                    className="h-full w-full rounded-md border border-transparent"
                    alt={item.name}
                  />{" "}
                  {/* Added alt attribute */}
                </div>
                <div className="mr-4 ml-5 flex w-[200px] flex-col">
                  <p className="mb-3 text-lg font-bold text-ellipsis text-black">
                    {item.name}
                  </p>
                  <div className="flex flex-col text-sm text-gray-600">
                    <p className="mt-5 mb-2">{item.authorName}</p>
                    <p className="whitespace-nowrap">{item.releaseYear}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
