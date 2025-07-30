import db from "../db.js";

export async function notBlocked(req, res, next) {
  const userId = req.user.id;
  const result = await db.query("SELECT status FROM users WHERE userid = $1", [userId]);
  const user = result.rows[0];
  if (!user) {
    return res.status(404).json({ message: "User undefined" });
  }
  if (user.status === "Blocked") {
    return res.status(403).json({ message: "Your account blocked" });
  }
  next();
}