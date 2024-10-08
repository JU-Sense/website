require("dotenv").config();
const express = require("express");
const router = express.Router();
const app = express();

const morgan = require("morgan");
app.use(morgan("tiny"));

// set the view engine to ejs
app.set("view engine", "ejs");

// serve static assets
app.use(express.static(__dirname + "/views"));

//Routes
app.use("/", require("./routes/index"));
app.use("/dataset", require("./routes/dataset"));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
