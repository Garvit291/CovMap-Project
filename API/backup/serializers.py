from rest_framework_gis.serializers import GeoFeatureModelSerializer

from api import models

# class TestCenPvtSerializer(GeoFeatureModelSerializer):
#     """ A class to serialize locations as GeoJSON compatible data """

#     class Meta:
#         model = models.TestCenGovt
#         geo_field = "geom"
#         id_field = 'id'
#         fields = ('title','address','city','varname_2','state','status')

# class TestCenGovtSerializer(GeoFeatureModelSerializer):
#     """ A class to serialize locations as GeoJSON compatible data """

#     class Meta:
#         model = models.TestCenGovt
#         geo_field = "geom"
#         id_field = 'id'
#         fields = ('title','address','city','varname_2','state','status')



class StatesSerializer(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """

    class Meta:
        model = models.IndStates
        geo_field = "geom"
        id_field = 'name_1'
        fields = ('gid_1','name_1','engtype_1','hasc_1')

class DistrictsSerializer(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """

    class Meta:
        model = models.IndDistricts
        geo_field = "geom"
        id_field = 'name_2'
        fields = ('gid_1','name_1','gid_2','name_2','engtype_2','hasc_2')