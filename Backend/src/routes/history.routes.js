const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const historyController = require("../controllers/history.controller");

const router = express.Router();

router.use(authMiddleware.authUser);
router.post("/", historyController.createHistory);
router.get("/", historyController.getHistory);
router.delete("/", historyController.clearHistory);

module.exports = router;
