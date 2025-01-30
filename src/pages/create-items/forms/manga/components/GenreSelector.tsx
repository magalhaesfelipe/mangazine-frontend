const GenreSelector = ({ genres, selectedGenres, onGenreClick }) => {
  return (
    <div className="w-[680px] mt-2">
      {" "}
      {/* superContainer */}
      <label className="mb-2">Genre:</label>
      <div className="grid grid-cols-7 h-[130px] mb-2 mt-4">
        {" "}
        {/* container */}
        {genres.map((genre, index) => (
          <div
            key={index}
            onClick={() => onGenreClick(genre)}
            className="border-solid border-2 rounded-md m-1 h-10 flex items-center cursor-pointer hover:bg-black hover:text-white transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-gray-200 active:text-black" // genreBlock with active styling
          >
            <p className="whitespace-nowrap px-2 text-sm">{genre}</p>{" "}
            {/* genreName */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;
