const {Router} = require("express");
const controller = require("./controller");
const router = Router();
//Routes
router.get("/", controller.getUsers);
router.post("/", controller.addUser);
router.get("/:person_key", controller.getUserById);
router.put("/:person_key", controller.updateUser);
router.delete("/:person_key", controller.deleteUserById);

module.exports = router;
