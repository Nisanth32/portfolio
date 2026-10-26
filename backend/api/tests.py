from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from api.models import Profile, Skill, Project, Achievement, ContactMessage

class PortfolioAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Seed profile
        self.profile = Profile.objects.create(
            name="Nisanth K",
            title="AI & Data Science Student | Robotics Builder | Full-Stack Developer",
            summary="B.Tech Artificial Intelligence and Data Science student at Indra Ganesan College of Engineering.",
            location="Tamil Nadu, India",
            email="nisanth0202@gmail.com",
            github_username="Nisanth32",
            github_url="https://github.com/Nisanth32",
            linkedin_name="Nisanth K",
            linkedin_url="https://www.linkedin.com/in/nisanth-k"
        )

        # Seed project
        self.project = Project.objects.create(
            title="AURA - 12-DOF Humanoid Robot",
            slug="aura-12-dof-humanoid-robot",
            status="In Progress",
            is_featured=True,
            tagline="Upper-body humanoid with dual Jetson Nano & ESP32 split architecture",
            description="A 12-DOF humanoid robot engineered with an intelligent split architecture.",
            stack=["Jetson Nano", "ESP32", "PCA9685", "MG995 servos", "IMU"],
            bullets=["Split architecture", "ESP32 PWM servo control"],
            display_order=1
        )

        # Seed skill
        self.skill = Skill.objects.create(
            name="Python",
            category="programming",
            icon_name="Code2",
            display_order=1
        )

        # Seed achievement
        self.achievement = Achievement.objects.create(
            title="Paper Presentation",
            event="CARE Tech Fest '26",
            organization="CARE College of Engineering, Tiruchirappalli",
            date_str="2026",
            rank_badge="1st Prize",
            is_major=True,
            is_collapsed_only=False,
            display_order=1
        )

    def test_get_profile(self):
        url = reverse('profile')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Nisanth K')
        self.assertEqual(response.data['email'], 'nisanth0202@gmail.com')
        self.assertEqual(response.data['github_username'], 'Nisanth32')

    def test_get_projects(self):
        url = reverse('projects')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertTrue(response.data[0]['is_featured'])
        self.assertEqual(response.data[0]['title'], 'AURA - 12-DOF Humanoid Robot')

    def test_get_skills(self):
        url = reverse('skills')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertIn('grouped', response.data)

    def test_get_achievements(self):
        url = reverse('achievements')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['rank_badge'], '1st Prize')

    def test_contact_form_valid_submission(self):
        url = reverse('contact')
        data = {
            "name": "Alex Miller",
            "email": "alex@example.com",
            "message": "Hello Nisanth, great robotics and AI work!"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertTrue(ContactMessage.objects.filter(email="alex@example.com").exists())

    def test_contact_form_honeypot_spam_rejection(self):
        url = reverse('contact')
        data = {
            "name": "Bot Spammer",
            "email": "bot@spam.com",
            "message": "Buy cheap stuff here",
            "website_hp": "http://spamsite.com"  # Honeypot filled
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(ContactMessage.objects.filter(email="bot@spam.com").exists())

    def test_contact_form_validation_errors(self):
        url = reverse('contact')
        # Empty name and too short message
        data = {
            "name": "",
            "email": "invalid-email",
            "message": "hi"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data['errors'])
        self.assertIn('email', response.data['errors'])
        self.assertIn('message', response.data['errors'])
