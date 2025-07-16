import React from "react";
import Hero from "../Components/Hero";
import LiveStats from "../Components/LiveStats";
import MedicalTips from "../Components/MediTips";

function Home() {
  return (
    <div className="">
      <Hero />
      <LiveStats />
      <MedicalTips />
    </div>
  );
}

export default Home;
