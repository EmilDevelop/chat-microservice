import json
import os
import time
import socketio


# Создаем экземпляр клиента
sio = socketio.Client()


@sio.event
def connect():
    print("Connected to server")


@sio.on("connect")
def connect(data):
    print(data)


sio.connect("http://5.53.124.87:3007")


@sio.on("chat")
def chat(data):
    print("Message ", data)


sio.emit("chat", {})


#
