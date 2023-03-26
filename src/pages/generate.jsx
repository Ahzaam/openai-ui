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

      functions
        .httpsCallable("caption")({ keyword: inputVal, quote: true })
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
    <>
      <div
        className="bg-gray-100 h-2 overflow-hidden"
        style={{ height: "90vh" }}
      >
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
              >
                {processing ? <LoadingSVG /> : <SendSVG />}
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
                        <p className="text-gray-700">{cap}</p>
                      </div>
                      <div className="text-right mt-2">
                        <div className="ml-auto w-fit flex bg-gray-100 py-1 px-3 rounded-lg cursor-pointer">
                          <div className="pb-2 mx-2">Copy</div>{" "}
                          <div className=" mt-1  ">
                            <CopySVG />
                          </div>
                        </div>
                      </div>
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

function CopySVG() {
  return (
    <>
      <svg
        fill="#000000"
        height="20px"
        width="20px"
        version="1.1"
        className="mx-auto"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 64 64"
        enable-background="new 0 0 64 64"
        xmlSpace="preserve"
      >
        <g id="Text-files">
          <path
            d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228
      C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999
      c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64
      h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002
      C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228
      c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999
      c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z
       M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699
      c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946
      c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999
      h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"
          />
          <path
            d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005
      c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997
      C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"
          />
          <path
            d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986
      c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016
      C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"
          />
          <path
            d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997
      s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997
      S39.16465,29.4603004,38.6031494,29.4603004z"
          />
          <path
            d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997
      s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997
      S29.0059509,37.5872993,28.4444485,37.5872993z"
          />
        </g>
      </svg>
    </>
  );
}

function LoadingSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 135 140"
      fill="#fff"
    >
      <rect y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.5s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.5s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="30" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.25s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.25s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="60" width="15" height="140" rx="6">
        <animate
          attributeName="height"
          begin="0s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="90" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.25s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.25s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="120" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.5s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.5s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}

function SendSVG() {
  return (
    <svg
      fill="#fff"
      height="20px"
      width="20px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 491.022 491.022"
      xmlSpace="preserve"
    >
      <g>
        <g>
          <path
            d="M490.916,13.991c-0.213-1.173-0.64-2.347-1.28-3.307c-0.107-0.213-0.213-0.533-0.32-0.747
       c-0.107-0.213-0.32-0.32-0.533-0.533c-0.427-0.533-0.96-1.067-1.493-1.493c-0.427-0.32-0.853-0.64-1.28-0.96
       c-0.213-0.107-0.32-0.32-0.533-0.427c-0.32-0.107-0.747-0.32-1.173-0.427c-0.533-0.213-1.067-0.427-1.6-0.533
       c-0.64-0.107-1.28-0.213-1.92-0.213c-0.533,0-1.067,0-1.6,0c-0.747,0.107-1.493,0.32-2.133,0.533
       c-0.32,0.107-0.747,0.107-1.067,0.213L6.436,209.085c-5.44,2.347-7.893,8.64-5.547,14.08c1.067,2.347,2.88,4.373,5.227,5.44
       l175.36,82.453v163.947c0,5.867,4.8,10.667,10.667,10.667c3.733,0,7.147-1.92,9.067-5.12l74.133-120.533l114.56,60.373
       c5.227,2.773,11.627,0.747,14.4-4.48c0.427-0.853,0.747-1.813,0.96-2.667l85.547-394.987c0-0.213,0-0.427,0-0.64
       c0.107-0.64,0.107-1.173,0.213-1.707C491.022,15.271,491.022,14.631,490.916,13.991z M190.009,291.324L36.836,219.218
       L433.209,48.124L190.009,291.324z M202.809,437.138V321.831l53.653,28.267L202.809,437.138z M387.449,394.898l-100.8-53.013
       l-18.133-11.2l-0.747,1.28l-57.707-30.4L462.116,49.298L387.449,394.898z"
          />
        </g>
      </g>
    </svg>
  );
}
