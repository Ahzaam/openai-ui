// import axios from "axios";
import { signInWithPopUp } from "../service/authentication";

// import { useNavigate } from 'react-router-dom';

// import { functions } from "../service/firebase";
export default function Authentication( ) {


    // functions.httpsCallable('helloWorld')({ keword: 'hi hello world', quote: true }).then((response) => {
    //     console.log(response)
    // })
    // axios.post('https://openai-fiver.vercel.app/', {
    //     keywords: 'ahzam, pilot'
    // }).then((response) => {
    //     console.log(response);
    // }).catch((error) => {
    //     console.log(error.response);
    // })

    // const navigate = useNavigate();
    const google_auth = async () => {
        signInWithPopUp();
       
    }



    return (
        <>

            <div className="bg-white p-10 rounded shadow-md flex flex-col justify-center items-center h-screen">
                <h1 className="text-3xl font-bold mb-6">Login To Continue</h1>

                <button onClick={google_auth} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign In with Google
                </button>

            </div>


        </>
    )

}