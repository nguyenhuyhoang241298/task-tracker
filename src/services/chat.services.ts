import { Socket } from 'socket.io'

class ChatServices {
  connection(socket: Socket) {
    socket.on('chat', (message: string) => {
      _io.emit('chat', message)
    })
  }
}

export default new ChatServices()
