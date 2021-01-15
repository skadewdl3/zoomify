import os
from dotenv import load_dotenv
from flask import Flask, redirect
from functions import init, get_json, delete_meeting, create_meeting
from flask_cors import CORS, cross_origin
import schedule
import time
import threading
import json


env_path = './.env'
load_dotenv(dotenv_path = env_path)
app = Flask(__name__)
cors = CORS(app)

def read_json_data():
  with open('data.json') as json_file:
    data = json.load(json_file)
    return data

def start_server():
  app.run(host = '0.0.0.0', port = 5000)

def start_scheduler():
  while True:
    schedule.run_pending()
    print('running')
    time.sleep(5)

@app.route('/meeting-data')
def send_meeting_data():
  return get_json()

@app.route('/meeting/<type>/<i>')
def send_one_meeting_data(type, i):
  res = get_json()
  index = int(i)
  arr = res[type]
  if len(arr) - 1 < index:
    return redirect('http://localhost:3000')
  else:
    return res[type][index]

@app.route('/refresh-meetings')
def restart():
  schedule.clear()
  data = read_json_data()
  init(email = data['email'], password = data['password'])
  res = get_json()
  return res

@app.route('/delete/<type>/<i>')
def delete(type, i):
  res = get_json()
  index = int(i)
  arr = res[type]
  if len(arr) - 1 < index:
    return redirect('http://localhost:3000')
  else:
    new_data = delete_meeting(type = type, index = index)
    return new_data

if __name__ == '__main__':
  data = read_json_data()
  init(email = data['email'], password = data['password'])
  threading.Thread(target = start_scheduler).start()
  threading.Thread(target = start_server).start()