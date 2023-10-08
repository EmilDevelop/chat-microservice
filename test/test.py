import socketio

sio = socketio.Client()


@sio.event
def connect():
    print("connection established")


@sio.event
def my_message(data):
    print("message received with ", data)
    sio.emit("my response", {"response": "my response"})


@sio.event
def disconnect():
    print("disconnected from server")


@sio.on("verbose")
def chat(data):
    print(data)


@sio.on("joinRoom")
def join_room(data):
    print(data)


@sio.on("chat")
def chat(msg):
    print(msg)


@sio.on("messageToRoom")
def message_to_room(data):
    print(data)


server_address = "http://5.53.124.87:3007"
local_address = "http://127.0.0.1:3007"
DEBUG = False
connection_address = local_address if DEBUG else server_address
sio.connect(connection_address)
# sio.emit("verbose", "HELLO!")
sio.emit("joinRoom", "79961049967")
# sio.emit("messageToRoom", {"room": "79961049967", "message": "А не ахуел-ли ты часом?"})
user_id = "31OotsiztwYRACZKAAAD"
sio.emit("privateMessage", {"to": user_id, "message": "Poshel nahuy"})

sio.wait()
