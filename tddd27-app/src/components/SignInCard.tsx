import React from "react";

interface Props {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSignIn: () => void;
}

function SignInCard({ setEmail, setPassword, handleSignIn }: Props) {
  return (
    <div className="sign-in-card"
      style={{
        margin: "2rem auto",
        padding: "1.5rem",
        border: "1px solid #ccc",
        borderRadius: "15px",
        width: "300px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 9px #bbb"
      }}
    >
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem", borderRadius: "25px" }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem", borderRadius: "25px" }}
      />
      <button onClick={handleSignIn} style={{ width: "100%", borderRadius: "25px" }}>
        Sign in
      </button>
    </div>
  );
}

export default SignInCard;
