import classes from "./style.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdditionalInformation from "./components/additional-information/AdditionalInformation";
import Rating from "./components/rating/Rating";
import AddButton from "./components/add-button/AddButton";
import Header from "../../components/header/Header";

const Details = () => {
  const { itemId, itemType } = useParams();
  const [titleData, setTitleData] = useState(null);

  useEffect(() => {
    const fetchTitleData = async () => {
      try {
        if (itemType === "manga") {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/mangas/${itemId}`
          );
          setTitleData(response.data.title);
          console.log("RESPONSE:", response);
        } else if (itemType === "book") {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/books/${itemId}`
          );
          setTitleData(response.data.title);
          console.log("RESPONSE:", response);
        }
      } catch (err) {
        console.error("ERROR:", err);
      }
    };

    fetchTitleData();
  }, [itemId]);

  if (!titleData) {
    return <div> Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className={classes.superContainer}>
        <div className={classes.childComponent}>
          <div className={classes.coverContainer}>
            <img src={titleData.cover} />
          </div>
          <div className={classes.information1}>
            <div className={classes["top-container"]}>
              <div>
                <h1 className={classes.titleName}>{titleData.name} </h1>
              </div>
              <div className={classes.ratingContainer}>
                <Rating titleData={titleData} />
              </div>
            </div>
            <div className={classes.descriptionContainer}>
              <p>{titleData.description}</p>
            </div>
            <div className={classes["author-released-button"]}>
              <div>
                <div className={classes.minibox}>
                  <h3 className={classes.field}>Author</h3>
                  <h3> {titleData.author} </h3>
                </div>
                <div className={classes.minibox}>
                  <h3 className={classes.field}>Released </h3>
                  <h3>{titleData.releaseYear}</h3>
                </div>
              </div>
              <div className={classes.additionButton}>
                <AddButton titleData={titleData} />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.otherInfoContainer}>
          <AdditionalInformation titleData={titleData} />
        </div>
      </div>
    </>
  );
};

export default Details;
