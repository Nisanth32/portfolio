import logging
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import ScopedRateThrottle

from .models import Profile, Skill, Project, Achievement, ContactMessage
from .serializers import (
    ProfileSerializer,
    SkillSerializer,
    ProjectSerializer,
    AchievementSerializer,
    ContactMessageSerializer
)

logger = logging.getLogger(__name__)

def get_client_ip(request):
    """Safely extract remote client IP address from request headers."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')


class ProfileView(APIView):
    """GET /api/profile/ - Returns profile information and factual summary."""
    permission_classes = []
    throttle_classes = []

    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            # Fallback profile object if database is not yet seeded
            return Response({
                "name": "Nisanth K",
                "title": "AI & Data Science Student | Robotics Builder | Full-Stack Developer",
                "summary": "B.Tech Artificial Intelligence and Data Science student at Indra Ganesan College of Engineering with hands-on project experience across AI/ML, robotics, embedded hardware and full-stack web development. Builds practical systems that combine intelligent software, hardware and real-world problem solving. Won first place at both a paper presentation and a project expo in 2026.",
                "location": "Tamil Nadu, India",
                "email": "nisanth0202@gmail.com",
                "github_username": "Nisanth32",
                "github_url": "https://github.com/Nisanth32",
                "linkedin_name": "Nisanth K",
                "linkedin_url": "https://www.linkedin.com/in/nisanth-k",
                "resume_url": "/assets/resume.pdf",
                "education": [
                    {
                        "degree": "B.Tech AI & Data Science",
                        "institution": "Indra Ganesan College of Engineering",
                        "period": "2025-2029 (ongoing)",
                        "status": "Ongoing"
                    },
                    {
                        "degree": "Higher Secondary, Computer Science Group",
                        "institution": "Vinmathee Matric Higher Secondary School",
                        "period": "2023-2025",
                        "status": "Completed"
                    }
                ],
                "quick_stats": [
                    {"label": "1st Places Won", "value": "2", "sub": "in 2026 competitions"},
                    {"label": "Core Systems", "value": "4", "sub": "AI, Hardware & Web"},
                    {"label": "Focus Domains", "value": "Robotics + AI", "sub": "Real-world engineering"}
                ]
            })
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


class ProjectListView(APIView):
    """GET /api/projects/ - Returns list of projects."""
    permission_classes = []
    throttle_classes = []

    def get(self, request):
        projects = Project.objects.all().order_by('display_order', '-is_featured')
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)


class SkillListView(APIView):
    """GET /api/skills/ - Returns categorized skills."""
    permission_classes = []
    throttle_classes = []

    def get(self, request):
        skills = Skill.objects.all().order_by('display_order', 'name')
        serializer = SkillSerializer(skills, many=True)
        
        # Group skills by category for convenience
        grouped = {}
        for skill in serializer.data:
            cat = skill['category']
            if cat not in grouped:
                grouped[cat] = {
                    "category": cat,
                    "title": skill['category_display'],
                    "skills": []
                }
            grouped[cat]["skills"].append(skill)

        return Response({
            "results": serializer.data,
            "grouped": list(grouped.values())
        })


class AchievementListView(APIView):
    """GET /api/achievements/ - Returns achievements list."""
    permission_classes = []
    throttle_classes = []

    def get(self, request):
        achievements = Achievement.objects.all().order_by('display_order', 'id')
        serializer = AchievementSerializer(achievements, many=True)
        return Response(serializer.data)


class ContactMessageCreateView(APIView):
    """
    POST /api/contact/
    Validates form data, checks honeypot field, throttles 5/hour per IP,
    persists message in SQLite/PostgreSQL, and dispatches optional notification.
    """
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'contact'

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        client_ip = get_client_ip(request)
        contact_message = serializer.save(ip_address=client_ip)

        # Optional email notification (degrades gracefully if SMTP is not configured)
        try:
            if getattr(settings, 'EMAIL_HOST_USER', None):
                subject = f"[Portfolio Contact] Message from {contact_message.name}"
                body = (
                    f"Name: {contact_message.name}\n"
                    f"Email: {contact_message.email}\n"
                    f"IP: {client_ip}\n\n"
                    f"Message:\n{contact_message.message}"
                )
                send_mail(
                    subject,
                    body,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.RECIPIENT_EMAIL],
                    fail_silently=True
                )
        except Exception as e:
            logger.warning(f"Could not send email notification: {e}")

        return Response(
            {
                "success": True,
                "message": "Thank you! Your message has been received.",
                "id": contact_message.id
            },
            status=status.HTTP_201_CREATED
        )
