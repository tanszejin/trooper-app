import React from 'react'
import Button from '../components/Button.tsx'
import './Hero.css'

function Hero() {
  return (
    <div className="hero-container">
        <div className="hero-text-container">
            <h2>Welcome to</h2>
            <h1>trooper</h1>
            <div className="hero-btns">
                <Button onClick={() => console.log('sign in button clicked')} buttonStyle="btn--primary" buttonSize='btn--large'>
                    Sign in
                </Button>
                <Button onClick={() => console.log('sign up button clicked')} buttonStyle="btn--outline" buttonSize='btn--large'>
                    Sign up
                </Button>
            </div>
        </div>
      
    </div>
  )
}

export default Hero
