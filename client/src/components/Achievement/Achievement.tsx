import React from "react";

import "./Achievement.css";

export interface AchievementProps {
  name: string;
  text: string;
  image: string;
}

const Achievement: React.FC<AchievementProps> = ({ name, text, image }) => {
  return (
    <div className="container">
      <div className="image">
        <img src={image} />
      </div>
      <div className="information">
        <div className="name">{name}</div>
        <div className="text">{text}</div>
      </div>
    </div>
  );
};

export { Achievement };
