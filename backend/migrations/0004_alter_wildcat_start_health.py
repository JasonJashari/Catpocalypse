# Generated by Django 4.0.1 on 2022-03-01 23:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_alter_wildcat_start_health'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wildcat',
            name='start_health',
            field=models.IntegerField(default=65),
        ),
    ]
