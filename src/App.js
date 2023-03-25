import Authentication from "./pages/authentication";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import GetCaption from "./pages/generate";
import { useState, createContext, useEffect, useContext } from "react";
import { auth } from "./service/firebase";
import Home from "./pages/home";
import { getUser } from "./service/authentication";
import Payment from "./pages/payment";
import Navbar from "./pages/navbar";
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(getUser().then((user) => user._delegate));

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        console.log("User is not signed in");
        setUser(null);
      }
    });
  }, [user]);

  if (!user) {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Router>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/caption" element={<GetCaption />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
