import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import CreateListButton from "./components/CreateListButton";
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

        console.log("THIS IS THE RESPONSE FETCHING ALL LISTS: ", response);
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/lists/${listId}`);

      // Update the lists state by removing the deleted list
      setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
    } catch (error) {
      console.error("Error deleting list: ", error);
    }
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="mt-[10%] h-[100px] bg-main-color flex items-center mb-10">
        {" "}
        {/* headline */}
        <h1 className="ml-[8%] text-[55px] bg-white text-black">Your Lists</h1>
      </div>
      <div className="flex justify-end mr-[5%]">
        {" "}
        {/* buttonContainer */}
        <CreateListButton />
      </div>
      <div className="grid grid-cols-3 gap-5 w-[650px] ml-[5%] mt-3 pt-5 pb-5 pr-5 pl-5">
        {" "}
        {/* grid */}
        {lists.map((list, index) => (
          <div
            key={index}
            onClick={() => goToList(list._id)}
            className="flex flex-col justify-center items-center rounded-md gap-2 bg-white p-2 cursor-pointer border-solid border-3 border-transparent hover:border-white hover:bg-zinc-800 transition-all duration-100"
          >
            <h3 className="font-bold line-clamp-2 overflow-hidden text-ellipsis text-sm pb-2">
              {list.name}
            </h3>
            <p className="text-xs">{list.items.length} Item(s)</p>
            <div className="flex items-center">
              {" "}
              {/* iconContainer - flex added */}
              <i
                className="fa-solid fa-trash text-base border-solid border-2 border-transparent p-1 mt-1 hover:border-white"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteList(list._id);
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[10%] mb-[3%]">
        {" "}
        {/* footerContainer */}
        <Footer />
      </div>
    </div>
  );
};

export default AllListsPage;
