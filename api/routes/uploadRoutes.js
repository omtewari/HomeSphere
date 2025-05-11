// routes/uploadRoutes.js
import express from 'express';
import upload from '../middleware/multer.js';
import { uploadImage } from '../controllers/uploadController.js';

const router = express.Router();

// POST /api/upload
router.post('/upload', upload.single('image'), uploadImage);

export default router;
