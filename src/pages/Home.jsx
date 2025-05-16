import React, { useContext } from "react";
import { DataProvider } from "../Providers/DataContext";

const Home = () => {
  const { data } = useContext(DataProvider);
  console.log(data); // This will log the data from the context

  return <div>This is the home page</div>;
};

export default Home;
