from django.db import models
from django.contrib.gis.db import models as gis_models

# Create your models here.

# geodjango points take longitude and latitude as args




class TestCenGovt(models.Model):
    id = models.BigIntegerField(primary_key=True)
    geom = gis_models.PointField(blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    title = models.CharField(max_length=254, blank=True, null=True)
    cutdescrip = models.CharField(max_length=254, blank=True, null=True)
    descriptio = models.CharField(max_length=254, blank=True, null=True)
    street = models.CharField(max_length=254, blank=True, null=True)
    city = models.CharField(max_length=254, blank=True, null=True)
    pincode = models.CharField(max_length=254, blank=True, null=True)
    state = models.CharField(max_length=254, blank=True, null=True)
    address = models.CharField(max_length=254, blank=True, null=True)
    date = models.CharField(max_length=254, blank=True, null=True)
    status = models.CharField(max_length=254, blank=True, null=True)
    gid_1 = models.CharField(max_length=80, blank=True, null=True)
    gid_2 = models.CharField(max_length=80, blank=True, null=True)
    name_2 = models.CharField(max_length=80, blank=True, null=True)
    varname_2 = models.CharField(max_length=80, blank=True, null=True)
    hasc_2 = models.CharField(max_length=80, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'TEST_CEN_GOVT'
    def __str__(self):
        return self.title

class TestCenPvt(models.Model):
    id = models.BigIntegerField(primary_key=True)
    geom = gis_models.PointField(blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    title = models.CharField(max_length=254, blank=True, null=True)
    cutdescrip = models.CharField(max_length=254, blank=True, null=True)
    descriptio = models.CharField(max_length=254, blank=True, null=True)
    street = models.CharField(max_length=254, blank=True, null=True)
    city = models.CharField(max_length=254, blank=True, null=True)
    pincode = models.CharField(max_length=254, blank=True, null=True)
    state = models.CharField(max_length=254, blank=True, null=True)
    address = models.CharField(max_length=254, blank=True, null=True)
    date = models.CharField(max_length=254, blank=True, null=True)
    status = models.CharField(max_length=254, blank=True, null=True)
    gid_1 = models.CharField(max_length=80, blank=True, null=True)
    gid_2 = models.CharField(max_length=80, blank=True, null=True)
    name_2 = models.CharField(max_length=80, blank=True, null=True)
    varname_2 = models.CharField(max_length=80, blank=True, null=True)
    hasc_2 = models.CharField(max_length=80, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'TEST_CEN_PVT'
    def __str__(self):
        return self.title








class IndDistricts(models.Model):
    geom = gis_models.MultiPolygonField(blank=True, null=True)
    gid_0 = models.CharField(max_length=80, blank=True, null=True)
    name_0 = models.CharField(max_length=80, blank=True, null=True)
    gid_1 = models.CharField(max_length=80, blank=True, null=True)
    name_1 = models.CharField(max_length=80, blank=True, null=True)
    nl_name_1 = models.CharField(max_length=80, blank=True, null=True)
    gid_2 = models.CharField(max_length=80, blank=True, null=True)
    name_2 = models.CharField(max_length=80, blank=True, null=True)
    varname_2 = models.CharField(max_length=80, blank=True, null=True)
    nl_name_2 = models.CharField(max_length=80, blank=True, null=True)
    type_2 = models.CharField(max_length=80, blank=True, null=True)
    engtype_2 = models.CharField(max_length=80, blank=True, null=True)
    cc_2 = models.CharField(max_length=80, blank=True, null=True)
    hasc_2 = models.CharField(max_length=80, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'IND_DISTRICTS'
        
    def __str__(self):
        return self.name_2
    


class IndStates(models.Model):
    geom = gis_models.MultiPolygonField(blank=True, null=True)
    gid_0 = models.CharField(max_length=80, blank=True, null=True)
    name_0 = models.CharField(max_length=80, blank=True, null=True)
    gid_1 = models.CharField(max_length=80, blank=True, null=True)
    name_1 = models.CharField(max_length=80, blank=True, null=True)
    varname_1 = models.CharField(max_length=100, blank=True, null=True)
    nl_name_1 = models.CharField(max_length=80, blank=True, null=True)
    type_1 = models.CharField(max_length=80, blank=True, null=True)
    engtype_1 = models.CharField(max_length=80, blank=True, null=True)
    cc_1 = models.CharField(max_length=80, blank=True, null=True)
    hasc_1 = models.CharField(max_length=80, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'IND_STATES'
    def __str__(self):
        return self.name_1
