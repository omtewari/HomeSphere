const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Construct a relative URL for frontend
    const imageUrl = `/uploads/${req.file.filename}`;

    return res.status(200).json({
      imageUrl,
      message: 'Image uploaded successfully',
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({ message: 'Upload failed' });
  }
};

export { uploadImage };
