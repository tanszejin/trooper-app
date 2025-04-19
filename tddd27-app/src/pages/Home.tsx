import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import './Home.css'


function Home() {
  
  const [showNavBar, setShowNavBar] = useState(false);

  return (
    <div className="home-container">
      {showNavBar && <NavBar />}
      <h1>Home page</h1>
    </div>
  )
}

export default Home
