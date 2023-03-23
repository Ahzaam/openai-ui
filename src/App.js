import "./App.css";
import Authentication from "./pages/authentication";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import GetCaption from "./pages/generate";
import { useState, createContext, useEffect } from "react";
import { getUser } from "./service/authentication";
import Home from "./pages/home";

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Router>
  
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/authentication" element={<Authentication />} />
              <Route path="/caption" element={<GetCaption />} />
            </Routes>
    
      </Router>
    </UserContext.Provider>
  );
}

export default App;
