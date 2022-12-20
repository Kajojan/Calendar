require("dotenv").config();
const express = require("express");
const calRoutes=require('./routes/cal')

const app = express();

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/cal', calRoutes)

app.listen(process.env.PORT, () => {
  console.log("listening on port 4000!");
});
