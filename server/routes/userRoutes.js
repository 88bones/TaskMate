import express from "express";
import signUp from "../controllers/signUpController.js";
import getUser from "../controllers/getUserController.js";

const router = express.Router();

router.post("/signup", signUp);
router.get("/user", getUser);

export default router;
