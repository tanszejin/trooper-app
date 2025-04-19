import React from "react";

interface Props {
  className: string;
  children: React.ReactNode;
}

function Card({ className, children }: Props) {
  return (
    <div
      className={className}
      style={{
        margin: "2rem auto",
        padding: "1.5rem",
        border: "1px solid #ccc",
        borderRadius: "15px",
        width: "300px", // i think this can still be changed in css?
        backgroundColor: "#f9f9f9",
        boxShadow: "0 9px #bbb",
      }}
    >
      {children}
    </div>
  );
}

export default Card;
