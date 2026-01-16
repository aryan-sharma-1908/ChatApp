import { Router } from "express";
import { getUsers } from "../controllers/GetUsersControllers.js";

const router = Router();

router.get('/', getUsers);

export default router;