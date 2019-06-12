from flask import Flask, redirect, request, send_file
from urllib.request import urlopen, Request
from urllib.parse import urlencode, parse_qs
from random import randint
import base64
import json

app = Flask(__name__)

CLIENT_ID = '0972a94bc9e14e4a97687a30a6940c57'
CLIENT_SECRET = '39684292f5d048f1b4541113224c682c'
HOST = 'http://localhost:5000'
auth_code_endpoint = '/authorization-code-callback'
impl_grant_endpoint = '/implicit-grant-callback'

@app.route('/')
def index():
  params = parse_qs(request.query_string)
  implicit = params[b'implicit'][0].decode() == 'true'
  endpoint = 'https://accounts.spotify.com/authorize?'
  params = {
    'client_id': CLIENT_ID,
    'response_type': 'token' if implicit else 'code',
    'redirect_uri': HOST + (impl_grant_endpoint if implicit else auth_code_endpoint),
    'state': randint(0, 1000000),
    'scope': 'user-read-private playlist-read-private',
    'show_dialog': 'true' 
  }
  return redirect(endpoint + urlencode(params))

@app.route('/test')
def test():
  endpoint = 'https://accounts.spotify.com/api/token'
  params = {
    'grant_type': 'client_credentials',
  }
  req = Request(url=endpoint, method='POST',
    data=urlencode(params).encode(),
    headers={
      'Authorization': 'Basic ' + base64.b64encode((CLIENT_ID + ':' + CLIENT_SECRET).encode()).decode()
    })
  with urlopen(req) as f:
    res = f.read()
    return res

@app.route('/implicit-grant-callback')
def implicit_grant_callback():
  return send_file('test.html')

@app.route('/authorization-code-callback')
def auth_code_callback():
  params = parse_qs(request.query_string)
  auth_code = params[b'code'][0].decode()
  endpoint = 'https://accounts.spotify.com/api/token'
  params = {
    'grant_type': 'authorization_code',
    'code': auth_code,
    'redirect_uri': 'http://localhost:5000/authorization-code-callback'
  }
  req = Request(url=endpoint, method='POST',
    data=urlencode(params).encode(),
    headers={
      'Authorization': 'Basic ' + base64.b64encode((CLIENT_ID + ':' + CLIENT_SECRET).encode()).decode()
    })
  with urlopen(req) as f:
    res = f.read()
    return res