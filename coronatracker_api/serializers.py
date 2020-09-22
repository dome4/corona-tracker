from coronatracker_api.models import RecordableUser, Recording
from rest_framework import serializers


class RecordableUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RecordableUser
        fields = ['name', 'img_url']


class RecordingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Recording
        fields = ['user', 'timestamp']
