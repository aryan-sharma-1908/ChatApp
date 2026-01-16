import {Router} from 'express';
import { getProfile } from '../controllers/ProfileControllers.js';

const router = Router();


router.post('/', getProfile);


export default router;