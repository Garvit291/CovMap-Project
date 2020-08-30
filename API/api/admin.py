from django.contrib import admin

from api import models

from leaflet.admin import LeafletGeoAdmin

# Register your models here.


class TestCenAdmin(LeafletGeoAdmin):
    list_display=['title','city','name_2','name_1']
    list_filter=['name_1']

class IndStatesAdmin(LeafletGeoAdmin):
    list_display=['name_1','statecode']

class IndDistrictsAdmin(LeafletGeoAdmin):
    list_display=['name_2','name_1','statecode']
    list_filter=['name_1']


admin.site.register(models.TestCen,TestCenAdmin)
admin.site.register(models.IndStates,IndStatesAdmin)
admin.site.register(models.IndDistricts,IndDistrictsAdmin)
admin.site.register(models.StateCoords,IndStatesAdmin)
admin.site.register(models.DistrictCoords,IndDistrictsAdmin)