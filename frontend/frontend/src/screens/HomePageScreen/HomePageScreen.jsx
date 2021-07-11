import React from 'react'
import './HomePageScreen.css'
import NavBar from '../../components/NavBar'
import Headers from '../../components/Headers'
import Feature from '../../components/Feature'
import Offer from '../../components/Offer'
import About from '../../components/About'
import Contact from '../../components/Contact'
function HomePageScreen() {
    return (
        <div className="homepagescreen">
            <NavBar/> 
            <Headers/>
            <Feature/>
            <Offer/>
            <About/>
            <Contact/>
        </div>
    )
}

export default HomePageScreen
