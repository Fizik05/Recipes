from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *


app_name = "recipes"


router = DefaultRouter()

router.register("recipes", RecipeViewSet, "Recipes")

urlpatterns = [
    path("", include(router.urls)),
]
