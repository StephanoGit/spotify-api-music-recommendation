from util import generate_recommendation

import time
from flask import Flask, request

import spotipy
import spotipy.util as util
from spotipy.oauth2 import SpotifyOAuth
import os
from dotenv import load_dotenv

app = Flask(__name__)

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')


scope = 'user-read-playback-state user-modify-playback-state user-library-read'
auth_manager = spotipy.SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(auth_manager=auth_manager)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/recommendations', methods=['POST', 'GET'], strict_slashes=False)
def testing():
    playlist_id = request.json['playlist_id']
    access_token = request.json['access_token']

    recommendations = generate_recommendation(playlist_id=playlist_id, access_token=access_token)

    return {'recommendations': recommendations}