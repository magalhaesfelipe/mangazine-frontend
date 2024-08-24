import classes from "./style.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HorizontalScrollbar from "../horizontal-scrollbar/HorizontalScrollbar";

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
  const [items, setItems] = useState([]);
  const [localSelectedItems, setLocalSelectedItems] = useState<Item[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event: any) => {
    const searchedName = event.target.value;

    if (searchedName.trim().length >= 3) {
      setLoading(true);

      try {
        console.log(searchedName);
        const response = await axios.get(
          `http://localhost:2000/api/v1/titles/search/${searchedName}`
        );
        const titles = response.data.titles;
        setItems(titles);
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

  const handleClick = (item: Item) => {
    setLocalSelectedItems((prevSelectedItems) => {
      if (
        !prevSelectedItems.some((selectedItem) => selectedItem._id === item._id)
      ) {
        return [...prevSelectedItems, item];
      }
      return prevSelectedItems;
    });
  };

  return (
    <>
      {}
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
                      <p className={classes.author}>{item.author} </p>
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
