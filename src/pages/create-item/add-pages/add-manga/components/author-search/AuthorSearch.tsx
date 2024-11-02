import { useState } from "react";
import classes from "./AuthorSearch.module.css";

const AuthorSearch = () => {
  const [authors, setAuthors] = useState([]);

  


  return (
    <div className={classes.authorFieldContainer}>
      <div className={classes.container2}>
        <p>Author</p>
        <div>
          <input
            type="text"
            placeholder="Search author"
            className={classes.authorSearchbar}
          />
        </div>
        <p>or</p>
        <div>
          <button>Create new author</button>
        </div>
      </div>
    </div>
  );
};

export default AuthorSearch;
