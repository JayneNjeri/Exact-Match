from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Battery, BatteryImage, Brand, Category, Review, 
    Order, OrderItem, Wishlist
)

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'logo', 'description', 'website']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'image']

class BatteryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatteryImage
        fields = ['id', 'image', 'alt_text', 'is_primary', 'order']

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Review
        fields = [
            'id', 'user_name', 'rating', 'title', 'comment', 
            'is_verified_purchase', 'created_at'
        ]

class BatteryListSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Battery
        fields = [
            'id', 'name', 'brand', 'category', 'model_number', 'voltage',
            'amp_hours', 'cold_cranking_amps', 'condition', 'price', 
            'original_price', 'short_description', 'is_featured', 'is_popular',
            'is_in_stock', 'stock_quantity', 'discount_percentage', 'slug',
            'primary_image', 'average_rating', 'review_count', 'created_at'
        ]
    
    def get_primary_image(self, obj):
        primary_img = obj.images.filter(is_primary=True).first()
        if primary_img:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(primary_img.image.url)
        return None
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return round(sum(review.rating for review in reviews) / len(reviews), 1)
        return 0
    
    def get_review_count(self, obj):
        return obj.reviews.count()

class BatteryDetailSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    images = BatteryImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    seller_name = serializers.CharField(source='seller.username', read_only=True)
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Battery
        fields = [
            'id', 'name', 'brand', 'category', 'model_number', 'voltage',
            'amp_hours', 'cold_cranking_amps', 'reserve_capacity', 'length',
            'width', 'height', 'weight', 'condition', 'price', 'original_price',
            'stock_quantity', 'description', 'short_description', 'features',
            'compatibility', 'is_featured', 'is_popular', 'is_in_stock',
            'discount_percentage', 'seller_name', 'images', 'reviews',
            'average_rating', 'review_count', 'created_at', 'updated_at'
        ]
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return round(sum(review.rating for review in reviews) / len(reviews), 1)
        return 0
    
    def get_review_count(self, obj):
        return obj.reviews.count()

class OrderItemSerializer(serializers.ModelSerializer):
    battery_name = serializers.CharField(source='battery.name', read_only=True)
    battery_image = serializers.SerializerMethodField()
    
    class Meta:
        model = OrderItem
        fields = [
            'id', 'battery', 'battery_name', 'battery_image', 
            'quantity', 'unit_price', 'total_price'
        ]
    
    def get_battery_image(self, obj):
        primary_img = obj.battery.images.filter(is_primary=True).first()
        if primary_img:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(primary_img.image.url)
        return None

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'user_name', 'status', 'subtotal', 'shipping_cost',
            'tax_amount', 'total_amount', 'shipping_address', 'shipping_city',
            'shipping_postal_code', 'shipping_country', 'phone_number',
            'items', 'created_at', 'updated_at', 'shipped_at', 'delivered_at'
        ]

class CreateOrderSerializer(serializers.ModelSerializer):
    items = serializers.ListField(write_only=True)
    
    class Meta:
        model = Order
        fields = [
            'shipping_address', 'shipping_city', 'shipping_postal_code',
            'shipping_country', 'phone_number', 'items'
        ]
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        
        # Calculate totals
        subtotal = 0
        order_items = []
        
        for item_data in items_data:
            battery = Battery.objects.get(id=item_data['battery_id'])
            quantity = item_data['quantity']
            unit_price = battery.price
            total_price = quantity * unit_price
            subtotal += total_price
            
            order_items.append({
                'battery': battery,
                'quantity': quantity,
                'unit_price': unit_price,
                'total_price': total_price
            })
        
        # Calculate shipping and tax (you can customize this logic)
        shipping_cost = 50.00 if subtotal < 500 else 0  # Free shipping over $500
        tax_amount = subtotal * 0.1  # 10% tax
        total_amount = subtotal + shipping_cost + tax_amount
        
        # Create order
        order = Order.objects.create(
            user=user,
            subtotal=subtotal,
            shipping_cost=shipping_cost,
            tax_amount=tax_amount,
            total_amount=total_amount,
            **validated_data
        )
        
        # Create order items
        for item_data in order_items:
            OrderItem.objects.create(order=order, **item_data)
        
        return order

class WishlistSerializer(serializers.ModelSerializer):
    battery = BatteryListSerializer(read_only=True)
    
    class Meta:
        model = Wishlist
        fields = ['id', 'battery', 'created_at']

class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['battery', 'rating', 'title', 'comment']
    
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']
