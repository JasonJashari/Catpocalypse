from csv import list_dialects
from django.contrib import admin
from backend.models import CustomUser
from django.contrib.auth.admin import UserAdmin

# Register your models here.

class CustomUserAdmin(UserAdmin):
    # what to display in admin columns
    list_display = ('email','username','date_joined','last_login',
                    'is_admin','is_staff')
    
    # fields we can query the database for
    search_fields = ('email','username')

    # fields that should not be able to be changed
    readonly_fields = ('date_joined','last_login')


    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
    
admin.site.register(CustomUser, CustomUserAdmin)
