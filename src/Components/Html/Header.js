import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../Css/Header.css'
import LogoWhite from './Logo-white.png'
import { useLoggedInUser, userdetail, userprofile } from '../../User/UserAthentication';
import { auth } from '../../utilitise/Firebase';
// import Logoblack from './Logo-black.png'
// import About from './Pages/About';
// import Markets from './Pages/Markets';
// import News from './Pages/News';
// import Portfolio from './Pages/Portfolio';
// import Trending from './Pages/Trending';
// import Home from './Pages/Home';
// import Login from './Pages/Login';

const Header = () => {
    const { user } = useLoggedInUser()
    var open = 0
    const toggleMenu = () => {
        const tag = document.getElementById('Menu')
        if (open === 0) {
            tag.style.display = "inline-block";
            open = 1
        }
        else {
            tag.style.display = "none"
            open = 0
        }
    }
    const [isHeaderBlack, setIsHeaderBlack] = useState(false);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const scrollThreshold = window.innerHeight;

        // Check if the scroll position has passed the threshold
        if (scrollPosition > scrollThreshold) {
            setIsHeaderBlack(true);
        } else {
            setIsHeaderBlack(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const hh = () => {
        console.log(user)
    }
    return (
        <>
            {/* // <Router> */}
            <div className="Page" onClick={hh}>

                <div className='NavbarDiv1' id='navbar' style={{ backgroundColor: isHeaderBlack ? 'black' : 'transparent' }}>
                    <div className="NavbarToggleDiv">
                        <button onClick={toggleMenu} onBlur={toggleMenu}>
                            <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Menu / Menu_Alt_03">
                                    <path id="Vector" d="M5 17H13M5 12H19M5 7H13" stroke="white" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className="LogoDiv">
                        <Link to='/'>
                            <img src={LogoWhite} alt="" srcSet="" />
                            <p>LearnToTrade</p>
                        </Link>
                    </div>

                    <div className="NavbarMenuDiv" id='Menu'>
                        <ul className="NavbarMenuUl">

                            <li className='NavbarMenuLi'>
                                <Link className='NavbarMenuLinks' to='/About'>About</Link>
                            </li>
                            <li className='NavbarMenuLi'>
                                <Link className='NavbarMenuLinks' to='/News'>News</Link>
                            </li>
                            <li className='NavbarMenuLi'>
                                <Link className='NavbarMenuLinks' to='/TrendingMarkets'>Trending Markets</Link>
                            </li>
                            <li className='NavbarMenuLi'>
                                <Link className='NavbarMenuLinks' to='/Portfolio'>PortFolio</Link>
                            </li>
                            <li className='NavbarMenuLi'>
                                <Link className='NavbarMenuLinks' to='/Market'>Market</Link>
                            </li>
                            <li className='NavbarMenuLi Mobile'>
                                <Link className='NavbarMenuLinks' to='/Market'>SignIn</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="NavbarProfileSigninDiv">
                        <div className="ProfileDiv">
                            {auth.currentUser ? <>
                                <Link to='/Profile' className='userAnchorHeader'>
                                    {() => {
                                        console.log(auth.currentUser.photoURL)
                                    }}
                                    <img src={auth.currentUser.photoURL} alt="" srcset="" height="30px" />
                                    <p className='usernameHeader'>{auth.currentUser.displayName}</p>
                                </Link>
                            </> : <>
                                <Link to='/Login'>
                                    <svg height="30px" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_15_82)">
                                            <rect width="24" height="24" fill="none" />
                                            <g filter="url(#filter0_d_15_82)">
                                                <path
                                                    d="M14.3365 12.3466L14.0765 11.9195C13.9082 12.022 13.8158 12.2137 13.8405 12.4092C13.8651 12.6046 14.0022 12.7674 14.1907 12.8249L14.3365 12.3466ZM9.6634 12.3466L9.80923 12.8249C9.99769 12.7674 10.1348 12.6046 10.1595 12.4092C10.1841 12.2137 10.0917 12.022 9.92339 11.9195L9.6634 12.3466ZM4.06161 19.002L3.56544 18.9402L4.06161 19.002ZM19.9383 19.002L20.4345 18.9402L19.9383 19.002ZM16 8.5C16 9.94799 15.2309 11.2168 14.0765 11.9195L14.5965 12.7737C16.0365 11.8971 17 10.3113 17 8.5H16ZM12 4.5C14.2091 4.5 16 6.29086 16 8.5H17C17 5.73858 14.7614 3.5 12 3.5V4.5ZM7.99996 8.5C7.99996 6.29086 9.79082 4.5 12 4.5V3.5C9.23854 3.5 6.99996 5.73858 6.99996 8.5H7.99996ZM9.92339 11.9195C8.76904 11.2168 7.99996 9.948 7.99996 8.5H6.99996C6.99996 10.3113 7.96342 11.8971 9.40342 12.7737L9.92339 11.9195ZM9.51758 11.8683C6.36083 12.8309 3.98356 15.5804 3.56544 18.9402L4.55778 19.0637C4.92638 16.1018 7.02381 13.6742 9.80923 12.8249L9.51758 11.8683ZM3.56544 18.9402C3.45493 19.8282 4.19055 20.5 4.99996 20.5V19.5C4.70481 19.5 4.53188 19.2719 4.55778 19.0637L3.56544 18.9402ZM4.99996 20.5H19V19.5H4.99996V20.5ZM19 20.5C19.8094 20.5 20.545 19.8282 20.4345 18.9402L19.4421 19.0637C19.468 19.2719 19.2951 19.5 19 19.5V20.5ZM20.4345 18.9402C20.0164 15.5804 17.6391 12.8309 14.4823 11.8683L14.1907 12.8249C16.9761 13.6742 19.0735 16.1018 19.4421 19.0637L20.4345 18.9402Z"
                                                    fill="white" />
                                            </g>
                                        </g>
                                        <defs>
                                            <filter id="filter0_d_15_82" x="2.55444" y="3.5" width="18.8911" height="19"
                                                filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                <feColorMatrix in="SourceAlpha" type="matrix"
                                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                <feOffset dy="1" />
                                                <feGaussianBlur stdDeviation="0.5" />
                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_82" />
                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_82"
                                                    result="shape" />
                                            </filter>
                                            <clipPath id="clip0_15_82">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </Link>
                            </>}
                        </div>
                        {
                            auth.currentUser ? "" : <>

                                <div className="SignInDiv">

                                    <span>

                                        <button>
                                            <Link to="/Login">
                                                <div className="ButtonSkewDiv">
                                                    Get Started
                                                </div>
                                            </Link>
                                        </button>

                                    </span>


                                </div>
                            </>
                        }
                    </div>

                </div>
                {/* <Routes>
                    <Route exact path='/' element={< Home />}></Route>
                    <Route exact path='/About' element={< About />}></Route>
                    <Route exact path='/News' element={< News />}></Route>
                    <Route exact path='/TrendingMarkets' element={< Trending />}></Route>
                    <Route exact path='/Portfolio' element={< Portfolio />}></Route>
                    <Route exact path='/Market' element={< Markets />}></Route>
                    <Route exact path='/Login' element={< Login />}></Route>

                </Routes> */}

            </div>
            {/* </Router> */}
        </>
    )
}

export default Header
