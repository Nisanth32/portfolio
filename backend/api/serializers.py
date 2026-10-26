from rest_framework import serializers
from .models import Profile, Skill, Project, Achievement, ContactMessage

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'id', 'name', 'title', 'summary', 'location',
            'email', 'github_username', 'github_url',
            'linkedin_name', 'linkedin_url', 'resume_url',
            'education', 'quick_stats', 'updated_at'
        ]


class SkillSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'category_display', 'icon_name', 'display_order']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'status', 'is_featured',
            'tagline', 'description', 'stack', 'bullets',
            'architecture_notes', 'github_url', 'demo_url',
            'image_url', 'display_order'
        ]


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = [
            'id', 'title', 'event', 'organization', 'date_str',
            'rank_badge', 'is_major', 'is_collapsed_only',
            'certificate_url', 'display_order'
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    # Honeypot field: real users leave it blank, bots populate it
    website_hp = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'website_hp', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        val = value.strip()
        if len(val) < 2:
            raise serializers.ValidationError("Please provide a valid name (at least 2 characters).")
        return val

    def validate_message(self, value):
        val = value.strip()
        if len(val) < 5:
            raise serializers.ValidationError("Please enter a message of at least 5 characters.")
        return val

    def validate(self, attrs):
        # Honeypot spam check
        hp = attrs.pop('website_hp', '')
        if hp:
            raise serializers.ValidationError({"detail": "Spam detected."})
        return attrs

