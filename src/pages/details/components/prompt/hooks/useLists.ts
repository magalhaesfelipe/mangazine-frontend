import { useState, useEffect } from "react";
import axios from "axios";

export const useLists = (userId: any, titleId: any) => {
  const [lists, setLists] = useState([]);
  const [itemExistsArray, setItemExistsArray] = useState({});

  useEffect(() => {
    if (!userId || !titleId) return;

    const fetchListsAndCheckTitles = async () => {
      try {
        // Fetch all lists
        const response = await axios.get(
          `http://localhost:2000/api/v1/lists/get-all-lists/${userId}`
        );
        const fetchedLists = response.data.lists;
        setLists(fetchedLists);

        // Check if the title exists in each list
        const titleExistsObj: any = {};
        await Promise.all(
          fetchedLists.map(async (list: any) => {
            const existsResponse = await axios.get(
              `http://localhost:2000/api/v1/lists/${list._id}/titles/${titleId}/exists`
            );
            titleExistsObj[list._id] = existsResponse.data.exists;
          })
        );
        setItemExistsArray(titleExistsObj);
      } catch (error) {
        console.error(
          "Error fetching lists or checking title existence: ",
          error
        );
      }
    };

    fetchListsAndCheckTitles();
  }, [userId, titleId]);

  return { lists, itemExistsArray, setItemExistsArray };
};
