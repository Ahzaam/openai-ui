/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Profile() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex items-center justify-center">
            <div>
              
              <img src="https://via.placeholder.com/150" alt="Google Profile Picture" className="rounded-full mb-4" />
              <h2 className="text-2xl font-bold mb-2">John Doe</h2>
              <p className="text-gray-700">john.doe@gmail.com</p>
            </div>
          </div>
          <div className="md:w-2/3 md:pl-8">
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-md overflow-hidden">
              <div className="bg-gray-100 py-4 px-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Your Subscription Plan
                </h2>
                <p className="text-gray-500">
                  Here are the details of your subscribed plan.
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                <li className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-gray-800 font-bold">Premium</span>
                    <span className="ml-auto text-gray-600 font-semibold">
                      $19.99/month
                    </span>
                  </div>
                  <div className="mt-2 text-gray-600">
                    <ul className="list-disc list-inside">
                      <li>Access to premium features</li>
                      <li>Unlimited storage</li>
                      <li>24/7 customer support</li>
                      <li>Ad-free experience</li>
                    </ul>
                  </div>
                </li>
                <li className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-gray-800 font-bold">
                      Next Payment Date
                    </span>
                    <span className="ml-auto text-gray-600 font-semibold">
                      June 1, 2023
                    </span>
                  </div>
                </li>
                <li className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-gray-800 font-bold">
                      Billing Information
                    </span>
                    <a href="#" className="ml-auto text-blue-600 hover:text-blue-800">
                      Update
                    </a>
                  </div>
                  <div className="mt-2 text-gray-600">
                    <p>John Doe</p>
                    <p>123 Main St.</p>
                    <p>Anytown, USA</p>
                    <p>12345</p>
                    <p>**** **** **** 1234</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
