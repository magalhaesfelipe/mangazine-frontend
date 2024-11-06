import { useState } from "react";
import classes from "./AuthorSearchbar.module.css";
import axios from "axios";

const AuthorSearchbar = () => {
  const [authors, setAuthors] = useState([]);

  const handleSearch = async (event: any) => {
    const searchedName = event.target.value;

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/authors/search`,
      {
        params: { name: searchedName },
      }
    );

    setAuthors(response.data.items);

  };

  return (
    <div className={classes.authorFieldContainer}>
      <div className={classes.container2}>
        <p>Author</p>
        <div>
          <input
            type="text"
            placeholder="Search author"
            className={classes.authorSearchbar}
            onChange={console.log(hello)}
          />
        </div>
        {authors.length > 0 ? }
        <p>or</p>
        <div>
          <button>Create new author</button>
        </div>
      </div>
    </div>
  );
};

export default AuthorSearchbar;
