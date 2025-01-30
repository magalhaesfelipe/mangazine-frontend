import Header from "../../components/Header";
import ElementCard from "../../components/element-card/ElementCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import Footer from "../../components/Footer";

const Readlist = () => {
  const { isSignedIn, user } = useUser();
  const [readlist, setReadlist] = useState([]);

  const userId = user?.id;
  const items = readlist?.items;

  console.log("This is the user id: ", userId);

  useEffect(() => {
    const fetchItems = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/readlists/${userId}`
          );
          console.log("😎THIS is the READLIST PAGE response: ", response);
          setReadlist(response.data.data);
        } catch (err) {
          console.error(`Failed to fetch Readlist. Error message: ${err}`);
        }
      } else {
        console.log("USER NOT FOUND");
      }
    };

    fetchItems();
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex justify-center mt-[15%] mb-0">
        {" "}
        {/* headline */}
        <p className="text-[50px] inline text-white font-audiowide">
          READLIST
        </p>{" "}
        {/* Font added */}
      </div>
      <main className="mt-[5%] bg-black w-[90%] grid grid-cols-4 gap-y-10 gap-x-20 justify-center">
        {" "}
        {/* contentGrid */}
        {items && items.length > 0 ? (
          items.map((item, index) => <ElementCard key={index} item={item} />)
        ) : (
          <div className="text-white">NO ITEMS IN THE READLIST</div>
        )}
      </main>
      <div className="mt-[10%] mb-[3%]">
        {" "}
        {/* footerContainer */}
        <Footer />
      </div>
    </div>
  );
};

export default Readlist;
