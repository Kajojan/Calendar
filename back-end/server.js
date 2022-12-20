require("dotenv").config();
const express = require("express");
const calRoutes=require('./routes/cal')
const mongoose = require('mongoose')

const app = express();

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/cal', calRoutes)
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, () => {
            console.log("listening on port",process.env.PORT );
          });
    })
    .catch((error)=>{console.log(error)})


