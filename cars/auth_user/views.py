from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .renders import UserRenderer
from .serializer import UserResisterSerializer, UserProfileSerializer, UserLoginSerializer, ProfileSerializer
from .models import Profile, User
from stations.models import Time_Slot
from stations.serializer import UserBookedSlotSerializer


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserResisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response({'token': token, 'profile_id': user.id,  'msg': 'Registration Successful'}, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            return Response({'token': token, 'profile_id': user.id, 'msg': 'Login Success'}, status=status.HTTP_200_OK)
        else:
            return Response({'errors': {'non_field_errors': ['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)


class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileUpdateRetriveView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
# class ProfileUpdateRetriveView(APIView):
#     permission_classes = [IsAuthenticated]
#     parser_classes = (MultiPartParser, FormParser)

#     def get(self, request, format=None):
#         user_serializer = UserProfileSerializer(request.user)
#         email = user_serializer.data['email']
#         profile = Profile.objects.filter(user__email=email)
#         serilizer = ProfileSerializer(profile)
#         return Response(serilizer.data, status=status.HTTP_200_OK)

# users books slot view


class UserBookedSlot(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serial = UserProfileSerializer(request.user)
        id = serial.data.get('id')
        query = Time_Slot.objects.filter(user=id)
        serializer = UserBookedSlotSerializer(query, many=True)
        return Response(serializer.data)
