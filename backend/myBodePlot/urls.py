from django.contrib import admin
from django.urls import path, include, patterns
from django.conf import settings

urlpatterns = [
  path('admin/', admin.site.urls),
  path('', include('home.urls'))
]
if not settings.DEBUG:
    urlpatterns += patterns('',
        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    )
