const router = require("express").Router();
const {
  register,
  login,
  getuser,
  loginWithGoogle,
  forgotPassword,
  sendVerification,
  emailVerification
} = require("./../controllers/authenticationController");

router.post("/register", register);
router.post("/login", login);
router.get("/", getuser);
router.post("/login/google", loginWithGoogle);
router.post("/forgotPassword", forgotPassword);
router.get("/sendVerification/:userId", sendVerification);
router.get("/verify/:verificationCode", emailVerification);	   
// router.post("/tambahprofile", tambahprofile)

module.exports = router;
