from django.contrib import admin
from .models import Profile, Skill, Project, Achievement, ContactMessage

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'location', 'email', 'updated_at')
    search_fields = ('name', 'summary', 'email')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'icon_name', 'display_order')
    list_filter = ('category',)
    list_editable = ('display_order',)
    search_fields = ('name',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'is_featured', 'display_order')
    list_filter = ('status', 'is_featured')
    list_editable = ('display_order', 'is_featured', 'status')
    search_fields = ('title', 'tagline', 'description')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('rank_badge', 'event', 'organization', 'date_str', 'is_major', 'is_collapsed_only', 'display_order')
    list_filter = ('rank_badge', 'is_major', 'is_collapsed_only')
    list_editable = ('display_order', 'is_collapsed_only')
    search_fields = ('title', 'event', 'organization')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at', 'ip_address', 'is_read')
    list_filter = ('is_read', 'created_at')
    list_editable = ('is_read',)
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('name', 'email', 'message', 'ip_address', 'created_at')
