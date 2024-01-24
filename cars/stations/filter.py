import django_filters
from .models import Station


class StationFilter(django_filters.FilterSet):
    class Meta:
        model = Station
        fields = {
            # 'price': ['lt', 'gt'],
            # 'release_date': ['exact', 'year__gt'],
            'lat': ['lt', 'gt'],
            'log': ['lt', 'gt']
        }
