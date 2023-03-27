// import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { SendSVG, LoadingSVG, CopySVG } from "../components/SVG";
import { functions } from "../service/firebase";
import { Box, Tab, Tabs, Alert, Snackbar } from "@mui/material";
import { UserContext } from '../App';

import "../css/caption.css";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function GenEbook({ customer }) {
  const [outline, setOutline] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="bg-gray-100" style={{ minHeight: "90vh" }}>
        <div className="container mx-auto ">
          <Box>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Write Outline" {...a11yProps(0)} />
                <Tab label="Write Chapter" {...a11yProps(1)} />
                <Tab label="Help" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <GenerateOutline outline={outline} setOutline={setOutline} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <GenerateChapter chapters={chapters} setChapters={setChapters} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Help />
            </TabPanel>
          </Box>
        </div>
      </div>
    </>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function GenerateOutline({ outline, setOutline }) {

  const user = useContext(UserContext);
  const [processing, setProcessing] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [fetchError, setFetchError] = useState(false);

  //     const user = useContext(UserContext);

  //    console.log(user);
  // const navigate = useNavigate();

  useEffect(() => {
    // functions.httpsCallable('helloWorld')({ keword: 'hi hello world', quote: true }).then((response) => {
    //     console.log(response)
    // });
  });

  const genEbookOutline = (e) => {
    e.preventDefault();

    setFetchError(false);

    if (inputVal !== "") {
      setProcessing(true);
      console.log(user?.uid);
      functions
        .httpsCallable("ebookOutline")({ keyword: inputVal, user: user?.uid })
        .then((response) => {
          let { data } = response;

          let str = data.content;
          // console.log(str.replaceAll("\n", "<br />"));
          let reg = /[\r\n]+/g;

          setInputVal("");
          setOutline(str.split(reg));
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
    if (reason === 'clickaway') {
      return;
    }

    setFetchError(false);
  };

  return (
    <div className="bg-gray-100 " style={{ minHeight: "80vh" }}>

      <Snackbar open={fetchError} autoHideDuration={5000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
          Failed To Generate!
        </Alert>
      </Snackbar>


      <div className="p-4 rounded-lg max-w-4xl mx-auto ">
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full pb-9 px-5  max-w-4xl">
          <div className="flex items-center rounded-lg border bg-white border-gray-400 px-3 py-1">
            <input
              type="text"
              placeholder="Type A Topic To Generate Outline"
              className="w-full focus:outline-none"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button
              onClick={(e) => {
                genEbookOutline(e);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 ml-2 rounded"
              disabled={processing}
            >
              {processing ? <LoadingSVG /> : <SendSVG />}
            </button>
          </div>
        </div>


        {outline.length > 0 && (
          <div
            className={
              "p-4 rounded-lg text-center my-4 flex flex-col overflow-auto bg-white "
            }
            style={{ height: "66vh" }}
          >
            <h2 className="font-bold mb-2 text-2xl">AI Ebook Outline</h2>

            {outline.length > 0 &&
              outline.map((el, ind) => {
                let reg = /^[ABCDEFGH-]{1}\.{0,1}/;
                let reg2 = /^[123456789-]{1}\.{0,1}/;

                if (reg.test(el.trim())) {
                  return (
                    <p
                      className="text-gray-700 mb-4 text-justify pl-8"
                      key={"outline-" + ind}
                    >
                      {el}
                    </p>
                  );
                }
                if (reg2.test(el.trim())) {
                  return (
                    <p
                      className="text-gray-700 mb-4 text-justify pl-12"
                      key={"outline-" + ind}
                    >
                      {el}
                    </p>
                  );
                }
                return (
                  <p
                    className="text-gray-700 mb-4 text-justify underline font-semibold pl-4"
                    key={"outline-" + ind}
                  >
                    {el}
                  </p>
                );
              })}
          </div>
        )}
        <div
          className={`p-4 rounded-lg text-center flex flex-col min-h-full bg-white ${processing || outline.length > 0 ? "fade-out" : ""
            }`}
          style={{ minHeight: "68vh" }}
        >
          <h2 className="font-bold mb-2 text-2xl ">AI Ebook Outline</h2>
          <div
            className={`mx-auto max-w-3xl text-left ${processing || outline.length > 0 ? "fade-out" : ""
              }`}
            style={{ width: "80%" }}
          >
            <div className="bg-white rounded-lg shadow-md p-4 mb-3 fade-in">
              <p className="text-gray-700 font-bold mb-2">I. Introduction</p>
              <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
                <ul>
                  <li>
                    <p className="text-gray-700 bg-blue-300 px-3 rounded-lg">
                      A. Importance of writing an ebook
                    </p>
                  </li>
                  <li>
                    <p className="text-gray-700 px-3">
                      B. Benefits of creating an ebook
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 mb-3 fade-in">
              <p className="text-gray-700 font-bold mb-2">
                II. Choosing an Ebook Topic
              </p>
              <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
                <ul>
                  <li>
                    <p className="text-gray-700">A. Identifying your niche</p>
                  </li>
                  <li>
                    <p className="text-gray-700">
                      B. Researching the market demand
                    </p>
                  </li>

                  <li>
                    <p className="text-gray-700">
                      C. Brainstorming unique topics
                    </p>
                  </li>
                  <li>
                    <p className="text-gray-700">
                      D. Selecting a topic that aligns with your expertise
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// END OF Generate Outline Component ------------------------------------------------------------------------------------

function GenerateChapter({ chapters, setChapters }) {
  const [processing, setProcessing] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [fetchError, setFetchError] = useState(false);
  const user = useContext(UserContext);
  //     const user = useContext(UserContext);

  //    console.log(user);
  // const navigate = useNavigate();

  useEffect(() => {
    // functions.httpsCallable('helloWorld')({ keword: 'hi hello world', quote: true }).then((response) => {
    //     console.log(response)
    // });
  });

  const genEbookChapter = (e) => {
    e.preventDefault();

    setFetchError(false);

    if (inputVal !== "") {
      setProcessing(true);
     
      functions
        .httpsCallable("ebookChapter")({ keyword: inputVal, user: user?.uid })
        .then((response) => {
          let { data } = response;

          let str = data.content;
          setChapters([...chapters, { title: inputVal, content: str }]);
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
    if (reason === 'clickaway') {
      return;
    }

    setFetchError(false);
  };

  return (
    <div className="bg-gray-100 " style={{ minHeight: "80vh" }}>

      <Snackbar open={fetchError} autoHideDuration={5000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
          Failed To Generate!
        </Alert>
      </Snackbar>

      <div className="p-4 rounded-lg max-w-4xl mx-auto ">
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full pb-9 px-5  max-w-4xl">
          <div className="flex items-center rounded-lg border bg-white border-gray-400 px-3 py-1">
            <input
              type="text"
              placeholder="Paste the chapter name copied from outline"
              className="w-full focus:outline-none"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button
              onClick={(e) => {
                genEbookChapter(e);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 ml-2 rounded"
              disabled={processing}
            >
              {processing ? <LoadingSVG /> : <SendSVG />}
            </button>
          </div>
        </div>
        {chapters.length > 0 && (
          <div
            className={
              "p-4 rounded-lg text-center my-4 flex flex-col overflow-auto bg-white "
            }
            style={{ height: "66vh" }}
          >
            <h2 className="font-bold mb-2 text-2xl">AI Ebook Chapter</h2>

            {chapters.length > 0 &&
              chapters.map((el, ind) => {
                return (
                  <div
                    className="bg-white rounded-lg shadow-md p-4 mb-3"
                    key={"chapter-" + ind}
                  >
                    <p className="text-gray-700 font-bold mb-2 text-left">
                      {el.title}
                    </p>
                    <div className="flex items-center justify-between bg-gray-100 rounded-md p-3 text-justify">
                      <p className="text-gray-700" id={"chapterID-" + ind}>
                        {el.content}
                      </p>
                    </div>
                    <div
                      className="text-right mt-2"
                      onClick={(e) => {
                        var text = document.querySelector(
                          "#chapterID-" + ind
                        ).textContent;
                        navigator.clipboard.writeText(text);
                        document.querySelector("#copybtn-" + ind).textContent =
                          "Copied!";
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
                  </div>
                );
              })}
          </div>
        )}
        <div className="p-4">
          <div
            className={`p-4 rounded-lg text-center flex flex-col min-h-full overflow-auto bg-white ${processing || chapters.length > 0 ? "fade-out" : ""
              }`}
            style={{ minHeight: "68vh", maxHeight: "80vh" }}
          >
            <h2 className="font-bold mb-2 text-2xl">AI Ebook Outline</h2>
            <div
              className={`mx-auto max-w-3xl text-left ${chapters.length > 0 ? "fade-out" : "fade-in"
                }`}
            >
              <div className="bg-white rounded-lg shadow-md p-4 mb-3">
                <p className="text-gray-700 font-bold mb-2">
                  Importance of writing an ebook
                </p>
                <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
                  <p className="text-gray-700">
                    Introduction In today's digital era, writing an Ebook is an
                    important way of sharing knowledge, expressing ideas and
                    gaining popularity in the online community. The rise in
                    technology and the proliferation of gadgets have made ebooks
                    an accessible and convenient way of distributing
                    information. Writing an Ebook has become an important tool
                    for businesses, entrepreneurs, authors and anyone else who
                    wants to build a strong online presence. In this chapter, we
                    will discuss the importance of writing an Ebook and why it
                    is necessary for success in the digital age.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Help() {
  return (
    <div
      className={`p-4 rounded-lg text-center flex  max-w-4xl mx-auto flex-col min-h-full overflow-hidden bg-white `}
      style={{ minHeight: "68vh", maxHeight: "68vh" }}
    >
      <h2 className="font-bold mb-2 text-2xl">How To Generate An Ebook</h2>
      <div className={`mx-auto max-w-3xl text-left fade-in`}>
        <div className="bg-white rounded-lg shadow-md p-4 mb-3">
          <p className="text-gray-700 font-bold mb-2">Step 1</p>
          <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
            <p className="text-gray-700">
              To generate an outline for your desired ebook, go to the "Write
              Outline" tab and input the ebook's title.
            </p>
          </div>
        </div>
      </div>
      <div className={`mx-auto max-w-3xl text-left fade-in`}>
        <div className="bg-white rounded-lg shadow-md p-4 mb-3">
          <p className="text-gray-700 font-bold mb-2">Step 2</p>
          <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
            <p className="text-gray-700">
              After copying the chapter title displayed on the screen, go to the
              "Write Chapter" tab, paste the title into the input, and generate
              the chapter. Repeat this process for all chapters listed in the
              outline.
            </p>
          </div>
        </div>
      </div>

      <div className={`mx-auto max-w-3xl text-left fade-in`}>
        <div className="bg-white rounded-lg shadow-md p-4 mb-3">
          <p className="text-gray-700 font-bold mb-2">Important!</p>
          <div className="flex items-center justify-between bg-[#fef08a] rounded-md p-3">
            <p className="text-gray-700">
              Once a chapter has been generated, please save the text on your
              device. We do not retain records of your progress, so refreshing
              the page or navigating away from it may cause your work to be
              lost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
