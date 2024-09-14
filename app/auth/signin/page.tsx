"use client";

import { SignInButton } from "@/components/auth/signin-button";
import Profile from "@/components/Profile";
import Spinner2 from "@/components/spinner2";
import { useSession } from "next-auth/react";
import React from "react";

const SignInPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner2 />;
  }

  if (session) {
    return (
      <div className="flex items-center justify-center gap-5 min-h-screen">
        <div className="">
          <Profile imageUrl={session.user?.image || ""} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SignInButton />
      </div>
    );
  }
};

export default SignInPage;
