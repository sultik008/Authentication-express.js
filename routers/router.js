import { Router } from "express"
import {
  getUser,
  addUser,
  getUsersByLastLog,
  deleteUser,
  loginUser,
  block,
  unBlock
} from "../controllers/controller.js"
import { auth } from "../middlewares/auth.js";
import { notBlocked } from "../middlewares/notBlocked.js";

const router = Router()

router.get("/api", auth , notBlocked, getUser)
router.post("/api", addUser)
router.get("/api/filter", auth, notBlocked, getUsersByLastLog)
router.delete("/api/delete" , auth, notBlocked, deleteUser)
router.post("/api/login", loginUser)
router.put("/api/block", auth, notBlocked, block)
router.put("/api/unblock", auth, notBlocked, unBlock)

export default router