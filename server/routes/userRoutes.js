import express from "express";
import signUp from "../controllers/signUpController.js";
import getUser from "../controllers/getUserController.js";
import getOneUser from "../controllers/getOneUserController.js";

const router = express.Router();

router.post("/signup", signUp);
router.get("/user", getUser);
router.get("/profile/:userId", getOneUser);

export default router;
