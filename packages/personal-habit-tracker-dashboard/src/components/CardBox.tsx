import React from "react";

interface CardProps {
  name: string;
  children: React.ReactNode;
}

const CardBox: React.SFC<CardProps> = ({ name, children }) => (
  <div
    id={name}
    className="card__box"
    style={{
      flex: "0 0 70%"
    }}
  >
    {children}
  </div>
);

export default CardBox;
