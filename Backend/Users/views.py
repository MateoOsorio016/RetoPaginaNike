from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.db.models import Q
from django.core.paginator import Paginator
from Users import email_util
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication


from .models import CustomUser
from .serializers import CustomUserSerializer, CustomUserCreateSerializer ,UserLoginSerializer, UserUpdateSerializer, UserPasswordChangeSerializer, UserPasswordResetSerializer, UserPasswordResetConfirmSerializer
from .pagination import CustomPageNumberPagination
# Create your views here.

def _send_email(subject: str,  template_name: str, context: dict, to_email: str):
    html_content = render_to_string(f'{template_name}.html', context)
    text_content = strip_tags(html_content)
    email_util.send_email(
        to_email=to_email,
        subject=subject,
        body_text=text_content,
        body_html=html_content,
    )

class GetUsersView(APIView):
    #api para listar usuarios
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        page = request.query_params.get('page', 1)
        page= int(page)
        order = request.query_params.get('order', None)
        query= request.query_params.get('search', None)

        users = CustomUser.objects.all()

        if query is not None:
            users = CustomUser.objects.filter(
                Q(username__icontains=query) |
                Q(email__icontains=query) |
                Q(first_name__icontains=query) |
                Q(last_name__icontains=query) |
                Q(phone__icontains=query) |
                Q(birthdate__icontains=query)
            )
        if order:
            order= order.lower()
            if order == 'asc':
                order_by= 'birthdate'
            elif order == 'desc':
                order_by= '-birthdate'
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Orden no válido'})
            users = users.order_by(order_by)

        paginator = Paginator(users, 5)
        page_users = paginator.get_page(page)
        serializer = CustomUserSerializer(page_users, many=True)
        return Response({
            'users': serializer.data,
            'total_pages': paginator.num_pages,
            'current_page': page,
            'total_users': paginator.count
        }, status=status.HTTP_200_OK)
        


class UserLoginView(APIView):
    #api para iniciar sesion
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['email']
        refresh = RefreshToken.for_user(user)

        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }

        return Response(response_data, status=status.HTTP_200_OK)
    

class registerUserView(APIView):
    #api para registrar un usuario
    def post(self, request):
        serializer = CustomUserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
        }

        return Response(response_data, status=status.HTTP_200_OK)
    

class userUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    #api para actualizar un usuario
    def put(self, request, pk):
        try:
            user = get_object_or_404(CustomUser, pk=pk)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND, data={'message': 'Usuario no encontrado'})
        
    
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserDeleteView(APIView):
    permission_classes = [IsAuthenticated]
    #api para eliminar un usuario
    def put(self, request, pk):
        try:
            user = get_object_or_404(CustomUser, pk=pk)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND, data={'message': 'Usuario no encontrado'})
        
        user.is_active = not user.is_active
        user.save()
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
      
class get_user(APIView):
    #api para obtener un usuario
    def get(self, request, pk):
        print(pk)
        try:
            user = CustomUser.objects.get(id=pk)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND, data={'message': 'Usuario no encontrado'})
        
        
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class profileView(APIView):
    #api para obtener el perfil de un usuario
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UserResetPasswordView(APIView):
    #api para recuperar contraseña
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserPasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = CustomUser.objects.get(email=serializer.validated_data['email'])
            domain= 'http://localhost:5173/api'
            user.create_reset_token()
            link= f'{domain}/users/reset_password/{user.reset_password_token}'

            context ={
                "first_name_user": user.first_name,
                "link": link,
                "email": user.email,
            }

            _send_email(
                subject="Recuperar contraseña",
                template_name="reset_password_email",
                context=context,
                to_email=user.email,
            )

            return Response(status=status.HTTP_200_OK, data={'message': 'Se ha enviado un correo con las instrucciones para recuperar tu contraseña.'})
        
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND, data={'message': 'No se encontró un usuario con este correo electrónico.'})
        
class UserResetPasswordConfirmView(APIView):
    #api para confirmar la recuperacion de contraseña
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserPasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data['token']


        try:
            user = CustomUser.objects.get(reset_password_token= token, reset_password_token_expires_at__gt=timezone.now())
            user.set_password(serializer.validated_data['new_password'])
            user.reset_password_token = None
            user.reset_password_token_expires_at = None
            user.save()
            return Response(status=status.HTTP_200_OK, data={'message': 'Contraseña actualizada correctamente.'})
        
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND, data={'message': 'No se encontró un usuario con este token.'})
                


    

