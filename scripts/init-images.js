require('dotenv').config();
const mongoose = require('mongoose');
const Images = require('../src/models/images');
const { IMAGE_ID } = require('../public/data/images');

async function initImages() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is missing. Copy .env.example to .env and fill it in.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const existing = await Images.findById(IMAGE_ID);
  if (existing) {
    console.log(`Image document already exists with _id ${IMAGE_ID}`);
  } else {
    await Images.create({ _id: IMAGE_ID });
    console.log(`Inserted Image document with _id ${IMAGE_ID}`);
  }

  await mongoose.disconnect();
}

initImages().catch((error) => {
  console.error('Failed to initialize Image document:', error);
  process.exit(1);
});
