import axios from "axios";

import {
    UserContext
} from '../App';
import { auth } from '../service/firebase';
import { useNavigate } from 'react-router-dom';
import { useState, useContex, useRef, useEffect } from "react";
import { handleLogout } from '../service/authentication';

export default function GetCaption({ customer }) {

    const [processing, setProcessing] = useState(false);
    const [caption, setCaption] = useState(null);
    const [tags, setTags] = useState([]);
    const [inputVal, setInputVal] = useState("");
    const [fetchError, setFetchError] = useState(false);

    const quoteElement = useRef(null);
    const emojiElement = useRef(null);
    //     const user = useContext(UserContext);

    //    console.log(user);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("rendering");


    });

    const genCaption = (e) => {

        e.preventDefault();
        console.log("Quote status : " + quoteElement.current.checked);

        setCaption(null);
        if (inputVal !== "") {
            setProcessing(true);

            axios.post('https://openai-fiver.vercel.app/', {
                keywords: inputVal,
                quote: quoteElement.current.checked,
                emoji: emojiElement.current.checked,
            }).then((response) => {


                let { data } = response;
                let reg = /#[a-z]+/gi;
                let derivedTags = data.result.content.match(reg);
                setTags(derivedTags);
                setCaption(data.result.content);

            }).catch((error) => {
                setFetchError(true);
                console.log(error);
            })
                .finally(() => {
                    setProcessing(false);
                });

        }
        else {
            alert("Please Type Something before submitting!");
        }


    }

    return (
        <div className="grid h-screen place-items-center container mx-auto">
            <div className="w-1/4 ">

                {fetchError && <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
                    <p className="font-bold">Error Message</p>
                    <p className="text-sm">Could Not Generate. Please Try Again.</p>
                </div>}

                {caption &&

                    <div className="shadow-lg my-4">

                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Caption</div>
                            <p className="text-gray-700 text-base">
                                {caption}                    </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            {tags.length > 0 && tags.map((el, ind) =>
                                <span key={ind} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{el}</span>


                            )}
                        </div>
                    </div>
                }



                <form>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">

                        <div className="px-4 py-2 bg-white rounded-t-lg ">
                            <label className="sr-only">Your Keywords</label>
                            <textarea
                                value={inputVal}
                                onChange={(e) => { setInputVal(e.target.value); setFetchError(false) }}

                                id="comment" rows="4" className="w-full outline-none px-0 text-sm text-gray-900 bg-white border-0  focus:ring-0 " placeholder="Your Keywords..." required></textarea>
                        </div>


                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                            <label>
                                <input type="checkbox" ref={quoteElement} /> Include Quote
                            </label>

                        </div>
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                            <label>
                                <input type="checkbox" ref={emojiElement} /> Include Emoji
                            </label>
                        </div>


                        <div className="flex items-center justify-between px-3 py-2 border-t ">

                            <button
                                onClick={(e) => {

                                    genCaption(e);
                                }}


                                type="submit" className=" py-2 px-3 rounded bg-[#34eb49] text-gray-50 hover:bg-gradient-to-r hover:from-[#1ba62a] hover:to-[#1ba62a]"
                                style={{ backgroundColor: processing ? 'rgb(235,235,228)' : '' }} disabled={processing} >



                                {(!processing) && <>Generate</>}

                                {(caption === null && processing) && <>
                                    <div className="text-center">
                                        <div role="status">
                                            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </>}




                            </button>

                        </div>

                    </div>
                </form>



                <button
                    onClick={handleLogout}
                    type="submit" className=" items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200  hover:bg-red-800">
                    Logout
                </button>
            </div>
        </div>
    )

}