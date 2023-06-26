require("dotenv").config();
const express = require("express");
const calRoutes = require("./routes/cal");
const mongoose = require("mongoose");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:31200"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.get("/:download", (req, res) => {
  const { download } = req.params;
  const file = `${__dirname}/files/${download}`;
  res.download(file);
});



app.use("/api/cal", calRoutes);
mongoose.set("strictQuery", false);



mongoose
  .connect('mongodb://mongodb-service:27017/user')
  .then(() => {
    app.listen(4000, () => {
      console.log("listening on port", 4000);
    });
  })
  .catch((error) => {
    console.log(error);
  });

