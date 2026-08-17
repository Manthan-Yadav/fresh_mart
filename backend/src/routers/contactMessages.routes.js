const express = require("express");
const {  CreateContactMessage } = require("../controller/contactMessage.controller");
const router = express.Router();

router.post("/create", CreateContactMessage);

module.exports = router;