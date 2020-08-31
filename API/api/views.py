from rest_framework.response import Response
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView
)

from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance

from api import serializers,models

class TestCenListView(ListAPIView):
    queryset = models.TestCen.objects.all()
    serializer_class = serializers.TestCenSerializer
    

    def get_queryset(self):
        queryset = models.TestCen.objects.all()

        state = self.request.query_params.get('state',None)

        district = self.request.query_params.get('district',None)

        longitude = float(self.request.query_params.get('lng', 0.0))
        latitude  = float(self.request.query_params.get('lat', 0.0))
        rangeInKM  = int(self.request.query_params.get('range', 50))

        if state:
            return queryset.filter(state=state)
        if district:
            return queryset.filter(district=district)
        if latitude and longitude:
            location = Point(longitude,latitude,srid=4326)
            qTestCens = queryset.filter(geom__distance_lte=(location,D(km=rangeInKM))).annotate(distance=Distance("geom", location)).order_by('distance')
            return qTestCens
        return queryset


class DistrictsListView(ListAPIView):
    serializer_class = serializers.DistrictsSerializer

    def get_queryset(self):
        queryset = models.IndDistricts.objects.all()
        longitude = float(self.request.query_params.get('lng', None))
        latitude  = float(self.request.query_params.get('lat', None))
        if latitude and longitude:
            location = Point(longitude,latitude,srid=4326)
            qDistrict = queryset.filter(geom__contains=location)
            return qDistrict
        return queryset

class DistrictsDetailView(RetrieveAPIView):
    queryset = models.IndDistricts.objects.all()
    serializer_class = serializers.DistrictsSerializer
    lookup_field='district'

class StatesListView(ListAPIView):
    serializer_class = serializers.StatesSerializer
    def get_queryset(self):
        queryset = models.IndStates.objects.all()
        longitude = float(self.request.query_params.get('lng', None))
        latitude  = float(self.request.query_params.get('lat', None))
        if latitude and longitude:
            location = Point(longitude,latitude,srid=4326)
            qState = queryset.filter(geom__contains=location)
            return qState
        return queryset


class StatesDetailView(RetrieveAPIView):
    queryset = models.IndStates.objects.all()
    serializer_class = serializers.StatesSerializer
    lookup_field='state'



class StateCoordsListView(ListAPIView):
    queryset = models.StateCoords.objects.all()
    serializer_class = serializers.StateCoordsSerializer


class DistrictCoordsListView(ListAPIView):
    queryset = models.DistrictCoords.objects.all()
    serializer_class = serializers.DistrictCoordsSerializer


class StateCoordsDetailView(RetrieveAPIView):
    queryset = models.StateCoords.objects.all()
    serializer_class = serializers.StateCoordsSerializer
    lookup_field='state'

class DistrictCoordsDetailView(RetrieveAPIView):
    queryset = models.DistrictCoords.objects.all()
    serializer_class = serializers.DistrictCoordsSerializer
    lookup_field='district'








# class ArticlesListView(ListCreateAPIView):
#     # queryset = models.Article.objects.all()
#     serializer_class = serializers.ArticleSerializer

#     def get_queryset(self):
#         query={}
#         for k,v in self.request.GET.items():
#             query["{}__icontains".format(k)]=v
#         return models.Article.objects.filter(**query)