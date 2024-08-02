const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const { cloudinary } = require('./utilities/cloudinary');
const Data = require('./models/data'); 
require('dotenv').config();
const app = express();

const connectionUrl = process.env.MONGODB_URI; 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(fileupload({ useTempFiles: true }));

mongoose.set('strictQuery', true);
mongoose.connect(connectionUrl)
  .then(() => console.log('DB connected'))
  .catch((e) => console.log(e));

app.post('/posts', async (req, res) => {
  try {
    const { thumbnail, videoFile } = req.files;
    
    const { title, description } = req.body;

    if (!thumbnail || !['image/jpeg', 'image/png'].includes(thumbnail.mimetype)) {
      return res.status(400).json({ status: 'Failed', message: 'Invalid image file type. Only JPG and PNG are allowed.' });
    }

    if (!videoFile || !['video/mpeg', 'video/avi', 'video/mp4'].includes(videoFile.mimetype)) {
      return res.status(400).json({ status: 'Failed', message: 'Invalid video file type. Only MPG, AVI, and MP4 are allowed.' });
    }

    const thumbnailResult = await cloudinary.uploader.upload(thumbnail.tempFilePath, {
      public_id: `${Date.now()}_thumbnail`,
      resource_type: 'image',
      folder: 'thumbnails',
    });

    const videoResult = await cloudinary.uploader.upload(videoFile.tempFilePath, {
      public_id: `${Date.now()}_video`,
      resource_type: 'video',
      folder: 'videos',
    });

    const thumbnailUrl = thumbnailResult.secure_url;
    const videoUrl = videoResult.secure_url;

    const data = await Data.create({
      title,
      description,
      thumbnail: thumbnailUrl,
      videoFile: videoUrl,
    });

    res.json({ status: 'ok', data });
  } catch (e) {
    res.status(400).json({
      status: 'Failed to post',
      message: e.message,
    });
  }
});

app.get('/', async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json({
      status: 'Success',
      data,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});


app.get('/video/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Data.findById(id);
    if (!data) {
      return res.status(404).json({ status: 'Failed', message: 'Data not found' });
    }
    res.status(200).json({ status: 'Success', data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


app.listen(5000, () => console.log('Server running on port 5000'));
