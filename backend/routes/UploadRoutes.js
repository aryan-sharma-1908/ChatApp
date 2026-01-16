import { Router } from "express";
import upload from "../middlewares/MulterMiddleware.js";
import { uploadImage } from "../controllers/UploadControllers.js";

const router = Router();

router.post("/", upload.single("file"), uploadImage);

export default router;
