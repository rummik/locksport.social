import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

import Color from 'color';

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
  const belt = await readFile(__dirname + '/../svg/belt.svg').then(val => val.toString());
  const beltColor = parseColor(req.query.color);

  res.setHeader('content-type', 'image/svg+xml');
  res.status(200).send(belt.replace(/#[0-9a-f]{6}/g, (color: string) =>
    beltColor.mix(new Color(color)).hex()
  ));
}
