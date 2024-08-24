import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import classes from "./style.module.css";
import Searchbar from "../create-list/components/searchbar/Searchbar";
import axios from "axios";
import Header from "../../components/header/Header";

const CreateList = () => {
  const { user } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    userId: user?.id ?? "",
    name: "",
    titles: [],
  });

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
    const titles = selectedItems.map((item) => item._id);
    const finalFormData = { ...formData, titles };

    console.log("FormData being sent: ", finalFormData);

    try {
      const response = await axios.post(
        "http://localhost:2000/api/v1/lists/create-list",
        finalFormData
      );

      if (response.status === 201) {
        console.log("List created successfully");
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
        titles: [],
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
                placeholder="Search titles to add"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateList;
