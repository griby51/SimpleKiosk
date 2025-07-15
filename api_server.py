from flask import Flask, jsonify
import os
from dotenv import load_dotenv
from flask_cors import CORS
import spotipy
from spotipy.oauth2 import SpotifyOAuth

load_dotenv("config.env")

app = Flask(__name__)
CORS(app)

SPOTIPY_CLIENT_ID = os.getenv("SPOTIPY_CLIENT_ID")
SPOTIPY_CLIENT_SECRET = os.getenv("SPOTIPY_CLIENT_SECRET")
SPOTIPY_REDIRECT_URI = 'http://127.0.0.1:8888/callback'

scope = "user-read-playback-state user-read-currently-playing"

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=SPOTIPY_CLIENT_ID,
    client_secret=SPOTIPY_CLIENT_SECRET,
    redirect_uri=SPOTIPY_REDIRECT_URI,
    scope=scope,
    cache_path=".cache-spotify"
))

@app.route('/api/spotify_info')
def spotify_info():
    current = sp.current_playback()
    item = current['item']
    return jsonify({
        "title": item["name"],
        "artist": ", ".join(a["name"] for a in item["artists"]),
        "cover": item["album"]["images"][0]["url"] if item["album"]["images"] else "images/default_cover.jpg"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)