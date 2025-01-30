import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import classes from "./style.module.css";
import Searchbar from "./components/searchbar/Searchbar";
import axios from "axios";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const CreateList = () => {
  const { user } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    userId: user?.id ?? "",
    name: "",
    items: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsUploading(true);

    // Update formData with selected titles' IDs
    const items = selectedItems.map((item) => ({
      itemId: item._id,
      itemModel: item.type,
    }));
    console.log("Selected items: ", items);

    const finalFormData = { ...formData, items };
    console.log("Form data to send: ", finalFormData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/lists`,
        finalFormData
      );

      const listId = response.data.data._id;
      console.log("This is the reponse data: ", response);
      console.log(response.data);
      if (response.status === 201) {
        console.log("List created successfully");
        navigate(`/list/${listId}`);
      } else {
        console.error("Failed to create list");
      }
    } catch (err) {
      console.error("Error creating list", err);
    }

    console.log("FormData sent: ", formData);

    if (user)
      setFormData({
        userId: user.id,
        name: "",
        items: [],
      });

    setSelectedItems([]); // Clear selected items
    setIsUploading(false);
  };

  return (
    <>
      <Header />
      <div className={classes.superContainer}>
        <div className={classes.container}>
          <div className={classes.title}>CREATE A NEW LIST</div>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.field}>
              <label htmlFor="" className={classes.nameLabel}>
                NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={classes.submitButton}>
              {isUploading ? "Creating List..." : "CREATE LIST"}
            </button>
            <div className={classes.searchBarContainer}>
              <Searchbar
                setSelectedItems={setSelectedItems}
                placeholder="Search Titles to add to the List"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateList;
