import classes from "./style.module.css";
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

        console.log(mangaItems)
        console.log(bookItems)
        console.log(combinedItems)

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
    <div className={classes.container}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={debouncedHandleSearch}
        className={classes.searchbar}
      />
      {loading && <div className={classes.loading}> Loading...</div>}
      {showResults && !loading && (
        <div className={classes.superContainer}>
          <div
            className={`${classes.gridContainer} ${
              showResults ? "" : classes.hidden
            }`}
          >
            {items.map((item) => (
              <div
                key={item._id}
                onClick={() => handleClick(item._id, item.type)}
                className={classes.gridItem}
              >
                <div className={classes.imgContainer}>
                  <img src={item.cover} className={classes.cover} />
                </div>
                <div className={classes.informationContainer}>
                  <p className={classes.name}>{item.name}</p>
                  <div className={classes.box2}>
                    <p className={classes.author}>{item.authorName} </p>
                    <p className={classes.year}> {item.releaseYear}</p>
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
