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
                  if (!processing) {
                    genCaption(e);
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-bold py-1 h-9 w-28 text-center px-4 ml-2 rounded"
              >
                {processing ? <LoadingSVG /> : "Generate"}
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

function LoadingSVG2() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="135"
      height="135"
      viewBox="0 0 135 135"
      fill="#00ddff"
    >
      <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 67 67"
          to="-360 67 67"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </path>
      <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 67 67"
          to="360 67 67"
          dur="8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
