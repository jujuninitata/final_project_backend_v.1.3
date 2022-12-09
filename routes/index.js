import { Express } from "express";
import{getuser, register} from "../controllers/user"
const router = express.Router();

router.get('/user',getuser);
router.post('/user',register);

export default router;