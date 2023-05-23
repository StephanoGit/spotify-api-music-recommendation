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
AUTH_ENDPOINT = os.getenv('AUTH_ENDPOINT')
REDIRECT_URI = os.getenv('REDIRECT_URI')

scopes_new = ['streaming', 'user-read-email', 'user-read-private', 'user-library-read',
            'user-library-modify', 'user-read-playback-state', 'user-modify-playback-state',
            'playlist-read-private', 'playlist-modify-private', 'playlist-read-collaborative',
            'playlist-modify-public', 'user-top-read', 'user-follow-read'];

scope = 'user-read-playback-state user-modify-playback-state user-library-read'
auth_manager = spotipy.SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(auth_manager=auth_manager)

@app.route('/login', methods=['POST'], strict_slashes=False)
def getLoginEndPoint():
    scopes = "%20".join(scopes_new)
    endPoint = (f"{AUTH_ENDPOINT}client_id={CLIENT_ID}"
                f"&redirect_uri={REDIRECT_URI}"
                f"&scope={scopes}"
                f"&response_type=token&show_dialog=true")
    return endPoint

@app.route('/recommendations', methods=['POST', 'GET'], strict_slashes=False)
def getRecommendations():
    playlist_id = request.json['playlist_id']
    access_token = request.json['access_token']
    recommendations = generate_recommendation(playlist_id=playlist_id, access_token=access_token)

    return {'recommendations': recommendations}