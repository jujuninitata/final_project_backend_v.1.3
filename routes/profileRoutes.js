const router = require("express").Router();
const {
  tambahProfile,
  getAllProfile,
  getProfileById,
  getProfileByUserId,
} = require("./../controllers/profilecontroller");
router.post("/", tambahProfile);
router.get("/", getAllProfile);
router.get("/:id", getProfileById);
router.get("/user/:userid", getProfileByUserId);
router.get("/detail/:userid", getProfileByUserId);
module.exports = router;
