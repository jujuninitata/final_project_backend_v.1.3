const db = require("./../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  // const { email } = req.body;
  // const checkData = await db.user.findOne({ where: { email } });

  // if (!checkData) {
  //   return res.status(422).json({ message: "email not found!" });
  // }

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

  const link = `http://localhost:3000/home`;
  // const mailOptions = {
  //   from: "<Test>",
  //   to: email,
  //   subject: "Reset Password",
  //   html: `

  //     <h1>Reset Password</h1>
  //     <p>Click this link to reset your password</p>
  //     <a href="${link}">Reset Password</a>
  //   `,
  // };

  // transporter.sendMail(mailOptions, (err, info) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(500).json({ message: "Internal Server Error!" });
  //   }
  //   return res.status(200).json({ message: "Email sent!" });
  // });
  res.redirect(link);
};

module.exports = { register, login, getuser, loginWithGoogle, forgotPassword };
