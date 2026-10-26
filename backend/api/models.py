from django.db import models

class Profile(models.Model):
    """Profile information for Nisanth K."""
    name = models.CharField(max_length=120, default="Nisanth K")
    title = models.CharField(
        max_length=200,
        default="AI & Data Science Student | Robotics Builder | Full-Stack Developer"
    )
    summary = models.TextField(
        help_text="Factual summary about Nisanth K"
    )
    location = models.CharField(max_length=120, default="Tamil Nadu, India")
    email = models.EmailField(default="nisanth0202@gmail.com")
    github_username = models.CharField(max_length=100, default="Nisanth32")
    github_url = models.URLField(default="https://github.com/Nisanth32")
    linkedin_name = models.CharField(max_length=100, default="Nisanth K")
    linkedin_url = models.URLField(default="https://www.linkedin.com/in/nisanth-k")
    resume_url = models.CharField(max_length=255, default="/assets/resume.pdf", blank=True)
    education = models.JSONField(
        default=list,
        help_text="List of education entries"
    )
    quick_stats = models.JSONField(
        default=list,
        help_text="Key stats derived strictly from real data"
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile & Site Settings"
        verbose_name_plural = "Profile & Site Settings"

    def __str__(self):
        return f"{self.name} - Profile"


class Skill(models.Model):
    """Categorized technical skills."""
    CATEGORY_CHOICES = [
        ('programming', 'Programming Languages'),
        ('data', 'Data Science & Analysis'),
        ('web', 'Full-Stack Web Development'),
        ('embedded_robotics', 'Embedded Systems & Robotics'),
        ('ai_tools', 'AI Developer Tools'),
        ('interests', 'Core Interests'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    icon_name = models.CharField(max_length=50, blank=True, help_text="Lucide icon identifier")
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Project(models.Model):
    """Technical projects built by Nisanth."""
    STATUS_CHOICES = [
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]

    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Completed')
    is_featured = models.BooleanField(default=False, help_text="Featured hero project (e.g. AURA)")
    tagline = models.CharField(max_length=250, blank=True)
    description = models.TextField(help_text="Concise project overview")
    stack = models.JSONField(default=list, help_text="List of technologies used")
    bullets = models.JSONField(default=list, help_text="2-3 key technical highlights")
    architecture_notes = models.JSONField(default=dict, blank=True, help_text="Structured hardware/software architecture specs")
    github_url = models.URLField(blank=True, default='')
    demo_url = models.URLField(blank=True, default='')
    image_url = models.CharField(max_length=255, blank=True, default='')
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', '-is_featured', 'title']

    def __str__(self):
        return f"{self.title} ({'Featured' if self.is_featured else self.status})"


class Achievement(models.Model):
    """Recognitions and awards won by Nisanth."""
    title = models.CharField(max_length=200)
    event = models.CharField(max_length=200)
    organization = models.CharField(max_length=250)
    date_str = models.CharField(max_length=100)
    rank_badge = models.CharField(max_length=80, help_text="e.g. 1st Prize, 1st Place, Certificate of Appreciation, 2nd Place")
    is_major = models.BooleanField(default=True)
    is_collapsed_only = models.BooleanField(default=False, help_text="Show in collapsed 'More' row only (e.g. Esports Free Fire)")
    certificate_url = models.CharField(max_length=255, blank=True, default='')
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'id']

    def __str__(self):
        return f"{self.rank_badge} - {self.event}"


class ContactMessage(models.Model):
    """Messages submitted through the contact form."""
    name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField()
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} ({self.email}) at {self.created_at.strftime('%Y-%m-%d %H:%M')}"
