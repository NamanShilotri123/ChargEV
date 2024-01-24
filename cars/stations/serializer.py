from dataclasses import field
from rest_framework import serializers
from .models import Images,  Station, Reviews, Promotion_price, Time_Slot


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ['image']

    def create(self, validated_data):
        station = self.context['station']
        return Images.objects.create(station_id=station, **validated_data)


class ReviewSerlizer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = ['user', 'email', 'review']

    def create(self, validated_data):
        station = self.context['station']
        return Reviews.objects.create(station_id=station, **validated_data)


class PriceSerilizer(serializers.ModelSerializer):
    def price_ph(self, price: Promotion_price):
        return price.price - (price.price * price.discount)/100
    discounted_price = serializers.SerializerMethodField(
        method_name='price_ph')

    class Meta:
        model = Promotion_price
        fields = ['price', 'discount', 'discounted_price']
        read_only_fields = ['discounted_price']

    def create(self, validated_data):
        station = self.context['station']
        return Promotion_price.objects.create(station_id=station, **validated_data)


class StationSerializer(serializers.ModelSerializer):
    image = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Station
        fields = ['id', 'name', 'lat', 'log', 'image']


class StationDetailedSerializer(serializers.ModelSerializer):
    image = serializers.StringRelatedField(many=True, read_only=True)
    reviews = ReviewSerlizer(many=True, read_only=True)
    price = PriceSerilizer(many=True, read_only=True)

    class Meta:
        model = Station
        fields = ['id', 'name', 'address', 'lat',
                  'log', 'image', 'reviews', 'price']


class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time_Slot
        fields = ['date', 'slot', 'user', 'station', 'created']
        read_only_fields = ['created']

    # def create(self, validated_data):
    #     station = self.context['station']
    #     return Time_Slot.objects.create(station_id=station, **validated_data)


# for user view only
class StationBookedSerializerForUser(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ['name', 'address']


class UserBookedSlotSerializer(serializers.ModelSerializer):
    station = StationBookedSerializerForUser(read_only=True)

    class Meta:
        model = Time_Slot
        fields = ['date', 'slot', 'station']
