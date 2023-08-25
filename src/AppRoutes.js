import React from 'react'
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import About from './Components/Html/Pages/About';
import News from './Components/Html/Pages/News';
import Portfolio from './Components/Html/Pages/Portfolio';
import Markets from './Components/Html/Pages/Markets';
import Login from './Components/Html/Pages/Login';
import Trending from './Components/Html/Pages/TrendingMarketPage';
import Home from './Components/Html/Pages/Home';
import Profile from './Components/Html/Pages/Profile';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/News" element={<News />} />
                <Route path="/TrendingMarkets" element={<Trending />} />
                <Route path="/Portfolio" element={<Portfolio />} />
                <Route path="/Market" element={<Markets />} />
                <Route path="/Login" element={<Login />} />
                <Route path='/Profile'  element={<Profile/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes
