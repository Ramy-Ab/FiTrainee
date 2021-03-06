from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.fields import related
from django.db.models.fields.related import OneToOneField
from django.db.models.signals import post_save
from django.dispatch import receiver
from PIL import Image
from django.db.models.deletion import CASCADE
from tensorflow.keras.preprocessing import image
from tensorflow.python import ops
from tensorflow.keras.models import load_model
from tensorflow.python.keras.backend import set_session
import cv2
import os
import numpy as np
import tensorflow as tf
from .classes import classe_name
from datetime import date


class FoodImage(models.Model):
    image = models.ImageField(upload_to=".\static\images")
    result = models.CharField(max_length=200, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

    def save(self, *args, **kwargs):
        img = Image.open(self.image)
        img_array = image.img_to_array(img)
        resized = tf.image.resize(img_array, [224, 224])
        img = resized[None, ...]

        file_model = os.path.join(
            settings.BASE_DIR, 'food_classification_final_model_tessst.h5')

        model = load_model(file_model)
        pred = model.predict(img, steps=1, verbose=1)
        pred = np.argmax(pred)
        pred = classe_name[pred]
        self.result = str(pred)
        return super().save(*args, **kwargs)


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='userprofile')
    height = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    weight = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    weightGoal = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    birthDate = models.DateTimeField(null=True, blank=True)
    sex = models.CharField(max_length=200, null=True, blank=True)
    activitie = models.CharField(max_length=200, null=True, blank=True)
    objective = models.CharField(max_length=200, null=True, blank=True)
    experience = models.CharField(max_length=200, null=True, blank=True)
    equipement = models.CharField(max_length=200, null=True, blank=True)
    days = models.CharField(max_length=200, null=True, blank=True)
    healthIssues = models.CharField(max_length=200, null=True, blank=True)
    calories = models.CharField(max_length=200, null=True, blank=True)
    proteines = models.CharField(max_length=200, null=True, blank=True)
    carbs = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.user.username


class UserWeight(models.Model):
    userprofile = models.ForeignKey(
        UserProfile, on_delete=models.SET_NULL, null=True)
    weight = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.userprofile.user.username


class UserNutrition(models.Model):
    userprofile = models.ForeignKey(
        UserProfile, on_delete=models.SET_NULL, null=True)
    calorie = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    proteine = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    carb = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    foodName = models.CharField(max_length=200, null=True, blank=True)
    foodWeight = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    date = models.DateField(default=date.today())

    def __str__(self):
        return self.userprofile.user.username


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)
