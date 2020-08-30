from rest_framework_gis.serializers import GeoFeatureModelSerializer

from api import models

class TestCenSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.TestCen
        geo_field = "geom"
        id_field = 'id'
        fields = (
            'id',
            'title',
            'cutdescription',
            'description',
            'street',
            'city',
            'zip',
            'address',
            'name_2',
            'district',
            'name_1',
            'state',
            )


class StatesSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.IndStates
        geo_field = "geom"
        id_field = 'state'
        fields = (
            'name_1',
            'state',
            'engtype_1',
            'statecode'
            )

class DistrictsSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.IndDistricts
        geo_field = "geom"
        id_field = 'district'
        fields = (
            'name_2',
            'district',
            'name_1',
            'state',
            'engtype_2',
            'statecode'
            )



class StateCoordsSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.StateCoords
        geo_field = "geom"
        id_field = 'state'
        fields = (
            'name_1',
            'state',
            'engtype_1',
            'statecode'
            )


class DistrictCoordsSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.DistrictCoords
        geo_field = "geom"
        id_field = 'district'
        fields = (
            'name_2',
            'district',
            'name_1',
            'state',
            'engtype_2',
            'statecode'
            )
