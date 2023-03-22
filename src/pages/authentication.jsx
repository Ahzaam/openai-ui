import axios from "axios";
import { signInWithPopUp, getUser } from "../service/authentication";
import { redirect } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';
export default function Authentication() {
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
        console.log(user);
        navigate("/caption");
    }

    getUser().then((user) => {
        console.log(user);
    })

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