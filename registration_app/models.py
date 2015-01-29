import datetime
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.db import models

# Create your models here.

from django.db import models


class Person(models.Model):
    def date_validator(value):
        try:
            year = value.year
            month = value.month
            day = value.day
            now_date = datetime.date.today()
            now_year = now_date.year
            now_month = now_date.month
            now_day = now_date.day
            if year > now_year:
                raise
            elif year == now_year:
                if month > now_month:
                    raise
                elif month == now_month:
                    if day > now_day:
                        raise
        except Exception:
            raise ValidationError("Birthday must be date in the past.")



    MALE = 'M'
    FEMALE = 'F'
    GENDERS = (
        (MALE, "MALE"),
        (FEMALE, "FEMALE")
    )
    tel_validator = RegexValidator(regex=r'^[0-9]{10}$', message="Phone number must be in the 10-digits format.")

    name = models.CharField(max_length=127)
    birthday = models.DateField(validators=[date_validator])
    gender = models.CharField(choices=GENDERS, max_length=1)
    email = models.EmailField(unique=True)
    tel = models.CharField(max_length=15, unique=True, validators=[tel_validator])