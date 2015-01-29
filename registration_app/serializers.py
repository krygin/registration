from django.http import HttpResponse
from rest_framework.renderers import JSONRenderer
from registration_app.models import Person

__author__ = 'Ivan'

from rest_framework import serializers

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'name', 'birthday', 'gender', 'email', 'tel')

    gender = serializers.ChoiceField(
            choices=('M', 'F'),
            style={'base_template': 'radio.html'}
        )