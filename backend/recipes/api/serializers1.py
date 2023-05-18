from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from django.shortcuts import get_object_or_404

from .models import (
    Recipe,
    Instruction,
    Category,
    CategoryForRecipe,
    InstructionForRecipe
    )


class InstructionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instruction
        fields = (
            "number_of_step",
            "text",
        )


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name", "slug")


class RecipesSerializer(serializers.ModelSerializer):
    # image = Base64ImageField(max_length=None, use_url=True)
    instructions = InstructionSerializer(
        many=True
    )
    category = CategorySerializer(
        many=True
    )

    def create(self, validated_data):
        categories = validated_data.pop("category")
        instructions = validated_data.pop("instructions")
        recipe = Recipe.objects.create(**validated_data)
        categories = [categories[i]["slug"] for i in range(0, len(categories))]

        for slug in categories:
            current_category = get_object_or_404(Category, slug=slug)
            CategoryForRecipe.objects.create(
                category=current_category,
                recipe=recipe
            )

        for instruction in instructions:
            current_instruction, status = Instruction.objects.get_or_create(
                **instruction
            )
            InstructionForRecipe.objects.create(
                instruction=current_instruction,
                recipe=recipe
            )

        return recipe

    class Meta:
        model = Recipe
        fields = (
            "id",
            "title",
            "category",
            "ingredients",
            "time",
            # "image",
            "instructions"
        )
