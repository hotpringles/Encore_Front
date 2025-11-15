import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { Query, QueryClient, QueryClientProvider } from "@tanstack/react/-query";
import "./styles/index.css";
import App from "./App.jsx";

const QueryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <QueryClientProvider client={QueryClient}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </QueryClientProvider> */}
  </StrictMode>
);
