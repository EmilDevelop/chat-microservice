export interface AuthorInterface {
  id: string;
  firstName: string;
  lastName: string;
}
export interface RoomMsgInrerface {
  from_user_socket_id: string;
  to_room: string;
  author: AuthorInterface;
  text: string;
  id: string;
  createdAt: number;
}

export interface PrivateMsgInrerface {
  from_user_socket_id: string;
  to_user_socket_id: string;
  to_room?: string;
  author: AuthorInterface;
  text: string;
  id: string;
  createdAt: number;
}
