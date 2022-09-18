const express = require("express");
const router = express.Router();
const {addPerson, getPeople, getPerson} = require("./controller");

router.route("/").get(getPeople).post(addPerson);
router.route("/:id").get(getPerson);

module.exports = router;
