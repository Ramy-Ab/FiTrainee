# Generated by Django 3.1.4 on 2021-06-20 09:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0016_auto_20210619_2333'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userweight',
            name='userprofile',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.userprofile'),
        ),
    ]
