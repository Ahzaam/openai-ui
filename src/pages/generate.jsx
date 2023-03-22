import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from '../service/firebase';
import { useNavigate } from 'react-router-dom';

export default function GetCaption() {
    const navigate = useNavigate();

    axios.post('https://openai-fiver.vercel.app/', {
        keywords: 'ahzam, pilot'
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error.response);
    })
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <>

            <form>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                    <div className="px-4 py-2 bg-white rounded-t-lg ">
                        <label className="sr-only">Your comment</label>
                        <textarea id="comment" rows="4" className="w-full outline-none px-0 text-sm text-gray-900 bg-white border-0  focus:ring-0 " placeholder="Write a comment..." required></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t ">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">
                            Post comment
                        </button>

                    </div>
                    <button 
                    onClick={handleLogout}
                    type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200  hover:bg-red-800">
                        Logout
                    </button>
                </div>
            </form>
            <p className="ml-auto text-xs text-gray-500 ">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600  hover:underline">Community Guidelines</a>.</p>

        </>
    )

}