import React, { useEffect } from "react";

export const DataProvider = React.createContext();

const DataContext = ({ children }) => {
  const [data, setData] = React.useState("test result");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }
  console.log("Data fetched:", data);

  const values = {
    data,
    setData,
  };

  return (
    <DataProvider.Provider value={values}>{children}</DataProvider.Provider>
  );
};

export default DataContext;
