import classes from "./readlistPage.module.css";
import Header from "../../components/header/Header";
import ElementCard from "../../components/element-card/ElementCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import Footer from "../../components/footer/Footer";

const Readlist = () => {
  const { isSignedIn, user } = useUser();
  const [readList, setReadList] = useState([]);
  
  const userId = user?.id;
  console.log("This is the user id: ", userId);

  useEffect(() => {
    const fetchItems = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/readlists/${userId}`
          );
          console.log("😎THIS is the READ LIST PAGE response: ", response);
          setReadList(response.data.data);
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
        {readList && readList.length > 0 ? (
          readList.map((itemId, index) => (
            <ElementCard key={index} item={itemId} />
          ))
        ) : (
          <div className={classes.noReadlistMessage}>NO READLIST</div>
        )}
      </main>
      <div className={classes.footerContainer}>
        <Footer />
      </div>
    </div>
  );
};

export default Readlist;
