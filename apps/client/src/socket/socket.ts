import io, { Socket } from 'socket.io-client';

export class SocketConnector {
  instance: Socket;
  constructor() {
    const item = window.localStorage.getItem('token');
    const jwt = item ? JSON.parse(item) : '';
    this.instance = io(process.env.REACT_APP_SOCKET_URL || 'localhost:3020', {
      transports: ['websocket'],
      query: {
        token: jwt,
      },
    });
    console.log(`this.socket`, this.instance);
  }
}
