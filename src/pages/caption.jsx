// import { useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import { functions } from "../service/firebase";
import { SendSVG, CopySVG, LoadingSVG } from "../components/SVG";
import { Alert, Snackbar } from "@mui/material";
import { UserContext } from "../App";
import "../css/caption.css";

export default function GetCaption({ customer }) {
  const [processing, setProcessing] = useState(false);
  const [captionArr, setCaptionArr] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [fetchError, setFetchError] = useState(false);

  const user = useContext(UserContext);
  //     const user = useContext(UserContext);

  //    console.log(user);
  // const navigate = useNavigate();

  const genCaption = (e) => {
    e.preventDefault();
    if (inputVal !== "") {
      setProcessing(true);

      functions
        .httpsCallable("caption")({
          keyword: inputVal,
          user: user?.uid,
          quote: true,
        })
        .then((response) => {
          let { data } = response;

          setCaptionArr([...captionArr, data.content]);

          setInputVal("");
        })
        .catch((error) => {
          console.log(error);
          setFetchError(true);
        })
        .finally(() => {
          setProcessing(false);
        });
    } else {
      alert("Please Type Something before submitting!");
    }
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFetchError(false);
  };
  return (
    <>
      <div
        className="bg-gray-100 h-2 overflow-hidden"
        style={{ height: "90vh" }}
      >
        <Snackbar
          open={fetchError}
          autoHideDuration={5000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity="error"
            sx={{ width: "100%" }}
          >
            Failed To Generate!
          </Alert>
        </Snackbar>

        <div className=" p-4 rounded-lg   max-w-4xl mx-auto ">
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full pb-9 px-5  max-w-4xl">
            <div className="flex items-center rounded-lg border bg-white border-gray-400 pl-3 pr-1  py-1">
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
                  if (!processing) {
                    genCaption(e);
                  }
                }}
                className="bg-blue-600 flex items-center justify-center font-bold py-1 h-9 w-14 text-center px-4 ml-2 rounded"
                disabled={processing}
              >
                {processing ? <LoadingSVG /> : <SendSVG />}
              </button>
            </div>
          </div>
          <div className=" p-4 rounded-lg text-center my-4 flex flex-col min-h-full bg-white">
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
            {true && (
              <div
                className={`mx-auto max-w-3xl text-left overflow-hidden ${
                  captionArr.length > 0 ? "fade-out" : "fade-in"
                }`}
                style={{
                  height: "50vh",
                }}
              >
                <div className="bg-white rounded-lg shadow-md p-4 mb-3 fade-in">
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
                    #FindYourZen #GetOutside #TakeAHike #ExploreMore
                    #SerenityNow
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 mb-3 md:block hidden fade-in">
                  <p className="text-gray-700 font-bold mb-2">
                    "Share a photo of your favorite book and write a caption
                    about what it means to you."
                  </p>
                  <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
                    <p className="text-gray-700">
                      This book is one of my all-time favorites. It's a reminder
                      that even in the darkest of times, there is always hope.
                      The characters are so well-developed and the plot twists
                      kept me on the edge of my seat. I could read this book
                      over and over and never get tired of it. 📖✨
                    </p>
                  </div>
                  <p className="text-gray-700 mt-2 bg-gray-100 rounded-md p-3">
                    #BookLoversUnite #MustRead #PageTurner #BookObsessed
                    #ReadMore #EscapeReality
                  </p>
                </div>
              </div>
            )}

            {/*  Output Display */}

            {captionArr.length > 0 && (
              <div
                className={`mx-auto max-w-3xl text-left overflow-y-auto
              `}
                style={{
                  height: "50vh",
                }}
              >
                {captionArr.map((cap, ind) => {
                  if (cap === null || cap === "") {
                    return <></>;
                  }
                  return (
                    <div
                      className="bg-gray-50 rounded-lg shadow-md p-4 mb-3 fade-in"
                      key={ind}
                    >
                      <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
                        <p
                          id={"captionID-" + ind}
                          className="text-gray-700"
                          aria-label="copy-text"
                        >
                          {cap}
                        </p>
                      </div>
                      {/* COPY BUTTON */}
                      <div
                        className="text-right mt-2"
                        onClick={(e) => {
                          var text = document.querySelector(
                            "#captionID-" + ind
                          ).textContent;
                          navigator.clipboard.writeText(text);
                          document.querySelector(
                            "#copybtn-" + ind
                          ).textContent = "Copied!";
                          setTimeout(() => {
                            document.querySelector(
                              "#copybtn-" + ind
                            ).textContent = "Copy";
                          }, 2000);
                        }}
                      >
                        <div className="ml-auto w-fit flex bg-gray-100 py-1 px-3 rounded-lg cursor-pointer">
                          <div id={"copybtn-" + ind} className="pb-2 mx-2">
                            Copy
                          </div>{" "}
                          <div className=" mt-1  ">
                            <CopySVG />
                          </div>
                        </div>
                      </div>

                      {/* --------------- */}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
