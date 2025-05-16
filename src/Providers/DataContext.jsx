import React from "react";

export const DataProvider = React.createContext();

const DataContext = ({ children }) => {
  const [data, setData] = React.useState("test result");

  const values = {
    data,
    setData,
  };

  return (
    <DataProvider.Provider value={values}>{children}</DataProvider.Provider>
  );
};

export default DataContext;
