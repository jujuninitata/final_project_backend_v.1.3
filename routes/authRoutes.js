const router = require("express").Router();
const {
  register,
  login,
  getuser,
  loginWithGoogle,
  forgotPassword,
} = require("./../controllers/authenticationController");

router.post("/register", register);
router.post("/login", login);
router.get("/", getuser);
router.post("/login/google", loginWithGoogle);
router.post("/forgotpassword", forgotPassword);
// router.post("/tambahprofile", tambahprofile)

module.exports = router;
