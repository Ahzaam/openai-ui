import Authentication from "./pages/authentication";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import GetCaption from "./pages/generate";
import { useState, createContext, useEffect, useContext } from "react";
import { auth } from "./service/firebase";
import Home from "./pages/home";
import PrivateRoute from "./service/privateRoute";
import Payment from "./pages/payment";
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null);

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

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/payment" element={<Payment />} />

          <Route
            path="/caption"
            element={
              <PrivateRoute>
                <GetCaption />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
