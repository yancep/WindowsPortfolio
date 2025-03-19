export async function createImageWithText(
  imageBuffer: Buffer,
  lines: string[],
  invertir: boolean = false
): Promise<Buffer> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const img = new Image();
  const imgLoadPromise = new Promise<void>((resolve, reject) => {
    img.onload = () => {
      resolve();
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
  });

  const blob = new Blob([imageBuffer], { type: 'image/png' });
  img.src = URL.createObjectURL(blob);

  await imgLoadPromise;

  const rectHeight = 100;
  const rectWidth = 400;
  const halfWidth = rectWidth / 2;

  canvas.width = rectWidth;
  canvas.height = rectHeight;

  const textX = invertir ? halfWidth - 10 : halfWidth + 10;
  const textAlign = invertir ? 'right' : 'left';
  const imageX = invertir ? halfWidth : 0;

  ctx.fillStyle = '#000000';
  ctx.font = '16px Arial';
  ctx.textAlign = textAlign;
  ctx.textBaseline = 'middle';

  lines.forEach((line, index) => {
    const textY = (rectHeight / lines.length) * index + rectHeight / lines.length / 2;
    ctx.fillText(line, textX, textY);
  });

  ctx.drawImage(img, imageX, 0, halfWidth, rectHeight);

  const resultBlob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });

  if (resultBlob) {
    const arrayBuffer = await resultBlob.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } else {
    throw new Error('No se pudo crear el blob');
  }
}
  
export async function createTextImage(
  lines: string[],
  bigName: string[],
  invertir: boolean = false
): Promise<Buffer> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const rectHeight = 100;
  const rectWidth = 400;
  canvas.width = rectWidth;
  canvas.height = rectHeight;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, rectWidth, rectHeight);

  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'middle';

  const visualName = bigName.some((line) => line.trim() !== '');

  if (visualName) {
    ctx.font = 'bold 38px Helvetica';
    const lineHeight = 35;
    const bigNameTotalHeight = bigName.length * lineHeight;
    const bigNameStartY = (rectHeight - bigNameTotalHeight) / 2;

    bigName.forEach((line, index) => {
      const textY = bigNameStartY + lineHeight * index + lineHeight / 2;
      ctx.textAlign = line.trim() === '' ? 'center' : invertir ? 'left' : 'right';
      const textX = rectWidth / 2 + (invertir ? 20 : -20);
      ctx.fillText(line, textX, textY);
    });
  }

  ctx.font = '16px Helvetica';
  ctx.textAlign = visualName ? (invertir ? 'right' : 'left') : 'center';

  lines.forEach((line, index) => {
    const textY = (rectHeight / lines.length) * index + rectHeight / lines.length / 2;
    ctx.fillText(line, rectWidth / 2, textY);
  });

  const resultBlob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });

  if (resultBlob) {
    const arrayBuffer = await resultBlob.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } else {
    throw new Error('No se pudo crear el blob');
  }
}
