import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DataContext from "./Providers/DataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataContext>
      <App />
    </DataContext>
  </StrictMode>
);
