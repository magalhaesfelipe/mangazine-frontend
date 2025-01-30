import { useState } from "react";
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
    <div className="text-white flex flex-col items-center justify-start gap-2 w-[300px] h-[200px] mt-5 ml-10">
      {" "}
      {/* container */}
      <p>Author</p>
      <div>
        <input
          type="text"
          placeholder="Search author"
          className="w-[180px] p-2 border-none outline-none shadow-none appearance-none font-['var(--font1)'] border-b border-gray-500 text-base" // searchbar
          onChange={handleSearch}
        />
        {loading && <div className="text-white">Loading...</div>}{" "}
        {/* loading */}
        {showResults && !loading && (
          <div className="bg-white text-black pt-2">
            {" "}
            {/* grid */}
            {authors.map((author) => (
              <div
                key={author._id}
                className="p-1 mb-2 hover:bg-black hover:text-white cursor-pointer"
              >
                {" "}
                {/* gridItem */}
                <p>{author.name}</p>
              </div>
            ))}
          </div>
        )}
        {showResults && authors.length === 0 && (
          <p className="bg-white text-black text-sm">No Results</p> // noResults
        )}
      </div>
      <button className="mt-5 p-2 rounded-md border-0 cursor-pointer font-['var(--font1)'] font-bold">
        Create new author
      </button>
    </div>
  );
};

export default AuthorSearchbar;
