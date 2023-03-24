import { AxiosResponse } from 'axios';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import Api, { handleError } from '../backend/axios';
import { IApiResponse } from '../models/api.model';
import { IRoom, IMessage } from '../models/chat.model';
import UserService from './user.service';

interface IUSerPair {
  id: string;
  name: string;
}

type CallBack = {
  (mess: IMessage | boolean, err: Error | null): void;
};

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
const users: IUSerPair[] = [];

const initConnection = (jwt: string) => {
  socket = io(process.env.REACT_APP_API as string, {
    auth: { jwt },
  });
};

const getUsernameForId = (id: string) => {
  (async () => {
    const username = await UserService.getUsernameById(id);
    users.push({ id, name: username.data });
  })().catch((err: Error) => err.message);
};

const subscribeToMessages = (cb: CallBack): void => {
  if (!socket) return;
  socket.on('chat-message-created', (m: IMessage) => {
    if (!users.find((e) => e.id === m.author)) {
      getUsernameForId(m.author);
    }
    cb(
      {
        ...m,
        author: users.find((e) => e.id === m.author)?.name || '',
        date: new Date().toISOString(),
      },
      null,
    );
  });
};

const subscribeToConnection = (cb: CallBack): void => {
  if (!socket) return;
  socket.on('connect', () => {
    cb(true, null);
  });
};

const subscribeToLoginError = (cb: CallBack): void => {
  if (!socket) return;
  socket.on('login_error', () => {
    cb(true, null);
  });
};

const sendMessage = (room: string, message: string) => {
  if (!socket) return;
  socket.emit('create-chat-message', {
    path: {
      id: room,
    },
    body: { body: message },
  });
};

const sendJoinRoom = (room: string) => {
  if (!socket) return;
  socket.emit('join-chatroom', { path: { id: room } });
};

const disconnect = () => {
  if (!socket) return;
  socket.disconnect();
};

const fetchRooms = async (): Promise<IApiResponse<IRoom[]>> => Api()
  .get('/chatrooms')
  .then(
    (response: AxiosResponse<IRoom[]>) => ({
      status: 'success',
      data: response.data,
    } as IApiResponse<IRoom[]>),
  )
  .catch(handleError)
  .catch((error: Error) => ({ status: 'error', data: error.message }));

const fetchJoinedRooms = async (jwt: string): Promise<IApiResponse<IRoom[]>> => Api()
  .get('/chatrooms/joined', { headers: { Authorization: `Bearer ${jwt}` } })
  .then(
    (response: AxiosResponse<IRoom[]>) => ({
      status: 'success',
      data: response.data,
    } as IApiResponse<IRoom[]>),
  )
  .catch(handleError)
  .catch((error: Error) => ({ status: 'error', data: error.message }));

const joinRoom = async (roomId: string): Promise<IApiResponse<boolean>> => Api()
  .patch(`/chatrooms/${roomId}/join`)
  .then(
    () => ({
      status: 'success',
      data: true,
    } as IApiResponse<boolean>),
  )
  .catch(handleError)
  .catch((error: Error) => ({ status: 'error', data: error.message }));

const ChatService = {
  fetchRooms,
  fetchJoinedRooms,
  joinRoom,
  initConnection,
  subscribeToMessages,
  subscribeToConnection,
  subscribeToLoginError,
  sendMessage,
  sendJoinRoom,
  disconnect,
};

export default ChatService;
