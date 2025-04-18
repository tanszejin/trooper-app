import React, { useState } from "react";
import Button from "../components/Button.tsx";
import "./Hero.css";
import SignInCard from "../components/SignInCard.tsx";

function Hero() {
    const [showSignInCard, setShowSignInCard] = useState(false);
    const [showSignUpCard, setShowSignUpCard] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignInClick = () => {
        console.log("sign in button clicked");
        setShowSignInCard(true);
        setShowSignUpCard(false);
    }

    const onSignUpClick = () => {
        console.log("sign up button clicked");
        setShowSignInCard(false);
        setShowSignUpCard(true);
    }

    const handleSignIn = () => {
        // TODO: backend
        console.log('signing in: ', email, password)
    }

    return (
        <div className="hero-container">
        <div className="hero-text-container">
            <h2>Welcome to</h2>
            <h1>trooper</h1>
            <div className="hero-btns">
            <Button
                onClick={onSignInClick}
                buttonStyle="btn--primary"
                buttonSize="btn--large"
            >
                Sign in
            </Button>
            <Button
                onClick={onSignUpClick}
                buttonStyle="btn--outline"
                buttonSize="btn--large"
            >
                Sign up
            </Button>
            </div>
        </div>

        {showSignInCard && <SignInCard setEmail={setEmail} setPassword={setPassword} handleSignIn={handleSignIn}/>}

        </div>
    );
}

export default Hero;
