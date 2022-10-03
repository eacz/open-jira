import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database'
import { disconnect } from '../../database/db';

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'You dont hace access to this service' })
  }

  await db.connect()

  await db.disconnect()

  res.status(200).json({ message: 'Process went sucessfully' })
}
