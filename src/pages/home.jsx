import { getUser } from "../service/authentication";
import { Link } from "react-router-dom";
import { functions } from "../service/firebase";

export default function Home() {
  // getUser().then((user) => {
  //     console.log(user._delegate)
  // })

  functions
    .httpsCallable("helloWorld")({ keword: "hi hello world", quote: true })
    .then((response) => {
      console.log(response);
    });
  return (
    <>
      {/* dfghjkl;fg */}
      <div className=" py-10 my-20">
        <div className="container mx-auto px-5">
          <h2 className="text-5xl font-semibold text-gray-800 text-center mb-8">
            Introducing our AI Writing Tool
          </h2>
          <p className="text-2xl text-gray-700 text-center mb-10">
            Our AI Writing Tool helps you create ebooks, captions, and blog
            posts quickly and easily. With our tool, you can save time and
            produce high-quality content that engages your audience.
          </p>
        </div>
      </div>
      <div className="bg-gray-100 md:py-12">
        <div className="container mx-auto py-10 px-7 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow-lg rounded">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                Ebook Writing
              </h3>
              <p className="text-gray-700">
                Our AI-powered tool helps you write ebooks quickly and easily.
                Simply provide a topic and some keywords, and our tool will do
                the rest.
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
                Start Writing
              </button>
            </div>
            <div className="bg-white p-4 shadow-lg rounded">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                Caption Generator
              </h3>
              <p className="text-gray-700">
                Need help creating captions for your social media posts? Our
                tool can help you generate captions that are engaging and
                on-brand.
              </p>
              <Link to="/caption">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
                  Generate Captions
                </button>
              </Link>
            </div>
            <div className="bg-white p-4 shadow-lg rounded">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                Blog Post Generator
              </h3>
              <p className="text-gray-700">
                Our tool can help you generate blog post ideas and even write
                full articles for you. All you need to do is provide some
                keywords and our tool will take care of the rest.
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
                Generate Blog Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mx-auto px-10 text-center  bg-blue-600 py-10 text-white flex items-center"
        style={{ minHeight: "600px" }}
      >
        <div className="container mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-3xl my-10">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Subscription Plan
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Subscribe to our premium plan for just $10 per month and get
              access to additional features and tools.
            </p>
            <div className="flex justify-center">
              <Link to="/payment">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
                  Subscribe Now
                </button>
              </Link>
            </div>
          </div>

          <h2 className="text-5xl mb-12 font-bold mb-8">
            What Our Users Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow rounded">
              <p className="text-gray-700">
                "This tool has been a game-changer for my content creation. I no
                longer spend hours writing and editing blog posts. The
                AI-powered blog post generator saves me so much time and
                produces high-quality content that my readers love."
              </p>
              <p className="text-gray-800 font-bold mt-4">- Sarah J.</p>
            </div>
            <div className="bg-white p-8 shadow rounded">
              <p className="text-gray-700">
                "As a social media manager, I'm always looking for ways to
                create engaging content. The AI-powered caption generator has
                been a lifesaver. It helps me come up with creative captions
                that get more likes and comments."
              </p>
              <p className="text-gray-800 font-bold mt-4">- John D.</p>
            </div>
            <div className="bg-white p-8 shadow rounded">
              <p className="text-gray-700">
                "I wanted to write an ebook, but I didn't know where to start.
                The ebook writing tool helped me organize my thoughts and ideas
                and create a professional-looking ebook in just a few hours. I
                couldn't be happier with the results."
              </p>
              <p className="text-gray-800 font-bold mt-4">- Emily W.</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-16">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Create Engaging Social Media Captions
      </h2>
      <p className="mt-3 max-w-md mx-auto text-lg text-gray-200 sm:text-xl md:mt-5 md:max-w-3xl">
        Generate creative and catchy captions for your social media posts using our AI-powered caption generator.
      </p>
    </div>
    <div className="mt-10">
      <form className="mx-auto max-w-md">
        <div className="flex flex-col mb-4">
          <label className="text-lg font-semibold text-gray-200 mb-2" for="inputText">Enter your text:</label>
          <textarea id="inputText" name="inputText" className="px-4 py-2 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-semibold text-gray-200 mb-2" for="captionLength">Caption length:</label>
          <select id="captionLength" name="captionLength" className="px-4 py-2 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="short">Short (1-2 sentences)</option>
            <option value="medium">Medium (2-3 sentences)</option>
            <option value="long">Long (3-4 sentences)</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="px-6 py-2 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Generate Caption</button>
        </div>
      </form>
    </div>
  </div>
</div> */}

      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-700">
            © 2023 AI Writing Tool powered by ChatGPT
          </p>
        </div>
      </footer>
    </>
  );
}
