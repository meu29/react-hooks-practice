from flask import Flask, make_response, request, session
from flask_cors import CORS 
import json
import random 
import sqlite3

app = Flask(__name__)
CORS(app)
app.secret_key = "hogehoge" #なんでもよい ないとセッションでエラー

#サーバー側で許可
@app.after_request
def after_request(res):
  res.headers.add("Access-Control-Allow-Origin", "*")
  res.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
  res.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
  return res

@app.route("/login", methods = ["POST"])
def login():
    
    connection = sqlite3.connect("db.sqlite")
    cursor = connection.cursor()
    cursor.execute("create table if not exists users(userId text, password text, mailAdress text)")

    users = [row for row in cursor.execute("select * from users where userId = ? and password = ?", (request.json["userId"], request.json["password"]))]
    connection.commit()
    connection.close()

    if len(users) == 1:
        session["userId"] = request.json["userId"]
        session["password"] = request.json["password"]
        return make_response(json.dumps({"message": "ログインに成功"}))
    else:
        return make_response(json.dumps({"message": "ログインに失敗"}))

@app.route("/session", methods = ["GET"])
def checkSession():

    if "userId" in session and "password" in session:
        return make_response(json.dumps({"loginState": True}))
    else:
        return make_response(json.dumps({"loginState": False}))

@app.route("/events", methods = ["GET"])
def getEvents():

    connection = sqlite3.connect("db.sqlite")
    cursor = connection.cursor()
    cursor.execute("create table if not exists events (eventId text, title text, description text, likes int)")
    #flagはそのユーザーIDがイベントの主催者かどうか 真偽値型がないので0と1で表現
    cursor.execute("create table if not exists logs (userId text, eventId text, flag int)")
    events = [row for row in cursor.execute("select * from events")]

    if len(events) == 0:
        cursor.execute("insert into events values ('dWGHQtF_Lp', 'ようこそ', '機能について説明します', 0)")
        cursor.execute("insert into logs values ('@testbot', 'dWGHQtF_Lp', 1)")

    connection.commit()
    connection.close()
    return make_response(json.dumps({"events": events}))

if __name__ == "__main__":
    app.run(debug = True)