from base.models import UserNutrition, UserProfile, UserWeight
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import ProductSerializer, UserNutritionSerializer, UserSerializer, UserSerializerWithToken, UserWeight, UserWeightSerializer
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    # try:
    # 1- create user auth
    user = User.objects.create(
        first_name=data['name'],
        username=data['email'],
        email=data['email'],
        password=make_password(data['password'])
    )

    # 2- create userProfile
    profile = UserProfile.objects.create(
        user=user,
        height=data['height'],
        weight=data['weight'],
        weightGoal=data['weightGoal'],
        birthDate=data['birthDate'],
        sex=data['sex'],
        activitie=data['activitie'],
        objective=data['objective'],
        experience=data['experience'],
        equipement=data['equipement'],
        days=data['days'],
        healthIssues=data['healthIssues'],
    )

    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)
    # except:
    #     message = {'detail': 'User with this email already exists'}
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTraineeById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateTraineeProfile(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.userprofile.height = data['height']
    user.userprofile.weight = data['weight']
    user.userprofile.weightGoal = data['weightGoal']
    user.userprofile.birthDate = data['birthDate']
    user.userprofile.sex = data['sex']
    user.userprofile.activitie = data['activitie']
    user.userprofile.objective = data['objective']
    user.userprofile.experience = data['experience']
    user.userprofile.equipement = data['equipement']
    user.userprofile.days = data['days']
    user.userprofile.healthIssues = data['healthIssues']

    user.userprofile.save()
    user.save()

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateTraineeWeight(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data

    user.userprofile.weight = data['weight']
    user.userprofile.weightGoal = data['weightGoal']

    user.userprofile.save()
    user.save()

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateTraineeNutitions(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data

    user.userprofile.calories = data['calories']
    user.userprofile.proteines = data['proteines']
    user.userprofile.carbs = data['carbs']

    user.userprofile.save()
    user.save()

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addTraineeWeight(request, pk):

    user = User.objects.get(id=pk)
    data = request.data

    weight = UserWeight.objects.create(
        userprofile=user.userprofile,
        weight=data['weight'],
    )

    weight.save()
    user.save()
    return Response('weight Added')


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getMyWeight(request, pk):
    user = User.objects.get(id=pk)
    weights = user.userprofile.userweight_set.all()
    serializer = UserWeightSerializer(weights, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addTraineeNutrition(request, pk):

    user = User.objects.get(id=pk)
    data = request.data

    nutrition = UserNutrition.objects.create(
        userprofile=user.userprofile,
        calorie=data['calorie'],
        proteine=data['proteine'],
        carb=data['carb'],
        foodName=data['foodName'],
        foodWeight=data['foodWeight']
    )

    nutrition.save()
    user.save()
    return Response('nutrition Added')


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getMyNutritions(request, pk):
    user = User.objects.get(id=pk)
    nutritions = user.userprofile.usernutrition_set.all()
    serializer = UserNutritionSerializer(nutritions, many=True)
    return Response(serializer.data)
