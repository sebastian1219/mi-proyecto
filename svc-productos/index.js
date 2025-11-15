import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Producto from "./models/Producto.js";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8082;
const uri = process.env.COSMOS_MONGO_CONN;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a Cosmos DB (Mongo API) - productos"))
.catch(err => console.error("❌ Error de conexión:", err));

app.get("/productos", async (req, res) => {
  const productos = await Producto.find().sort({ fecha: -1 });
  res.json(productos);
});

app.post("/productos", async (req, res) => {
  const { nombre, descripcion, precio, stock, categoria } = req.body;
  if (!nombre || !precio) return res.status(400).json({ message: "Nombre y precio son requeridos" });
  const nuevo = new Producto({ nombre, descripcion, precio, stock, categoria });
  await nuevo.save();
  res.status(201).json(nuevo);
});

app.listen(port, () => console.log(`🚀 svc-productos corriendo en puerto ${port}`));
