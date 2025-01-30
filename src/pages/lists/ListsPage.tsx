import classes from "./style.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import CreateListButton from "./components/create-button/CreateListButton";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AllListsPage = () => {
  const { user } = useUser();
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      if (!user) {
        return <div>No user</div>;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/lists/user/${user.id}`
        );

        console.log('THIS IS THE RESPONSE FETCHING ALL LISTS: ', response)
        setLists(response.data.data);
      } catch (err) {
        console.error("Error fetching lists: ", err);
      }
    };

    fetchLists();
  }, [user]);

  const goToList = (listId: any) => {
    navigate(`/list/${listId}`);
  };

  const deleteList = async (listId: any) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/lists/${listId}`
      );

      // Update the lists state by removing the deleted list
      setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
    } catch (error) {
      console.error("Error deleting list: ", error);
    }
  };

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
          <div className={classes.box} onClick={() => goToList(list._id)}>
            <h3 className={classes.name}>{list.name}</h3>
            <p>{list.items.length} Item(s) </p>
            <div className={classes.iconContainer}>
              <i
                className="fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the parent onClick event
                  deleteList(list._id);
                }}
              ></i>
            </div>
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
