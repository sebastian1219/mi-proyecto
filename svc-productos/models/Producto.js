import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  categoria: { type: String },
  fecha: { type: String, default: () => new Date().toISOString() }
}, { collection: "productos" });

export default mongoose.model("Producto", ProductoSchema);
