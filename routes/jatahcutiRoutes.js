const router = require('express').Router();
const {
  insertjatahCuti,
  getAlljatahCuti,
  getjatahCutiById,
  updatejatahCuti,
  deletejatahCuti,
} = require('./../controllers/jatahcutiController');

router.post('/', insertjatahCuti);
router.get('/', getAlljatahCuti);
router.get('/:id', getjatahCutiById);
router.put('/:id', updatejatahCuti);
router.delete('/:id', deletejatahCuti);

module.exports = router;
