import classes from "./style.module.css";

const AdditionalInformation = ({ titleData }) => {
  return (
    <>
      <div className={classes.genresContainer}>
        <div className={classes.genres}>
          {titleData?.genre?.map((genre, index) => (
            <p key={index}>{genre}</p>
          ))}
        </div>
      </div>
      {titleData.type === "manga" ? (
        <div className={classes.information2}>
          <div className={classes.minibox}>
            <p className={classes.field}>Chapters:</p>
            <p className={classes.data}>{titleData.chapters}</p>
          </div>
          <div className={classes.minibox}>
            <p className={classes.field}>Status:</p>
            <p className={classes.data}>{titleData.status}</p>
          </div>
          <div className={classes.minibox}>
            <p className={classes.field}>Type:</p>
            <p className={classes.data}>{titleData.type}</p>
          </div>
          <div className={classes.minibox}>
            <p className={classes.field}>Published by:</p>
            <p className={classes.data}>{titleData.publishedBy}</p>
          </div>
          <div className={classes.minibox}>
            <p className={classes.field}>Demographic:</p>
            <p className={classes.data}>{titleData.demographic}</p>
          </div>
          {titleData.alternativeName && (
            <div className={classes.minibox}>
              <p className={classes.field}>Alternative Name:</p>
              <p className={classes.data}>{titleData.alternativeName}</p>
            </div>
          )}
        </div>
      ) : (
        <div className={classes.information2}>
          <div className={classes.minibox}>
            <p className={classes.field}>Pages:</p>
            <p className={classes.data}>{titleData.pages}</p>
          </div>
          <div className={classes.minibox}>
            <p className={classes.field}>Type:</p>
            <p className={classes.data}>{titleData.type}</p>
          </div>

          <div className={classes.minibox}>
            <p className={classes.field}>Published by:</p>
            <p className={classes.data}>{titleData.publishedBy}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdditionalInformation;
