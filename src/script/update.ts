import fs from 'fs'
import * as readline from 'readline'
import { checkAndCreateFile, getTasks } from './helpers'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const updateTask = async () => {
  console.log('# Updating a task')

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

    const descriptionInput = await new Promise<string>((resolve) => {
      rl.question('Enter task description: ', (answer) => {
        resolve(answer)
      })
    })

    const newTasks = tasks.map((item) => {
      if (item.id !== id) return item

      return {
        ...item,
        description: descriptionInput,
        updatedAt: new Date().toISOString()
      }
    })

    const filePath = checkAndCreateFile()

    fs.writeFileSync(filePath, JSON.stringify(newTasks, null, 2))
    console.log(`Task updated successfully with ID: ${id}`)
  } catch (error) {
    console.error('Error reading or writing file:', error)
  }

  rl.close()
}

updateTask()
