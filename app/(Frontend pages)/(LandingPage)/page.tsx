import React from "react";
import Hero from "./_components/Hero";
import TechPage from "./_components/Tech";
import LatestCourses from "./_components/LatestCourses";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="">
      <Hero />
      <TechPage />
      <LatestCourses />
    </div>
  );
};

export default HomePage;
