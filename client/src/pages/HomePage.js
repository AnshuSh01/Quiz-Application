import React, { useState } from "react";
import Layout from "../Components/Layout";
import "../ComponentsCSS/homepage.css";

const HomePage = () => {
  return (
    <>
      {" "}
      <Layout>
        <div className="">
          <img className="image" src="front.jpg" alt="frontImage" />
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
