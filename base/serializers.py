from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Order, OrderItem, ShippingAddress, Review, FoodImage, UserProfile
import base64
import uuid
from django.core.files.base import ContentFile


class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        _format, str_img = data.split(';base64')
        decoded_file = base64.b64decode(str_img)
        fname = f"{str(uuid.uuid4())[:10]}.png"
        data = ContentFile(decoded_file, name=fname)
        return super().to_internal_value(data)


class FoodImageSerializer(serializers.ModelSerializer):
    image = Base64ImageField()

    class Meta:
        model = FoodImage
        fields = '__all__'
        # field = ('id','image','result')


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    userProfile = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        # fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']
        fields = '__all__'

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    def get_userProfile(self, obj):

        try:
            profile = UserProfileSerializer(
                obj.userprofile, many=False).data

        except:
            profile = False
        return profile


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
