const AdditionalInformation = ({ titleData }) => {
  return (
    <>
      {titleData.type === "manga" ? (
        <div className="flex items-center justify-center mt-2 text-[20px] font-bold text-white w-full border-t border-b border-white py-3">
          <div className="minibox mr-5 flex-col align-middle justify-center items-center">
            <p className="text-gray-400 font-bold text-2xl font-raleway">
              Chapters
            </p>{" "}
            <p className="text-center tracking-wide">{titleData.chapters}</p>
          </div>
          <div className="minibox mr-5 flex-col align-middle items-center justify-center ">
            <p className="text-gray-400 font-bold text-2xl font-raleway">
              Status
            </p>{" "}
            <p className="text-center tracking-wide">{titleData.status}</p>
          </div>
          <div className="minibox mr-5 flex-col align-middle items-center justify-center">
            <p className="text-gray-400 font-bold text-2xl font-raleway">
              Type
            </p>{" "}
            <p className="text-center tracking-wide">{titleData.type}</p>
          </div>
          <div className="minibox mr-5 flex-col align-middle justify-center items-center">
            <p className="text-gray-400 font-bold text-2xl font-raleway">
              Published by
            </p>
            <p className="text-center tracking-wide">{titleData.publishedBy}</p>
          </div>
          <div className="minibox mr-5 flex-col align-middle justify-center items-center">
            <p className="text-gray-400 font-bold font-raleway text-2xl ">
              Demographic
            </p>
            <p className="text-center tracking-wide">{titleData.demographic}</p>
          </div>
          {titleData.alternativeName && (
            <div className="minibox mr-5 flex-col align-middle justify-center items-center">
              <p className="text-gray-400 font-bold font-raleway text-2xl">
                Alternative Name
              </p>
              <p className="text-center tracking-wide text-2xl">
                {titleData.alternativeName}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-2 text-white w-full border-t border-b border-white py-2">
          <div className="minibox mr-5 flex-col align-middle justify-center items-center">
            <p className="text-gray-400 font-bold font-raleway">Pages</p>{" "}
            <p className="text-center tracking-wide">{titleData.pages}</p>{" "}
          </div>
          <div className="minibox mr-5 flex-col align-middle justify-center items-center">
            <p className="text-gray-400 font-bold font-raleway">Type</p>{" "}
            <p className="text-center tracking-wide">{titleData.type}</p>{" "}
          </div>
          <div className="minibox mr-5 flex-col align-middle justify-center items-center">
            <p className="text-gray-400 font-bold font-raleway">
              Published by:
            </p>
            <p className="text-center tracking-wide">{titleData.publishedBy}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdditionalInformation;
