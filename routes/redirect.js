const express = require("express");
const router = express.Router();
router.get("/item", (req,res) => {
    res.redirect(301,"/products")
});
module.exports = router;