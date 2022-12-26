const {Router} = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.addUser);
router.get("/:person_key", controller.getUserById);
router.delete("/:person_key", controller.deleteUserById);

module.exports = router;
