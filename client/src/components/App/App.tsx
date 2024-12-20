import { useEffect, useState } from "react";
import { Achievement, AchievementProps } from "../Achievement/Achievement";

import axios from "axios";

import "./App.css";

const App = () => {
  const [achievements, setAchievements] = useState<AchievementProps[]>([]);

  const getAchievements = async () => {
    try {
      const response = await axios.get("http://localhost:3000/achievements");
      setAchievements(response.data);
    } catch (error: any) {
      console.log("Error fetching the page:", error.message);
    }
  };

  useEffect(() => {
    getAchievements();
  }, []);

  return (
    <div className="achievements">
      {achievements.map((achievement, index) => (
        <div key={index}>
          <Achievement
            image={achievement.image}
            name={achievement.name}
            text={achievement.text}
          />
        </div>
      ))}
    </div>
  );
};

export { App };
