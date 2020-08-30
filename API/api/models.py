from django.contrib.gis.db import models


class DistrictCoords(models.Model):
    id = models.BigIntegerField(primary_key=True)
    geom = models.PointField(blank=True, null=True)
    gid_1 = models.CharField(max_length=80, blank=True, null=True)
    name_1 = models.CharField(max_length=80, blank=True, null=True)
    state = models.CharField(max_length=80, blank=True, null=True)
    gid_2 = models.CharField(max_length=80, blank=True, null=True)
    name_2 = models.CharField(max_length=80, blank=True, null=True)
    district = models.CharField(max_length=80, blank=True, null=True)
    engtype_2 = models.CharField(max_length=80, blank=True, null=True)
    statecode = models.CharField(max_length=3, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'DISTRICT_COORDS'
    
    def __str__(self):
        return self.district
    


class IndDistricts(models.Model):
    id = models.BigIntegerField(primary_key=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    gid_1 = models.CharField(max_length=80, blank=True, null=True)
    name_1 = models.CharField(max_length=80, blank=True, null=True)
    state = models.CharField(max_length=80, blank=True, null=True)
    gid_2 = models.CharField(max_length=80, blank=True, null=True)
    name_2 = models.CharField(max_length=80, blank=True, null=True)
    district = models.CharField(max_length=80, blank=True, null=True)
    engtype_2 = models.CharField(max_length=80, blank=True, null=True)
    statecode = models.CharField(max_length=8, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'IND_DISTRICTS2'
    def __str__(self):
        return self.district

class IndStates(models.Model):
    id = models.BigIntegerField(primary_key=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    gid_1 = models.CharField(max_length=80, blank=True, null=True)
    name_1 = models.CharField(max_length=80, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    engtype_1 = models.CharField(max_length=80, blank=True, null=True)
    statecode = models.CharField(max_length=5, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'IND_STATES2'

    def __str__(self):
        return self.state

class StateCoords(models.Model):
    id = models.BigIntegerField(primary_key=True)
    geom = models.PointField(blank=True, null=True)
    gid_1 = models.CharField(max_length=80, blank=True, null=True)
    name_1 = models.CharField(max_length=80, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    engtype_1 = models.CharField(max_length=80, blank=True, null=True)
    statecode = models.CharField(max_length=5, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'STATE_COORDS'
    
    def __str__(self):
        return self.state

class TestCen(models.Model):
    id = models.BigIntegerField(primary_key=True)
    geom = models.PointField(blank=True, null=True)
    catid = models.IntegerField(blank=True, null=True)
    title = models.CharField(max_length=254, blank=True, null=True)
    cutdescription = models.CharField(max_length=254, blank=True, null=True)
    description = models.CharField(max_length=254, blank=True, null=True)
    street = models.CharField(max_length=254, blank=True, null=True)
    city = models.CharField(max_length=254, blank=True, null=True)
    zip = models.CharField(max_length=254, blank=True, null=True)
    address = models.CharField(max_length=254, blank=True, null=True)
    date = models.CharField(max_length=254, blank=True, null=True)
    gid_1 = models.CharField(max_length=80, blank=True, null=True)
    gid_2 = models.CharField(max_length=80, blank=True, null=True)
    name_2 = models.CharField(max_length=80, blank=True, null=True)
    district = models.CharField(max_length=80, blank=True, null=True)
    engtype_2 = models.CharField(max_length=80, blank=True, null=True)
    statecode = models.CharField(max_length=3, blank=True, null=True)
    name_1 = models.CharField(max_length=80, blank=True, null=True)
    state = models.CharField(max_length=80, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'TEST_CEN'
    
    def __str__(self):
        return self.city + " " + self.title