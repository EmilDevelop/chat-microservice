export interface MsgInrerface {
  from_user_socket_id: string;
  to_user_socket_id: string;
  to_room: string;
  author: string;
  msg: string;
  uuid: string;
  date: Date;
}
