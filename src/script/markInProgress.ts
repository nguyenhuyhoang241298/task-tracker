import fs from 'fs'
import * as readline from 'readline'
import { checkAndCreateFile, getTasks } from './helpers'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const markInProgressTask = async () => {
  console.log('# Mark in process a task')

  const inputId = await new Promise<string>((resolve) => {
    rl.question('Enter the task id: ', (answer) => {
      resolve(answer)
    })
  })

  if (!inputId) {
    console.log('Task id cannot be empty.')
    rl.close()
    return
  }

  try {
    const tasks = getTasks()

    const id = Number(inputId)
    const task = tasks.find((item) => item.id === id)

    if (!task) {
      console.log('Task with id cannot be found.')
      rl.close()
      return
    }

    if (task.status === 'in-progress') {
      console.log('Task is already in-progress status.')
      rl.close()
      return
    }

    const newTasks = tasks.map((item) => {
      if (item.id !== id) return item

      return {
        ...item,
        status: 'in-progress',
        updatedAt: new Date().toISOString()
      }
    })

    const filePath = checkAndCreateFile()

    fs.writeFileSync(filePath, JSON.stringify(newTasks, null, 2))
    console.log(`Task updated with in-progress with ID: ${id}`)
  } catch (error) {
    console.error('Error reading or writing file:', error)
  }

  rl.close()
}

markInProgressTask()
