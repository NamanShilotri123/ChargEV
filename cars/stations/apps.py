from django.apps import AppConfig


class StationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'stations'

    def ready(self):
        import stations.signal
