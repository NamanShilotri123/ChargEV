from django.apps import AppConfig


class AuthUserConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'auth_user'

    def ready(self):
        import auth_user.signals
