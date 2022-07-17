import app from "./src/Routes/index.js";

const PORT = process.env.PORT || 3001;

app.listen(PORT, (req, res) => {
  console.log(`Running on port ${PORT}`);
});
