import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { handleLogout } from "../service/authentication";
import { functions } from "../service/firebase";
import "../css/caption.css";
export default function GenEbook({ customer }) {
  const [processing, setProcessing] = useState(false);
  const [caption, setCaption] = useState(null);
  const [tags, setTags] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [fetchError, setFetchError] = useState(false);

  const quoteElement = useRef(null);
  const emojiElement = useRef(null);
  //     const user = useContext(UserContext);

  //    console.log(user);
  // const navigate = useNavigate();

  useEffect(() => {
    console.log("rendering");

    // functions.httpsCallable('helloWorld')({ keword: 'hi hello world', quote: true }).then((response) => {
    //     console.log(response)
    // });
  });

  const genCaption = (e) => {
    e.preventDefault();

    console.log("Quote status : " + quoteElement.current.checked);
    setFetchError(false);
    setCaption(null);
    if (inputVal !== "") {
      setProcessing(true);

      //   axios
      //     .post("https://openai-fiver.vercel.app/", {
      //       keywords: inputVal,
      //       quote: quoteElement.current.checked,
      //       emoji: emojiElement.current.checked,
      //     })
      //     .then((response) => {
      //       let { data } = response;
      //       let reg = /#[a-z]+/gi;
      //       let derivedTags = data.result.content.match(reg);
      //       setTags(derivedTags);
      //       setCaption(data.result.content);
      //     })
      //     .catch((error) => {
      //       setFetchError(true);
      //       console.log(error);
      //     })
      //     .finally(() => {
      //       setProcessing(false);
      //     });
    } else {
      alert("Please Type Something before submitting!");
    }
  };

  return (
    <>
      <div className="bg-gray-100 " style={{ minHeight: "90vh" }}>
        <div className="p-4 rounded-lg max-w-4xl mx-auto ">
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full pb-9 px-5  max-w-4xl">
            <div className="flex items-center rounded-lg border bg-white border-gray-400 px-3 py-1">
              <input
                type="text"
                placeholder="Type a topic"
                className="w-full focus:outline-none"
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
          <div className="p-4 rounded-lg text-center my-4 flex flex-col min-h-full bg-white">
            <h2 className="font-bold mb-2 text-2xl">AI Ebook Copywriting</h2>
            <p className="text-gray-700 mb-4">
              Our website's AI feature can help you write compelling copy for
              your ebook that will grab your reader's attention and keep them
              engaged. Say goodbye to writer's block and hello to more sales!
            </p>
          </div>
          <div
            className="p-4 rounded-lg text-center flex flex-col min-h-full bg-white"
            style={{ minHeight: "68vh" }}
          >
            <div
              className={`mx-auto max-w-3xl text-left ${
                caption ? "fade-out" : "fade-in"
              }`}
            >
              <div className="bg-white rounded-lg shadow-md p-4 mb-3">
                <p className="text-gray-700 font-bold mb-2">
                  "Are you struggling to manage your finances? Our ebook offers
                  expert advice and strategies for achieving financial freedom"
                </p>
                <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
                  <p className="text-gray-700">
                    "Take control of your finances and achieve financial freedom
                    with our comprehensive ebook! Our expert authors share their
                    top tips and strategies for managing your money, building
                    wealth, and achieving your financial goals. Whether you're
                    dealing with debt, trying to save for retirement, or just
                    looking to improve your overall financial health, our ebook
                    is the ultimate resource for financial success." These are
                    just a few examples, but there are countless prompts and
                    captions that could be used to promote an ebook on a
                    website. The key is to identify the target audience and
                    their pain points, and then craft a message that speaks
                    directly to their needs and desires.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
