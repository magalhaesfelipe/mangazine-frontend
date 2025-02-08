import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect } from "react";

export const Auth = () => {
  return (
    <>
      <div className="flex items-center justify-center flex-col relative">
        <Header />
        <SignedOut>
          <div className="absolute top-[40%] left-[50%] flex items-center justify-center flex-col">
            <div className="flex flex-col items-center justify-center text-white m-2 w-[250px]">
              <SignInButton mode="modal" />
            </div>
            <div className="flex flex-col items-center justify-center text-white m-2 w-[250px]">
              <SignUpButton mode="modal" />
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div>
            <UserButton />
          </div>
          <Navigate to="/home" />
        </SignedIn>
      </div>
    </>
  );
};
