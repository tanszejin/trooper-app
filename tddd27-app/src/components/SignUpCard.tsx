import React from "react";
import Button from "./Button";
import Card from "./Card";

interface Props {
  setEmail: (email: string) => void;
  setFirstName: (firstname: string) => void;
  setLastName: (lastname: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmpassword: string) => void;
  handleSignUp: () => void;
}

function SignUpCard({
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setConfirmPassword,
  handleSignUp,
}: Props) {
  return (
    <Card
      className="sign-up-card" width={300}
    >
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "1rem",
          padding: "0.2rem 0.5rem",
          borderRadius: "25px",
        }}
        required
      />
      <input
        type="text"
        placeholder="First name"
        onChange={(e) => setFirstName(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "1rem",
          padding: "0.2rem 0.5rem",
          borderRadius: "25px",
        }}
        required
      />
      <input
        type="text"
        placeholder="Last name"
        onChange={(e) => setLastName(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "1rem",
          padding: "0.2rem 0.5rem",
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
          padding: "0.2rem 0.5rem",
          borderRadius: "25px",
        }}
        required
      />
      <input
        type="password"
        placeholder="Confirm password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "1rem",
          padding: "0.2rem 0.5rem",
          borderRadius: "25px",
        }}
        required
      />
      <Button
        onClick={handleSignUp}
        buttonStyle="btn--pressed--blue"
        buttonSize="btn--medium"
      >
        Sign up
      </Button>
    </Card>
  );
}

export default SignUpCard;
