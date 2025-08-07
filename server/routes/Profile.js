
const express = require("express");
const { auth } = require("../middlewares/auth");
const { getAllUserDetails } = require("../controllers/profile");
const router = express.Router();

router.get("/getUserDetails", auth, getAllUserDetails);

module.exports = router;