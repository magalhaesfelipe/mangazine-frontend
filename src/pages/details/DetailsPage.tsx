import classes from "./DetailsPage.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdditionalInformation from "./components/additional-information/AdditionalInformation";
import Rating from "./components/rating/Rating";
import AddButton from "./components/add-button/AddButton";
import Header from "../../components/header/Header";
import AuthorSection from "./components/author-section/AuthorSection";
import Footer from "../../components/footer/Footer";

const Details = () => {
  const { itemId, itemType } = useParams();
  const [titleData, setTitleData] = useState(null);

  if (!itemId || !itemType) {
    console.error("Missing itemId or itemType");
    return;
  }

  useEffect(() => {
    const fetchTitleData = async () => {
      try {
        if (itemType === "book") {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/books/${itemId}`,
            {
              headers: {
                "Cache-Control": "no-cache",
              },
            }
          );
          setTitleData(response.data.data);
          console.log(response.data);
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/mangas/${itemId}`,
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
        setTitleData(response.data.data);
        console.log(response.data);
      } catch (err) {
        console.error("ERROR:", err);
      }
    };
    fetchTitleData();
  }, [itemId, itemType]);

  if (!titleData) {
    return <div> Loading...</div>;
  }

  const authorId: string = titleData.author;

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
                  <h3> {titleData.authorName} </h3>
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
        <div className={classes.otherConversSection}>
          <div className={classes.sectionName}>Other covers</div>
          <div className={classes.imagesContainer}>
            {titleData.otherCovers.map((cover, index) => (
              <img src={cover} key={index} />
            ))}
          </div>
        </div>

        <div className={classes.authorSection}>
          <AuthorSection authorId={authorId} currentTitleId={itemId} />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Details;
