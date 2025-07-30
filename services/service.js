import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function loginUser({ email, password }) {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];

  if (!user) {
    throw { message: "User not found", stat: 400 };
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw { message: "Invalid credentials", stat: 401 };
  }

  const token = jwt.sign({ id: user.userid, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token };
}

export async function addUser({ email, password, name }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.query(
    `INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *;`,
    [email, hashedPassword, name]
  );
  const user = newUser.rows[0];

  const token = jwt.sign({ id: user.userid, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return { message: "User created", user, stat: 200, token };
}

export async function getUser() {
  const data = await db.query("SELECT * FROM users;");
  return { data: data.rows, message: "Request successful", stat: 200 };
}

export async function getUsersByLastLog(email) {
  const edit = await db.query(`UPDATE users SET lasttime = NOW() WHERE email = $1` , [email])
  const data = await db.query(`SELECT * FROM users ORDER BY lasttime DESC; `);
  return data.rows;
}

export async function block(ids) {
  const result = await db.query(
    `UPDATE users SET status = 'Blocked' WHERE userid IN (${ids
      .map((_, i) => `$${i + 1}`)
      .join(", ")})`,
    ids
  );
  return { message: "Users blocked", affected: result.rowCount };
}

export async function unBlock(ids) {
  const result = await db.query(
    `UPDATE users SET status = 'Active' WHERE userid IN (${ids
      .map((_, i) => `$${i + 1}`)
      .join(", ")})`,
    ids
  );
  return { message: "Users unblocked", affected: result.rowCount };
}

export async function deleteUser(ids) {
  try {
    const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
    const query = `DELETE FROM users WHERE userid IN (${placeholders}) RETURNING *;`;

    const res = await db.query(query, ids);
    return res;
  } catch (error) {return error}
}