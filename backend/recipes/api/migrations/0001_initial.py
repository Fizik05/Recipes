# Generated by Django 4.2 on 2023-04-29 19:54

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Name of category')),
                ('slug', models.SlugField(max_length=200, verbose_name='Unique slug')),
            ],
        ),
        migrations.CreateModel(
            name='CategoryForRecipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.category')),
            ],
        ),
        migrations.CreateModel(
            name='Instruction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number_of_step', models.IntegerField()),
                ('text', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='InstructionForRecipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('instruction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.instruction')),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('ingredients', models.TextField()),
                ('time', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1, 'Время приготовления не может быть еньше минуты')], verbose_name='Время приготовления')),
                ('image', models.ImageField(upload_to='', verbose_name='Картинка')),
                ('category', models.ManyToManyField(through='api.CategoryForRecipe', to='api.category')),
                ('instructions', models.ManyToManyField(through='api.InstructionForRecipe', to='api.instruction', verbose_name='instructions')),
            ],
        ),
        migrations.AddField(
            model_name='instructionforrecipe',
            name='recipe',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.recipe'),
        ),
        migrations.AddField(
            model_name='categoryforrecipe',
            name='recipe',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.recipe'),
        ),
    ]