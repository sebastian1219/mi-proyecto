import mongoose from "mongoose";

const ComentarioSchema = new mongoose.Schema({
  productId: { type: String, required: true, index: true },
  texto: { type: String, required: true },
  rating: { type: Number, default: null },
  fecha: { type: String, default: () => new Date().toISOString() }
}, { collection: "comentarios" });

export default mongoose.model("Comentario", ComentarioSchema);
