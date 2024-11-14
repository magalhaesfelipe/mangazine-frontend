import { useEffect, useState } from "react";
import classes from "./AuthorSection.module.css";
import axios from "axios";

const AuthorSection = (props: any) => {
  const [authorData, setAuthorData] = useState();
  const [authorWorks, setAuthorWorks] = useState<any[]>([]);
  const { authorId } = props;

  console.log("This is the author id: ", authorId);

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
    if (!authorData || !authorData.works)
      console.error("❌ No author data or author works!!");

    const worksRequests = authorData.works.map(async (work: any) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/${work.type}s/${work.titleId}`
        );

        console.log("This is the response to fetch authors: ", response);
        return response.data.data;
      } catch (error) {
        console.error(`Error fetching ${work.type} data: `, error);
      }
    });

    const works = await Promise.all(worksRequests);
    setAuthorWorks(works);
  };

  useEffect(() => {
    fetchAuthorData();
  }, [authorId]);

  useEffect(() => {
    if (authorData) {
      fetchAuthorWorks();
    }
  }, [authorData]);

  if (!authorData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div> About the Author</div>
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img src={authorData.photo} />
        </div>
        <div className={classes.informationContainer}>
          <div className={classes.information1}>
            <p>Name: {authorData.name}</p>|
            <p>
              Born: {authorData.dateOfBirth} • {authorData.placeOfBirth}{" "}
            </p>
          </div>
          <div className={classes.information2}>
            <p>{authorData.bio}</p>
          </div>

          {/* Render author's works */}
          <div className={classes.otherWorks}>
            <h3>Author's Works</h3>
            {authorWorks.length > 0 ? (
              <ul>
                {authorWorks.map((work, index) => (
                  <li key={index} className={classes.workContainer}>
                    <p>{work.name}</p>
                    <p>{work.description}</p>
                    <img src="https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/5971776-01.jpg" />
                  </li>
                ))}
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
