from django.contrib import admin
from .models import Station, Images, Promotion_price, Reviews, Time_Slot


@admin.register(Station)
class StationAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'address']
    ordering = ['id']
    list_filter = ['id', 'name']
    search_fields = ['name', 'address', 'id']


@admin.register(Images)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['image']


@admin.register(Reviews)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['email', 'review']


@admin.register(Promotion_price)
class PriceAdmin(admin.ModelAdmin):
    list_display = ['station', 'price', 'discount']


@admin.register(Time_Slot)
class SlotAmin(admin.ModelAdmin):
    list_display = ['user', 'slot', 'date', 'station']
