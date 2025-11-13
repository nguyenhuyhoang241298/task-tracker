import fs from 'fs'
import * as readline from 'readline'
import { checkAndCreateFile } from './helpers'
import { Task } from './type'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const addTask = async () => {
  console.log('# Adding a new task')

  const userInput = await new Promise<string>((resolve) => {
    rl.question('Enter task description: ', (answer) => {
      resolve(answer)
    })
  })

  if (userInput.trim() === '') {
    console.log('Task description cannot be empty.')
    rl.close()
    return
  }

  const filePath = checkAndCreateFile()

  try {
    const fileData = fs.readFileSync(filePath, 'utf-8')
    const tasks = JSON.parse(fileData)

    const now = new Date().toISOString()
    const newTask: Task = {
      id: Date.now(),
      description: userInput,
      status: 'todo',
      createdAt: now,
      updatedAt: now
    }

    if (Array.isArray(tasks)) {
      tasks.push(newTask)
      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2))
      console.log(`Task added successfully with ID: ${newTask.id}`)
    } else {
      console.log('Invalid data format in file.')
    }
  } catch (error) {
    console.error('Error reading or writing file:', error)
  }

  rl.close()
}

addTask()
