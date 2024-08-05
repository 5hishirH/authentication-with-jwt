import { Router } from "express";

import { upload } from "../middlewares/multer-diskstorage.middleware";
import { testImage } from "../controllers/post.controllers";

const router = Router();

router.route("/upload").post(upload.single("image"), testImage);

export default router;
