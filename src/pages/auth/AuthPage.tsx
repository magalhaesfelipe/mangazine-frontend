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
          <div className="absolute top-[30%] left-[39%] flex items-center justify-center flex-col">
            <div className="flex flex-col items-center justify-center text-white m-2 w-[250px]">
              <h2>Sign in</h2>
              <SignInButton mode="modal" />
            </div>
            <div className="flex flex-col items-center justify-center text-white m-2 w-[250px]">
              <h3 className="pt-[45px] border-t-2">Create a New Account</h3>
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
