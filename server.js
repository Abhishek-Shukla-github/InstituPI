let express = require("express");
let dotenv = require("dotenv");

//Load the env vars
dotenv.config({ path: "./config/config.env" });
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, data: { msg: "Show all bootcamps" } });
});
app.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, data: { msg: "Add a new bootcamp" } });
});
app.put("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      data: { msg: `Edit a bootcamp:- ${req.params.id}` },
    });
});
app.delete("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      data: { msg: `Delete a bootcamp:- ${req.params.id}` },
    });
});

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
