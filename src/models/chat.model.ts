export interface IRoom {
  name: string;
  id: string;
  members: string[];
}

export interface IMessage {
  body: string;
  date: string;
  author: string; // id
  chatroom: string; // id
}
