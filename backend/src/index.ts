import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("api/recipe/search", async (req, res) => {
  res.json({ message: "success" });
});

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
