const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const betasRoute = require("./routes/betas");
const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/betas", betasRoute);

app.listen(PORT, () => console.log(`Server started.`));
