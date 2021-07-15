web: gunicorn --chdir backend myBodePlot.wsgi
worker: python main.py
release: cd backend && python manage.py migrate --run-syncdb