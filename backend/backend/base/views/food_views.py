from rest_framework import viewsets
from base.models import FoodImage
from base.serializers import FoodImageSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes


# class FoodImageViewSet(viewsets.ModelViewSet):
#     serializer_class = FoodImageSerializer
#     queryset = FoodImage.objects.all()

# @api_view(('GET','POST'))
# def getfood(request):
#     food = FoodImage.objects.all()
#     serializer = FoodImageSerializer(food, many=True)
#     return Response(serializer.data)


# @api_view(['POST'])
# def postFood(request):
#     data = request.data

    # product_id = data['product_id']
    # product = Product.objects.get(_id=product_id)

    # product.image = request.FILES.get('image')
    # FoodImage.image = data['image']
    # FoodImage.save()

    # return Response('Image was uploaded')


class FoodImageViewSet(viewsets.ModelViewSet):
    serializer_class = FoodImageSerializer
    queryset = FoodImage.objects.all()
