import {Router} from 'express';
import { getOldMessages } from '../controllers/MessageControllers.js';

const router = Router();

router.get('/:friendId',getOldMessages);

export default router;