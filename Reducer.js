export const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADER_NAV_FALSE": {
      console.log('reducer USER_LOADER_NAV_FALSE ', state);
      return {isLogin: state?.isLogin , user: action.payload, isLoader: false }
    }
    case "USER_LOADER_NAV_TRUE": {
      console.log('reducer USER_LOADER_NAV_TRUE ', state);
      
      return { isLogin: state?.isLogin , user: action.payload, isLoader: true }
    }
    case "USER_LOADER": {
      return { isLogin: false , user: {}, isLoader: true }
    }
    case "USER_LOGIN": {
      return { isLogin: true , user: action.payload, isLoader: false }
    }
    case "USER_LOGOUT": {
      return { isLogin: false , user: {}, isLoader: false }
    }
    default: {
      return state
    }
  }
}
