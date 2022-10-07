import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import EntryModel, { IEntry } from '../../../models/Entry'

type Data = { message: string } | { entries: IEntry[] } | { entry: IEntry }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getEntries(res)
    case 'POST':
      return createEntry(req, res)
    default:
      return res.status(400).json({ message: 'endpoint doesnt exists' })
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  try {
    await db.connect()

    const entries = await EntryModel.find().sort({ createdAt: 'ascending' })

    await db.disconnect()

    res.status(200).json({ entries })
  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(500)
  }
}

//IMPORTANT body will only be automatically parsed if content-type is application/json or form x-www-form-urlencoded
const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body

  if (!description) return res.status(404).json({ message: "param 'description' should be provided" })

  try {
    await db.connect()
    const entry = await EntryModel.create({
      status: 'pending',
      createdAt: Date.now(),
      description,
    })
    await db.disconnect()
    res.status(201).json({ entry })
    await db.disconnect()
  } catch (error) {
    console.log(error)
    return res.status(500)
  }
}
