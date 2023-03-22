import axios from "axios";
import { signInWithPopUp, getUser } from "../service/authentication";
import { redirect } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';

import { functions } from "../service/firebase";
export default function Authentication() {
    functions.httpsCallable('helloWorld')({keword:'hi hello world'}).then((response) => {
        console.log(response)
    })
    // axios.post('https://openai-fiver.vercel.app/', {
    //     keywords: 'ahzam, pilot'
    // }).then((response) => {
    //     console.log(response);
    // }).catch((error) => {
    //     console.log(error.response);
    // })

    const navigate = useNavigate();
    const google_auth = async () => {
        signInWithPopUp();
        const user = await getUser();
        
        navigate("/caption");
    }

   

    return (
        <>

            <button
                onClick={google_auth}
                type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">
                Google Login
            </button>

        </>
    )

}