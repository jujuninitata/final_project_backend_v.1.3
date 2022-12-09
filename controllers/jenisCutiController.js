const db = require('./../models');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const getAllJenisCuti = (req, res) => {
  db.jeniscuti
    .findAll({
      where: { status: 1 },
    })
    .then((jenisCuti) => {
      res.status(200).json({ message: 'All data', data: jenisCuti });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getcutibyKodejenis = async (idjenisCUti) => {
  const jeniscuti = await db.jeniscuti.findOne({
    where: { idjeniscuti: idjenisCUti },
  });
  return jeniscuti;
};
const getJenisCutibyUserId = async (req, res) =>
{
  const userid = req.params.userid;
  db.newjatahcuti
    .findAll({
      where: { userid: userid },
    })
    .then((jeniscuti) => {
      const result = jeniscuti.map(async (item) => {
        const namacuti = await getcutibyKodejenis(item.idjeniscuti);
       
        return {
          ...item.dataValues,
          namacuti: namacuti.namacuti
        };
      });
      Promise.all(result).then((data) => {
        res
          .status(200)
          .json({ message: "data cuti by User id", data: data });
      });
      // res.status(200).json({ message: 'data by id', data: result });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};


module.exports = {
  getAllJenisCuti,getJenisCutibyUserId
};
