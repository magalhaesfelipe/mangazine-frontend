import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import Searchbar from "./components/searchbar/Searchbar";
import axios from "axios";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

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

  return (
    <div>
      <Header />
      <main>
        <h1 className="text-7xl m-0 p-0">Welcome to Mangazine</h1>
        <h2>Your favorite reads in one place</h2>
        <div className="mt-[50px] w-[600px]">
          <Searchbar placeholder="Search" />
        </div>
      </main>
      <div className="mt-[30%] mb-[3%]">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
