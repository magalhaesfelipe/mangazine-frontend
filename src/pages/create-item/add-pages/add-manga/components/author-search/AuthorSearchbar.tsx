import { useState } from "react";
import classes from "./AuthorSearchbar.module.css";
import axios from "axios";

const AuthorSearchbar = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (event: any) => {
    const searchedName = event.target.value;

    if (searchedName.trim().length >= 3) {
      setLoading(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/authors/search`,
          {
            params: { name: searchedName },
          }
        );

        const items = response.data.items;

        if (!items) {
          console.log("No author found with that name");
        }

        setAuthors(items);
        setShowResults(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setShowResults(false);
    }
  };

  return (
    <div className={classes.container}>
      <p>Author</p>
      <div className="">
        <input
          type="text"
          placeholder="Search author"
          className={classes.searchbar}
          onChange={handleSearch}
        />
        {loading && <div className={classes.loading}> Loading...</div>}
        {showResults && !loading && (
          <div className={classes.grid}>
            {authors.map((author: any) => (
              <div key={author._id} className={classes.gridItem}>
                <p>{author.name}</p>
              </div>
            ))}
          </div>
        )}
        { 
          showResults && authors.length === 0 && (
            <p className={classes.noResults}>No Results</p>
          )  
        }
      </div>
      <button>Create new author</button>
    </div>
  );
};

export default AuthorSearchbar;
