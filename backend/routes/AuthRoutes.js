import {Router} from 'express'
import { signup, login } from '../controllers/AuthControllers.js'
const router = Router()

router.post('/signup', signup)
router.post('/login', login)

export default router