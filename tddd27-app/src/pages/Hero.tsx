import { useState } from "react";
import "./Hero.css";
import Button from "../components/Button.tsx";
import SignInCard from "../components/SignInCard.tsx";
import SignUpCard from "../components/SignUpCard.tsx";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  // doSignInWithGoogle,
} from "../firebase/auth.tsx";
import { useAuth } from "../contexts/authContext/index.tsx";
import { Navigate } from "react-router-dom";

function Hero() {
  // using the useAuth hook
  const { userLoggedIn } = useAuth();

  const [showSignInCard, setShowSignInCard] = useState(false);
  const [showSignUpCard, setShowSignUpCard] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

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

  const handleSignIn = async () => {
    console.log("signing in:", signInEmail, signInPassword);
    if (isSigningIn) {
      return;
    }
    setIsSigningIn(true);
    const cred = await doSignInWithEmailAndPassword(
      signInEmail,
      signInPassword
    ).catch((err) => {
      setIsSigningIn(false);
      console.log(err);
    });
    console.log(cred);
  };

  // const onGoogleSignIn = async () => {
  //   if (isSigningIn) {
  //     console.log("user is already signing in");
  //     return;
  //   }
  //   setIsSigningIn(true);
  //   await doSignInWithGoogle().catch((err) => {
  //     setIsSigningIn(false);
  //     console.log(err);
  //   });
  // };
  // TODO: implement google sign in on ui

  const handleSignUp = async () => {
    console.log(
      "signing up:",
      signUpEmail,
      signUpFirstName,
      signUpLastName,
      signUpPassword,
      signUpConfirmPassword
    );
    if (isSigningUp) {
      console.log("user is already signing up");
      return;
    }
    setIsSigningUp(true);
    // TODO: input validation
    await doCreateUserWithEmailAndPassword(
      signUpEmail,
      signUpFirstName,
      signUpLastName,
      signUpPassword
      // signUpConfirmPassword
    ).catch((err) => {
      setIsSigningUp(false);
      console.error(err);
    });
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <div className="hero-container">
        <div className="hero-text-container">
          <h2>Welcome to</h2>
          <h1>trooper</h1>
          <div className="hero-btns">
            <Button
              onClick={onSignInClick}
              buttonColor="btn--white"
              buttonStyle="btn--morepress"
              buttonSize="btn--large"
            >
              Sign in
            </Button>
            <Button
              onClick={onSignUpClick}
              buttonColor="btn--clear"
              buttonStyle="btn--morepress"
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
    </>
  );
}

export default Hero;
