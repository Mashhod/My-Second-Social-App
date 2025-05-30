import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router';
import { GlobalContext } from '../context/Context';
export const Loader = () => {


  return (
    <div>Loader</div>
  )
}

export const Redirect = ({path, text})=>{
    const navigate = useNavigate();
    // console.log(path, ' path');
    // console.log(text, ' text');
    
    const {state , dispatch} = useContext(GlobalContext);

    const handleNav = (e) =>{
        e.preventDefault();
        dispatch({isLogin: state?.isLogin, user: state?.user, type: "USER_LOADER_NAV_TRUE" });
        
        setTimeout(() => {

            dispatch({isLogin: state?.isLogin, user: state?.user, type: "USER_LOADER_NAV_FALSE" });
           navigate(path)
          }, 1000);
        //   console.log();
          
        // alert()

    }

    return <Link to={path} onClick={handleNav}>{text}</Link>
}
