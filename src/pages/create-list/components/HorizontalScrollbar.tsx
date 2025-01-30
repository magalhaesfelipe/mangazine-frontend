interface Item {
  _id: string;
  cover: string;
  name: string;
}

interface ScrollbarProps {
  items: Item[];
  itemsNumber: number;
}

const HorizontalScrollbar: React.FC<ScrollbarProps> = ({
  items,
  itemsNumber,
}) => {
  return (
    <div className="flex flex-col items-center">
      {" "}
      {/* container */}
      <div className="flex flex-row items-start overflow-x-auto whitespace-nowrap w-[90%] p-2">
        {" "}
        {/* scrollContainer */}
        {items.map((item) => (
          <div
            key={item._id}
            className="inline-block w-[130px] rounded-md h-[220px] m-2 relative shrink-0 shadow-[-5px_-5px_10px_rgba(255,255,255,0.1),_5px_5px_10px_rgba(255,255,255,0.1)]" // item
          >
            <img
              src={item.cover}
              className="w-full h-[70%] rounded-t-md" // item img
              alt={item.name} // Added alt attribute for accessibility
            />
            <div className="w-full h-10 overflow-hidden text-ellipsis text-sm whitespace-normal leading-[1.1] p-2 text-left">
              {" "}
              {/* nameContainer */}
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollbar;
