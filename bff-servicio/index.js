import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Proxy: productos
app.get("/api/productos", async (req, res) => {
  const r = await fetch(`${process.env.URL_PRODUCTOS}/productos`);
  const data = await r.json();
  res.json(data);
});

// Proxy: comentarios
app.post("/api/comentarios", async (req, res) => {
  const r = await fetch(`${process.env.URL_COMENTARIOS}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body)
  });
  const data = await r.json();
  res.status(r.status).json(data);
});

// Proxy: usuarios
app.get("/api/usuarios/:id", async (req, res) => {
  const r = await fetch(`${process.env.URL_USUARIOS}/usuarios/${req.params.id}`);
  const data = await r.json();
  res.status(r.status).json(data);
});

app.listen(PORT, () => console.log(`🚀 BFF corriendo en puerto ${PORT}`));
