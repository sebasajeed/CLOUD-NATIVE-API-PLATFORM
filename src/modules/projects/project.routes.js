const express = require("express");
const authMiddleware = require("../auth/auth.middleware");
const { create, list, remove } = require("./project.controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/", create);
router.get("/", list);
router.delete("/:id", remove);

module.exports = router;
