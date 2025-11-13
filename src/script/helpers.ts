import fs from 'fs'
import path from 'path'
import { Task } from './type'

export const checkAndCreateFile = () => {
  const publicPath = path.join(process.cwd(), 'public')
  const filePath = path.join(publicPath, 'data.json')

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]))
  }

  return filePath
}

export const getTasks = () => {
  const filePath = checkAndCreateFile()
  const fileData = fs.readFileSync(filePath, 'utf-8')
  const tasks = JSON.parse(fileData) as Task[]

  return tasks
}

export const getTaskById = (id: number) => {
  const tasks = getTasks()

  return tasks.find((task) => task.id === id)
}
