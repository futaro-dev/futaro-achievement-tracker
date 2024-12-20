import express, { Express, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import "dotenv/config";

import cors from "cors";
const corsOptions = {
  origin: ["http://localhost:5173"],
};

const app: Express = express();
const port = process.env.PORT;

app.use(cors(corsOptions));

app.get("/achievements", async (request: Request, response: Response) => {
  const url = "https://steamcommunity.com/stats/105600/achievements";

  try {
    const axiosResponse = await axios.get(url);
    const selector = cheerio.load(axiosResponse.data);

    const achievementElements: Object[] = [];

    selector("div.achieveRow").each((index, div) => {
      const achievementElement: {
        name: string;
        text: string;
        image: string;
      } = { name: "", text: "", image: "" };

      const achievementNameElement = selector(div).find("div.achieveTxt>h3");
      if (achievementNameElement.length > 0) {
        achievementElement.name = selector(achievementNameElement).text();
      }

      const achievementTextElement = selector(div).find("div.achieveTxt>h5");
      if (achievementTextElement.length > 0) {
        achievementElement.text = selector(achievementTextElement).text();
      }

      const achievementImageElement = selector(div).find(
        "div.achieveImgHolder > img"
      );
      if (achievementImageElement.length > 0) {
        achievementElement.image =
          selector(achievementImageElement).attr("src") || "";
      }

      achievementElements.push(achievementElement);
    });

    response.json(achievementElements);
  } catch (error: any) {
    console.error("Error fetching the page:", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
