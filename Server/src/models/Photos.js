import mongoose from "mongoose";
const { Schema } = mongoose;

const PhotoSchema = new Schema({
 imageUrl: String,
 caption: String,
 publicId: String,
 createdAt: {
   type: Date,
   default: Date.now,
 },
});

export default mongoose.model("Photos", PhotoSchema);