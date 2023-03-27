import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import GetCaption from "./pages/caption";
import { useState, createContext, useEffect } from "react";
import { auth } from "./service/firebase";
import Home from "./pages/home";
import Authenticate from './pages/authentication';
import { getUser } from "./service/authentication";
import Payment from "./pages/payment";
import Navbar from "./pages/navbar";
import { isLoggedIn } from "./service/authentication";
import Profile from "./pages/profile";
import GenEbook from "./pages/ebook";
import BlogPost from "./pages/blogpost";
import { getSubscriptionData } from "./service/database";

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(getUser().then((user) => user));
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        await isLoggedIn().then((res) => {
          setUser(res);
        });
        getSubscriptionData(user.uid).then((data) => {

          if (data.data[0]?.status === "active") {
            setPremium(true);
          }

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
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Authenticate />} />
        </Routes>
      </Router>
    );
  }
  if (user && !premium) {
    return (
      <Router forceRefresh={true}>
        <Navbar isAuth={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile isAuth={user} />} />
          <Route path="/*" element={<Payment />} />
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
          <Route path="/ebook" element={<GenEbook />} />
          <Route path="/blogpost" element={<BlogPost />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile isAuth={user} />} />

          <Route path="/*" element={<Home />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
