import React, { useState, useEffect } from 'react';



import { auth } from '../service/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import usePremiumStatus from '../service/stripe/usePremiumStatus';
import Authentication from './authentication';
import { createCheckoutSessions } from '../service/stripe/createCheckoutSession';

export default function Payment() {
  const [user, userLoading] = useAuthState(auth)
  const userIsPremium = usePremiumStatus(user)

 return (<div>
{!user && userLoading && <h1>Loading....</h1>}
{!user && userLoading && <Authentication/>}
{user && !userLoading && (
<div>
  <h1>Hello, {user.displayName}</h1>

{!userIsPremium ? (
  <button onClick={() => createCheckoutSessions(user.uid)}>Upgrade to Premium</button>
):<h1>Have a 🍪 Premium customer</h1>
}
</div>
  
  )}

</div>)}