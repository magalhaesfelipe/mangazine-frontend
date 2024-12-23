import classes from "./style.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HorizontalScrollbar from "../horizontal-scrollbar/HorizontalScrollbar";

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
        <div className={classes.scrollbarContainer}>
          <div className={classes.headline}>
            <p>LIST ITEMS</p>
          </div>
          <HorizontalScrollbar
            items={localSelectedItems}
            itemsNumber={localSelectedItems.length}
          />
        </div>
      )}
      <div className={classes.container}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={debouncedHandleSearch}
          className={classes.searchbar}
        />
        {loading && <div className={classes.loading}> Loading...</div>}
        {showResults && !loading && (
          <div>
            <div
              className={`${classes.gridContainer} ${
                showResults ? "" : classes.hidden
              }`}
            >
              {items.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleClick(item)}
                  className={classes.gridItem}
                >
                  <img src={item.cover} className={classes.cover} />
                  <div className={classes.informationContainer}>
                    <p className={classes.name}>{item.name}</p>
                    <div className={classes.box2}>
                      <p className={classes.author}>{item.authorName} </p>
                      <p className={classes.releaseYear}> {item.releaseYear}</p>
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
