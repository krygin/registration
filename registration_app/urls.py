from rest_framework.urlpatterns import format_suffix_patterns
from registration_app import views
from registration_app.views import PersonList, PersonDetails

__author__ = 'Ivan'


from django.conf.urls import url
urlpatterns = [
    url(r'^persons/$', PersonList.as_view()),
    url(r'^persons/(?P<pk>[0-9]+)/$', PersonDetails.as_view()),
    url(r'^$', views.index)
]
urlpatterns = format_suffix_patterns(urlpatterns)