from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

from coronatracker_api.models import RecordableUser, Recording
from coronatracker_api.serializers import RecordableUserSerializer, RecordingSerializer
from datetime import date

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
    serializer_class = RecordingSerializer


@api_view(["GET"])
def recordings_today(request):

    today = date.today()
    recordings_today = Recording.objects.filter(
        timestamp__year=today.year, timestamp__month=today.month, timestamp__day=today.day)

    res = []

    for record in recordings_today:
        serializer = RecordingSerializer(record, context={'request': request})
        res.append(serializer.data)

    return Response(res)
