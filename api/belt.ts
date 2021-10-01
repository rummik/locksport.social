import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

import Color from 'color';
import sharp from 'sharp';

import { readFile } from 'fs/promises';

function parseColor(color: string | string[]): Color {
  try {
    return new Color(color);
  } catch {
    return new Color(`#${color}`);
  }
}

export default async function belt(
  req: VercelRequest,
  res: VercelResponse,
) {
  const color = parseColor(req.query.color || 'white');
  const mode = req.query.mode === 'png' ? 'png' : 'svg';
  const size = Math.min(Math.max(parseInt(req.query.size as string, 10) || 512, 16), 512);

  const svg = await readFile(`${__dirname}/../svg/belt.svg`, 'utf8');

  const belt = svg.replace(/#[0-9A-Fa-f]{6}/g, (hex: string) =>
    new Color(hex).darken(0.5).lighten(color.lightness() * 0.026).mix(color).hex()
  );

  switch (mode) {
    case 'png':
      const raster = sharp(Buffer.from(belt));
      res.setHeader('content-type', 'image/png');
      res.status(200).send(await raster.resize(size, size).png().toBuffer());
      break;

    case 'svg':
    default:
      res.setHeader('content-type', 'image/svg+xml');
      res.status(200).send(belt);
      break;
  }
}
