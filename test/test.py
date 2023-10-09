import json
import time
import socketio

sio = socketio.Client()


@sio.event
def connect():
    print("connection established")


@sio.event
def disconnect():
    print("disconnected from server")


server_address = "http://5.53.124.87:3007"
local_address = "http://127.0.0.1:3007"
DEBUG = True
connection_address = local_address if DEBUG else server_address
sio.connect(connection_address)


sio.wait()
