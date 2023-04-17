import time
from flask import Flask, request

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/test', methods=['POST'], strict_slashes=False)
def testing():
    title = request.json['title']
    print(title)
    return {'title': title}