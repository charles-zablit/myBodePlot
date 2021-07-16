from .base import *
import django_heroku
import dj_database_url

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!

SECRET_KEY = os.getenv('SECRET_KEY')

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {}
DATABASES['default'] = dj_database_url.config(conn_max_age=600)

LOGGING = {
	'version': 1,
	'disable_existing_loggers': False,
	'formatters': {
		'verbose': {
				'format': ('%(asctime)s [%(process)d] [%(levelname)s] ' +
										'pathname=%(pathname)s lineno=%(lineno)s ' +
										'funcname=%(funcName)s %(message)s'),
				'datefmt': '%Y-%m-%d %H:%M:%S'
		},
		'simple': {
				'format': '%(levelname)s %(message)s'
		}
	},
	'handlers': {
		'null': {
				'level': 'DEBUG',
				'class': 'logging.NullHandler',
		},
		'console': {
				'level': 'DEBUG',
				'class': 'logging.StreamHandler',
				'formatter': 'verbose'
		}
	},
	'loggers': {
		'testlogger': {
				'handlers': ['console'],
				'level': 'INFO',
		}
	}
}

DEBUG_PROPAGATE_EXCEPTIONS = True

#MIDDLEWARE.append('whitenoise.middleware.WhiteNoiseMiddleware')
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"
django_heroku.settings(locals(), staticfiles=False,logging=False)