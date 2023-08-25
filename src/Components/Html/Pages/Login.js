import React, { useState } from 'react'
import '../../Css/Login.css'
import LoginVideo from './LoginVideo.mp4'
import Logog from '../Logo-white.png'
import { auth } from '../../../utilitise/Firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useLoggedInUser } from '../../../User/UserAthentication'
import p1 from '../../../User/UserProfiles/profile1.png'
import p2 from '../../../User/UserProfiles/profile2.png'
import p3 from '../../../User/UserProfiles/profile3.png'
import p4 from '../../../User/UserProfiles/profile4.png'
import p5 from '../../../User/UserProfiles/profile5.png'
import p6 from '../../../User/UserProfiles/profile6.png'
import p7 from '../../../User/UserProfiles/profile7.png'
import p8 from '../../../User/UserProfiles/profile8.png'

const Login = () => {
  const [Mnumber, setMnumber] = useState("happy@gmail.com")
  const [Pin, setPin] = useState("H@123123")
  const [signIn, setSignIn] = useState(0)
  const [See, setsee] = useState(1)
  const [Uname, setUname] = useState("")
  const [errorUser, setErrorUser] = useState("")
  const navigate = useNavigate()
  const {  loginUser } = useLoggedInUser("")
  const [chooseuserprofile, setchooseuserprofile] = useState(0)
  const handlePinChange = (e) => {
    setPin(e.target.value)
  }
  const handleEmailChange = (e) => {
    setMnumber(e.target.value)
  }
  const handleSignInClick = () => {
    signIn ? setSignIn(0) : setSignIn(1)
    // setMnumber("")
    // setPin("")
    console.log(signIn)
  }
  const handlePassSee = () => {
    setsee(!See)
  }
  const handleUnameChange = (e) => {
    setUname(e.target.value)
  }

  const setProfileUser = (e) => {
    console.log(e.target.src)
    setchooseuserprofile(1)
    updateProfile(auth.currentUser, {
      displayName: Uname,
      photoURL: e.target.src
    })
    console.log(e.target.value)
    loginUser(auth.currentUser)
    navigate('/')
  }

  // const sendOTP = async (phoneNumber) => {
  //   try {
  //     const confirmationResult = await auth.signInWithPhoneNumber(phoneNumber);
  //     // Save the confirmation result to use during OTP verification
  //     // This will trigger SMS with OTP to the provided phone number
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //   }
  // };
  // const handleSendOTP = (e) => {
  //   e.preventDefault()
  // }
  const onsubmitCreate = (e) => {
    console.log("Sdfd")
    e.preventDefault();
    if (signIn) {
     signInWithEmailAndPassword(auth,Mnumber,Pin).then((userCredential)=>{
      loginUser(userCredential.user)
      navigate("/")
    }).catch((error)=>{
      const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        setErrorUser(errorMessage)
    })
    }
    else{
      createUserWithEmailAndPassword(auth, Mnumber, Pin)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        setchooseuserprofile(1)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        setErrorUser(errorMessage)
        // ..
      });
    }
  }
  return (
    <>
      <div className='LoginPage'>
        <div className="VideoLogin">
          <video autoPlay muted loop>
            <source src={LoginVideo} />
          </video>
        </div>
        <div className="LoginFormDiv">
          <div className='upperLoginDiv'>
            <div className="LogoForm">
              <img src={Logog} alt="" />
              <h3>Learn to Trade</h3>
            </div>
            <div className="CloseButtonLogin">

              <a href="/">
                <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroklinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 21.32L21 3.32001" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M3 3.32001L21 21.32" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </a>
            </div>

          </div>
          <div className="LoginForm">

            {chooseuserprofile ? <>
              <h3>Choose Your Profile Picture</h3>
              <div className="actualform profilediv">
                <div className="profile" onClick={setProfileUser} value="p1">
                  <img src={p1} alt="" srcset="" className='profileimg' />
                </div>
                <div className="profile" onClick={setProfileUser} value="p2">
                  <img src={p2} alt="" srcset="" className='profileimg' />
                </div>
                <div className="profile" onClick={setProfileUser} value="p3">
                  <img src={p3} alt="" srcset="" className='profileimg' />
                </div>
                <div className="profile" onClick={setProfileUser} value="p4">
                  <img src={p4} alt="" srcset="" className='profileimg' />
                </div>
                <br />
                <div className="profile" onClick={setProfileUser} value="p5">
                  <img src={p5} alt="" srcset="" className='profileimg' />
                </div>
                <div className="profile" onClick={setProfileUser} value="p6">
                  <img src={p6} alt="" srcset="" className='profileimg' />
                </div>
                <div className="profile" onClick={setProfileUser} value="p7">
                  <img src={p7} alt="" srcset="" className='profileimg' />
                </div>
                <div className="profile" onClick={setProfileUser} value="p8">
                  <img src={p8} alt="" srcset="" className='profileimg' />
                </div>
              </div>
            </> : <>
              <form action="" className='ActualForm' onSubmit={onsubmitCreate}>

                <h2 className='FormH2'>{signIn ? "Sign In" : "Sign Up to Get Started"}</h2>
                <div className="InputMobileNumber">
                  {signIn ? " " : <>
                    <label htmlFor="uname">Username</label>
                    <div className='mobiletag'>
                      <input type="text" name='uname' className='InputtagMobile' value={Uname} placeholder='Username' onChange={handleUnameChange} required />
                    </div>
                  </>}
                  <label htmlFor="Phone">Email</label>
                  <div className='mobiletag'>
                    <input type="email" name='tel' className='InputtagMobile' value={Mnumber} placeholder='abc@xyz.com' onChange={handleEmailChange} />
                  </div>

                  <label htmlFor="Phone">Password</label>
                  <div className='mobiletag pinDiv'>
                    <input type={See ? 'password' : 'text'} name='tel' className='InputtagMobile PinInput' value={Pin} placeholder='XXXX' onChange={handlePinChange} />
                    <div onClick={handlePassSee}>
                      {
                        See ? <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z" stroke="#fffafa" strokeWidth="0.4" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> :
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.60997 9.60714C8.05503 10.4549 7 12.1043 7 14C7 16.7614 9.23858 19 12 19C13.8966 19 15.5466 17.944 16.3941 16.3878M21 14C21 9.02944 16.9706 5 12 5C11.5582 5 11.1238 5.03184 10.699 5.09334M3 14C3 11.0069 4.46104 8.35513 6.70883 6.71886M3 3L21 21" stroke="#ffffff" strokeWidth="0.4" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                      }
                    </div>
                  </div>
                  <p>{errorUser}</p>
                  <div className='mobiletag submitBtnForm'>
                    <button className='InputtagMobile'>
                      {signIn ? "Sign In" : "Create Account"}
                    </button>
                  </div>
                </div>

              </form>
              <hr style={{ width: "60%", opacity: "0.5" }} />
              <p>{signIn ? "Click Here To " : "Already Have An Account?"} <span onClick={handleSignInClick} className='Linkspan'>{signIn ? "SignUp" : "SignIn"}</span></p>
            </>}

          </div>
        </div>
      </div>
    </>
  )
}

export default Login
