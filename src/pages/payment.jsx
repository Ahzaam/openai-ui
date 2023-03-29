import React, { useEffect, useState } from "react";
import { Card, CardContent, Stack, Skeleton } from "@mui/material";
import { auth } from "../service/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import usePremiumStatus from "../service/stripe/usePremiumStatus";
import Authentication from "./authentication";
// import { createCheckoutSessions } from "../service/paypal/createCheckoutSession";
import { Link } from "react-router-dom";
import Paypal from "./paypal";
export default function Payment({ userIsPremium, userData, updateUser }) {

  const [user, userLoading] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [premiumStatus, setPremiumStatus] = useState(false);

  useEffect(() => {
    

    setPremiumStatus(userIsPremium?.eligible);
    setLoading(!userIsPremium)

  }, [userData, userIsPremium]);

  // const userIsPremium = usePremiumStatus(user);

  if (loading) {
    return (

      <div className="flex justify-end">
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-md  overflow-hidden " style={{ width: '40vw' }} >

          <Card>
            <CardContent>
              <Stack spacing={1}>
                {/* For variant="text", adjust the height via font-size */}
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                {/* For other variants, adjust the size with `width` and `height` */}

                <Skeleton variant="rectangular" height={60} />
                <Skeleton variant="rounded" height={60} />
              </Stack>

            </CardContent>
          </Card>

        </div>
      </div>


    )
  }


  return (
    <div>
      {!user && userLoading && <h1>Loading....</h1>}
      {!user && userLoading && <Authentication />}
      {user && !userLoading && (
        <div
          className="flex items-center justify-center"
          style={{ minHeight: "80vh" }}
        >

          {(!userIsPremium || !premiumStatus) ? (
            <Pricing
              user={(user, userIsPremium)}
              userIsPremium={userIsPremium}
              userData={userData}
              updateUser={updateUser}
              setLoading={setLoading}
            />
          ) : (
            <AlreadySaved />
          )}
        </div>
      )}
    </div>
  );
}

function Pricing({ user, userIsPremium, userData, updateUser,setLoading }) {
  // const userIsPremium = usePremiumStatus(user);
  // const handleCheckout = () => {
  //   if (!userIsPremium) {
  //     // console.log(userData.uid)
  //     createCheckoutSessions(userData.uid);
  //   }
  // };

  return (
    <div className="w-full text-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            Subscribe Now!
          </div>
          <p className="text-gray-700 text-base">
            Our AI Writing Tool helps you create ebooks, captions, and blog
            posts quickly and easily. With our tool, you can save time and
            produce high-quality content that engages your audience.
          </p>
        </div>
        <span className="text-3xl">20$</span>

        <div className=" px-6 py-4 my-5">
          <Paypal user={userData} updateUser={updateUser} setLoading={setLoading}/>
        </div>
      </div>
    </div>
  );
}

function AlreadySaved() {
  return (
    <div className="bg-green-500 rounded-lg p-6 m-4">
      <div className="flex items-center">
        <div className="rounded-full bg-green-700 p-3">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-bold text-white">
            You're Already Subscribed
          </h4>
          <p className="mt-2 text-white">
            Thank you for being a subscriber. You can manage your subscription
            at any time.
          </p>
          <Link to="/profile">
            <span className="inline-block bg-white text-green-500 hover:text-green-700 font-bold rounded-lg px-4 py-2 mt-4 transition duration-300">
              Manage Subscription
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
