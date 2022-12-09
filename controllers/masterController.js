const db = require("./../models");

const tambahjeniscuti = async (req, res) => {
  const { idjeniscuti, jeniskelamin, namacuti, maxhari, status } = req.body;
  const resAdd = await db.jeniscuti.create({ idjeniscuti, jeniskelamin, namacuti, maxhari, status  });
  return res.status(201).json({
    message: "register data jenis cuti successfully!",
    data: resAdd,
  });
};
const tambahagama = async (req, res) => {
  const { kodeagama, agama, status } = req.body;
  const resAdd = await db.agama.create({ kodeagama, agama, status });
  return res.status(201).json({
    message: "register data agama successfully!",
    data: resAdd,
  });
};
const getagamaByKodeagama = async (kodeagama) => {
  const agama = await db.agama.findOne({
    where: { kodeagama: kodeagama },
  });
  return agama;
};

const getAllAgama = (req, res) => {
  db.agama
    .findAll()
    .then((agama) => {
      res.status(200).json({ message: "All data", data: agama });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const tambahjabatan = async (req, res) => {
  const { kodejabatan, namajabatan, status } = req.body;
  const resAdd = await db.jabatan.create({ kodejabatan, namajabatan, status });
  return res.status(201).json({
    message: "register data jabatan successfully!",
    data: resAdd,
  });
};
const getAllJabatan = (req, res) => {
  db.jabatan
    .findAll()
    .then((jabatan) => {
      res.status(200).json({ message: "All data Jabatan", data: jabatan });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getjabatanByKodejabatan = async (kodejabatan) => {
  const jabatan = await db.jabatan.findOne({
    where: { kodejabatan: kodejabatan },
  });
  return jabatan;
};

const tambahunit = async (req, res) => {
  const { kodeunit, namaunit, status } = req.body;
  const resAdd = await db.unitkerja.create({ kodeunit, namaunit, status });
  return res.status(201).json({
    message: "register data Unit Kerja successfully!",
    data: resAdd,
  });
};
const getAllUnit = (req, res) => {
  db.unitkerja
    .findAll()
    .then((unit) => {
      res.status(200).json({ message: "All data", data: unit });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getUnitByKodeunit = async (kodeunit) => {
  const unitkerja = await db.unitkerja.findOne({
    where: { kodeunit: kodeunit },
  });
  return unitkerja;
};

const tambahprovinsi = async (req, res) => {
  const { kodeprovinsi, provinsi, status } = req.body;
  const resAdd = await db.provinsi.create({ kodeprovinsi, provinsi, status });
  return res.status(201).json({
    message: "register data Provinsi successfully!",
    data: resAdd,
  });
};

const getAllProvinsi = (req, res) => {
  db.provinsi
    .findAll()
    .then((provinsi) => {
      res.status(200).json({ message: "All data", data: provinsi });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getprovinsiByKodeprovinsi = async (kodeprovinsi) => {
  const provinsi = await db.provinsi.findOne({
    where: { kodeprovinsi: kodeprovinsi },
  });
  return provinsi;
};

const tambahkota = async (req, res) => {
  const { kodekota, kodeprovinsi, kota, status } = req.body;
  const resAdd = await db.kota.create({ kodekota, kodeprovinsi, kota, status });
  return res.status(201).json({
    message: "register data kota successfully!",
    data: resAdd,
  });
};

const getAllKota = (req, res) => {
  db.kota
    .findAll()
    .then((kota) => {
      res.status(200).json({ message: "All data", data: kota });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const getkotaByKodekota = async (kodekota) => {
  const kota = await db.kota.findOne({
    where: { kodekota: kodekota },
  });
  return kota;
};

const tambahkecamatan = async (req, res) => {
  const { kodekecamatan, kodekota, kecamatan, status } = req.body;
  const resAdd = await db.kecamatan.create({
    kodekecamatan,
    kodekota,
    kecamatan,
    status,
  });
  return res.status(201).json({
    message: "register data Kecamatan successfully!",
    data: resAdd,
  });
};

const getAllKecamatan = (req, res) => {
  db.kecamatan
    .findAll()
    .then((kecamatan) => {
      res.status(200).json({ message: "All data", data: kecamatan });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
const getkecamatanByKodekecamatan = async (kodekecamatan) => {
  const kecamatan = await db.kecamatan.findOne({
    where: { kodekecamatan: kodekecamatan },
  });
  return kecamatan;
};
const tambahkelurahan = async (req, res) => {
  const { kodekelurahan, kodekecamatan, kelurahan, status } = req.body;
  const resAdd = await db.kelurahan.create({
    kodekelurahan,
    kodekecamatan,
    kelurahan,
    status,
  });
  return res.status(201).json({
    message: "register data Kelurahan successfully!",
    data: resAdd,
  });
};
const getAllKelurahan = (req, res) => {
  db.kelurahan
    .findAll()
    .then((kelurahan) => {
      res.status(200).json({ message: "All data", data: kelurahan });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
const getkelurahanByKodekelurahan = async (kodekelurahan) => {
  const kelurahan = await db.kelurahan.findOne({
    where: { kodekelurahan: kodekelurahan },
  });
  return kelurahan;
};

const getAllRole = (req, res) => {
  db.role
    .findAll()
    .then((role) => {
      res.status(200).json({ message: "All data", data: role });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
module.exports = {
  tambahjeniscuti,
  tambahagama,
  tambahjabatan,
  tambahunit,
  tambahprovinsi,
  tambahkota,
  tambahkecamatan,
  tambahkelurahan,
  getUnitByKodeunit,
  getjabatanByKodejabatan,
  getagamaByKodeagama,
  getprovinsiByKodeprovinsi,
  getkotaByKodekota,
  getkecamatanByKodekecamatan,
  getkelurahanByKodekelurahan,
  getAllAgama,
  getAllUnit,
  getAllJabatan,
  getAllRole,
  getAllProvinsi,
  getAllKota,
  getAllKecamatan,
  getAllKelurahan,
};
