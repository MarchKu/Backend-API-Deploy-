import { response, Router } from "express";
import connectionPool from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { registerCheck } from "../middlewares/RegisterCheck.js";

dotenv.config();
n
const authRouter = Router();

authRouter.post("/register", [registerCheck], async (req, res) => {
  try {
    const userInput = req.body;
    const result = await connectionPool.query(
      `select * from users where username = $1`,
      [userInput.username]
    );
    if (result.rows.length > 0) {
      return res.status(400).json({ message: "User already exist" });
    } else {
      const userData = {
        ...userInput,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);

      await connectionPool.query(
        `INSERT INTO users (
      username,
      password,
      first_name,
      last_name,
      created_at,
      updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          userData.username,
          userData.password,
          userData.first_name,
          userData.last_name,
          userData.created_at,
          userData.updated_at,
        ]
      );
      return res
        .status(201)
        .json({ message: "User has been created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Connection error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const userInput = req.body;
    const user = await connectionPool.query(
      `select * from users where username = $1`,
      [userInput.username]
    );
    if (!user.rows[0]) {
      return res.status(404).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(
      userInput.password,
      user.rows[0].password
    );

    if (!isPasswordValid) {
      return res.status(404).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
      {
        id: user.rows[0].id,
        firstName: user.rows[0].first_name,
        lastName: user.rows[0].last_name,
      },
      process.env.SUPABASE_SECRET_KEY,
      {
        expiresIn: "900000",
      }
    );

    return res.status(200).json({ message: "Login successfuly", token });
  } catch {
    return res
      .status(500)
      .json({ message: "Cannot login due to server connection" });
  }
});
authRouter.get("/", async (req, res) => {
  res.send("API is Working");
});

export default authRouter;
