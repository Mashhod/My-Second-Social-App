import React, { useContext, useState } from 'react';
import { getAuth , createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { GlobalContext } from '../context/Context';
// import Loader from '../component/Loader';



const Signup = () => {

    
    const {state , dispatch} = useContext(GlobalContext);
   
    const [userName , setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth();

    const createUser = async (e) => {
        e.preventDefault();
        dispatch({type: "USER_LOADER" });

        
        // dispatch({isLogin:false, user: {}, isLoader: true})
        // console.log('state before signup response ', state);
        
        createUserWithEmailAndPassword(auth, email, password)
            .then( (userCredential) => {
                // async
                // Signed up 
                const user = userCredential.user;
                // await signOut(auth);

                updateProfile(auth.currentUser, {
                    displayName: userName, photoURL: "https://heroshotphotography.com/wp-content/uploads/2023/03/male-linkedin-corporate-headshot-on-white-square-1024x1024.jpg",
                   
                }).then(() => {
                    // Profile updated!
                    console.log("Profile Updated")
                }).catch((error) => {
                    // An error occurred
                    console.log("Update Profile Err", error)
                });
                
                console.log("res", user);
                // state.isLogin == null;
                
                
            

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error", error)
            // ..
        });
    }

  return (
    <div>
        <form onSubmit={createUser}>

            <label htmlFor="userName">
                Name: <input type="text" id="userName" value={userName} onChange={(e) => {setUserName(e?.target.value)}} />
            </label>
            <br />
            
            <label htmlFor="email">
                Email:<input type="text"  id="email" value={email} onChange={(e) => {setEmail(e?.target.value)}}/>
            </label>

            <br />

            <label htmlFor="password">
            Password: <input type="text" id="password"  value={password} onChange={(e) => {setPassword(e?.target.value)}} />
            </label>

            <br />
            
            <button>Sign Up</button>
            </form>
            {/* <Loader /> */}
        
    </div>
  )
}

export default Signup;

