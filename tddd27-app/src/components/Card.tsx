import React from "react";

interface Props {
  className: string;
  children: React.ReactNode;
  height?: string | number;
  width?: string | number;
  margin?: string | number;
  padding?: string | number;
}

function Card({ className, children, height, width, margin, padding }: Props) {
  return (
    <div
      className={className}
      style={{
        margin: margin ?? "2rem auto",
        padding: padding ?? "1.5rem",
        border: "1px solid #ccc",
        borderRadius: "15px",
        height: height ?? 'auto',
        width: width ?? 'auto', 
        backgroundColor: "#f9f9ff",
        boxShadow: "0 9px #bbb",
      }}
    >
      {children}
    </div>
  );
}

export default Card;
