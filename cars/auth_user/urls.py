from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserBookedSlot

from .views import UserLoginView, UserRegistrationView, UserProfileView, ProfileUpdateRetriveView
urlpatterns = [
    path("", UserProfileView.as_view(), name='test-view'),
    path("booked/", UserBookedSlot.as_view(), name='test-view'),
    path("login/", UserLoginView.as_view(), name='login-view'),
    path("resister/", UserRegistrationView.as_view(), name='signup-view'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("profile/<pk>/", ProfileUpdateRetriveView.as_view(),
         name='profile-retrive-update-view'),
]
