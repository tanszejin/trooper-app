import React from "react";

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
    <div
      className="sign-up-card"
      style={{
        margin: "2rem auto",
        padding: "1.5rem",
        border: "1px solid #ccc",
        borderRadius: "15px",
        width: "300px",
        height: "auto",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 9px #bbb",
      }}
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
      <button
        onClick={handleSignUp}
        style={{
          width: "100%",
          borderRadius: "25px",
          backgroundColor: "#0079bf",
          color: "aliceblue",
          fontFamily: "nunito-bold",
        }}
      >
        Sign up
      </button>
    </div>
  );
}

export default SignUpCard;
