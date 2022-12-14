const db = require("./../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const insertTrxCuti = (req, res) => {
 
  const {
    userid,
    idjenisCUti,
    tanggalmulai,
    tanggalakhir,
    durasi,
    alasan,
    status,
    approveby,
    approvalreason,
    approvalstatus,sisaCuti,
  } = req.body;

  if (durasi > sisaCuti)
  {
    return res.status(400).send({ message: "Durasi tidak boleh melebihi sisa cuti" });
  }
  if (durasi <1)
  {
    return res.status(400).send({ message: "Durasi tidak boleh kosong" });
  }
  
  db.trxcuti
    .create({
      idcuti: uuidv4(),
      userid,
      idjenisCUti,
      tanggalmulai,
      tanggalakhir,
      durasi,
      alasan,
      status,
      createdate: new Date(),
      approveby,
      approvalreason,
      approvalstatus,
    })
    .then(async (trxCuti) => {
       const jatahCuti = await db.newjatahcuti.findOne({
        where: { userid: userid, 
                idjeniscuti:idjenisCUti },
      });
      //console.log (jatahCuti)
      const sisacuti = jatahCuti.sisacuti - durasi;
      const cutidigunakan = jatahCuti.cutidigunakan + durasi;

      db.newjatahcuti
        .update(
          {
            sisacuti,
            cutidigunakan,
          },
          {
            where: { userid:userid, idjeniscuti:idjenisCUti},
          }
        )
      
    })
    .then((trxCuti) => {
      res
        .status(200)
        .json({ message: "Data created successfully", data: trxCuti });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getAllTrxCuti = (req, res) => {
  db.trxcuti
    .findAll()
    .then((trxCuti) => {
      const result = trxCuti.map(async (item) => {
        const jenisCuti = await getJenisCutiById(item.idjenisCUti);
        const profile = await getProfileByUserId(item.userid);
        //transform tanggalmulai to dd-mm-yyyy
        return {
          ...item.dataValues,
          jeniscuti: jenisCuti?.namacuti,
          nama: profile?.nama,
          nip: profile?.nip,
          divisi: profile?.kodeunit,
        };
      });
      Promise.all(result).then((data) => {
        res.status(200).json({ message: "data by id", data: data });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getTrxCutiById = (req, res) => {
  const id = req.params.id;
  db.trxcuti
    .findOne({
      where: { id: id },
    })
    .then((trxCuti) => {
      res.status(200).json({ message: "data by id", data: trxCuti });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getTrxCutiByCutiId = (req, res) => {
  // #swagger.tags = ['alamat']
  /* #swagger.security = [{
               "basicAuth": []
     }] */

  const cutiId = req.params.cutiId;
  db.trxcuti
    .findOne({
      where: { idcuti: cutiId },
    })
    .then(async (trxCuti) => {
      const jenisCuti = await getJenisCutiById(trxCuti.idjenisCUti);
      const profile = await getProfileByUserId(trxCuti.userid);
      const jatahcuti = await getJatahCutiByUserIdJenis(trxCuti.userid,trxCuti.idjenisCUti);
      console.log(jatahcuti.sisacuti);
      const result = {
        ...trxCuti.dataValues,
        jeniscuti: jenisCuti.namacuti,
        nama: profile.nama,
        nip: profile.nip,
        divisi: profile.kodeunit,
        sisacuti: jatahcuti.sisacuti,
      };
      res.status(200).json({ message: "data by id", data: result });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getJenisCutiById = async (idjenis) => {
  const jenisCuti = await db.jeniscuti.findOne({
    where: { idjeniscuti: idjenis },
  });
  //console.log(jenisCuti)
  return jenisCuti;
  
};

const getProfileByUserId = async (userid) => {
  const profile = await db.profile.findOne({
    where: { userid: userid },
  });
  return profile;
};

const getJatahCutiByUserId = async (userid) => {
  const jatahCuti = await db.jatahcuti.findOne({
    where: { userid: userid },
  });
  return jatahCuti;
};

const getJatahCutiByUserIdJenis = async (userid,idjeniscuti) => {
  const jatahCuti = await db.newjatahcuti.findOne({
    where: { userid: userid,
            idjeniscuti:idjeniscuti },
  });
  // console.log(jatahCuti)
  return jatahCuti;
};


const approveTrxCuti = (req, res) => {
    const idcuti = req.params.idcuti;
    const { approveby, approvalreason } = req.body;
  
    db.trxcuti
      .update(
        {
          status: 2,
          approveby,
          approvalreason,
          approvalstatus: 2,
        },
        {
          where: { idcuti: idcuti },
        }
      )
      .then((trxCuti) => {
        res
          .status(200)
          .json({ message: "Data updated successfully", data: trxCuti });
      })
      
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  };

const rejectCuti = (req, res) => {
  const idcuti = req.params.idcuti;
  const { approveby, approvalreason } = req.body;

  db.trxcuti
    .update(
      {
        status: 3,
        approveby,
        approvalreason,
        approvalstatus: 3,
      },
      {
        where: { idcuti: idcuti },
      }
    )
    .then(async (trxcuti) => 
    {
      const trxCutiData = await db.trxcuti.findOne
      ({
        where: { idcuti: idcuti },
      });
        const jeniscuti = trxCutiData.idjenisCUti;
        const durasi = trxCutiData.durasi;
        const jatahcuti = await getJatahCutiByUserIdJenis(trxCutiData.userid,jeniscuti);
        const sisacutibefore =jatahcuti.sisacuti;
        const cutidigunakanbefore = jatahcuti.cutidigunakan;
        const sisacuti = sisacutibefore + durasi;
        const cutidigunakan = cutidigunakanbefore - durasi;
        
      db.newjatahcuti
      .update(
        {
          sisacuti,
          cutidigunakan,
        },
        {
          where: { userid:trxCutiData.userid, idjeniscuti:jeniscuti},
        }
      )
    })
    .then((trxCuti) => {
      res
        .status(200)
        .json({ message: "Data Reject successfully", data: trxCuti });
    })

    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const cancelCuti = (req, res) => {
  const idcuti = req.params.idcuti;
  const { alasan } = req.body;

  db.trxcuti
    .update(
      {
        status: 4,
        alasan
      },
      {
        where: { idcuti: idcuti },
      }
    )
    .then(async (trxcuti) => 
    {
      const trxCutiData = await db.trxcuti.findOne
      ({
        where: { idcuti: idcuti },
      });
        const jeniscuti = trxCutiData.idjenisCUti;
        const durasi = trxCutiData.durasi;
        const jatahcuti = await getJatahCutiByUserIdJenis(trxCutiData.userid,jeniscuti);
        const sisacutibefore =jatahcuti.sisacuti;
        const cutidigunakanbefore = jatahcuti.cutidigunakan;
        const sisacuti = sisacutibefore + durasi;
        const cutidigunakan = cutidigunakanbefore - durasi;
        
      db.newjatahcuti
      .update(
        {
          sisacuti,
          cutidigunakan,
        },
        {
          where: { userid:trxCutiData.userid, idjeniscuti:jeniscuti},
        }
      )
    })
    .then((trxCuti) => {
      res
        .status(200)
        .json({ message: "Data Cuti Berhasil di Cancel", data: trxCuti });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getTrxCutiByUserId = async (req, res) => {
  const userid = req.params.userid;
  db.trxcuti
    .findAll({
      where: { userid: userid },
    })
    .then((trxCuti) => {
      const result = trxCuti.map(async (item) => {
        const jenisCuti = await getJenisCutiById(item.idjenisCUti);
        const profile = await getProfileByUserId(item.userid);
        //console.log(item.idjenisCUti)
        return {
          ...item.dataValues,
          jeniscuti: jenisCuti.namacuti,
          nama: profile.nama,
        };
      });
      Promise.all(result).then((data) => {
        res.status(200).json({ message: "data by id", data: data });
      });
      // res.status(200).json({ message: 'data by id', data: result });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const updateTrxCuti = (req, res) => {
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
  const {
    idcuti,
    userid,
    idjenisCUti,
    tanggalmulai,
    tanggalakhir,
    durasi,
    alasan,
    status,
    createdate,
    approveby,
    approvalreason,
    approvalstatus,
  } = req.body;
  db.alamat
    .update(
      {
        idcuti,
        userid,
        idjenisCUti,
        tanggalmulai,
        tanggalakhir,
        durasi,
        alasan,
        status,
        createdate,
        approveby,
        approvalreason,
        approvalstatus,
      },
      {
        where: { id: id },
      }
    )
    .then((trxCuti) => {
      res.status(200).json({ message: "TrxCuti updated", data: trxCuti });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const deleteTrxCuti = (req, res) => {
  // #swagger.tags = ['alamat']
  /* #swagger.security = [{
               "basicAuth": []
     }] */

  //   if (req.role !== "superadmin" && req.role !== "admin") {
  //     return res.status(403).json({ message: "Forbidden" });
  //   }
  const id = req.params.id;
  db.trxcuti
    .destroy({
      where: { id: id },
    })
    .then((alamat) => {
      res.status(200).json({ message: "TrxCuti deleted", data: alamat });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
  insertTrxCuti,
  getAllTrxCuti,
  getTrxCutiById,
  updateTrxCuti,
  deleteTrxCuti,
  getTrxCutiByUserId,
  getTrxCutiByCutiId,
  approveTrxCuti,
  rejectCuti,cancelCuti
};
