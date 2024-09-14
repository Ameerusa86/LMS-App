import React from "react";
import Hero from "./_components/Hero";
import TechPage from "./_components/Tech";
import LatestCourses from "./_components/LatestCourses";
import { auth } from "@/auth";
import LoginPage from "@/app/auth/signin/page";

type Props = {};

const HomePage = async (props: Props) => {
  const session = await auth();

  if (session) {
    return (
      <div className="">
        <Hero />
        <TechPage />
        <LatestCourses />
      </div>
    );
  } else {
    return <LoginPage />;
  }
};

export default HomePage;
