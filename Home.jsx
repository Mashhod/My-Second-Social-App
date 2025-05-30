import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Context'
import { getAuth,  verifyBeforeUpdateEmail } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, onSnapshot } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './home.css';
import moment from 'moment'

const Home = () => {

  

  const [newEmail , setNewEmail] = useState("");

  const [showForm , setShowForm] = useState(false);

  const [postCaption , setPostCaption] = useState("");
  const [posts , setPosts] = useState([])

  let {state, dispatch } = useContext(GlobalContext);

  const db = getFirestore();


  const auth = getAuth();


  const changeEmail = async (e) => {

    e.preventDefault();

    verifyBeforeUpdateEmail(auth.currentUser, newEmail).then(() => {
      // Email updated!
      console.log("Email Updated")
      // ...
    }).catch((error) => {
      // An error occurred
      console.log("Update Email Error" , error)
      // ...
    });

    console.log("State", state)
  }

  const getPost = async() => {

    const q = query(collection(db, "posts"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setPosts((prev) => [...prev , doc.data()])
    });

      
}




  useEffect(() => {

    const getRealTimeUpdates = () => {
      const q = query(collection(db, "posts"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
          setPosts((prev) => [...prev , doc.data()])

      });
    });
}
getRealTimeUpdates()
    // getPost();
} , [])




  const addPost = async (e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        userName: state?.user?.displayName,
        userEmail : state?.user?.email,
        userProfile: state?.user?.photoURL,
        userId: state?.user?.uid,
        postText: postCaption,
        postDate: new Date().getTime(),
      });
      setPostCaption("");
      // setPosts([]);
      // getPost()
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

}  return (
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
