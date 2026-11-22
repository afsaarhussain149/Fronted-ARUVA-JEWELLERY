export const IMG = {
  /** Final photo size (square) */
  size: 1200,
  /** Reject if the shorter side is smaller than this */
  minSize: 800,
  /** Limit for the original file before upload */
  maxFileBytes: 10 * 1024 * 1024,
  /** Limit for the final file after compression (the bucket limit is 1 MB) */
  maxOutputBytes: 900 * 1024,
};

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise(resolve => canvas.toBlob(resolve, type, quality));
}

/**
 * Takes any photo: center-crops it to a square -> max 1200x1200 -> compresses to WebP (or JPEG).
 * This way the photo always displays correctly on the website (the site uses aspect-square).
 */
export async function processImage(file: File): Promise<Blob> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Sirf JPG, PNG ya WebP photo chalegi.');
  }
  if (file.size > IMG.maxFileBytes) {
    throw new Error(`Photo ${IMG.maxFileBytes / 1024 / 1024} MB se badi hai.`);
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error('Ye photo khul nahi paayi. Dusri photo try karo.');
  }

  const side = Math.min(bitmap.width, bitmap.height);
  if (side < IMG.minSize) {
    const msg = `Photo kam se kam ${IMG.minSize}×${IMG.minSize} px ki honi chahiye (aapki: ${bitmap.width}×${bitmap.height}).`;
    bitmap.close();
    throw new Error(msg);
  }

  // Center square crop
  const sx = (bitmap.width - side) / 2;
  const sy = (bitmap.height - side) / 2;
  const out = Math.min(IMG.size, side); // chhoti photo ko zabardasti bada nahi karte

  const canvas = document.createElement('canvas');
  canvas.width = out;
  canvas.height = out;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    throw new Error('Browser photo process nahi kar paaya.');
  }
  ctx.imageSmoothingQuality = 'high';
  ctx.fillStyle = '#ffffff'; // transparent PNG ke peeche white
  ctx.fillRect(0, 0, out, out);
  ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, out, out);
  bitmap.close();

  let type = 'image/webp';
  let blob = await toBlob(canvas, type, 0.85);
  if (!blob || blob.type !== type) {
    type = 'image/jpeg'; // purane browser jo WebP encode nahi karte
    blob = await toBlob(canvas, type, 0.85);
  }
  for (const q of [0.75, 0.65, 0.5]) {
    if (!blob || blob.size <= IMG.maxOutputBytes) break;
    blob = await toBlob(canvas, type, q);
  }
  if (!blob || blob.size > IMG.maxOutputBytes) {
    throw new Error('Photo compress nahi ho paayi. Dusri photo try karo.');
  }
  return blob;
}
