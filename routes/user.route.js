const router = require("express").Router();
const { setPost, getPost } = require("../controllers/user.controller");

router.get("/", getPost);
router.post("/", setPost);

module.exports = router;
