import { useState } from "react";
import classes from "./AuthorSearchbar.module.css";
import axios from "axios";

const AuthorSearchbar = ({ onSelectAuthor }: any) => {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [authorSelected, setAuthorSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = (authorId: any, authorName: any) => {
    onSelectAuthor(authorId);
    setAuthorSelected(authorName);
    setSearchQuery("");
    setShowResults(false);
  };

  const handleSearch = async (event: any) => {
    const searchedName = event.target.value;
    setSearchQuery(searchedName);

    if (searchedName.trim().length >= 3) {
      setLoading(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/authors/search`,
          {
            params: { name: searchedName },
          }
        );

        const authors = response.data?.data || [];

        if (!authors) {
          console.error(
            "No author found. ",
            "Searched name:",
            searchedName,
            "Response: ",
            response
          );
        }

        setAuthors(authors);
        setShowResults(true);
      } catch (error) {
        console.log(error);
        setAuthors([]);
      } finally {
        setLoading(false);
      }
    } else {
      setShowResults(false);
      setAuthors([]);
    }
  };

  return (
    <div className={classes.container}>
      <p>Author</p>
      <input
        type="text"
        placeholder="Search author"
        className={classes.searchbar}
        value={searchQuery}
        onChange={handleSearch}
      />
      {loading && <div className={classes.loading}> Loading...</div>}
      {showResults && authors && (
        <div className={classes.grid}>
          {authors.length > 0 ? (
            authors.map((author) => (
              <div
                key={author._id}
                className={classes.gridItem}
                onClick={() => handleClick(author._id, author.name)}
              >
                <p>{author.name}</p>
              </div>
            ))
          ) : (
            <p className={classes.noResults}>No Results</p>
          )}
        </div>
      )}
      {authorSelected && (
        <div className={classes.authorSelected}>
          <p>{authorSelected}</p>
        </div>
      )}
      <button>Create new author</button>
    </div>
  );
};

export default AuthorSearchbar;
