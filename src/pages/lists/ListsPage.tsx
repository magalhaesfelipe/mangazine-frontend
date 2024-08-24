import classes from "./style.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import CreateListButton from "./components/create-button/CreateListButton";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const AllListsPage = () => {
  const { user } = useUser();
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  const handleClick = (listId: any) => {
    console.log("This is the list id: ", listId);
    navigate(`/list/${listId}`);
  };

  useEffect(() => {
    const fetchLists = async () => {
      if (!user || !user.id) {
        return <div>No user</div>;
      }

      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/lists/get-all-lists/${user.id}`
        );
        setLists(response.data.lists);
        console.log(lists);
      } catch (err) {
        console.error("Error fetching lists: ", err);
      }
    };

    fetchLists();
  }, [user]);

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.headline}>
        <h1>Your Lists</h1>
      </div>
      <div className={classes.buttonContainer}>
        <CreateListButton />
      </div>
      <div className={classes.grid}>
        {lists.map((list, index) => (
          <div className={classes.box} onClick={() => handleClick(list._id)}>
              <h3 className={classes.name}>{list.name}</h3>
              <p>{list.titles.length} titles </p>
          </div>
        ))}
      </div>
      <div className={classes.footerContainer}>
        <Footer />
      </div>
    </div>
  );
};

export default AllListsPage;
