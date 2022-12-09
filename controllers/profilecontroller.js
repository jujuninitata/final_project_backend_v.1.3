const db = require("./../models");
// import { sequelize } from "./../models";
const {Op} = require("sequelize")

const {
  getUnitByKodeunit,
  getjabatanByKodejabatan,
  getagamaByKodeagama,
  getprovinsiByKodeprovinsi,
  getkotaByKodekota,
  getkecamatanByKodekecamatan,
  getkelurahanByKodekelurahan,
} = require("./masterController");

const tambahProfile = async (req, res) => {
  const {
    userid,
    nip,
    email,
    nama,
    tempatlahir,
    tanggallahir,
    jeniskelamin,
    telp,
    kodeunit,
    jabatan,
    statusnikah,
    agama,
    alamat,
    kodeprovinsi,
    kodekota,
    kodekecamatan,
    kodekelurahan,
    kodepos,
    rt,
    rw,
    roleId,
  } = req.body;
  const resAdd = await db.profile.create({
    userid,
    nip,
    email,
    nama,
    tempatlahir,
    tanggallahir,
    jeniskelamin,
    telp,
    kodeunit,
    jabatan,
    statusnikah,
    agama,
    alamat,
    kodeprovinsi,
    kodekota,
    kodekecamatan,
    kodekelurahan,
    kodepos,
    rt,
    rw,
    roleId,
  });
  // //create jatahcuti
  // const resAddJatahCuti = await db.jatahcuti.create({
  //   userid: resAdd.userid,
  //   //get current year
  //   periode: new Date().getFullYear(),
  //   kuota: 12,
  //   cutidigunakan: 0,
  //   sisacuti: 12,
  // });
  // return res.status(201).json({
  //   message: "register data successfully!",
  //   data: resAdd,
  // });

    const Cekjeniskelamin =jeniskelamin == 1 ? [`a`,`b`]:[`a`]
    const jeniscuti = await db.jeniscuti.findAll({
      where: { [Op.not] : [{status : 0}],
      jeniskelamin:Cekjeniskelamin
    },
    });
    const mappingJenisCuti = []
    jeniscuti.map((item)=>{
        const cuti =
        {
          userid: userid,
          idjeniscuti:item.idjeniscuti,
          periode: new Date().getFullYear(),
          kuota: item.maxhari,
          cutidigunakan: 0,
          sisacuti: item.maxhari
        }
        mappingJenisCuti.push(cuti)
    })
    const resAddJatahCutinew = await db.newjatahcuti.bulkCreate(mappingJenisCuti)
    return res.status(201).json({
        message: "register data successfully!",
        data: resAdd,
      });
  //   const resAddJatahCutinew = await db.newjatahcuti.bulkCreate({
  //   userid: resAdd.userid,
  //   //get current year
  //   periode: new Date().getFullYear(),
  //   kuota: 12,
  //   cutidigunakan: 0,
  //   sisacuti: 12,
  // });
  // return res.status(201).json({
  //   message: "register data successfully!",
  //   data: resAdd,
  // });

};

const getAllProfile = async (req, res) => {
  db.profile
    .findAll()
    .then((profile) => {
      const result = profile.map(async (item) => {
        const divisi = await getUnitByKodeunit(item.kodeunit);
        const jabatan = await getjabatanByKodejabatan(item.jabatan);
        const Newagama = await getagamaByKodeagama(item.agama);
        const NewProvinsi = await getprovinsiByKodeprovinsi(item.kodeprovinsi);
        const Newkota = await getkotaByKodekota(item.kodekota);
        const NewKecamatan = await getkecamatanByKodekecamatan(
          item.kodekecamatan
        );
        const NewKelurahan = await getkelurahanByKodekelurahan(
          item.kodekelurahan
        );
        return {
          ...item.dataValues,
          kodeunit: divisi.namaunit,
          jabatan: jabatan.namajabatan,
          agama: Newagama.agama,
          provinsi: NewProvinsi.provinsi,
          kota: Newkota.kota,
          kecamatan: NewKecamatan.kecamatan,
          kelurahan: NewKelurahan.kelurahan,
        };
      });
      Promise.all(result).then((data) => {
        res
          .status(200)
          .json({ message: "data Profile by User id", data: data });
      });
      // res.status(200).json({ message: 'data by id', data: result });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getProfileById = async (req, res) => {
  const { id } = req.params;
  const resGet = await db.profile.findOne({
    where: {
      id: id,
    },
  });
  return res.status(200).json({
    message: "Data by id",
    data: resGet,
  });
};

const getProfileByUserId = async (req, res) => {
  const userid = req.params.userid;
  db.profile
    .findAll({
      where: { userid: userid },
    })
    .then((profile) => {
      const result = profile.map(async (item) => {
        const divisi = await getUnitByKodeunit(item.kodeunit);
        const jabatan = await getjabatanByKodejabatan(item.jabatan);
        const Newagama = await getagamaByKodeagama(item.agama);
        const NewProvinsi = await getprovinsiByKodeprovinsi(item.kodeprovinsi);
        const Newkota = await getkotaByKodekota(item.kodekota);
        const NewKecamatan = await getkecamatanByKodekecamatan(
          item.kodekecamatan
        );
        const NewKelurahan = await getkelurahanByKodekelurahan(
          item.kodekelurahan
        );
        return {
          ...item.dataValues,
          kodeunit: divisi.namaunit,
          jabatan: jabatan.namajabatan,
          agama: Newagama.agama,
          provinsi: NewProvinsi.provinsi,
          kota: Newkota.kota,
          kecamatan: NewKecamatan.kecamatan,
          kelurahan: NewKelurahan.kelurahan,
        };
      });
      Promise.all(result).then((data) => {
        res
          .status(200)
          .json({ message: "data Profile by User id", data: data });
      });
      // res.status(200).json({ message: 'data by id', data: result });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
  tambahProfile,
  getAllProfile,
  getProfileById,
  getProfileByUserId,
};
