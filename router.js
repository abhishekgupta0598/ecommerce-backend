const express = require("express");
const User = require("./Query/users");
const Product = require("./Query/products");
const Item = require("./Query/items");
const Cart = require("./Query/cart");
const Login = require("./login");
const router = express();

router.use(express.json());

// login
router.post("/login", (req, res) => {
  Login.login(req.body, function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

// user router
router.post("/signup", (req, res) => {
  User.create(req.body, function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

router.get("/user", (req, res) => {
  User.findAll(function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

router.get("/user/:id", (req, res) => {
  User.findById(req.params.id, function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

router.delete("/user/:id", (req, res) => {
  User.deleteById(req.params.id, function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

// product router
router.get("/product", (req, res) => {
  Product.findAll(function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

router.post("/product", (req, res) => {
  Product.create(req.body, function (err, data) {
    if (err) {
      console.log("error", err);
      res.json(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

// items router
router.post("/item", (req, res) => {
  Item.create(req.body, function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

router.get("/item", (req, res) => {
  Item.findAll(function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

router.get("/item/:id", (req, res) => {
  Item.findById(req.params.id, function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

router.delete("/item/:id", (req, res) => {
  Item.deleteById(req.params.id, function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

// cart router
router.post("/cart", (req, res) => {
  Cart.create(req.body, function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

router.get("/cart", (req, res) => {
  Cart.findAll(function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

router.get("/cart/:id", (req, res) => {
  Cart.findById(req.params.id, function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

router.delete("/cart/:id", (req, res) => {
  Cart.deleteById(req.params.id, function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

router.put("/cart/:cartId/:id", (req, res) => {
  Cart.update(req.params.cartId, req.params.id, function (err, data) {
    if (err) {
      console.log("error", err);
      res.json(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

router.get("/cart/ByUser/:id", (req, res) => {
  Cart.findByUser(req.params.id, function (err, data) {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
});

module.exports = router;
