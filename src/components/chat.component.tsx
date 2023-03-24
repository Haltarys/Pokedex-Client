import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAppSelector } from '../hooks/redux.hooks';
import { IRoom, IMessage } from '../models/chat.model';
import ChatService from '../services/chatroom.service';

// style
import '../styles/chat.scss';

function Chat() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  // user
  const user = useAppSelector((state) => state.user);
  // i18n
  const { t } = useTranslation();
  // rooms
  const [chatRooms, setChatRooms] = useState<IRoom[]>([]);
  const [joinedRooms, setJoinedRooms] = useState<IRoom[]>([]);
  // current room
  const [chatRoomId, setChatRoomId] = useState<IRoom>({
    name: '',
    id: '',
    members: [],
  });
  // messages
  const [messages, setMessages] = useState<IMessage[]>([]);
  // message to send
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user.jwt) {
      ChatService.initConnection(user.jwt);
      ChatService.subscribeToConnection((data, err) => {
        if (err) setError(err.message);
        if (data) setIsConnected(true);
      });
      ChatService.subscribeToLoginError((data, err) => {
        if (err) setError(err.message);
        if (data) setError('error.ws.login_error');
      });
      ChatService.subscribeToMessages((data, err) => {
        if (err) setError(err.message);
        if (data) setMessages((ms) => [...ms, data as IMessage]);
      });
      return () => {
        ChatService.disconnect();
      };
    }
    return () => {};
  }, [user]);

  // handle error
  useEffect(() => {
    if (error) {
      toast.error(t(error), {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setError('');
    }
  }, [error, setError, t]);

  // handle rooms
  useEffect(() => {
    if (!user.jwt) return;
    (async () => {
      const rooms = await ChatService.fetchRooms();
      if (rooms.status !== 'success') throw new Error(rooms.data as string);
      setChatRooms(rooms.data as IRoom[]);
    })().catch(() => setError('error.room.fail'));
    (async () => {
      const rooms = await ChatService.fetchJoinedRooms(user.jwt);
      if (rooms.status !== 'success') return;
      setJoinedRooms((rooms.data as IRoom[]) || []);
    })().catch(() => setError('error.room.join'));
  }, [setChatRooms, setJoinedRooms, user]);

  if (!user || !user.jwt) {
    return <div>{t('error.login.first')}</div>;
  }

  const sendMessage = () => {
    if (!message) return;
    ChatService.sendMessage(chatRoomId.id, message);
    setMessage('');
  };

  const changeRoom = (id: string, name: string) => {
    if (!joinedRooms.find((r) => r.id === id)) {
      ChatService.sendJoinRoom(id);
      setJoinedRooms([...joinedRooms, { id, name, members: [] }]);
    }
    setChatRoomId({ id, name, members: [] });
  };

  const renderMyMessage = (m: IMessage) => (
    <div className="chat-my-message">
      <li className="clearfix">
        <div className="message-data align-right">
          <span className="message-data-time">{m.date}</span>
          &nbsp; &nbsp;
          <span className="message-data-name">{user.name}</span>
        </div>
        <div className="message other-message float-right">{m.body}</div>
      </li>
    </div>
  );

  const renderMessage = (m: IMessage) => (
    <div className="chat-message">
      <li>
        <div className="message-data">
          <span className="message-data-name">{m.author}</span>
          <span className="message-data-time">{m.date}</span>
        </div>
        <div className="message my-message">{m.body}</div>
      </li>
    </div>
  );

  const renderRoom = (r: IRoom) => (
    <li className="clearfix">
      <button type="button" onClick={() => changeRoom(r.id, r.name)}>
        <div className="about">
          <div className="name">{r.name}</div>
        </div>
      </button>
    </li>
  );

  return (
    <div id="chat">
      <div className="chat-container clearfix">
        <div className="people-list" id="people-list">
          {t('room.title')}
          <ul className="list">{chatRooms.map((r: IRoom) => renderRoom(r))}</ul>
        </div>

        <div className="chat">
          <div className="chat-header clearfix">
            <div className="chat-about">
              <div className="chat-with">{`Chat: ${chatRoomId.name}`}</div>
              <div className="chat-num-messages">
                {`Status: ${isConnected ? 'Online' : 'Offline'} - messages: ${
                  messages.filter((e) => e.chatroom === chatRoomId.id).length
                }`}
              </div>
            </div>
            <i className="fa fa-star" />
          </div>
          <div className="chat-history">
            <ul>
              {chatRoomId.id ? null : t('room.join')}
              {messages.map((m: IMessage) => {
                if (m.chatroom !== chatRoomId.id) return null;
                if (m.author === user.id || m.author === '9') {
                  return renderMyMessage(m);
                }
                return renderMessage(m);
              })}
            </ul>
          </div>

          <div className="chat-message clearfix">
            <textarea
              name="message-to-send"
              id="message-to-send"
              placeholder={t('room.placeholder') ?? ''}
              rows={3}
              onChange={(ev) => setMessage(ev.target.value)}
              value={message}
            />
            <button type="button" onClick={sendMessage}>
              {t('room.send')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
