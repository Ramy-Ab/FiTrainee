from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),

    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    path('', views.getUsers, name="users"),

    path('<str:pk>/', views.getUserById, name='user'),

    path('update/<str:pk>/', views.updateUser, name='user-update'),
    path('updatetrainee/<str:pk>/',
         views.updateTraineeProfile, name="trainee-update"),
    path('updateweight/<str:pk>/', views.updateTraineeWeight,
         name="trainee-update-weight"),

    path('updatenutritions/<str:pk>/', views.updateTraineeNutitions,
         name="trainee-update-nutrition"),

    path('addweight/<str:pk>/', views.addTraineeWeight,
         name="trainee-add-weight"),

    path('getweights/<str:pk>/', views.getMyWeight,
         name="trainee-get-weight"),

    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),

    path('trainee/<str:pk>/', views.getTraineeById, name='trainee-profile'),
]
