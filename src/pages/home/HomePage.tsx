import classes from "./style.module.css";
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
          const checkUser = await axios.get(
            `http://localhost:2000/api/v1/user/exists/${user.id}`
          );
          const checkData = checkUser.data;

          // USER DOES NOT EXIST, CREATE NEW USER
          if (!checkData.exists) {
            const userData = {
              userId: user.id,
              email: user.emailAddresses[0].emailAddress,
              userName: user.username,
            };

            const createUser = await axios.post(
              "http://localhost:2000/api/v1/user/signup",
              userData
            );

            if (createUser.status === 200) {
              console.log("User created successfully");
            } else {
              console.error("Failed to create user");
            }
          } else {
            console.log("User already exists");
          }
        } catch (err) {
          console.error("Error checking or creating user", err);
        }
      };

      checkAndCreateUser();
    }

    document.body.classList.add(classes.bodyStyle);

    return () => {
      document.body.classList.remove(classes.bodyStyle);
    };
  }, [user]);

  return (
    <div>
      <Header />
      <main>
        <h1 className={classes.name}>MANGAZINE</h1>
        <h2>Your favorite reads in one place</h2>
        <div className={classes.searchBarContainer}>
          <Searchbar placeholder="Search" />
        </div>
      </main>
      <div className={classes.footerContainer}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
