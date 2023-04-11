/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
// import { getSubscriptionData, getActivationData } from "../service/database";
// import { functions } from "../service/firebase";
import { Card, CardContent, Typography, Button, Box, Stack, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { api_auth } from "../Config/config";

export default function Profile({ isAuth, userIsPremium, updateUser }) {



  const [processing, setProcessing] = useState(true);
  const [user, setUser] = useState(isAuth);
  const [cancelling, setCancelleing] = useState(false);
  const [isActive, setActive] = useState(false);
  const [resume, setResume] = useState(false);
  const [endAt, setEndAt] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // isLoggedIn().then(res => {
    //   setUser(res);
    // })
    console.log(!userIsPremium)
    setUser(isAuth);

    setResume(userIsPremium?.eligible);

    const billing_info = userIsPremium?.billing_info;

    setLoading(!userIsPremium);

    setSubscription(billing_info);

    let date = new Date(billing_info?.last_payment.time);
    date.setDate(date.getDate() + 30);
    setEndAt(date);

    setActive(userIsPremium?.eligible);

    // if (userIsPremium?.status === "CANCELLED" || userIsPremium?.status === "SUSPENDED") {

    //   if (endAt < new Date()) {

    //     setSubscription(null);
    //     setResume(true);
    //     setActive(false);
    //   }

    // }

    setProcessing(false);
    // getSubscriptionData(isAuth.uid).then((data) => {

    //   if (data.id.length === 1) {

    //     serSubid(data.id[0]);
    //     setSubscription(data.data[0]);
    //     setProcessing(false);
    //   }
    //   else {

    //     getActivationData(isAuth.uid).then((data) => {

    //       console.log(data[0]?.status);
    //       if (data[0]?.status) {
    //         setResume(true)
    //         setEndAt(data[0]?.current_period_end.seconds);

    //       }
    //       setProcessing(false);
    //     })
    //   }

    // });

    // console.log(user);
  }, [isAuth, userIsPremium]);

  const handleCancel = async () => {

    setCancelleing(true);
    fetch(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${userIsPremium?.id}/cancel`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "Authorization": api_auth.auth,

      },
      body: JSON.stringify({ "reason": "Not good enough" }),
    })
      .then((response) => {
        if (response.status === 204) {

          updateUser();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setCancelleing(false);
      });
  };

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
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex items-center justify-center">
            <div>
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="Google Profile Picture"
                className="rounded-full mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
              <p className="text-gray-700">{user.email}</p>
              {isActive ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Active</span> :
                <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Not Active</span>
              }

            </div>
          </div>
          <div className={"md:w-2/3 md:pl-8 "}
            style={{
              display: processing ? 'none' : 'block'
            }}>
            {subscription ? (
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
                        {subscription.last_payment.amount.value}$ / month
                      </span>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-gray-800 font-bold">
                        Status
                      </span>
                      <span className="ml-auto text-gray-600 font-semibold">
                        {userIsPremium?.status}
                      </span>
                    </div>
                  </li>

                  {(userIsPremium?.status === "ACTIVE") ?
                    <>
                      <li className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-gray-800 font-bold">
                            Next Payment Date
                          </span>
                          <span className="ml-auto text-gray-600 font-semibold">
                            {
                              endAt.toDateString()
                            }
                          </span>
                        </div>
                      </li>
                      <li className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            disabled={cancelling}
                            onClick={handleCancel}
                            className={!cancelling ? "text-white font-bold py-2 px-6 rounded bg-red-500 hover:bg-red-700" : "px-8 py-3 text-white bg-red-300 rounded focus:outline-none"}
                          >

                            Cancel
                          </button>
                        </div>
                      </li>
                    </>
                    :
                    <li className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-gray-800 font-bold">
                          Valid Until
                        </span>
                        <span className="ml-auto text-gray-600 font-semibold">
                          {endAt.toDateString()}
                        </span>
                      </div>
                    </li>
                  }
                </ul>
              </div>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: '20px' }}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {resume ? "Your subscription expired on " + endAt.toDateString() : "Don't miss out on our tools - subscribe now!"}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      We offer a variety of tools to help you achieve your goals.
                      Subscribe today to unlock access!
                    </Typography>

                    <Link to="/payment">
                      <Button variant="contained" sx={{ mt: 2 }}>
                        Subscribe Now
                      </Button>
                    </Link>

                  </CardContent>
                </Card>
              </Box>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
