import React, { useState, useContext } from 'react';
import { getAuth , signInWithEmailAndPassword } from "firebase/auth";
import { GlobalContext } from '../context/Context';

const Login = () => {
    const {state , dispatch} = useContext(GlobalContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth();

    const loginUser = (e) => {
        e.preventDefault();
        
        dispatch({type: "USER_LOADER" });

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("res" , user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error" , error)
        });

            
    }

  return (
    <div>
        <form onSubmit={loginUser}>
        <label htmlFor="email">
            Email:<input type="text"  id="email" value={email} onChange={(e) => {setEmail(e?.target.value)}}/>
        </label>

        <br />

        <label htmlFor="password">
           Password: <input type="text" id="password"  value={password} onChange={(e) => {setPassword(e?.target.value)}} />
        </label>

        <br />
        
        <button>Login</button>
        </form>
        
        
    </div>
  )
}

export default Login;


