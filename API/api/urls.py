from django.urls import path
# from django.urls import re_path
from api import views

urlpatterns = [
    path('testCen/',views.TestCenListView.as_view()),
    path('state/',views.StatesListView.as_view()),
    path('state/<slug:state>',views.StatesDetailView.as_view()),
    path('district/',views.DistrictsListView.as_view()),
    path('district/<slug:district>',views.DistrictsDetailView.as_view()),
    path('stateCoords/',views.StateCoordsListView.as_view()),
    path('stateCoords/<slug:state>',views.StateCoordsDetailView.as_view()),
    path('districtCoords/',views.DistrictCoordsListView.as_view()),
    path('districtCoords/<slug:district>',views.DistrictCoordsDetailView.as_view()),
    # re_path(r'^district/(?P<varname_2>\w+)/$', views.DistrictsDetailView.as_view()),
]
