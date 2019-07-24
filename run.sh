# (. venv/bin/activate && LC_ALL=C.UTF-8 LANG=C.UTF-8 FLASK_APP=app.py FLASK_ENV=development \
#   flask run --port=3001 --host=0.0.0.0 &)
(LC_ALL=C.UTF-8 LANG=C.UTF-8 FLASK_APP=app.py FLASK_ENV=development \
  flask run --port=3001 --host=0.0.0.0 &)
(serve -s respotify/build -l 3000 &)
