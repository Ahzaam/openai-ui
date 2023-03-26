// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { SendSVG, LoadingSVG, CopySVG } from "../components/SVG";
import { functions } from "../service/firebase";
import { Box, Tab, Tabs } from "@mui/material";

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
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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

      functions
        .httpsCallable("ebookOutline")({ keyword: inputVal })
        .then((response) => {
          let { data } = response;

          let str = data.content;
          let reg = /[\r\n]+/g;

          setInputVal("");
          setOutline(str.split(reg));
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
    <div className="bg-gray-100 " style={{ minHeight: "80vh" }}>
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
          className={`p-4 rounded-lg text-center flex flex-col min-h-full bg-white ${
            processing || outline.length > 0 ? "fade-out" : ""
          }`}
          style={{ minHeight: "68vh" }}
        >
          <h2 className="font-bold mb-2 text-2xl">AI Ebook Outline</h2>
          <div
            className={`mx-auto max-w-3xl text-left ${
              processing || outline.length > 0 ? "fade-out" : "fade-in"
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
                  looking to improve your overall financial health, our ebook is
                  the ultimate resource for financial success." These are just a
                  few examples, but there are countless prompts and captions
                  that could be used to promote an ebook on a website. The key
                  is to identify the target audience and their pain points, and
                  then craft a message that speaks directly to their needs and
                  desires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenerateChapter({ chapters, setChapters }) {
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

  const genEbookChapter = (e) => {
    e.preventDefault();

    setFetchError(false);

    if (inputVal !== "") {
      setProcessing(true);

      functions
        .httpsCallable("ebookChapter")({ keyword: inputVal })
        .then((response) => {
          let { data } = response;

          let str = data.content;
          setChapters([...chapters, { title: inputVal, content: str }]);
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
    <div className="bg-gray-100 " style={{ minHeight: "80vh" }}>
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
        <div
          className={`p-4 rounded-lg text-center flex flex-col min-h-full bg-white ${
            processing || chapters.length > 0 ? "fade-out" : ""
          }`}
          style={{ minHeight: "68vh" }}
        >
          <h2 className="font-bold mb-2 text-2xl">AI Ebook Outline</h2>
          <div
            className={`mx-auto max-w-3xl text-left ${
              processing || chapters.length > 0 ? "fade-out" : "fade-in"
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
                  looking to improve your overall financial health, our ebook is
                  the ultimate resource for financial success." These are just a
                  few examples, but there are countless prompts and captions
                  that could be used to promote an ebook on a website. The key
                  is to identify the target audience and their pain points, and
                  then craft a message that speaks directly to their needs and
                  desires.
                </p>
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
      className={`p-4 rounded-lg text-center flex flex-col min-h-full bg-white ${"fade-in"}`}
      style={{ minHeight: "68vh" }}
    >
      <h2 className="font-bold mb-2 text-2xl">How To Generate An Ebook</h2>
      <div className={`mx-auto max-w-3xl text-left `}>
        <div className="bg-white rounded-lg shadow-md p-4 mb-3">
          <p className="text-gray-700 font-bold mb-2">Step 1</p>
          <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
            <p className="text-gray-700">
              Navigate to "Wirte Outline" Tab and Generate Outline of the ebook
              you wish to generate by providing the Title of the ebook.
            </p>
          </div>
        </div>
      </div>
      <div className={`mx-auto max-w-3xl text-left `}>
        <div className="bg-white rounded-lg shadow-md p-4 mb-3">
          <p className="text-gray-700 font-bold mb-2">Step 2</p>
          <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
            <p className="text-gray-700">
              Copy The title of a chapter appeared in the screen. Navigate to
              "Write Chapter" Tab and paste the title in the input and Generate
              the chapter. Repeat this step for all the chapters appeared in the
              outline.
            </p>
          </div>
        </div>
      </div>

      <div className={`mx-auto max-w-3xl text-left `}>
        <div className="bg-white rounded-lg shadow-md p-4 mb-3">
          <p className="text-gray-700 font-bold mb-2">Important!</p>
          <div className="flex items-center justify-between bg-[#fef08a] rounded-md p-3">
            <p className="text-gray-700">
              After generating a chapter please copy the text and save on your
              device. We do not keep track of your progress. Refreshing the page
              or Navigating to another page would result in losing your work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
