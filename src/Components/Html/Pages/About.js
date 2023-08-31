import React from 'react'
import { useActivePill } from '../JS/HomeHook'
import Header from '../Header'
import Footer from '../Footer'

const About = () => {
  const [activePill, setActivePill] = useActivePill('About')
  return (
    <>

      <Header />
      <div>
        <p>About</p>
      </div>
      <Footer/>
    </>
  )
}

export default About
