import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { EntryModel, IEntry } from '../../../models'
import mongoose from 'mongoose'

type Data = { message: string } | { entry: IEntry }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  const id = typeof req.query.id === 'string' ? req.query.id : ''
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' })
  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res, id)
    case 'DELETE':
      return deleteEntry(req, res, id)
    case 'GET':
      return getEntry(req, res, id)
    default:
      return res.status(400).json({ message: 'endpoint doesnt exists' })
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>, id: string) => {
  try {
    await db.connect()

    const entry = await EntryModel.findById(id)

    if (!entry) {
      return res.status(404).json({ message: `There is no entry with id ${id}` })
    }
    const { status = entry.status, description = entry.description } = req.body
    entry.status = status
    entry.description = description

    await entry.save()
    await db.disconnect()

    return res.status(200).json({ entry })
  } catch (error) {
    let message = 'Unknown error'
    if (error instanceof Error) message = error.message
    console.log(error)
    return res.status(404).json({ message })
  }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>, id: string) => {
  try {
    await db.connect()
    const entry = await EntryModel.findById(id)

    if (!entry) {
      return res.status(404).json({ message: `There is no entry with id ${id}` })
    }

    await entry.delete()

    await db.disconnect()
    return res.status(200).json({ message: 'entry deleted' })
  } catch (error) {
    console.log(error)
    return res.status(500)
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>, id: string) => {
  try {
    await db.connect()
    const entry = await EntryModel.findById(id)

    if (!entry) {
      return res.status(404).json({ message: `There is no entry with id ${id}` })
    }

    await db.disconnect()
    return res.status(200).json({ entry })
  } catch (error) {
    console.log(error)
    return res.status(500)
  }
}
