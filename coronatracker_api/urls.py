from django.urls import path
from . import views


urlpatterns = [
    path('recordings-today/', views.recordings_today, name='recordings-today'),
]
