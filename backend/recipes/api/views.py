from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import *
from .serializers import *


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    @action(
        methods=["get"],
        detail=False,
        url_path=r"(?P<category>(breakfast|lunch|dinner))"
    )
    def get_recipes_by_category(self, request, category):
        current_category = get_object_or_404(Category, slug=category)
        recipes = Recipe.objects.filter(category=current_category.id)
        serializer = self.get_serializer(recipes, many=True)
        return Response(serializer.data)
    
    @action(
        methods=["get"],
        detail=False,
        url_path=r"(?P<pk>\d+)/instructions"
    )
    def get_instructions_of_recipe(self, request, pk):
        current_instructions = InstructionForRecipe.objects.filter(recipe=pk)
        id_of_instructions = [el.instruction.id for el in current_instructions]
        instructions = [Instruction.objects.get(id=id) for id in id_of_instructions]
        serializer = InstructionSerializer(instructions, many=True)
        return Response(serializer.data)
    
    @action(
        methods=["get"],
        detail=False,
        url_path=r"(?P<pk_recipe>\d+)/instructions/(?P<step_by_instruction>\d+)"
    )
    def get_instruction(self, request, pk_recipe, step_by_instruction):
        current_instructions = InstructionForRecipe.objects.filter(recipe=pk_recipe)
        id_of_instructions = [el.instruction.id for el in current_instructions]
        instruction = get_object_or_404(Instruction, id=id_of_instructions[int(step_by_instruction)-1])
        serializer = InstructionSerializer(instruction)
        return Response(serializer.data)
