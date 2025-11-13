import fs from 'fs'
import * as readline from 'readline'
import { checkAndCreateFile, getTasks } from './helpers'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const markDoneTask = async () => {
  console.log('# Mark done a task')

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

    if (task.status === 'done') {
      console.log('Task is already done status.')
      rl.close()
      return
    }

    const newTasks = tasks.map((item) => {
      if (item.id !== id) return item

      return {
        ...item,
        status: 'done',
        updatedAt: new Date().toISOString()
      }
    })

    const filePath = checkAndCreateFile()

    fs.writeFileSync(filePath, JSON.stringify(newTasks, null, 2))
    console.log(`Task updated with done with ID: ${id}`)
  } catch (error) {
    console.error('Error reading or writing file:', error)
  }

  rl.close()
}

markDoneTask()
