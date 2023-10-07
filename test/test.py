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


@sio.on("chat")
def chat(data):
    print(data)


sio.connect("http://5.53.124.87:3007")
sio.emit("chat", "HELLO!")

sio.wait()
