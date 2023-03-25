import { getUser } from '../service/authentication'
import { Link } from "react-router-dom";

export default function Home() {
  // getUser().then((user) => {
  //     console.log(user._delegate)
  // })
  return (
    <>
   <div class="bg-gray-100 min-h-screen">
  <div class="container mx-auto py-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white p-4 shadow rounded">
        <h3 class="text-lg font-bold mb-2 text-gray-800">Ebook Writing</h3>
        <p class="text-gray-700">
          Our AI-powered tool helps you write ebooks quickly and easily. Simply provide a topic and some keywords, and our tool will do the rest.
        </p>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
          Start Writing
        </button>
      </div>
      <div class="bg-white p-4 shadow rounded">
        <h3 class="text-lg font-bold mb-2 text-gray-800">Caption Generator</h3>
        <p class="text-gray-700">
          Need help creating captions for your social media posts? Our tool can help you generate captions that are engaging and on-brand.
        </p>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
          Generate Captions
        </button>
      </div>
      <div class="bg-white p-4 shadow rounded">
        <h3 class="text-lg font-bold mb-2 text-gray-800">Blog Post Generator</h3>
        <p class="text-gray-700">
          Our tool can help you generate blog post ideas and even write full articles for you. All you need to do is provide some keywords and our tool will take care of the rest.
        </p>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
          Generate Blog Post
        </button>
      </div>
    </div>
    <div class="bg-gray-50 py-10">
  <div class="container mx-auto px-5">
    <h2 class="text-5xl font-semibold text-gray-800 text-center mb-8">AI Writing Tool</h2>
    <p class="text-2xl text-gray-700 text-center mb-10">
      Our AI Writing Tool helps you create ebooks, captions, and blog posts quickly and easily. With our tool, you can save time and produce high-quality content that engages your audience.
    </p>
    <div class="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-3xl">
      <h3 class="text-2xl font-bold mb-4 text-gray-800">Subscription Plan</h3>
      <p class="text-lg text-gray-700 mb-4">
        Subscribe to our premium plan for just $10 per month and get access to additional features and tools.
      </p>
      <div class="flex justify-center">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
          Subscribe Now
        </button>
      </div>
    </div>
  </div>
</div>

  </div>
  
</div>
<div class="mx-auto max-w-6xl text-center mt-10 bg-blue-600 py-10 text-white">
  <h2 class="text-4xl font-bold mb-8">What Our Users Are Saying</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="bg-white p-8 shadow rounded">
      <p class="text-gray-700">
        "This tool has been a game-changer for my content creation. I no longer spend hours writing and editing blog posts. The AI-powered blog post generator saves me so much time and produces high-quality content that my readers love."
      </p>
      <p class="text-gray-800 font-bold mt-4">- Sarah J.</p>
    </div>
    <div class="bg-white p-8 shadow rounded">
      <p class="text-gray-700">
        "As a social media manager, I'm always looking for ways to create engaging content. The AI-powered caption generator has been a lifesaver. It helps me come up with creative captions that get more likes and comments."
      </p>
      <p class="text-gray-800 font-bold mt-4">- John D.</p>
    </div>
    <div class="bg-white p-8 shadow rounded">
      <p class="text-gray-700">
        "I wanted to write an ebook, but I didn't know where to start. The ebook writing tool helped me organize my thoughts and ideas and create a professional-looking ebook in just a few hours. I couldn't be happier with the results."
      </p>
      <p class="text-gray-800 font-bold mt-4">- Emily W.</p>
    </div>
  </div>
</div>




<div class="bg-gradient-to-r from-blue-700 to-blue-500 py-16">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Create Engaging Social Media Captions
      </h2>
      <p class="mt-3 max-w-md mx-auto text-lg text-gray-200 sm:text-xl md:mt-5 md:max-w-3xl">
        Generate creative and catchy captions for your social media posts using our AI-powered caption generator.
      </p>
    </div>
    <div class="mt-10">
      <form class="mx-auto max-w-md">
        <div class="flex flex-col mb-4">
          <label class="text-lg font-semibold text-gray-200 mb-2" for="inputText">Enter your text:</label>
          <textarea id="inputText" name="inputText" class="px-4 py-2 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
        </div>
        <div class="flex flex-col mb-4">
          <label class="text-lg font-semibold text-gray-200 mb-2" for="captionLength">Caption length:</label>
          <select id="captionLength" name="captionLength" class="px-4 py-2 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="short">Short (1-2 sentences)</option>
            <option value="medium">Medium (2-3 sentences)</option>
            <option value="long">Long (3-4 sentences)</option>
          </select>
        </div>
        <div class="flex justify-center">
          <button type="submit" class="px-6 py-2 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Generate Caption</button>
        </div>
      </form>
    </div>
  </div>
</div>

    </>
  )
}

