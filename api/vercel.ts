import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  response.status(200).json({
    message: 'API is running',
    env: process.env.NODE_ENV,
  });
}
