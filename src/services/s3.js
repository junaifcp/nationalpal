const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');

const FALLBACK_IMAGE = 'uncategorized20232022.jpg';

function publicBase() {
  const bucket = process.env.AWS_S3_BUCKET;
  const region = process.env.AWS_REGION;
  if (!bucket || !region) return '';
  return `https://${bucket}.s3.${region}.amazonaws.com`;
}

function publicUrl(key) {
  if (key == null || key === '') return '';
  const value = String(key);
  if (value.startsWith('http')) return value;
  const base = publicBase();
  if (!base) return value;
  return `${base}/${value}`;
}

function objectKeyFrom(key) {
  if (key == null || key === '') return '';
  const value = String(key);
  if (!value.startsWith('http')) return value;
  const url = new URL(value);
  return decodeURIComponent(url.pathname.replace(/^\//, ''));
}

function client() {
  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
}

async function uploadImage(file) {
  const ext = path.extname(file.originalname || '');
  const key = `${file.fieldname}-${Date.now()}${ext}`;
  await client().send(new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype || 'application/octet-stream',
  }));
  return key;
}

async function putObject(key, body, contentType) {
  await client().send(new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType || 'application/octet-stream',
  }));
  return key;
}

async function deleteImage(key) {
  const objectKey = objectKeyFrom(key);
  if (!objectKey || objectKey === FALLBACK_IMAGE) return;
  await client().send(new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: objectKey,
  }));
}

module.exports = {
  FALLBACK_IMAGE,
  publicBase,
  publicUrl,
  uploadImage,
  putObject,
  deleteImage,
};
