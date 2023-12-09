const express = require("express");
const authController = require("../Controllers/authController");

const router = express.Router();

router.get("/allaccount", authController.allAccount);
router.post("/createaccount", authController.createAccount);
router.get("/hello", (req, res) => {
    res.send("Hello");
})

module.exports = router;
