import { Router } from "express";
import { addFriendIfNotExists, getFriends, getNonFriends, getUserInfo, getUsers } from "../controllers/UserControllers.js";
import { updateProfile } from "../controllers/UserControllers.js";

const router = Router();

router.get('/', getUsers);
router.post('/profile', updateProfile);
router.get('/non-friends', getNonFriends);
router.post('/add-friend', addFriendIfNotExists);
router.get('/friends', getFriends);
router.get('/info', getUserInfo);
export default router;