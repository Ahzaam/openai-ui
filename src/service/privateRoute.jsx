
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { auth } from "../service/firebase";
import { getUser } from '../service/authentication';

function PrivateRoute({ children }) {

    const [user, setUser] = useState(getUser().then((user) => user._delegate));

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                console.log(user);
                setUser(user);
            } else {
                // User is signed out
                console.log('User is not signed in');
                setUser(null);
            }
        });
    });

    if (!user) {
        return <Navigate to="/authentication" replace />
    }
    return children
}


export default PrivateRoute;