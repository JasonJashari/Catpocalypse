# Generated by Django 4.0.2 on 2022-03-24 04:03

import backend.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from backend import functions

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('email', models.EmailField(max_length=60, unique=True, verbose_name='email')),
                ('username', models.CharField(max_length=30, unique=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('last_login', models.DateTimeField(auto_now=True, verbose_name='last login')),
                ('is_admin', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_verified', models.BooleanField(default=False)),
                ('xp', models.IntegerField(default=0)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Cats',
            fields=[
                ('cat_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20, unique=True)),
                ('type', models.IntegerField(choices=[(0, 'Rock'), (1, 'Paper'), (2, 'Fire'), (3, 'Water'), (4, 'Sharp')])),
                ('rarity', models.IntegerField(choices=[(1, 'Normal'), (2, 'Rare'), (3, 'Super Rare'), (4, 'Exotic'), (5, 'Legendary'), (6, 'Cat God')])),
            ],
        ),
        migrations.CreateModel(
            name='ExampleModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default=backend.models.exampleFunction, max_length=8, unique=True)),
                ('host', models.CharField(max_length=50, unique=True)),
                ('guest_can_pause', models.BooleanField(default=False)),
                ('votes_to_skip', models.IntegerField(default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Moves',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('damage_type', models.IntegerField(choices=[(0, 'Rock'), (1, 'Paper'), (2, 'Fire'), (3, 'Water'), (4, 'Sharp')])),
                ('move_name', models.CharField(max_length=20, unique=True)),
                ('power', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Wildcat',
            fields=[
                ('wildcat_id', models.AutoField(primary_key=True, serialize=False)),
                ('latitude', models.DecimalField(decimal_places=16, max_digits=22)),
                ('longitude', models.DecimalField(decimal_places=16, max_digits=22)),
                ('start_health', models.IntegerField(default=backend.models.rand_val)),
                ('is_huntable', models.BooleanField(default=False)),
                ('sex', models.CharField(max_length=10)),
                ('cat_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.cats')),
                ('player_1', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='player1', to=settings.AUTH_USER_MODEL)),
                ('player_2', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='player2', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Matchmaking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='cats',
            name='m1',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='move1', to='backend.moves'),
        ),
        migrations.AddField(
            model_name='cats',
            name='m2',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='move2', to='backend.moves'),
        ),
        migrations.AddField(
            model_name='cats',
            name='m3',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='move3', to='backend.moves'),
        ),
        migrations.AddField(
            model_name='cats',
            name='m4',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='move4', to='backend.moves'),
        ),
        migrations.CreateModel(
            name='Catdex',
            fields=[
                ('catdex_id', models.AutoField(primary_key=True, serialize=False)),
                ('level', models.FloatField(default=1)),
                ('health', models.IntegerField()),
                ('sex', models.CharField(max_length=10)),
                ('cat_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.cats')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RunPython(functions.load_data)
    ]
