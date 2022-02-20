const express = require('express');
const router = express.Router();
const products = require("../products")
router.get("/", (req,res) => {
    res.send(products);
    console.log(products)
})
module.exports = router;