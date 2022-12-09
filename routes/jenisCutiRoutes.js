const router = require('express').Router();
const { getAllJenisCuti,getJenisCutibyUserId } = require('./../controllers/jenisCutiController');

router.get('/', getAllJenisCuti);
router.get("/:userid", getJenisCutibyUserId);

module.exports = router;
