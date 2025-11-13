import * as readline from 'readline'
import { getTasks } from './helpers'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const listTask = async () => {
  console.log('# List task')

  try {
    const tasks = getTasks()

    const typeInput = await new Promise<string>((resolve) => {
      rl.question('Enter the task type: ', (answer) => {
        resolve(answer)
      })
    })

    if (!typeInput) {
      console.log('All task:', tasks)
      rl.close()
      return
    }

    if (typeInput === 'todo') {
      console.log(
        'Todo task:',
        tasks.filter((item) => item.status === 'todo')
      )
      rl.close()
      return
    }

    if (typeInput === 'in-progress') {
      console.log(
        'In-progress task:',
        tasks.filter((item) => item.status === 'in-progress')
      )
      rl.close()
      return
    }

    if (typeInput === 'done') {
      console.log(
        'Done task:',
        tasks.filter((item) => item.status === 'done')
      )
      rl.close()
      return
    }

    console.log('Task type invalid')
  } catch (error) {
    console.error('Error reading or writing file:', error)
  }

  rl.close()
}

listTask()
