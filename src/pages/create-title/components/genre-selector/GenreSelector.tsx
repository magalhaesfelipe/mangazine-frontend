import classes from "./style.module.css";

const GenreSelector = ({ genres, selectedGenres, onGenreClick }) => {
  return (
    <div>
      <label>Genre:</label>
      <div className={classes.container}>
        {genres.map((genre, index) => (
          <div
            key={index}
            onClick={() => onGenreClick(genre)}
            className={classes.genreDiv}
          >
            <div className={classes.nameContainer}>
              <p className={classes.genreName}>{genre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;
