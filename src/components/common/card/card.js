import "./card.css";
import React from "react";

const Card = ({ children, className }) => (
  <div className={`${className}`}>{children}</div>
);

export default Card;
