import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Chat Message Routes');
});

export default router;