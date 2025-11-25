import express from "express";
import signUp from "../controllers/signUpController.js";
import getUser from "../controllers/getUserController.js";
import getOneUser from "../controllers/getOneUserController.js";
import updateUser from "../controllers/updateUserController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/signup", signUp);
router.get("/user", getUser);
router.get("/profile/:userId", getOneUser);
router.put("/edit-user/:userId", upload.single("photo", 10), updateUser);

export default router;
