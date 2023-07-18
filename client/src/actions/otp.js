import { setCurrentUser } from './currentUser'

export const sendOtp = (data,navigate) => async(dispatch)=>{
    try {
        dispatch({type:'OTP',data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Otp'))))
        navigate('/')
    }
     catch (error) {
        console.log(error);

    }
}
