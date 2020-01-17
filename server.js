const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
require("dotenv").config();
const listEndpoints = require("express-list-endpoints");
const port = process.env.port || 3002;
const productsRoute = require("./src/route/products");
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.use("/products", productsRoute);
console.log(listEndpoints(app));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
