import {Router} from 'express';
import { deleteAllMessages, getOldMessages } from '../controllers/MessageControllers.js';

const router = Router();

router.get('/:friendId',getOldMessages);
router.delete('/deleteAll/:friendId',deleteAllMessages);

export default router;