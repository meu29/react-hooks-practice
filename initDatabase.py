# -*- coding:utf-8 -*-
import os
import sqlite3

filepath = "db.sqlite"
os.remove(filepath)

#存在しない場合は自動で作成
connection = sqlite3.connect(filepath)
cursor = connection.cursor()

cursor.execute("create table users(userId text, password text, mailAdress text, userName text)")
cursor.execute("create table events (eventId text, title text, description text, likes int)")
#flagはそのユーザーIDがイベントの主催者かどうか 真偽値型がないので0と1で表現
cursor.execute("create table logs (userId text, eventId text, flag int)")

cursor.execute("insert into users values ('@testbot', 'password', 'hogefuga@gmail.com', 'まんち')")
cursor.execute("insert into users values ('@oonishi', 'aiueo', 'oonishi123@gmail.com', 'オオニシ')")
cursor.execute("insert into events values ('dWGHQtF_Lp', 'ようこそ', '機能について説明します', 0)")
cursor.execute("insert into logs values ('@testbot', 'dWGHQtF_Lp', 1)")
    
connection.commit()
connection.close()