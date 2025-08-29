from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Battery, BatteryImage, Brand, Category, Review, 
    Order, OrderItem, Wishlist
)

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['name', 'website', 'created_at']
    search_fields = ['name']
    readonly_fields = ['created_at']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']
    readonly_fields = ['created_at', 'updated_at']

class BatteryImageInline(admin.TabularInline):
    model = BatteryImage
    extra = 1
    fields = ['image', 'alt_text', 'is_primary', 'order']

@admin.register(Battery)
class BatteryAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'brand', 'model_number', 'voltage', 'price', 
        'stock_quantity', 'condition', 'is_featured', 'is_popular', 'is_active'
    ]
    list_filter = [
        'brand', 'category', 'voltage', 'condition', 
        'is_featured', 'is_popular', 'is_active'
    ]
    search_fields = ['name', 'model_number', 'brand__name', 'description']
    readonly_fields = ['id', 'slug', 'created_at', 'updated_at', 'discount_percentage', 'is_in_stock']
    inlines = [BatteryImageInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'name', 'brand', 'category', 'model_number', 'slug')
        }),
        ('Technical Specifications', {
            'fields': ('voltage', 'amp_hours', 'cold_cranking_amps', 'reserve_capacity')
        }),
        ('Physical Specifications', {
            'fields': ('length', 'width', 'height', 'weight')
        }),
        ('Commercial Information', {
            'fields': ('condition', 'price', 'original_price', 'stock_quantity', 'seller')
        }),
        ('Description & Features', {
            'fields': ('description', 'short_description', 'features', 'compatibility')
        }),
        ('Display Settings', {
            'fields': ('is_featured', 'is_popular', 'is_active')
        }),
        ('Metadata', {
            'fields': ('discount_percentage', 'is_in_stock', 'created_at', 'updated_at'),
            'classes': ['collapse']
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('brand', 'category', 'seller')

@admin.register(BatteryImage)
class BatteryImageAdmin(admin.ModelAdmin):
    list_display = ['battery', 'alt_text', 'is_primary', 'order']
    list_filter = ['is_primary', 'battery__brand']
    search_fields = ['battery__name', 'alt_text']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['battery', 'user', 'rating', 'title', 'is_verified_purchase', 'created_at']
    list_filter = ['rating', 'is_verified_purchase', 'created_at']
    search_fields = ['battery__name', 'user__username', 'title', 'comment']
    readonly_fields = ['created_at', 'updated_at']

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['total_price']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'user', 'status', 'total_amount', 
        'created_at', 'shipped_at', 'delivered_at'
    ]
    list_filter = ['status', 'created_at', 'shipped_at', 'delivered_at']
    search_fields = ['id', 'user__username', 'shipping_city']
    readonly_fields = ['id', 'created_at', 'updated_at']
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Order Information', {
            'fields': ('id', 'user', 'status')
        }),
        ('Financial Details', {
            'fields': ('subtotal', 'shipping_cost', 'tax_amount', 'total_amount')
        }),
        ('Shipping Information', {
            'fields': (
                'shipping_address', 'shipping_city', 'shipping_postal_code',
                'shipping_country', 'phone_number'
            )
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'shipped_at', 'delivered_at'),
            'classes': ['collapse']
        }),
    )

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'battery', 'quantity', 'unit_price', 'total_price']
    list_filter = ['order__status', 'order__created_at']
    search_fields = ['order__id', 'battery__name']

@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ['user', 'battery', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'battery__name']

# Customize admin site
admin.site.site_header = "Exact Match Battery Store Admin"
admin.site.site_title = "Exact Match Admin"
admin.site.index_title = "Welcome to Exact Match Battery Store Administration"
