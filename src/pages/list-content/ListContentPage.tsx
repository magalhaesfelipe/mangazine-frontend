import classes from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ElementCard from "../../components/element-card/ElementCard";
import { useParams } from "react-router-dom";
import Searchbar from "../home/components/searchbar/Searchbar";
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
        `http://localhost:2000/api/v1/lists/${listId}`
      );

      setList(response.data.list);
      const itemCovers = response.data.list.titles.map((item) => item.cover);
      console.log(itemCovers);
      setItems(response.data.list.titles);
      setCovers(itemCovers);
      console.log("Those are the items: ", response.data.list.titles);
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
            <Searchbar placeholder="Search to add a new item" />
          </div>
          {items.length === 0 && (
            <div className={classes.bla}>
              <p className={classes.noItemsMessage}>
                * No items in this list *
              </p>
            </div>
          )}
        </div>
        {items.length > 0 && (
          <main className={classes.contentGrid}>
            {items.map((item, index) => (
              <ElementCard key={index} item={item} />
            ))}
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
