const db = require('./../models');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const insertjatahCuti = (req, res) => {
  const { userid, periode, kuota, cutidigunakan, sisacuti } = req.body;

  db.jatahcuti
    .create({
      userid,
      periode,
      kuota,
      cutidigunakan,
      sisacuti,
    })
    .then((jatahcuti) => {
      res.status(200).json({ message: 'Data created successfully', data: jatahcuti });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getAlljatahCuti = (req, res) => {
  // #swagger.tags = ['alamat']
  /* #swagger.security = [{
               "basicAuth": []
     }] */

  db.jatahcuti
    .findAll()
    .then((jatahcuti) => {
      res.status(200).json({ message: 'All data', data: jatahcuti });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getjatahCutiById = (req, res) => {
  // #swagger.tags = ['alamat']
  /* #swagger.security = [{
               "basicAuth": []
     }] */

  const id = req.params.id;
  db.jatahcuti
    .findOne({
      where: { id: id },
    })
    .then((jatahcuti) => {
      res.status(200).json({ message: 'data by id', data: jatahcuti });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const updatejatahCuti = (req, res) => {
  // #swagger.tags = ['alamat']
  /* #swagger.security = [{
               "basicAuth": []
     }] */

  //   const role = req.role;
  //   console.log(role);
  //   if (role !== "superadmin" && role !== "admin") {
  //     return res.status(403).json({ message: "Forbidden" });
  //   }

  const id = req.params.id;
  const { userid, periode, kuota, cutidigunakan, sisacuti } = req.body;
  db.alamat
    .update(
      {
        userid,
        periode,
        kuota,
        cutidigunakan,
        sisacuti,
      },
      {
        where: { id: id },
      },
    )
    .then((jatahcuti) => {
      res.status(200).json({ message: 'jatahCuti updated', data: jatahcuti });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const deletejatahCuti = (req, res) => {
  // #swagger.tags = ['alamat']
  /* #swagger.security = [{
               "basicAuth": []
     }] */

  //   if (req.role !== "superadmin" && req.role !== "admin") {
  //     return res.status(403).json({ message: "Forbidden" });
  //   }
  const id = req.params.id;
  db.jatahcuti
    .destroy({
      where: { id: id },
    })
    .then((alamat) => {
      res.status(200).json({ message: 'jatahCuti deleted', data: alamat });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
  insertjatahCuti,
  getAlljatahCuti,
  getjatahCutiById,
  updatejatahCuti,
  deletejatahCuti,
};
