/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import { getSubscriptionData } from "../service/database";
import { functions } from "../service/firebase";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";


export default function Profile({ isAuth }) {

  const [user, setUser] = useState(isAuth);
  const [subid, serSubid] = useState("");
  const [subscription, setSubscription] = useState(null);
  useEffect(() => {
    // isLoggedIn().then(res => {
    //   setUser(res);
    // })

    setUser(isAuth);

    getSubscriptionData(isAuth.uid).then((data) => {
      // console.log(data);
      serSubid(data.id[0]);
      setSubscription(data.data[0]);
    });

    // console.log(user);
  }, [isAuth, user]);

  const handleCancel = () => {
    console.log(subid);
    functions
      .httpsCallable("cancelSubscription")({
        sub_id: subid,
      })
      .then((response) => {
        console.log(response);
      });
  };

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
            </div>
          </div>
          <div className="md:w-2/3 md:pl-8">
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
                        {subscription.items[0].plan.amount / 100}$ / month
                      </span>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-gray-800 font-bold">
                        Next Payment Date
                      </span>
                      <span className="ml-auto text-gray-600 font-semibold">
                        {new Date(
                          subscription.current_period_end.seconds * 1000
                        ).toDateString()}
                      </span>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={handleCancel}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop:'20px' }}>
              <Card sx={{ maxWidth: 400 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Don't miss out on our tools - subscribe now!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    We offer a variety of tools to help you achieve your goals.
                    Subscribe today to unlock access!
                  </Typography>
                  <Button variant="contained" href="/subscribe" sx={{ mt: 2 }}>
                    Subscribe Now
                  </Button>
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
