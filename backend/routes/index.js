const express = require("express");
const userRoute = require("./user");
const router = express.Router();

// whatever comes api/v1/user will come here
router.use("/user", userRoute);

// router.use("/transaction");

module.exports = router;
