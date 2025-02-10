import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import Searchbar from "./components/Searchbar";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import image from "../../assets/img.png";

const Home = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const checkAndCreateUser = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${user.id}`
          );

          console.log("User already exists: ", response.data);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log("User does not exists, creating a new one...");
            const userData = {
              userId: user.id,
              email: user.emailAddresses[0].emailAddress,
              name: user.username,
            };

            try {
              const createUser = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/`,
                userData
              );

              if (createUser.status === 201) {
                console.log("User created successfully");
              } else {
                console.error("Failed to create user");
              }
            } catch (creationError) {
              console.error("Error creating user: ", creationError);
            }
          } else {
            console.error("Error checking user existence: ", error);
          }
        }
      };

      checkAndCreateUser();
    }
  }, [user]);

  /* 
This sets a background image in the div element
<div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "",
        backgroundRepeat: "no-repeat",
        minHeight: "calc(100vh - 100px)",
      }}
    >
*/

  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        <main className="flex flex-col mt-10 justify-center items-center">
          <h1 className="text-5xl mb-10 p-0 text-gray-400 font-sans font-light">
            WELCOME
          </h1>
          <div className="">
            <Searchbar placeholder="Search titles here" />
          </div>
        </main>
        <div className="mt-[30%] mb-[3%]"></div>
      </div>
      <div className="flex flex-col mt-70">
        {" "}
        <div className="flex-grow"></div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
