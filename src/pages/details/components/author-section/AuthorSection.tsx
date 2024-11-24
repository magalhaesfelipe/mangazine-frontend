import { useEffect, useState } from "react";
import classes from "./AuthorSection.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthorSection = (props: any) => {
  const [authorData, setAuthorData] = useState();
  const [authorWorks, setAuthorWorks] = useState<any[]>([]);
  const { authorId, currentTitleId } = props;
  const navigate = useNavigate();

  const fetchAuthorData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/authors/${authorId}`
      );
      console.log("THis is the author data fetched: ", response);
      setAuthorData(response.data.data);
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  };

  const fetchAuthorWorks = async () => {
    if (!authorData) {
      console.error("❌ No author data or author works!!");
      return;
    }

    const [mangaResponse, bookResponse] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/mangas/search/by-author/`, {
        params: { author: authorData._id },
      }),
      axios.get(`${import.meta.env.VITE_API_URL}/books/search/by-author/`, {
        params: { author: authorData._id },
      }),
    ]);

    const mangaItems = mangaResponse.data.data;
    const bookItems = bookResponse.data.data;

    const combinedItems = [...mangaItems, ...bookItems];

    console.log(mangaItems);
    console.log(bookItems);
    console.log(combinedItems);

    setAuthorWorks(combinedItems);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleClick = (titleId: any, titleType: any) => {
    console.log("This is the titleId: ", titleId);
    console.log("And this is the title type: ", titleType);

    if (titleType === "book") navigate(`details/${titleId}/book`);

    navigate(`/details/${titleId}/manga`);
  };

  useEffect(() => {
    fetchAuthorData();
  }, [authorId]);

  useEffect(() => {
    if (authorData) {
      fetchAuthorWorks();
    }
  }, [authorData]);

  if (!authorId) {
    return (
      <>
        <div className={classes.headline}> About the Author</div>
        <div className={classes.noAuthorMessage}>
          No Author found for this title
        </div>
      </>
    );
  }

  if (!authorData) {
    return (
      <>
        <div className={classes.headline}> About the Author</div>
        <div className={classes.loading}>
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={classes.headline}> About the Author</div>
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img src={authorData.photo} />
        </div>
        <div className={classes.informationContainer}>
          <div className={classes.information1}>
            <div className={classes.block}>
              <p className={classes.field}>NAME</p>
              <p>{authorData.name}</p>
            </div>
            <div className={classes.block}>
              <p className={classes.field}>BORN</p>
              <p>
                {formatDate(authorData.dateOfBirth)} • {authorData.placeOfBirth}{" "}
              </p>
            </div>
          </div>
          <div className={classes.information2}>
            <p>{authorData.bio}</p>
          </div>

          {/* Render author's works */}
          <div className={classes.otherWorks}>
            <h3>Other Works</h3>
            {authorWorks.length > 0 ? (
              <ul className={classes.allWorksContainer}>
                {authorWorks.map((work, index) => {
                  return (
                    <li
                      key={index}
                      className={classes.itemContainer}
                      onClick={() => handleClick(work._id, work.type)}
                    >
                      <img src={work.cover} />
                      <div className={classes.itemInformation}>
                        <p>{work.name}</p>
                        <p>{work.releaseYear}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No works found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorSection;
