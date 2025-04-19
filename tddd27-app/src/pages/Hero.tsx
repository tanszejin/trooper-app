import React, { useState } from "react";
import "./Hero.css";
import Button from "../components/Button.tsx";
import SignInCard from "../components/SignInCard.tsx";
import SignUpCard from "../components/SignUpCard.tsx";

function Hero() {
  const [showSignInCard, setShowSignInCard] = useState(false);
  const [showSignUpCard, setShowSignUpCard] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  const onSignInClick = () => {
    console.log("sign in button clicked");
    setShowSignInCard(true);
    setShowSignUpCard(false);
  };

  const onSignUpClick = () => {
    console.log("sign up button clicked");
    setShowSignInCard(false);
    setShowSignUpCard(true);
  };

  const handleSignIn = () => {
    // TODO: backend
    console.log("signing in:", signInEmail, signInPassword);
  };

  const handleSignUp = () => {
    // TODO: backend
    console.log(
      "signing up:",
      signUpEmail,
      signUpFirstName,
      signUpLastName,
      signUpPassword,
      signUpConfirmPassword
    );
  };

  return (
    <div className="hero-container">
      <div className="hero-text-container">
        <h2>Welcome to</h2>
        <h1>trooper</h1>
        <div className="hero-btns">
          <Button
            onClick={onSignInClick}
            buttonStyle="btn--pressed--white"
            buttonSize="btn--large"
          >
            Sign in
          </Button>
          <Button
            onClick={onSignUpClick}
            buttonStyle="btn--pressed--clear"
            buttonSize="btn--large"
          >
            Sign up
          </Button>
        </div>
      </div>

      {showSignInCard && (
        <SignInCard
          setEmail={setSignInEmail}
          setPassword={setSignInPassword}
          handleSignIn={handleSignIn}
        />
      )}
      {showSignUpCard && (
        <SignUpCard
          setEmail={setSignUpEmail}
          setFirstName={setSignUpFirstName}
          setLastName={setSignUpLastName}
          setPassword={setSignUpPassword}
          setConfirmPassword={setSignUpConfirmPassword}
          handleSignUp={handleSignUp}
        />
      )}
    </div>
  );
}

export default Hero;
