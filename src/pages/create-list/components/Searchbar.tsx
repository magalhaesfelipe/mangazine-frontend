import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HorizontalScrollbar from "./HorizontalScrollbar";

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
  releaseYear?: string;
  cover?: string;
  type: string;
}

type SearchItem = MangaItem | BookItem;

interface SearchbarProps {
  placeholder: string;
  setSelectedItems: (items: any[]) => void;
}

interface Item {
  _id: string;
  cover: string;
  name: string;
  author: string;
  releaseYear: string;
}

const Searchbar: React.FC<SearchbarProps> = ({
  placeholder,
  setSelectedItems,
}) => {
  const [items, setItems] = useState<SearchItem[]>([]);
  const [localSelectedItems, setLocalSelectedItems] = useState<Item[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

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

        console.log("Those are the combined items: ", combinedItems);

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

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  };

  const debouncedHandleSearch = debounce(handleSearch, 300);

  const handleClick = (item: any) => {
    setLocalSelectedItems((prevSelectedItems) => {
      if (
        !prevSelectedItems.some((selectedItem) => selectedItem._id === item._id)
      ) {
        const updatedSelectedItems = [...prevSelectedItems, item];

        // Update both local and parent state
        setSelectedItems(updatedSelectedItems); // Update parent state
        return updatedSelectedItems; // Update local state
      }
      return prevSelectedItems;
    });
  };

  return (
    <>
      {localSelectedItems.length > 0 && (
        <div className="w-full mb-6 flex flex-col mt-10">
          {" "}
          {/* scrollbarContainer */}
          <div className="flex items-center justify-center text-white text-lg py-2">
            {" "}
            {/* headline */}
            <p>LIST ITEMS</p>
          </div>
          <HorizontalScrollbar
            items={localSelectedItems}
            itemsNumber={localSelectedItems.length}
          />
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        {" "}
        {/* container */}
        <input
          type="text"
          placeholder={placeholder}
          onChange={debouncedHandleSearch}
          className="text-black text-base font-kanit w-[400px] h-10 pl-8 rounded-lg border-0 bg-white border-[2.5px] border-main-color outline-none placeholder:text-gray-500" // searchbar
        />
        {loading && <div className="mt-8 text-lg text-white">Loading...</div>}
        {showResults && !loading && (
          <div>
            <div
              className={`grid items-center justify-center content-center w-auto h-auto mt-8 mb-8 pt-2 pb-10 bg-white grid-cols-2 gap-0 rounded-md pr-5 pl-5 ${
                showResults ? "" : "hidden"
              }`} // gridContainer
            >
              {items.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleClick(item)}
                  className="mt-5 h-[140px] w-[300px] flex rounded-lg pr-2 mr-2 ml-4 bg-gray-200 text-black cursor-pointer border border-transparent hover:bg-white hover:border-gray-200 transition-all duration-100" // gridItem
                >
                  <img
                    src={item.cover}
                    className="h-full w-[180px] rounded-tl-lg rounded-bl-lg border border-transparent" // cover
                    alt={item.name} // Added alt attribute for accessibility
                  />
                  <div className="ml-5 w-[200px] flex flex-col m-2 pr-16">
                    {" "}
                    {/* informationContainer */}
                    <p className="text-lg text-black">{item.name}</p>{" "}
                    {/* name */}
                    <div className="flex flex-col">
                      {" "}
                      {/* box2 */}
                      <p className="w-[180px] mt-4 mb-6 line-clamp-2 overflow-hidden text-ellipsis text-sm leading-[1.1] text-black">
                        {item.authorName} {/* author */}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.releaseYear} {/* releaseYear */}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;
