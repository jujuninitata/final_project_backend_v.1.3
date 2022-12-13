const db = require("./../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");										 
const { encrypt, decrypt } = require("../utils/crypto");														  
// using google app password authentication to send email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "suangga2003@gmail.com",
    pass: "pyosflpthucdycrz",
  },
});

const getuser = async (req, res) => {
  try {
    const users = await db.user.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const validateToken = async (req, res) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const isiDataToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await db.user.findByPk(isiDataToken.id);
    res.json(user);
  } catch (err) {
    res.status(402).json({ message: "Authorization Failed!" });
  }
};

const register = async (req, res) => {
  const { email, nip, userid, password, confirmPassword } = req.body;

  //validasi user ada atau tidak
  const checkData = await db.profile.findOne({ where: { nip, email, userid } });
  console.log(checkData);
  if (!checkData) {
    return res.status(422).json({ message: "NIP tidak ditemukan!" });
  }
  //validasi user ada atau tidak
  const validateEmail = await db.user.findOne({ where: { email } });
  if (validateEmail) {
    return res.status(422).json({ message: "email already exist!" });
  }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password dan Confirm Password tidak sama!" });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const resAdd = await db.user.create({
    userid,
    email,
    password: hashPassword,
    roleId: checkData.roleId,
  });
  return res.status(201).json({
    message: "register data successfully!",
    data: resAdd,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const checkData = await db.user.findOne({ where: { email } });

  if (!checkData) {
    return res.status(422).json({ message: "email or password not found!" });
  }

  const comparePassword = await bcrypt.compare(password, checkData.password);
  if (!comparePassword) {
    return res.status(422).json({ message: "email or password not found!" });
  }

  const profile = await db.profile.findOne({
    where: { userid: checkData.userid },
  });
  const role = await db.role.findOne({ where: { roleId: checkData.roleId } });

  //get roleName from table role where roleId = checkData.roleId
  // const role = await db.role.findOne({ where: { roleId: checkData.roleId } });

  const token = jwt.sign(
    {
      id: checkData.id,
      userid: checkData.userid,
      email: checkData.email,
      role: checkData.roleId,
      nama: profile.nama,
      nip: profile.nip,
      role: role.roleName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      //expires in 1 day
      expiresIn: "1d",
    }
  );
  return res.status(200).json({ message: "login successfully!", token });
};

const loginWithGoogle = async (req, res, next) => {
  const { email } = req.body;
  const checkData = await db.user.findOne({ where: { email } });

  if (!checkData) {
    //return false
    return res
      .status(422)
      .json({ status: false, message: "email or password not found!" });
  }

  const profile = await db.profile.findOne({
    where: { userid: checkData.userid },
  });
  const role = await db.role.findOne({ where: { roleId: checkData.roleId } });

  const token = jwt.sign(
    {
      id: checkData.id,
      userid: checkData.userid,
      email: checkData.email,
      role: checkData.roleId,
      nama: profile.nama,
      nip: profile.nip,
      role: role.roleName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      //expires in 1 day
      expiresIn: "1d",
    }
  );
  return res.status(200).json({ message: "login successfully!", token });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const checkData = await db.user.findOne({ where: { email } });

  if (!checkData) {
    return res.status(422).json({ message: "email not found!" });
  }

  // const token = jwt.sign(
  //   {
  //     id: checkData.id,
  //     userid: checkData.userid,
  //     email: checkData.email,
  //     role: checkData.roleId,
  //   },
  //   process.env.ACCESS_TOKEN_SECRET,
  //   {
  //     //expires in 1 day
  //     expiresIn: "1d",
  //   }
  // );

  // generate a new password and hash it
  const newPassword = Math.random().toString(36).slice(-8);
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(newPassword, salt);  

    // update the user's password
  await checkData.update({
    password: passwordHash,
  });
  
  // const link = `http://localhost:3000`;
  const mailOptions = {
    from: "suangga2003@gmail.com",
    to: email,
    subject: "Reset Password",
		 
    // html: `

    //   <h1>Reset Password</h1>
    //   <p>Click this link to reset your password</p>
    //   <a href="${link}">Reset Password</a>
    // `,
    html: `
        <p>Your new password is <b>${newPassword}</b>.<br>You can use this password to log in to your account.</p>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error!" });
    } else {
      console.log(`Email sent: ${info.response}`);
    }
    return res.status(200).json({ message: "Email sent!" });
  });

  // res.redirect(link);
  res.json({ msg: "Password reset successful" });
};

const sendVerification = async (req, res) => {
  const { userId } = req.params;

  const userDetail = await db.user.findByPk(userId);
  const verificationCode = Math.random().toString(36).slice(2);

  // update user's verificationCode for first sign-in
  await userDetail.update({
    verificationCode: verificationCode,
    isVerified: false,
  });

  const hash = encrypt(verificationCode + userDetail.email);

  const link = "http://" + req.get("host") + "/api/v1/auth/verify/" + hash;
  const mailOptions = {
    from: "suangga2003@gmail.com",
    to: userDetail.email,
    subject: "Email Verification",
    html: `
        <p>Hello,<br>You are now registered as a member.<br>Click on the link to verify your email!<br><a href="${link}">Click here to verify</a></p>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error!" });
    } else {
      console.log(`Email sent: ${info.response}`);
    }
    return res.status(200).json({ message: "Email sent!" });
  });

  console.log(
    "Verification code for " +
      userDetail.email +
      " is this: " +
      verificationCode
  );

  res.json({ msg: "Verification sent, Please check your email!" });
};

const emailVerification = async (req, res) => {
  const { hashCode } = req.params;
  console.log("param is: " + hashCode);

  const text = decrypt(hashCode);
  const verificationCode = text.slice(0, 10);
  const email = text.slice(10);

  const user = await db.user.findOne({ where: { email } });

  // if ((req.protocol + "://" + req.get('host')) == host)
  // {
  // console.log("Domain is matched. Information is from Authentic email");
  if (verificationCode == user.verificationCode) {
    await user.update({
      isVerified: true,
    });
  }
  // }

  res.json({ msg: "Verification successful, continue to Login" });
};

module.exports = {
  register,
  login,
  getuser,
  loginWithGoogle,
  forgotPassword,
  sendVerification,
  emailVerification,
};
