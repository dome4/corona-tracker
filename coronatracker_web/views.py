from django.shortcuts import render
from coronatracker_api.models import RecordableUser, Recording
from coronatracker_api.serializers import RecordingSerializer
from django.http import HttpResponse
from datetime import date

# Create your views here.


def index(request):
    today = date.today()

    context = {
        "users": RecordableUser.objects.all(),
        "recordings": Recording.objects.filter(timestamp__year=today.year, timestamp__month=today.month, timestamp__day=today.day),
        "today": today
    }

    return render(request, "web/index.html", context)
