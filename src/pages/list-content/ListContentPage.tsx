import classes from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ElementCard from "../../components/element-card/ElementCard";
import { useParams } from "react-router-dom";
import ListSearchbar from "./components/ListSearchbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const ListContent = () => {
  const { listId } = useParams(); // Get listId from URL
  const [items, setItems] = useState([]);
  const [list, setList] = useState({});
  const [covers, setCovers] = useState([]); // State for covers
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);

  // FETCH ITEMS FROM THE LIST
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/lists/${listId}`
      );

      console.log("THIS IS THE RESPONSE FETCHING THE LIST: ", response);

      setList(response.data.data);
      const itemCovers = response.data.data.items.map(
        (item: any) => item.itemId.cover
      );

      console.log("Those are THE ITEMS' COVERS", itemCovers);
      setItems(response.data.data.items);
      setCovers(itemCovers);

      console.log("Those are the item covers: ", itemCovers);
      console.log("Those are the items: ", response.data.data.items);
    } catch (err) {
      console.error(`Failed to fetch list items. Error message: ${err}`);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [listId]);

  useEffect(() => {
    console.log(currentCoverIndex);

    if (covers.length === 0) {
      console.log("No covers");
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentCoverIndex((prevIndex) => (prevIndex + 1) % covers.length);
    }, 10000); // 10 seconds

    return () => window.clearInterval(interval); // Cleanup interval on component unmount
  }, [covers]);

  if (!listId) {
    return <div>No ID provided</div>;
  }

  return (
    <>
      <Header />
      <div className={classes.container}>
        <div
          className={classes.headlineContainer}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${
              covers[currentCoverIndex] || "./01.png"
            })`,
          }}
        >
          <div className={classes.listName}>{list.name}</div>
          <div className={classes.searchBarContainer}>
            <div className={classes.textContainer}>
              <p>Add a new item to your list</p>
            </div>
            <ListSearchbar
              placeholder="Search to add a new item"
              onItemAdded={fetchItems}
              listId={listId}
            />
          </div>
        </div>
        {items.length > 0 && (
          <main className={classes.contentGrid}>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <ElementCard key={index} item={item} />
              ))
            ) : (
              <div className={classes.noItemsMessage}>
                NO ITEMS IN THIS LIST
              </div>
            )}
          </main>
        )}
      </div>
      <div className={classes.footerContainer}>
        <Footer />
      </div>
    </>
  );
};

export default ListContent;
