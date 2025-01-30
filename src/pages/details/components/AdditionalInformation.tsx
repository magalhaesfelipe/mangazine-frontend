const AdditionalInformation = ({ titleData }) => {
  return (
    <>
      <div className="pl-2">
        {" "}
        {/* genresContainer */}
        <div className="flex items-center p-1 gap-1 font-impact font-light tracking-wide">
          {" "}
          {/* genres */}
          {titleData?.genre?.map((genre, index) => (
            <p
              key={index}
              className="text-sm border border-1 rounded-[18px] px-3 py-1 text-white"
            >
              {genre}
            </p>
          ))}
        </div>
      </div>
      {titleData.type === "manga" ? (
        <div className="flex items-center justify-center mt-2 text-white w-full border-t border-b border-white py-2">
          {" "}
          {/* information2 */}
          <div className="minibox">
            <p className="text-gray-400 font-bold font-raleway">Chapters:</p>{" "}
            {/* field */}
            <p className="font-impact tracking-wide">
              {titleData.chapters}
            </p>{" "}
            {/* data */}
          </div>
          <div className="minibox">
            <p className="text-gray-400 font-bold font-raleway">Status:</p>{" "}
            {/* field */}
            <p className="font-impact tracking-wide">{titleData.status}</p>{" "}
            {/* data */}
          </div>
          <div className="minibox">
            <p className="text-gray-400 font-bold font-raleway">Type:</p>{" "}
            {/* field */}
            <p className="font-impact tracking-wide">{titleData.type}</p>{" "}
            {/* data */}
          </div>
          <div className="minibox">
            <p className="text-gray-400 font-bold font-raleway">
              Published by:
            </p>{" "}
            {/* field */}
            <p className="font-impact tracking-wide">
              {titleData.publishedBy}
            </p>{" "}
            {/* data */}
          </div>
          <div className="minibox">
            <p className="text-gray-400 font-bold font-raleway">Demographic:</p>{" "}
            {/* field */}
            <p className="font-impact tracking-wide">
              {titleData.demographic}
            </p>{" "}
            {/* data */}
          </div>
          {titleData.alternativeName && (
            <div className="minibox">
              <p className="text-gray-400 font-bold font-raleway">
                Alternative Name:
              </p>{" "}
              {/* field */}
              <p className="font-impact tracking-wide">
                {titleData.alternativeName}
              </p>{" "}
              {/* data */}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-2 text-white w-full border-t border-b border-white py-2">
          {" "}
          {/* information2 */}
          <div className="minibox">
            <p className="text-gray-400 font-bold font-raleway">Pages:</p>{" "}
            {/* field */}
            <p className="font-impact tracking-wide">{titleData.pages}</p>{" "}
            {/* data */}
          </div>
          <div className="minibox">
            <p className="text-gray-400 font-bold font-raleway">Type:</p>{" "}
            {/* field */}
            <p className="font-impact tracking-wide">{titleData.type}</p>{" "}
            {/* data */}
          </div>
          <div className="minibox">
            <p className="text-gray-400 font-bold font-raleway">
              Published by:
            </p>{" "}
            {/* field */}
            <p className="font-impact tracking-wide">
              {titleData.publishedBy}
            </p>{" "}
            {/* data */}
          </div>
        </div>
      )}
    </>
  );
};

export default AdditionalInformation;
