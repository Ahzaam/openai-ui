import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { handleLogout } from "../service/authentication";
import { functions } from "../service/firebase";
import "../css/caption.css";
export default function BlogPost({ customer }) {
  const [post, setPost] = useState("");

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

      axios
        .post("https://openai-fiver.vercel.app/", {
          keywords: inputVal,
          quote: quoteElement.current.checked,
          emoji: emojiElement.current.checked,
        })
        .then((response) => {
          let { data } = response;
          let reg = /#[a-z]+/gi;
          let derivedTags = data.result.content.match(reg);
          setTags(derivedTags);
          setCaption(data.result.content);
        })
        .catch((error) => {
          setFetchError(true);
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
      <div className="bg-gray-100" style={{ minHeight: "100vh" }}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Blog Post Generator
          </h1>
          <div className="bg-white rounded-lg shadow-lg px-8 py-6 mb-8">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter your post title here"
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <label
              htmlFor="topic"
              className="block text-gray-700 font-bold mt-4 mb-2"
            >
              Post Topic
            </label>
            <select
              id="topic"
              name="topic"
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a topic</option>
              <option value="technology">Technology</option>
              <option value="health">Health</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
            <label
              htmlFor="length"
              className="block text-gray-700 font-bold mt-4 mb-2"
            >
              Post Length
            </label>
            <div class="flex items-center">
              <input
                type="range"
                id="length"
                name="length"
                min="500"
                max="5000"
                step="500"
                defaultValue="1000"
                class="w-full bg-gray-300 rounded-md overflow-hidden appearance-none slider-thumb mr-4"
              />
              <span class="text-gray-700 font-bold">
                <span id="length-value">1000</span> words
              </span>
            </div>

            <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
              Generate Post
            </button>
          </div>
          {post && (
            <div className="bg-white rounded-lg shadow-lg px-8 py-6">
              <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
              <p className="text-gray-700 mb-8">{post.summary}</p>
              {post.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-lg font-bold mb-4">{section.title}</h3>
                  <p className="text-gray-700">{section.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
