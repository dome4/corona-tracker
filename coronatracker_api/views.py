from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions

from coronatracker_api.models import RecordableUser, Recording
from coronatracker_api.serializers import RecordableUserSerializer, RecordableUserSerializer

# Create your views here.


class RecordableUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows RecordableUser to be viewed or edited.
    """
    queryset = RecordableUser.objects.all()
    serializer_class = RecordableUserSerializer


class RecordingViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Recording to be viewed or edited.
    """
    queryset = Recording.objects.all()
    serializer_class = RecordableUserSerializer
