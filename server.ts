import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import ShortUrl from "./models/shortUrl";

const app: Express = express();
mongoose
  .connect("mongodb://localhost:27017/urlShortener")
  .then(() => console.log("Connected to mongoose"))
  .catch((e: Error) => console.log(e.message));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req: Request, res: Response) => {
  res.render("index", { shortUrls: await ShortUrl.find() });
});

app.post("/shortUrls", async (req: Request, res: Response) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req: Request, res: Response) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks += 1;
  await shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 3000);
