import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import EntryModel, { IEntry } from '../../../models/Entry'

type Data = { message: string } | { entries: IEntry[] }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getEntries(res)
    //case 'POST':
    //  return createEntries()
    default:
      return res.status(400).json({ message: 'endpoint doesnt exists' })
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect()

  const entries = await EntryModel.find().sort({ createdAt: 'ascending' })

  await db.disconnect()

  res.status(200).json({ entries })
}
