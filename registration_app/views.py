

# Create your views here.
from django.shortcuts import render_to_response

from registration_app.models import Person
from registration_app.serializers import PersonSerializer
from rest_framework import generics


class PersonList(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class PersonDetails(generics.DestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


def index(request):
    return render_to_response('index.html')