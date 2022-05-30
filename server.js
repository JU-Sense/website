const express = require("express");
const router = express.Router();
const app = express();

require("dotenv").config();

// set the view engine to ejs
app.set("view engine", "ejs");

// serve static assets
app.use(express.static(__dirname + "/views"));

//Routes
app.use("/", require("./routes/index"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
