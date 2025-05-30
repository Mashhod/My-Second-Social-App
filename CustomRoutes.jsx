import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Signup from '../pages/Signup';
import Login from '../pages/Login'
import Home from '../pages/Home'
import { GlobalContext } from '../context/Context'
import Loader from './Loader'

const CustomRoutes = () => {

    let {state , dispatch} = useContext(GlobalContext);
    // console.log('state? ', state);
    

  return (
        <div>
             {
             
             (state?.isLogin && !state.isLoader)?
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<Navigate to={"/"} />} />
            </Routes>
            :
            (
            (!state?.isLogin && !state.isLoader)?
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<Navigate to={"/login"} />} />
            </Routes>
            :
            // <p>Loading...</p>
            <Loader />
             )
            
            

}

        </div>
    
  )
}

export default CustomRoutes;
