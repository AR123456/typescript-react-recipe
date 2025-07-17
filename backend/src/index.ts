import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/recipe/search", async (req: Request, res: Response) => {
  res.json({ message: "success" });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
