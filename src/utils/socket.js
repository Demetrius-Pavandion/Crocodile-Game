import io from 'socket.io-client';

//const url = 'http://localhost:4001';
const url = 'https://tranquil-wave-78594.herokuapp.com/';
const socket = io(url);

export default socket;