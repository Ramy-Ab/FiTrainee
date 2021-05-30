from django.urls import path
from base.views.food_views import FoodImageViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'food',FoodImageViewSet)
urlpatterns = router.urls

# urlpatterns = [

#     path('test', views.postFood, name='foodAI'),
# ]
# for url in router.urls:
#     print(url,'\n')