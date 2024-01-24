from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter, SimpleRouter
from rest_framework_nested import routers
from .views import SlotView, StationView, ReviewsView, ImagesView, StationPrice, SmallStationsView
station_router = SimpleRouter()
station_router.register('station', StationView, basename='station')
client_router = routers.NestedSimpleRouter(
    station_router, 'station', lookup='station')
client_router.register('reviews', ReviewsView, basename='review')
client_router.register('images', ImagesView, basename='image')
client_router.register('price', StationPrice, basename='price')
client_router.register('slot', SlotView, basename='slot')
urlpatterns = [
    path('', view=SmallStationsView.as_view()),
    path("", include(station_router.urls)),
    path("", include(client_router.urls)),
]


# from django.urls import path
# from . import views

# urlpatterns = [
#     path("",  views.StationView, name="station"),
#     # path("<int:pk>/",  views.SingleStationsView.as_view(), name="single-station"),

# ]
