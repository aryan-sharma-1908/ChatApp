import {Router} from 'express';
import { handleNewMessage } from '../controllers/MessageControllers.js';

const router = Router();

router.post('/', handleNewMessage);

export default router;