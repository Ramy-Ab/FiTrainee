# Generated by Django 3.1.4 on 2021-05-02 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_foodimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='foodimage',
            name='result',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
