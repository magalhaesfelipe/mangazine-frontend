import { useEffect, useState } from "react";
import classes from "./AuthorSection.module.css";
import axios from "axios";

const AuthorSection = (props: any) => {
  const [authorData, setAuthorData] = useState();
  const [authorWorks, setAuthorWorks] = useState<any[]>([]);
  const { authorId } = props;

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
    if (!authorData || !authorData.works) return;
    
    const worksRequests = authorData.works.map(async (work: any) => {
      try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/${work.type}s/${work.titleId}`
          ) 
  
      } catch (error) {
        console.error(`Error fetching ${work.type} data: `, error);
      }

    })
    
  }

  useEffect(() => {
    fetchAuthorData();
  }, [authorId]);

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
          <div className={classes.otherWorks}>{}</div>
        </div>
      </div>
    </>
  );
};

export default AuthorSection;
