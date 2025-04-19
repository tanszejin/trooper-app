import React from "react";
import Button from "./Button";
import Card from "./Card";

interface Props {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSignIn: () => void;
}

function SignInCard({ setEmail, setPassword, handleSignIn }: Props) {
  return (
    <Card
      className="sign-in-card"
    >
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "1rem",
          padding: "0.5rem",
          borderRadius: "25px",
        }}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "1rem",
          padding: "0.5rem",
          borderRadius: "25px",
        }}
        required
      />
      <Button
        onClick={handleSignIn}
        buttonStyle="btn--pressed--blue"
        buttonSize="btn--medium"
      >
        Sign in
      </Button>
    </Card>
  );
}

export default SignInCard;
