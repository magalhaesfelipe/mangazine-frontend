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

const Searchbar: React.FC<SearchbarProps> = ({ placeholder }) => {
  const [items, setItems] = useState<SearchItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (event: any) => {
    const searchedName = event.target.value;

    if (searchedName.trim().length >= 3) {
      setLoading(true);

      try {
        const [mangaResponse, bookResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/mangas/search/by-name/`, {
            params: { name: searchedName },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/books/search/by-name/`, {
            params: { name: searchedName },
          }),
        ]);

        const mangaItems = mangaResponse.data.items;
        const bookItems = bookResponse.data.items;

        const combinedItems = [...mangaItems, ...bookItems];

        console.log(mangaItems);
        console.log(bookItems);
        console.log(combinedItems);

        setItems(combinedItems);
        setShowResults(true);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      setShowResults(false); // Hide results if less than 3 characters are typed
    }
  };

  // Debounce function to limit the rate of API calls
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  };

  const debouncedHandleSearch = debounce(handleSearch, 300); // Adjust delay

  const handleClick = (itemId: string, itemType: string) => {
    console.log(itemId);
    navigate(`/details/${itemId}/${itemType}`);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="text"
        placeholder={placeholder}
        onChange={debouncedHandleSearch}
        className="text-gray-200 text-base font-kanit w-[300px] h-10 pl-8 rounded-lg border-0 bg-transparent border-[2.5px] border-main-color outline-none placeholder:text-gray-500"
      />
      {loading && <div className="mt-8 text-lg text-white">Loading...</div>}
      {showResults && !loading && (
        <div className="relative block justify-center w-[700px]">
          <div
            className={`absolute left-[-20px] grid items-center justify-center content-center w-auto h-auto mt-8 mb-8 pt-2 pb-10 bg-white/28 grid-cols-2 gap-0 rounded-md pr-5 pl-5 ${
              showResults ? "" : "hidden"
            }`}
          >
            {items.map((item) => (
              <div
                key={item._id}
                onClick={() => handleClick(item._id, item.type)}
                className="mt-5 h-[130px] w-[300px] flex p-2 rounded-lg pr-8 mr-2 ml-2 bg-white text-black cursor-pointer hover:bg-gray-200"
              >
                <div className="h-full w-[90px]">
                  <img
                    src={item.cover}
                    className="w-full h-full rounded-md border border-transparent"
                    alt={item.name}
                  />{" "}
                  {/* Added alt attribute */}
                </div>
                <div className="ml-5 w-[200px] flex flex-col">
                  <p className="line-clamp-2 overflow-hidden text-ellipsis text-lg leading-[1.1] text-black mb-3">
                    {item.name}
                  </p>
                  <div className="flex flex-col text-sm text-gray-600">
                    <p className="mt-4 mb-5 w-full leading-[15px]">
                      {item.authorName}
                    </p>
                    <p className="mb-5 whitespace-nowrap">{item.releaseYear}</p>
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
