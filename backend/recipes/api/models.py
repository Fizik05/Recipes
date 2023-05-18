from django.core.validators import MinValueValidator
from django.db import models


class Category(models.Model):
    name = models.CharField(
        max_length=50,
        unique=False,
        verbose_name="Name of category",
    )

    slug = models.SlugField(
        max_length=200,
        unique=False,
        verbose_name="Unique slug",
    )

    def __str__(self):
        return self.name
    

class Instruction(models.Model):
    number_of_step = models.IntegerField()
    text = models.TextField()

    def __str__(self) -> str:
        return f"{self.recipe}_step_{self.number_of_step}"


class Recipe(models.Model):
    category = models.ManyToManyField(
        Category,
        through="CategoryForRecipe",
    )
    title = models.CharField(max_length=50)
    ingredients = models.TextField()
    time = models.PositiveIntegerField(
        verbose_name="Время приготовления",
        validators=[MinValueValidator(
            1, "Время приготовления не может быть еньше минуты"
        )]
    )
    image = models.ImageField(
        verbose_name="Картинка",
    )
    instructions = models.ManyToManyField(
        Instruction,
        verbose_name="instructions",
        through="InstructionForRecipe"
    )

    def __str__(self) -> str:
        return self.title
    

class InstructionForRecipe(models.Model):
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE
    )
    instruction = models.ForeignKey(
        Instruction,
        on_delete=models.CASCADE
    )


class CategoryForRecipe(models.Model):
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
    )
