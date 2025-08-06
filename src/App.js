import React, { useRef, useState, useEffect } from "react";
// import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Musicians from "./components/Musicians";
import Create from "./components/Create";
import { useLocalStorage } from "./components/useLocalStorage";
import Bands from "./components/Bands";
import ProfilePage from "./pages/ProfilePage";
import MusicianProfile from "./pages/MusicianProfile";
import BandProfile from "./pages/BandProfile";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const { children } = props;
  const [token, setToken] = useLocalStorage("token");
  return (
    <AuthContext.Provider value={[token, setToken]}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/musicians/:id_usuario" element={<MusicianProfile />} />
            <Route path="/musicians" element={<Musicians />} />
            <Route path="/bands/:id_usuario" element={<BandProfile />} />
            <Route path="/bands" element={<Bands />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
