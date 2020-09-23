from coronatracker_api.models import RecordableUser, Recording
from rest_framework import serializers


class RecordableUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RecordableUser
        fields = ['name', 'img_url', 'id']


class RecordingSerializer(serializers.HyperlinkedModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Recording
        fields = ['user', 'timestamp', 'user_name']
