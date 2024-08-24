import classes from "./style.module.css";

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
    <div className={classes.container}>
      <div className={classes.scrollContainer}>
        {items.map((item) => (
          <div key={item._id} className={classes.item}>
            <img src={item.cover} />
            <div className={classes.nameContainer}>
              <p>{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollbar;
