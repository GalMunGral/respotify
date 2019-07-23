export LC_ALL=C.UTF-8
export LANG=C.UTF-8
FLASK_APP=app.py \
FLASK_ENV=development \
flask run --port=3001 --host=0.0.0.0
