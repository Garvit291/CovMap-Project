# Generated by Django 3.1 on 2020-08-30 15:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200828_0601'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='inddistricts',
            table='IND_DISTRICTS3',
        ),
        migrations.AlterModelTable(
            name='indstates',
            table='IND_STATES3',
        ),
        migrations.AlterModelTable(
            name='testcen',
            table='TEST_CEN3',
        ),
    ]
