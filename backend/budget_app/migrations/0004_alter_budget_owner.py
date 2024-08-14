# Generated by Django 5.0.7 on 2024-08-13 19:48

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget_app', '0003_remove_budget_transaction'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='budget',
            name='owner',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='budget', to=settings.AUTH_USER_MODEL),
        ),
    ]
