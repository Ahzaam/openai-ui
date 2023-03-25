import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { functions } from "../service/firebase";
import "../css/caption.css";
export default function GetCaption({ customer }) {
  const [processing, setProcessing] = useState(false);
  const [captionArr, setCaptionArr] = useState([]);
  const [inputVal, setInputVal] = useState("");

  //     const user = useContext(UserContext);

  //    console.log(user);
  // const navigate = useNavigate();

  useEffect(() => {
    console.log("rendering");

  });

  const genCaption = (e) => {
    e.preventDefault();
    if (inputVal !== "") {
      setProcessing(true);

      functions.httpsCallable('caption')({ keyword: inputVal, quote: true })
        .then((response) => {

          let { data } = response;

          setCaptionArr([...captionArr, data.content]);
          console.log(captionArr);
          setInputVal("");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setProcessing(false);
        });
    } else {
      alert("Please Type Something before submitting!");
    }
  };

  return (
    // <div className="grid h-screen place-items-center container mx-auto">
    //     <div className="w-1/4 ">

    //         {fetchError && <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
    //             <p className="font-bold">Error Message</p>
    //             <p className="text-sm">Could Not Generate. Please Try Again.</p>
    //         </div>}

    //         {caption &&

    //             <div className="shadow-lg my-4">

    //                 <div className="px-6 py-4">
    //                     <div className="font-bold text-xl mb-2">
    //                         <span>Caption</span>
    //                         <button
    //                         onClick={(e)=>{
    //                             navigator.clipboard.writeText(caption);
    //                             e.target.textContent = "Copied!";
    //                             e.target.disabled = true;
    //                         }}
    //                         className="bg-transparent hover:bg-black hover:text-slate-50 text-xs text-black font-bold py-1 px-2 inline-flex items-center border border-black float-right">
    //                             <svg className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
    //                                 <path d="M5 10H3a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-2h-2v2H3v-6h2v2h2v-2zM17 6h-6a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2z" />
    //                             </svg>
    //                             Copy
    //                         </button>

    //                     </div>

    //                     <p className="text-gray-700 text-base my-2">
    //                         {caption}                    </p>
    //                 </div>
    //                 <div className="px-6 pt-4 pb-2">
    //                     {tags.length > 0 && tags.map((el, ind) =>
    //                         <span key={ind} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{el}</span>

    //                     )}
    //                 </div>
    //             </div>
    //         }

    //         <form>
    //             <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">

    //                 <div className="px-4 py-2 bg-white rounded-t-lg ">
    //                     <label className="sr-only">Your Keywords</label>
    //                     <textarea
    //                         value={inputVal}
    //                         onChange={(e) => { setInputVal(e.target.value); setFetchError(false) }}

    //                         id="comment" rows="4" className="w-full outline-none px-0 text-sm text-gray-900 bg-white border-0  focus:ring-0 " placeholder="Your Keywords..." required></textarea>
    //                 </div>

    //                 <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
    //                     <label>
    //                         <input type="checkbox" ref={quoteElement} /> Include Quote
    //                     </label>

    //                 </div>
    //                 <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
    //                     <label>
    //                         <input type="checkbox" ref={emojiElement} /> Include Emoji
    //                     </label>
    //                 </div>

    //                 <div className="flex items-center justify-between px-3 py-2 border-t ">

    //                     <button
    //                         onClick={(e) => {

    //                             genCaption(e);
    //                         }}

    //                         type="submit" className=" py-2 px-3 rounded bg-[#34eb49] text-gray-50 hover:bg-gradient-to-r hover:from-[#1ba62a] hover:to-[#1ba62a]"
    //                         style={{ backgroundColor: processing ? 'rgb(235,235,228)' : '' }} disabled={processing} >

    //                         {(!processing) && <>Generate</>}

    //                         {(caption === null && processing) && <>
    //                             <div className="text-center">
    //                                 <div role="status">
    //                                     <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                                         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
    //                                         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    //                                     </svg>
    //                                     <span className="sr-only">Loading...</span>
    //                                 </div>
    //                             </div>
    //                         </>}

    //                     </button>

    //                 </div>

    //             </div>
    //         </form>

    //         <button
    //             onClick={handleLogout}
    //             type="submit" className=" items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200  hover:bg-red-800">
    //             Logout
    //         </button>
    //     </div>
    // </div>

    <>
      <div className="bg-gray-100 h-2 overflow-hidden" style={{ height: '88vh' }} >
        <div className=" p-4 rounded-lg   max-w-4xl mx-auto ">
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full pb-9 px-5  max-w-4xl">
            <div className="flex items-center rounded-lg border bg-white border-gray-400 px-3 py-1">
              <input
                type="text"
                placeholder="Type a prompt"
                className="w-full focus:outline-none"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                }}
              />
              <button
                onClick={(e) => {
                  genCaption(e);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 ml-2 rounded"
              >
                Generate
              </button>
            </div>
          </div>
          <div className=" p-4 rounded-lg text-center my-4 flex flex-col min-h-full bg-white">
            <h2 className="font-bold mb-2 text-2xl">
              AI Social Media Caption Writing
            </h2>
            <p className="text-gray-700 mb-4">
              Our website's AI feature can help you write captivating and
              effective captions for your social media posts. Say goodbye to
              writer's block and hello to more engagement!
            </p>
          </div>
          <div
            className=" p-4 rounded-lg text-center flex flex-col min-h-full bg-white"
            style={{ minHeight: "68vh" }}
          >
            {true && <div
              className={`mx-auto max-w-3xl text-left overflow-y-auto ${captionArr.length > 0 || processing ? "fade-out" : ""
                }`}
              style={{
                height: '50vh'
              }}
            >
              <div className="bg-white rounded-lg shadow-md p-4 mb-3">
                <p className="text-gray-700 font-bold mb-2">
                  "Share a photo of your favorite outdoor spot and write a
                  caption about why you love spending time in nature."
                </p>
                <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
                  <p className="text-gray-700">
                    #NatureLovers unite! This spot is where I go to unwind and
                    connect with the earth. The sounds of the birds and the
                    rustle of the leaves calm my mind and remind me of what's
                    important. 🌿🌱🍃
                  </p>
                </div>
                <p className="text-gray-700 mt-2 bg-gray-100 rounded p-3">
                  #FindYourZen #GetOutside #TakeAHike #ExploreMore #SerenityNow
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 mb-3 md:block hidden">
                <p className="text-gray-700 font-bold mb-2">
                  "Share a photo of your favorite book and write a caption about
                  what it means to you."
                </p>
                <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
                  <p className="text-gray-700">
                    This book is one of my all-time favorites. It's a reminder
                    that even in the darkest of times, there is always hope. The
                    characters are so well-developed and the plot twists kept me
                    on the edge of my seat. I could read this book over and over
                    and never get tired of it. 📖✨
                  </p>
                </div>
                <p className="text-gray-700 mt-2 bg-gray-100 rounded-md p-3">
                  #BookLoversUnite #MustRead #PageTurner #BookObsessed #ReadMore
                  #EscapeReality
                </p>
              </div>
            </div>}

            {/*  Output Display */}

            {captionArr.length > 0 && <div
              className={`mx-auto max-w-3xl text-left overflow-y-auto
              `}
              style={{
                height: '50vh'
              }}
            >


              {captionArr.map((cap, ind) => {

                if (cap === null || cap === "") {
                  return <></>
                }
                return (
                  <div className="bg-white rounded-lg shadow-md p-4 mb-3" key={ind}>
                    <div className="flex items-center justify-between bg-gray-100 rounded-md p-3" >
                      <p className="text-gray-700">
                        {cap}
                      </p>
                    </div>
                  </div>
                )
              })}



            </div>
            }


          </div>
        </div>
      </div>
    </>
  );
}
