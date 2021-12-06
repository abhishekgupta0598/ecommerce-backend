require("dotenv").config();
const express = require("express");
const cros = require("cors");
const expressjwt = require("express-jwt");

const app = express();

app.use(cros());
app.use(express.json());
app.use(
  expressjwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256']})
    .unless({path: [
      '/auth/login',
      '/auth/register',
      '/product/list'
    ]}));

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use("/auth", require('./routers/auth'));
app.use("/products", require('./routers/products'))
app.use("/carts", require('./routers/carts'));;

app.listen(9090, () => console.log("listening port 9090"));
