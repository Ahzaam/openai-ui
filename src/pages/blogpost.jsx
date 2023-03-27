// import { useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import { LoadingSVG, CopySVG } from "../components/SVG";
import { Alert, Snackbar } from "@mui/material";
import IOSSlider from '../components/IOSSlider';
import { functions } from "../service/firebase";
import { UserContext } from '../App';
import "../css/caption.css";

const marks = [{ value: 0, label: '250', }, { value: 25, label: '500', }, { value: 50, label: '750', }, { value: 75, label: '1000', }, { value: 100, label: '2000', },];

const sliderValues = { 0: 250, 25: 500, 50: 750, 75: 1000, 100: 2000 }

function valuetext(value) {
  return `${value}`;
}

export default function BlogPost() {

  const user = useContext(UserContext);
  const [post, setPost] = useState("");
  const [processing, setProcessing] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [sliderValue, setSliderValue] = useState(500);
  const [fetchError, setFetchError] = useState(false);

  //     const user = useContext(UserContext);

  //    console.log(user);
  // const navigate = useNavigate();

  const genBlogPost = (e) => {
    e.preventDefault();
    setFetchError(false);
    setPost(null);
    if (inputVal !== "") {
      setProcessing(true);

      functions
        .httpsCallable("blogPost")({ keyword: inputVal, user: user?.uid, len: sliderValue })
        .then((response) => {

          let { data } = response;
          let str = data.content;
          setPost(str);
          setInputVal("");
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
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setFetchError(false);
  };
  return (
    <>
      <div className="bg-gray-100" style={{ minHeight: "100vh" }}>

        <Snackbar open={fetchError} autoHideDuration={5000} onClose={handleCloseSnack}>
          <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
            Failed To Generate!
          </Alert>
        </Snackbar>

        <div className="max-w-4xl mx-auto px-4 py-8" >

          <h2 className="font-bold mb-2 text-2xl text-center">Blog Post Generator</h2>
          <div className="bg-white rounded-lg shadow-lg px-8 py-6 mb-8">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Post Title
            </label>
            <input
              onChange={(e) => {
                setInputVal(e.target.value)
              }}
              value={inputVal}
              autoComplete="post title"
              type="text"
              id="title"
              name="title"
              placeholder="Enter your post title here"
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <label
              htmlFor="length"
              className="block text-gray-700 font-bold mt-4 mb-2"
            >
              Post Length
            </label>

            <div className="flex items-center py-4">
              <IOSSlider
                track="inverted"
                size="small"
                aria-label="Post Length"
                defaultValue={25}
                getAriaValueText={valuetext}
                step={25}
                valueLabelDisplay="auto"
                marks={marks}
                color="secondary"
                onChangeCommitted={(e, v) => {
                  setSliderValue(sliderValues[v]);
                }}
              />


            </div>

            <button
              onClick={genBlogPost}
              className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
              {processing ? <LoadingSVG /> : "Generate Post"}
            </button>

            <div>
              {post && !processing && (
                <div
                  className={
                    "p-4 rounded-lg text-justify my-4 flex flex-col overflow-auto bg-white "
                  }
                  style={{ height: "66vh" }}
                >
                  <p className="text-gray-700 font-bold mb-2 text-left">
                    Words ({post.match(/\b\w+\b/g).length})
                  </p>
                  <div
                    className="bg-white rounded-lg shadow-md p-4 mb-3"

                  >
                    <p className="text-gray-700 mb-8" id="blogID">{post}</p>
                  </div>
                  <div
                    className="text-right mt-2"
                    onClick={(e) => {
                      var text = document.querySelector(
                        "#blogID"
                      ).textContent;
                      navigator.clipboard.writeText(text);
                      document.querySelector("#copybtn").textContent =
                        "Copied!";
                      setTimeout(() => {
                        document.querySelector(
                          "#copybtn"
                        ).textContent = "Copy";
                      }, 2000);
                    }}
                  >
                    <div className="ml-auto w-fit flex bg-gray-100 py-1 px-3 rounded-lg cursor-pointer">
                      <div id={"copybtn"} className="pb-2 mx-2">
                        Copy
                      </div>{" "}
                      <div className=" mt-1  ">
                        <CopySVG />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
