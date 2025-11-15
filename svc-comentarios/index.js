import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import Comentario from "./models/Comentario.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8081;

// Conexión a Cosmos DB Mongo API usando la variable de entorno
const uri = process.env.COSMOS_MONGO_CONN;

mongoose.connect(uri)
  .then(() => console.log("✅ Conectado a Cosmos DB (Mongo API) - comentarios"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Endpoint: listar comentarios por producto
app.get("/comments", async (req, res) => {
  const { productId } = req.query;
  if (!productId) return res.status(400).json({ message: "productId es requerido" });
  const comentarios = await Comentario.find({ productId }).sort({ fecha: -1 });
  res.json(comentarios);
});

// Endpoint: obtener comentario por id
app.get("/comments/:id", async (req, res) => {
  const comentario = await Comentario.findById(req.params.id);
  if (!comentario) return res.status(404).json({ message: "No encontrado" });
  res.json(comentario);
});

// Endpoint: crear comentario
app.post("/comments", async (req, res) => {
  const { productId, texto, rating } = req.body;
  if (!productId || !texto) return res.status(400).json({ message: "productId y texto son requeridos" });
  const nuevo = new Comentario({ productId, texto, rating });
  await nuevo.save();
  res.status(201).json(nuevo);
});

app.listen(port, () => console.log(`🚀 svc-comentarios corriendo en puerto ${port}`));
