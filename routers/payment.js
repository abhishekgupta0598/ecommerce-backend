require("dotenv").config();
const express = require("express");
const { asyncHandler } = require("../common/async");

const stripe = require("stripe")(process.env.REACT_APP_KEY);
const router = express();

router.post("/payment", (req, res) => {
  console.log("req", req.body);
  const { totalQuantity, totalPrice } = req.body;
  console.log("PRODUCT", totalQuantity);
  // console.log("PRICE", req.token);
  console.log("user", req.user);

  return stripe.customers
    .create({
      email: req.user.email,
      source: req.body.token.id,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: totalPrice,
        currency: "usd",
        customer: customer.id,
        receipt_email: req.user.email,
        description: `purchase of ${totalQuantity}`,
        shipping: {
          name: req.user.username,
          address: {
            country: req.user.username,
          },
        },
      });
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
