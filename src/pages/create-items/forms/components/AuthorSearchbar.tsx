import { useState } from "react";
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
    <div className="text-white flex flex-col items-center gap-2 w-full ml-5">
      {" "}
      {/* container */}
      <p>Author</p>
      <input
        type="text"
        placeholder="Search author"
        className="w-[200px] p-2 rounded-md box-border border-none outline-none shadow-none appearance-none font-['var(--font1)'] border-b border-gray-500 text-base" // searchbar
        value={searchQuery}
        onChange={handleSearch}
      />
      {loading && <div className="text-white">Loading...</div>} {/* loading */}
      {showResults && authors && (
        <div className="bg-white text-black pt-2">
          {" "}
          {/* grid */}
          {authors.length > 0 ? (
            authors.map((author) => (
              <div
                key={author._id}
                className="p-1 mb-2 hover:bg-black hover:text-white cursor-pointer" // gridItem
                onClick={() => handleClick(author._id, author.name)}
              >
                <p>{author.name}</p>
              </div>
            ))
          ) : (
            <p className="text-sm">No Results</p> // noResults
          )}
        </div>
      )}
      {authorSelected && (
        <div className="p-4 bg-black border-solid border-4 border-white rounded-lg mt-2 font-['var(--font1)']">
          {" "}
          {/* authorSelected */}
          <p>{authorSelected}</p>
        </div>
      )}
      <button className="mt-5 p-2 rounded-md border-2 border-transparent cursor-pointer font-['var(--font1)'] font-bold hover:bg-black hover:text-white hover:border-white transition-all duration-200">
        Create new author
      </button>
    </div>
  );
};

export default AuthorSearchbar;
