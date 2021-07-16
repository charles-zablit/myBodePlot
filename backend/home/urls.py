from django.urls import path
from .views import *

urlpatterns = [
  path('', indexView.as_view(), name="index"),
  path('manifest.json', manifestView.as_view(), name='manifest'),
  path('sw.js', swView.as_view(), name='sw'),
]