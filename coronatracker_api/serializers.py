from coronatracker_api.models import RecordableUser, Recording
from rest_framework import serializers
import requests
import base64
import random

from django.core import files


class RecordableUserSerializer(serializers.HyperlinkedModelSerializer):
    def create(self, validated_data):
        # make request
        try:
            # random gender
            gender = None
            if bool(random.getrandbits(1)) is True:
                gender = 'male'
            else:
                gender = 'female'

            url = 'http://avatar-generator:8000/' + gender + \
                '/' + validated_data['name'] + '.jpeg'
            response = requests.get(url)

            # Was the request OK?
            if response.status_code != 200:
                print('status code: ')
                raise Exception('invalid avatar request response')

            validated_data['avatar'] = base64.b64encode(
                response.content).decode('ascii')

        except:
            pass

        return RecordableUser.objects.create(**validated_data)

    class Meta:
        model = RecordableUser
        fields = ['name', 'id', 'avatar']


class RecordingSerializer(serializers.HyperlinkedModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Recording
        fields = ['id', 'user', 'timestamp', 'user_name']
