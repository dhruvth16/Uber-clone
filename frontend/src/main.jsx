// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import UserLogin from "./pages/UserLogin.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import UserContext from "./context/UserContext.jsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/captainLogin" element={<CaptainLogin />} />
          <Route path="/userSignup" element={<UserSignup />} />
          <Route path="/captainSignup" element={<CaptainSignup />} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  </StrictMode>
);
