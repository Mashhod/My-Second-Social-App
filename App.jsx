// import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import { Link } from 'react-router';
import CustomRoutes from './component/CustomRoutes';
import { useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { GlobalContext } from './context/Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from './Route/HandleNavigate';
// import { Redirect } from './Route/HandleNavigate.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css';
// Redirect
// 
function App() {

  let {state , dispatch} = useContext(GlobalContext);
  
  console.log(state)

  


  const firebaseConfig = {
    apiKey: "AIzaSyChhZKTyWBehOu34uQX-wDBfVXcRRsHYD0",
    authDomain: "my-second-social-app-dd307.firebaseapp.com",
    projectId: "my-second-social-app-dd307",
    storageBucket: "my-second-social-app-dd307.firebasestorage.app",
    messagingSenderId: "708323182749",
    appId: "1:708323182749:web:9505d0f0a53b05f62cac74"
  };
  
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)


  const auth = getAuth();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        console.log("user" , user);
        dispatch({type: "USER_LOGIN" , payload: user});
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        
        // ...
      } else {

        dispatch({type: "USER_LOGOUT"});
        console.log("User Not Found")
        // User is signed out
        // ...
      }
    });
  }, [])

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch({type: "USER_LOADER" });
    setTimeout(()=>{
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Logout Successfull")
      }).catch((error) => {
        // An error happened.
        console.log("An error happened.")
      });

    }, 1000)
  }

  return (
    <div className="App">
      <header>
        <div className='logo'>
          <img src="src/pages/logo/creative-gradient-code-logo_23-2148813996.jpg" alt="gradient" />

        </div>

        

      {state?.isLogin == true ?

        <button onClick={logoutUser}>Logout</button>

        :
          
        <nav>
          <ul>
            <li>
              <Redirect path="/signup" text="SignUps"/>
              {/* <Link to={'/signup'}>Signup</Link> */}
            </li>

            <li>
              {/* <Link to={'/login'}>Login</Link> */}
              {<Redirect path="/login" text="Login"/>}
            </li>
          </ul>
        </nav>
      
      }
        
      </header>
     
      
     <CustomRoutes />
    </div>
  );
}

export default App;
