require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { putObject, publicUrl } = require('../src/services/s3');

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

async function migrate() {
  if (!process.env.AWS_S3_BUCKET || !process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error('Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and AWS_S3_BUCKET in .env first.');
    process.exit(1);
  }

  const dir = path.join(__dirname, '../public/uploads');
  const files = fs.readdirSync(dir).filter((name) => fs.statSync(path.join(dir, name)).isFile());

  for (const name of files) {
    const filePath = path.join(dir, name);
    const ext = path.extname(name).toLowerCase();
    await putObject(name, fs.readFileSync(filePath), MIME[ext] || 'application/octet-stream');
    console.log(publicUrl(name));
  }

  console.log(`Uploaded ${files.length} files from public/uploads`);
}

migrate().catch((error) => {
  console.error('Failed to migrate uploads:', error);
  process.exit(1);
});
