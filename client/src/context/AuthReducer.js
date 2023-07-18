const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        console.log("login start",action.payload);
        return {
          user: null,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        console.log("login success",action.payload);
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAILURE":
        console.log("login failure",action.payload);
        return {
          user: null,
          isFetching: false,
          error: true,
        };
      case 'LOGOUT': // Define the 'LOGOUT' action type
        console.log("logout");
        return {
          user: null,
          isFetching: false,
          error: false,
        };
      case "FOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            followings: [...state.user.followings, action.payload],
          },
        };
      case "UNFOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            followings: state.user.followings.filter(
              (following) => following !== action.payload
            ),
          },
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  