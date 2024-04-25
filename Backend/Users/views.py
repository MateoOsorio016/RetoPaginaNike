from django.shortcuts import render
from rest_framework import viewsets
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
# Create your views here.

class CustomUserViewSet(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()


@api_view(['POST'])
def login(request):

    user = get_object_or_404(CustomUser, email=request.data['email'])

    if not user.check_password(request.data['password']):
        return Response({'error': 'Invalid password!'}, status=status.HTTP_400_BAD_REQUEST)
    
    token, created = Token.objects.get_or_create(user=user)
    serializer= CustomUserSerializer(instance=user)

    return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():

        email =  serializer.validated_data.get('email')
        if CustomUser.objects.filter(email=email).exists():
            return Response({'message': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = CustomUser(**serializer.validated_data)
        
        user.set_password(request.data['password'])
        
        user.save()
        
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user(request):


    return Response({'message': 'Welcome!'})

