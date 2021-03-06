import mongoose from "mongoose"

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongoConnection = {
  isConnected: 0,
}

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log("Already connected")
    return
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState
    if (mongoConnection.isConnected === 1) {
      console.log("using a previous connection ")
      return
    }
    await mongoose.disconnect()
  }

  await mongoose.connect("......")
  mongoConnection.isConnected = 1
  console.log("Connected to mongodb", " ")
}

export const disconnect = async () => {
  if (mongoConnection.isConnected !== 0) return
  await mongoose.disconnect()
  console.log("Disconnected from mongoose")
}
