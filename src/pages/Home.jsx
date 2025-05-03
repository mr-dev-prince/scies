import React from "react";
import Landing from "../components/Landing";
import AboutCouncil from "../components/AboutCouncil";
import CouncilInitiative from "../components/CouncilInitiative";

const Home = () => {
  return (
    <div className="font-sans min-h-screen">
      <Landing />
      <AboutCouncil/>
      <CouncilInitiative />
    </div>
  );
};

export default Home;
