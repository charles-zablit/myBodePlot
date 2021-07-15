web: gunicorn backend.myBodePlot.wsgi
worker: python main.py
release: python manage.py migrate --run-syncdb