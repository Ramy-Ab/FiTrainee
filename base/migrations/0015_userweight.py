# Generated by Django 3.1.4 on 2021-06-19 22:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_userprofile_weightgoal'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserWeight',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userprofile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='userweight', to='base.userprofile')),
            ],
        ),
    ]
