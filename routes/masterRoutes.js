const router = require("express").Router();
//const { getAllUnit } = require("../../src/services/masterservice");
const {
  tambahagama,
  tambahjeniscuti,
  tambahjabatan,
  tambahunit,
  tambahprovinsi,
  tambahkota,
  tambahkecamatan,
  tambahkelurahan,
  getAllUnit,
  getAllAgama,
  getAllJabatan,
  getAllRole,
  getAllProvinsi,
  getAllKota,
  getAllKecamatan,
  getAllKelurahan,
} = require("../controllers/masterController");
router.post("/tambahagama", tambahagama);
router.post("/tambahjeniscuti", tambahjeniscuti);
router.post("/tambahjabatan", tambahjabatan);
router.post("/tambahunit", tambahunit);
router.post("/tambahprovinsi", tambahprovinsi);
router.post("/tambahkota", tambahkota);
router.post("/tambahkecamatan", tambahkecamatan);
router.post("/tambahkelurahan", tambahkelurahan);
router.get("/agama", getAllAgama);
router.get("/unit", getAllUnit);
router.get("/jabatan", getAllJabatan);
router.get("/role", getAllRole);
router.get("/provinsi", getAllProvinsi);
router.get("/kota", getAllKota);
router.get("/kecamatan", getAllKecamatan);
router.get("/kelurahan", getAllKelurahan);

module.exports = router;
