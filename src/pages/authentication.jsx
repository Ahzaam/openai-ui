// import axios from "axios";
import { signInWithPopUp } from "../service/authentication";
import { Button, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
// import { useNavigate } from 'react-router-dom';

// import { functions } from "../service/firebase";
export default function Authentication() {


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
               
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                     <h1 className="text-3xl font-bold mb-6">Login To Continue</h1>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={google_auth}
                        startIcon={<GoogleIcon />}
                    >
                        Sign in with Google
                    </Button>
                </Box>
            </div>


        </>
    )

}