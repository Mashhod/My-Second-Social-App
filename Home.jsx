import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/Context'
import { getAuth, updateEmail } from "firebase/auth";

const Home = () => {

  

  const [newEmail , setNewEmail] = useState("");

  const [showForm , setShowForm] = useState(false);

  let {state, dispatch} = useContext(GlobalContext);

  const auth = getAuth();


  const changeEmail = (e) => {

    e.preventDefault();

    updateEmail(auth.currentUser, newEmail).then(() => {
      // Email updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }
  return (
    <div className='home'>
      <h1>{state?.user?.displayName}</h1>
      <h6>{state?.user?.email}</h6>

      <button onClick={() => setShowForm((oldValue) => !oldValue )}>
        {(showForm) ? "Hide" : "Show" } Form
        </button>
  
      {(showForm)?
         
         <form onSubmit={changeEmail}>
          <label htmlFor="newEmail">
              New Email: <input value={newEmail} type="text"  id="newEmail" onChange={(e) => {setNewEmail(e.target.value)}} />

              <button type='submit'>Submit</button>
          </label>
          
        </form> 

        :
        null


}
      

       
    </div>
  )
}

export default Home
