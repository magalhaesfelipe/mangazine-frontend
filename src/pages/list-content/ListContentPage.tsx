import { useEffect, useState } from "react";
import axios from "axios";
import ElementCard from "../../components/element-card/ElementCard";
import { useParams } from "react-router-dom";
import ListSearchbar from "./components/ListSearchbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
      <div className="flex flex-col items-center justify-center">
        {" "}
        {/* container */}
        <div
          className="h-[700px] max-h-[700px] w-full flex flex-col bg-contain items-center" // headlineContainer
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${
              covers[currentCoverIndex] || "./01.png"
            })`,
          }}
        >
          <div className="flex text-center text-white text-[60px] font-audiowide mt-[300px] w-[90%] justify-center">
            {" "}
            {/* listName */}
            {list.name}
          </div>
          <div className="flex flex-col items-center justify-center mt-[5%] mb-10">
            {" "}
            {/* searchBarContainer */}
            <div className="text-lg text-gray-400">
              {" "}
              {/* textContainer */}
              <p>Add a new item to your list</p>
            </div>
            <div className="mt-10 mb-10">
              {" "}
              {/* Input wrapper for margin */}
              <ListSearchbar
                placeholder="Search to add a new item"
                onItemAdded={fetchItems}
                listId={listId}
              />
            </div>
          </div>
        </div>
        {items.length > 0 && (
          <main className="mt-10 w-[76%] grid grid-cols-5 gap-x-6">
            {" "}
            {/* contentGrid */}
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <ElementCard key={index} item={item} />
              ))
            ) : (
              <div className="text-white text-lg mb-[70%]">
                {" "}
                {/* noItemsMessage */}
                NO ITEMS IN THIS LIST
              </div>
            )}
          </main>
        )}
      </div>
      <div className="mt-[10%] mb-[5%]">
        {" "}
        {/* footerContainer */}
        <Footer />
      </div>
    </>
  );
};

export default ListContent;
