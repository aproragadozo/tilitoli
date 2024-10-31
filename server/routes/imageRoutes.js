import express from "express"
const router = express.Router();
import Image from "../testImageModel.js"

router.get('/game-on', async (req, res) => {
    try {
      const images = await Image.find();
      res.json({
        success: true,
        images: images.map(img => ({ id: img._id, url: img.url }))
      });
    } catch (error) {
        console.error('Error fetching images:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  export default router;