import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import GetCaption from "./pages/generate";
import { useState, createContext, useEffect } from "react";
import { auth } from "./service/firebase";
import Home from "./pages/home";
import { getUser } from "./service/authentication";
import Payment from "./pages/payment";
import Navbar from "./pages/navbar";
import { isLoggedIn } from "./service/authentication";
import Profile from "./pages/profile";

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(getUser().then((user) => user));

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        await isLoggedIn().then((res) => {
          setUser(res);
        });
      } else {
        // User is signed out
        console.log("User is not signed in");
        setUser(null);
      }
    });
  }, [user]);

  if (!user) {
    return (
      <Router forceRefresh={true}>
        <Navbar isAuth={user} />
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </Router>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <Router forceRefresh={true}>
        <Navbar isAuth={user} />
        <Routes>
          <Route path="/caption" element={<GetCaption />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile isAuth={user} />} />

          <Route path="/*" element={<Home />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
