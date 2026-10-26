from django.urls import path
from .views import (
    ProfileView,
    ProjectListView,
    SkillListView,
    AchievementListView,
    ContactMessageCreateView
)

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('projects/', ProjectListView.as_view(), name='projects'),
    path('skills/', SkillListView.as_view(), name='skills'),
    path('achievements/', AchievementListView.as_view(), name='achievements'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact'),
]
