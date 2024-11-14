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
      setAuthorData(response.data.data);
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  };

  const fetchAuthorWorks = async () => {
    if (!authorData || !authorData.works) {
      console.error("❌ No author data or author works!!");
      return;
    }

    const worksRequests = authorData.works
      .filter((work) => work.titleId !== currentTitleId)
      .map(async (work: any) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/${work.type}s/${work.titleId}`
          );

          return response.data.data;
        } catch (error) {
          console.error(`Error fetching ${work.type} data: `, error);
        }
      });

    const works = await Promise.all(worksRequests);
    setAuthorWorks(works);
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
    console.log(
      "This is the titleId: ",
      titleId,
      "And this is the title type: ",
      titleType
    );
    navigate(`/details/${titleId}/${titleType}`);
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
                      <p>{work.name}</p>
                      <p>{work.releaseYear}</p>
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
