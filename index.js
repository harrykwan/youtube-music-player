const stream = require("youtube-audio-stream");
const youtubesearchapi = require("youtube-search-api");

const express = require("express");
const app = express();
const port = 3000;

app.get("/search/:keywords", async (req, res) => {
  const keywords = req.params.keywords;
  const result = await youtubesearchapi.GetListByKeyword(keywords);
  res.send(result);
});

app.get("/audio/:videoId", async (req, res) => {
  stream(`http://youtube.com/watch?v=${req.params.videoId}`).pipe(res);
});

app.use(express.static("frontend"));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
