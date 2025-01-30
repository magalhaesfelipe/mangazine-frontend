import classes from "./readlistPage.module.css";
import Header from "../../components/Header";
import ElementCard from "../../components/element-card/ElementCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import Footer from "../../components/Footer";

const Readlist = () => {
  const { isSignedIn, user } = useUser();
  const [readlist, setReadlist] = useState([]);
  
  const userId = user?.id;
  const items = readlist?.items;
  
  console.log("This is the user id: ", userId);

  useEffect(() => {
    const fetchItems = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/readlists/${userId}`
          );
          console.log("😎THIS is the READLIST PAGE response: ", response);
          setReadlist(response.data.data);
        } catch (err) {
          console.error(`Failed to fetch Readlist. Error message: ${err}`);
        }
      } else {
        console.log("USER NOT FOUND");
      }
    };

    fetchItems();
  }, [user]);

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.headline}>
        <p>READLIST</p>
      </div>
      <main className={classes.contentGrid}>
        {items && items.length > 0 ? (
          items.map((item: any, index: any) => (
            <ElementCard key={index} item={item} />
          ))
        ) : (
          <div className={classes.noItemsMessage}>NO ITEMS IN THE READLIST</div>
        )}
      </main>
      <div className={classes.footerContainer}>
        <Footer />
      </div>
    </div>
  );
};

export default Readlist;
