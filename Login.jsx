import React, { useState, useContext } from 'react';
import { getAuth , 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GithubAuthProvider, 
  GoogleAuthProvider} from "firebase/auth";
import { GlobalContext } from '../context/Context';
// import { Link } from 'react-router';
import myImage from './images/one-removebg-preview.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Redirect } from '../Route/HandleNavigate';
import { Link } from 'react-router';

const Login = () => {
    const {state , dispatch} = useContext(GlobalContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth();

    const provider = new GithubAuthProvider();

    const signinWithGithub = () => {
           signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            console.log("user:" , user);
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            console.log("error:" , error)
            // ...
          });
    }

    const providerGoogle = new GoogleAuthProvider();

    const signinWithGoogle = () => {
      signInWithPopup(auth, providerGoogle)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("User:" , user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log("Error" , error)
    // ...
  });
    }


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

    const forgetPassword = () => {
                sendPasswordResetEmail(auth, email)
                .then(() => {
                  // Password reset email sent!
                  console.log("Password reset email sent!")
                  handleClose();
                  // ..
                })
                .catch((error) => {
                  console.log("Error" , error)
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // ..
                });
    } 

    // const openForget = () => {
    //                <Modal show={show} onHide={handleClose}>
    //                 <Modal.Header closeButton>
    //                   <Modal.Title>Forget Password</Modal.Title>
    //                 </Modal.Header>

    //                 <Modal.Body>
    //                   <label>
    //                     <input type="email" value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}} />
    //                   </label>
    //                 </Modal.Body>

    //                 <Modal.Footer>
    //                   <Button variant="secondary" onClick={handleClose}>Close</Button>
    //                   <Button variant="primary" onClick={forgetPassword}>Save changes</Button>
    //                 </Modal.Footer>
    //                 </Modal>

         
    // }

    const [userEmail , setUserEmail] = useState("");

    const [show , setShow] = useState(false);


    const handleClose = () => {
      setUserEmail("");
      setShow(false);
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


