from flask import Flask, make_response, request, session
from flask_cors import CORS 
import json
import random 
import sqlite3

app = Flask(__name__)
CORS(app)
app.secret_key = "hogehoge" #なんでもよい ないとセッションでエラー

#connection = sqlite3.connect("db.sqlite")とcursor = connection.cursor()は関数ごとに書かないとエラー

#サーバー側でリクエストを許可
@app.after_request
def after_request(res):
  res.headers.add("Access-Control-Allow-Origin", "*")
  res.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
  res.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
  return res

@app.route("/login", methods = ["POST"])
def login():

    #ブラウザをリロードするとセッションが消える
    if "userId" in session and "password" in session:
        return make_response(json.dumps({"message": "ログインに成功"}))
    
    connection = sqlite3.connect("db.sqlite")
    cursor = connection.cursor()

    users = [row for row in cursor.execute("select * from users where userId = ? and password = ?", (request.json["userId"], request.json["password"]))]

    if len(users) == 1:
        session["userId"] = request.json["userId"]
        session["password"] = request.json["password"]
        query = "select events.eventId, events.title, events.description, logs.flag from events inner join logs on events.eventId = logs.eventId where logs.userId = ?"
        #要素が一つでも必ず,をつける
        myEvents = [row for row in cursor.execute(query, (request.json["userId"],))]
        connection.close()
        return make_response(json.dumps({"message": "ログインに成功", "userData": users[0], "myEvents": myEvents}))
    else:
        connection.close()
        return make_response(json.dumps({"message": "ログインに失敗", "userData": [], "myEvents": []}))

@app.route("/logout", methods = ["GET"])
def logout():

    session.pop("userId", None)
    session.pop("password", None)
    return make_response(json.dumps({"message": "ログアウトに成功"}))

@app.route("/events", methods = ["GET", "POST", "DELETE"])
def getEvents():

    connection = sqlite3.connect("db.sqlite")
    cursor = connection.cursor()

    if request.method == "DELETE" and request.json["flag"] == 1:
        #開催のキャンセル
        cursor.execute("delete from events where eventId = ?", (request.json["eventId"]))
        cursor.execute("delete from logs where eventId = ?", (request.json["eventId"]))
    elif request.method == "DELETE" and request.json["flag"] == 0:
        #参加のキャンセル
        cursor.execute("delete from logs where eventId = ? and userId = ?", (request.json["eventId"], request.json["userId"]))
    elif request.method == "POST" and request.json["flag"] == 1:
        cursor.execute("insert into events values (?, ?, ?, 0)", (request.json["eventId"], request.json["title"], request.json["description"]))
        cursor.execute("insert into logs values (?, ?, 1)", (request.json["userId"], request.json["eventId"]))
    elif request.method == "POST" and request.json["flag"] == 0:
        cursor.execute("insert into logs values (?, ?, 0)", (request.json["userId"], request.json["eventId"]))
    
    if "userId" not in session and "password" not in session:
        events = [row for row in cursor.execute("select * from events")]
    else:
        events = [row for row in cursor.execute("select * from events where userId != ?", (session["userId"]))]
    #queries = request.query_string.decode().split("&")
    
    connection.commit()
    connection.close()
    return make_response(json.dumps({"events": events}))

'''
@app.route("/user", methods = ["GET", "POST"])
def getUserData():

    connection = sqlite3.connect("db.sqlite")
    cursor = connection.cursor()

    query = "select events.eventId, events.title, events.description, events.likes, logs.userId, logs.flag from events inner join logs on events.eventId = logs.eventId where logs.userId = ?" 
    myEvents = [row for row in cursor.execute(query, re)]

    connection.commit()
    connection.close()
'''
if __name__ == "__main__":
    app.run(debug = True)