import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "Please provide an image URL"]
    }
  });
  
  const Image = mongoose.model('Image', imageSchema);
  Image.createIndexes();

  export default Image;