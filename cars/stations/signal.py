from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Time_Slot, Station
from auth_user.models import User
from django.core.mail import send_mail

time_slot = {
    1:  '10:00-10:30',
    2: '10:30-11:00',
    3: '11:00-11:30',
    4:  '11:30-12:00',
    5:  '12:00-12:30',
    6:  '12:30-13:00',
    7:  '13:00-13:30',
    8:  '13:30-14:00',
    9:  '14:00-14:30',
    10:  '14:30-15:00',
    11:  '15:00-15:30',
    12:  '15:30-16:00',
    13:  '16:00-16:30',
    14:  '16:30-17:00',
    15:  '17:00-17:30',
    16:  '17:30-18:00',
    17:  '18:00-18:30',
}


@receiver(post_save, sender=Time_Slot)
def send_mail_to_user(sender, instance, created, **kwargs):
    if created:
        slot = instance.slot
        user = instance.user
        station = instance.station
        date = instance.date
        subject = f"ChangEV | You Just Book A Charging Station."
        message = f"Hello User With Email {user}. You Just Book A Charging Station {station}. timing of charging station is between {time_slot[slot]}. for date: {date}"
        send_mail(subject, message,
                  "20102144.vishwajeet.vishwakarma@gmail.com", [user])
