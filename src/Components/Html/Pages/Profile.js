import React, { useState } from 'react'
import Header from '../Header'
import '../../Css/Profile.css'
import { auth, db } from '../../../utilitise/Firebase'
import p1 from '../../../User/UserProfiles/profile1.png'
import p2 from '../../../User/UserProfiles/profile2.png'
import p3 from '../../../User/UserProfiles/profile3.png'
import p4 from '../../../User/UserProfiles/profile4.png'
import p5 from '../../../User/UserProfiles/profile5.png'
import p6 from '../../../User/UserProfiles/profile6.png'
import p7 from '../../../User/UserProfiles/profile7.png'
import p8 from '../../../User/UserProfiles/profile8.png'
import { signOut, updateProfile } from 'firebase/auth'
import ListOfOrdersHistory from '../JS/ListOfOrdersHistory'
import { useNavigate } from 'react-router-dom'
import { ref, update } from 'firebase/database'
const Profile = () => {
    const navigate = useNavigate()
    const [PictureMenu, setPictureMenu] = useState(false)
    const [HistoryMenu, setHistoryMenu] = useState(true)
    const [SettigMenu, setSettingMenu] = useState(false)
    const [ProfilePhotoUrl, setProfilePhotoUrl] = useState(auth.currentUser.photoURL)
    const [close,setclose] = useState('visible')
    const handleChangePictureEvent = (e) => {
        updateProfile(auth.currentUser, {
            photoURL: e.target.src
        })
        setProfilePhotoUrl(e.target.src)
        console.log(auth.currentUser)
    }

    const handleRightMenu = (e) => {
        if (e === 1) {
            console.log(PictureMenu)
            if (PictureMenu !== true) {
                setPictureMenu(!PictureMenu)
                setHistoryMenu(false)
                setSettingMenu(false)
            }
        }
        else if (e === 2) {
            console.log(PictureMenu)
            if (HistoryMenu !== true) {
                setHistoryMenu(!HistoryMenu)
                setPictureMenu(false)
                setSettingMenu(false)
            }
        }
        else {
            console.log(PictureMenu)
            if (SettigMenu !== true) {
                setSettingMenu(!SettigMenu)
                setPictureMenu(false)
                setHistoryMenu(false)
            }
        }
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log('signed out successfully')
            navigate("/")
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleclick = (e) => {
        e.preventDefault();
        const updateobj = {}
        updateobj['users/' + auth.currentUser.uid + '/portfolio/availableMoney'] = 1000000;
        updateobj['users/' + auth.currentUser.uid + '/portfolio/profitorlose'] = 0;
        updateobj['users/' + auth.currentUser.uid + '/portfolio/pastTradedAmount'] = 0;
        updateobj['users/' + auth.currentUser.uid + '/portfolio/InvestedAmount'] = 0;
        updateobj['users/' + auth.currentUser.uid + '/portfolio/positionsPL'] = 0;
        updateobj['users/'+auth.currentUser.uid+'/Orders'] = null
        update(ref(db),updateobj).then(()=>{console.log(updateobj)}).catch(err=>{console.log(err)})
        setclose('flex'); // Display the alert
        setTimeout(() => {
            setclose('none'); // Hide the alert after 2000ms (2 seconds)
        }, 2000);
    }

    const handleclose = ()=>{
        setclose('none')
    }

    return (
        <>
            <Header />
            <div className="ProfileDivPage">

                <div className="OuterProfileDiv">
                    <div className="ProfileLeftMenu">
                        <div className="ProfilePhotoProfilePage">
                            <img src={ProfilePhotoUrl} alt="" />
                        </div>

                        <div className="ProfileDetailProfilePage">
                            <p className='ProfileDetailProfilePageP'><pre>hello!   <u style={{ color: "white" }}>{auth.currentUser.displayName}</u></pre></p>
                        </div>
                        <button className='ChangeProfilePictureButton' onClick={() => { handleRightMenu(1) }}>
                            Change Profile Picture
                        </button>
                        <button className='ChangeProfilePictureButton' onClick={() => { handleRightMenu(2) }}>
                            Show History
                        </button>
                        <button className='ChangeProfilePictureButton' onClick={() => { handleRightMenu(3) }}>
                            Settings
                        </button>
                        <button className='ChangeProfilePictureButton' onClick={handleLogout}>
                            Logout
                        </button>

                    </div>
                    <div className="ProfileRightMenu">
                        {
                            PictureMenu ? <>
                                <p>Select Profile Picture</p>
                                <div className="ProfilePictureMenuRight">
                                    <div onClick={handleChangePictureEvent}>
                                        <img src={p1} alt="" />
                                    </div>
                                    <div onClick={handleChangePictureEvent}>
                                        <img src={p2} alt="" />
                                    </div>
                                    <div onClick={handleChangePictureEvent}>
                                        <img src={p3} alt="" />
                                    </div>
                                    <div onClick={handleChangePictureEvent}>
                                        <img src={p4} alt="" />
                                    </div>
                                    <div onClick={handleChangePictureEvent}>
                                        <img src={p5} alt="" />
                                    </div>
                                    <div onClick={handleChangePictureEvent}>
                                        <img src={p6} alt="" />
                                    </div>
                                    <div onClick={handleChangePictureEvent}>
                                        <img src={p7} alt="" />
                                    </div>
                                    <div onClick={handleChangePictureEvent}>
                                        <img src={p8} alt="" />
                                    </div>
                                </div>
                            </> : ""
                        }
                        {
                            HistoryMenu ? <>
                                <p>List of Previous Orders</p>
                                <div className="HistoryMenuRight">
                                    {/* <ListOfOrdersHistory />
                                    <ListOfOrdersHistory/>
                                    <ListOfOrdersHistory />
                                    <ListOfOrdersHistory/>
                                    <ListOfOrdersHistory />
                                    <ListOfOrdersHistory/>
                                    <ListOfOrdersHistory />
                                    <ListOfOrdersHistory/>
                                    <ListOfOrdersHistory />
                                    <ListOfOrdersHistory/> */}
                                </div>
                            </> : ""
                        }
                        {
                            SettigMenu ? <>
                                <p>Settings</p>
                                <div className="settingsDiv">
                                    <div className="SettingsCard">
                                        <h3>Reset Your Account Data</h3>
                                        <button onClick={handleclick}>Reset</button>
                                        <div className="alert" style={{display:close}}>
                                            Account Successfully Resetted.
                                            <button onClick={handleclose}>&times;</button>
                                        </div>
                                    </div>
                                </div>
                            </> : ""
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
