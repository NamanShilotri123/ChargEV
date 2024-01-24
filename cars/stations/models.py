from pyexpat import model
from django.db import models
from django.utils.timezone import datetime
from auth_user.models import User
# Create your models here.


class Reviews(models.Model):
    station = models.ForeignKey(
        'Station', on_delete=models.CASCADE, related_name='reviews')
    user = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(max_length=255)
    review = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return self.email


class Promotion_price(models.Model):
    station = models.ForeignKey(
        'Station', on_delete=models.CASCADE, related_name='price')
    price = models.PositiveIntegerField()
    discount = models.PositiveIntegerField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return str(f'Name : {self.station.name}  Price : {self.price}')

    class Meta:
        ordering = ['-updated']


class Images(models.Model):
    station = models.ForeignKey(
        'Station', on_delete=models.CASCADE, related_name='image')
    image = models.ImageField(upload_to='station/', null=True, blank=True)

    def __str__(self) -> str:
        return str(self.image.url)


class Station(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    lat = models.DecimalField(max_digits=20, decimal_places=10)
    log = models.DecimalField(max_digits=20, decimal_places=10)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class Time_Slot(models.Model):
    SLOT = (
        (1, '10:00-10:30'),
        (2, '10:30-11:00'),
        (3, '11:00-11:30'),
        (4, '11:30-12:00'),
        (5, '12:00-12:30'),
        (6, '12:30-13:00'),
        (7, '13:00-13:30'),
        (8, '13:30-14:00'),
        (9, '14:00-14:30'),
        (10, '14:30-15:00'),
        (11, '15:00-15:30'),
        (12, '15:30-16:00'),
        (13, '16:00-16:30'),
        (14, '16:30-17:00'),
        (15, '17:00-17:30'),
        (16, '17:30-18:00'),
        (16, '18:00-18:30'),

    )
    station = models.ForeignKey(Station, verbose_name=(
        "station"), related_name='book_slot', on_delete=models.CASCADE)
    user = models.ForeignKey(User, verbose_name=("user"), related_name='booked_slot',
                             on_delete=models.CASCADE)
    date = models.DateField(default=datetime.now)
    slot = models.PositiveSmallIntegerField(choices=SLOT)
    created = models.DateTimeField(default=datetime.now)

    class Meta:
        unique_together = ('station', 'date', 'slot',)
        ordering = ['-created']

    def __str__(self) -> str:
        return str(f"{self.slot} {self.station}")
