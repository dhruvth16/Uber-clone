import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ChooseRole from "./pages/ChooseRole.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import UserLogin from "./pages/UserLogin.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import UserContext from "./context/UserContext.jsx";
import { StrictMode } from "react";
import Home from "./pages/Home.jsx";
import CaptainDashboard from "./pages/CaptainDashboard.jsx";
import UserProtectedWrapper from "./pages/UserProtectedWrapper.jsx";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper.jsx";
import UserLogout from "./pages/UserLogout.jsx";
import CaptainLogout from "./pages/CaptainLogout.jsx";
import Riding from "./pages/Riding.jsx";
import CaptainRiding from "./pages/CaptainRiding.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
import SocketProvider from "./context/SocketIOContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <UserContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/chooseRole" element={<ChooseRole />} />
            <Route path="/userLogin" element={<UserLogin />} />
            <Route path="/captainLogin" element={<CaptainLogin />} />
            <Route path="/userSignup" element={<UserSignup />} />
            <Route path="/captainSignup" element={<CaptainSignup />} />
            <Route path="/riding" element={<Riding />} />
            <Route path="/captainRiding" element={<CaptainRiding />} />
            <Route
              path="/home"
              element={
                <UserProtectedWrapper>
                  <Home />
                </UserProtectedWrapper>
              }
            />
            {/* Wrap CaptainDashboard with CaptainContext */}
            <Route
              path="/captainDashboard"
              element={
                <CaptainContext>
                  <CaptainProtectedWrapper>
                    <CaptainDashboard />
                  </CaptainProtectedWrapper>
                </CaptainContext>
              }
            />
            <Route
              path="/userLogout"
              element={
                <UserProtectedWrapper>
                  <UserLogout />
                </UserProtectedWrapper>
              }
            />
            <Route
              path="/captainLogout"
              element={
                <CaptainProtectedWrapper>
                  <CaptainLogout />
                </CaptainProtectedWrapper>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserContext>
    </SocketProvider>
  </StrictMode>
);
