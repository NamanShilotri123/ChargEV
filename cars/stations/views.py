from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from auth_user.serializer import UserProfileSerializer
from stations.filter import StationFilter
from stations.renders import UserRenderer
# from .perminssion import IsOwnerOrReadOnly
from stations.serializer import StationSerializer, ImageSerializer, PriceSerilizer, ReviewSerlizer, StationDetailedSerializer, TimeSlotSerializer
from .models import Station, Reviews, Images, Promotion_price, Time_Slot
from django.core.mail import send_mail
from django.utils import timezone
from auth_user.models import User
from django.conf import settings


class SmallStationsView(ListAPIView):
    queryset = Station.objects.all()
    serializer_class = StationSerializer
    filterset_fields = ('name', 'address')
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = StationFilter
    search_fields = ['name', 'address']


# class SingleStationsView(RetrieveAPIView):
#     queryset = Station.objects.all()
#     serializer_class = StationSerializer


class StationView(ModelViewSet):
    # parser_classes = (parsers.MultiPartParser, parsers.FormParser, )
    serializer_class = StationDetailedSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    # def create(self, request, *args, **kwargs):
    #     serializer = UserProfileSerializer(request.user)
    #     print(serializer.data)
    #     return super().create(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Station.objects.all()
        station_id = self.request.query_params.get('station_id')
        if station_id is not None:
            queryset = queryset.filter(id=station_id)
        return queryset


class ReviewsView(ModelViewSet):
    serializer_class = ReviewSerlizer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Reviews.objects.filter(station_id=self.kwargs['station_pk'])

    def get_serializer_context(self):
        return {'station': self.kwargs['station_pk']}


class ImagesView(ModelViewSet):
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Images.objects.filter(station_id=self.kwargs['station_pk'])

    def get_serializer_context(self):
        return {'station': self.kwargs['station_pk']}


class StationPrice(ModelViewSet):
    serializer_class = PriceSerilizer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Promotion_price.objects.filter(station_id=self.kwargs['station_pk'])[:1:]

    def get_serializer_context(self):
        return {'station': self.kwargs['station_pk']}


class SlotView(ModelViewSet):
    serializer_class = TimeSlotSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    renderer_classes = [UserRenderer]

    def get_queryset(self):
        return Time_Slot.objects.filter(station_id=self.kwargs['station_pk'], date__day=timezone.now().day)

    def create(self, request, *args, **kwargs):
        print("this is message created")
        return super().create(request, *args, **kwargs)
    # def get_serializer_context(self):
    #     return {'station': self.kwargs['station_pk']}


# @api_view(['GET', 'POST'])
# def insertData(request):
#     if request.method == 'POST':
