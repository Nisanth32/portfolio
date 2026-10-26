from django.core.management.base import BaseCommand
from api.models import Profile, Skill, Project, Achievement

class Command(BaseCommand):
    help = 'Seeds portfolio data strictly based on factual record for Nisanth K'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Seeding Nisanth K's Portfolio Data..."))

        # 1. Profile / Site Settings
        profile_data = {
            "name": "Nisanth K",
            "title": "AI & Data Science Student | Robotics Builder | Full-Stack Developer",
            "summary": (
                "B.Tech Artificial Intelligence and Data Science student at Indra Ganesan "
                "College of Engineering with hands-on project experience across AI/ML, robotics, "
                "embedded hardware and full-stack web development. Builds practical systems that "
                "combine intelligent software, hardware and real-world problem solving. Won first "
                "place at both a paper presentation and a project expo in 2026."
            ),
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
                    "period": "2025-2029 (Ongoing)",
                    "status": "Ongoing",
                    "details": "Specializing in Artificial Intelligence, Machine Learning, Robotics, and Embedded Systems."
                },
                {
                    "degree": "Higher Secondary, Computer Science Group",
                    "institution": "Vinmathee Matric Higher Secondary School",
                    "period": "2023-2025",
                    "status": "Completed | 60%",
                    "details": "Core focus in Computer Science, Mathematics, and Physical Sciences."
                }
            ],
            "quick_stats": [
                {
                    "label": "1st Places in 2026",
                    "value": "2",
                    "sub": "Paper Presentation & Project Expo"
                },
                {
                    "label": "Core Systems",
                    "value": "4",
                    "sub": "Robotics, AI Vision & Full-Stack"
                },
                {
                    "label": "Focus Domains",
                    "value": "Robotics + AI + Web",
                    "sub": "Hardware & Intelligent Software"
                }
            ]
        }
        Profile.objects.all().delete()
        Profile.objects.create(**profile_data)
        self.stdout.write(self.style.SUCCESS("[OK] Profile seeded."))

        # 2. Skills
        skills_data = [
            # Programming
            {"name": "Python", "category": "programming", "icon_name": "Code2", "display_order": 1},
            {"name": "C", "category": "programming", "icon_name": "Cpu", "display_order": 2},
            {"name": "SQL", "category": "programming", "icon_name": "Database", "display_order": 3},
            # Data
            {"name": "Pandas", "category": "data", "icon_name": "TableProperties", "display_order": 4},
            # Web
            {"name": "React", "category": "web", "icon_name": "Layers", "display_order": 5},
            {"name": "FastAPI", "category": "web", "icon_name": "Zap", "display_order": 6},
            {"name": "Django", "category": "web", "icon_name": "Server", "display_order": 7},
            {"name": "MySQL", "category": "web", "icon_name": "Database", "display_order": 8},
            {"name": "Next.js", "category": "web", "icon_name": "Layers", "display_order": 9},
            {"name": "Firebase", "category": "web", "icon_name": "Zap", "display_order": 10},
            # Embedded & Robotics
            {"name": "Jetson Nano", "category": "embedded_robotics", "icon_name": "Cpu", "display_order": 11},
            {"name": "ESP32", "category": "embedded_robotics", "icon_name": "CircuitBoard", "display_order": 12},
            {"name": "PCA9685 servo driver", "category": "embedded_robotics", "icon_name": "Radio", "display_order": 13},
            {"name": "IMU sensor integration", "category": "embedded_robotics", "icon_name": "Compass", "display_order": 14},
            {"name": "MG995 Servos", "category": "embedded_robotics", "icon_name": "Bot", "display_order": 15},
            # AI dev tools
            {"name": "Google Antigravity", "category": "ai_tools", "icon_name": "Sparkles", "display_order": 16},
            {"name": "Claude", "category": "ai_tools", "icon_name": "Bot", "display_order": 17},
            # Interests
            {"name": "Robotics", "category": "interests", "icon_name": "Bot", "display_order": 18},
            {"name": "Artificial Intelligence", "category": "interests", "icon_name": "Brain", "display_order": 19},
            {"name": "Machine Learning", "category": "interests", "icon_name": "Binary", "display_order": 20},
            {"name": "Computer Vision", "category": "interests", "icon_name": "Eye", "display_order": 21},
            {"name": "Embedded Systems", "category": "interests", "icon_name": "Microchip", "display_order": 22},
            {"name": "Intelligent Automation", "category": "interests", "icon_name": "Cog", "display_order": 23},
        ]
        Skill.objects.all().delete()
        for item in skills_data:
            Skill.objects.create(**item)
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(skills_data)} Skills seeded."))

        # 3. Projects
        projects_data = [
            {
                "title": "AURA - 12-DOF Humanoid Robot",
                "slug": "aura-12-dof-humanoid-robot",
                "status": "In Progress",
                "is_featured": True,
                "tagline": "Upper-Body Bipedal Humanoid with Dual-Brain Distributed Edge AI & Real-Time Motor Actuation",
                "description": (
                    "AURA is a 12-degree-of-freedom (12-DOF) humanoid robot engineered with a distributed split architecture. "
                    "The upper body (arms, torso, and head) is fully constructed, and precision standing-pose calibration "
                    "has been successfully achieved across all 12 servo joints."
                ),
                "stack": ["NVIDIA Jetson Nano", "ESP32 Microcontroller", "PCA9685 16-Channel PWM", "12x MG995 Servos", "MPU6050 Gyroscope/IMU"],
                "bullets": [
                    "Split-Brain Edge Architecture: Jetson Nano handles high-level computer vision, real-time speech processing, and autonomous behavioral state machines.",
                    "Low-Latency Joint Control: ESP32 reads IMU sensor orientation data and orchestrates precise multi-servo kinematics over I2C via PCA9685 12-bit PWM drivers.",
                    "Integrated Hardware Suite: Wide-angle camera, noise-canceling microphone, speaker, diagnostic OLED display, and 6-axis gyroscope IMU.",
                    "Mechanical Construction: Upper body (torso pitch/yaw, head pan/tilt, 4-DOF dual arms) assembled and calibrated to stable standing zero-pose."
                ],
                "architecture_notes": {
                    "robot_classification": "Upper-Body Bipedal Humanoid Robot (12 Degrees of Freedom)",
                    "high_level_processor": "NVIDIA Jetson Nano (Computer Vision, Speech Recognition & Behavior)",
                    "low_level_controller": "ESP32 32-bit Microcontroller (Real-time Kinematics & IMU Loop)",
                    "actuator_driver": "PCA9685 16-Channel 12-bit I2C PWM Servo Driver Module",
                    "actuators": "12x MG995 High-Torque Metal Gear Servos (Shoulders, Elbows, Torso, Neck)",
                    "sensory_suite": "Camera, Microphone, Speaker, Diagnostic Display, 6-Axis Gyroscope IMU",
                    "calibration_status": "Upper body constructed; 12-joint standing-pose calibration calibrated"
                },
                "github_url": "",
                "demo_url": "",
                "image_url": "/assets/aura_humanoid.png",
                "display_order": 1
            },
            {
                "title": "SMART GATE PASS MANAGEMENT SYSTEM",
                "slug": "smart-gate-pass-management-system",
                "status": "In Development",
                "is_featured": False,
                "tagline": "Firebase-Powered College Gate Pass Management with Role-Based OTP & Real-Time QR Verification",
                "description": (
                    "Smart Gate Pass Management System is a full-stack college management application designed to digitize and secure "
                    "the student gate-pass process. It replaces traditional paper-based gate passes with a digital workflow featuring "
                    "real-time approvals, phone OTP authentication, QR code verification, and security tracking."
                ),
                "stack": ["HTML", "CSS", "JavaScript / React", "Firebase Cloud Functions", "Cloud Firestore", "Firebase Authentication", "Firebase Storage"],
                "bullets": [
                    "Role-Based Authentication: Separate secure portals and permissions for Admin, HOD, Student, and Campus Security.",
                    "Real-Time Phone OTP Login: Integrated Firebase Phone Authentication for instant identity verification of students and HODs.",
                    "Digital Approval & QR Verification: Students submit digital requests; HOD verifies and approves; dynamic tamper-proof QR code is generated for security scanning at the exit gate.",
                    "Security Tracking & Audit Dashboard: Real-time logging of student exits, returns, QR scan activity, with CSV export and admin analytics."
                ],
                "architecture_notes": {
                    "frontend": "HTML, CSS, JavaScript / React",
                    "backend": "Firebase Cloud Functions (Serverless Architecture)",
                    "authentication": "Firebase Phone Authentication (OTP) & Role-Based Access Control",
                    "database": "Cloud Firestore (Real-Time Document Synchronization)",
                    "file_storage": "Firebase Storage (Student Profile Photos & Digital Pass Media)",
                    "security": "Firestore Security Rules, Storage Rules, Firebase App Check",
                    "deployment": "Firebase Hosting",
                    "my_role": "Full-Stack Developer",
                    "future_scope": "Advanced analytics, automated SMS notifications, and existing college ERP integration"
                },
                "github_url": "",
                "demo_url": "",
                "image_url": "/assets/smart_gatepass.png",
                "display_order": 2
            },
            {
                "title": "AI SMART ATTENDANCE & COLLEGE ERP SYSTEM",
                "slug": "ai-smart-attendance-college-erp",
                "status": "In Development",
                "is_featured": False,
                "tagline": "AI-Powered Face Recognition for Automated Classroom Attendance & Integrated Campus Management",
                "description": (
                    "AI Smart Attendance & College ERP Management System is an intelligent educational platform designed to automate classroom attendance "
                    "using AI-based face recognition. It combines real-time attendance tracking with college administration, timetable management, "
                    "leave applications, and student performance monitoring in one centralized system."
                ),
                "stack": ["Next.js 14", "TypeScript", "Tailwind CSS", "FastAPI", "SQLAlchemy", "PostgreSQL", "OpenCV", "face_recognition", "Redis", "Docker"],
                "bullets": [
                    "AI Face Recognition: Automates theory classroom attendance via camera-based facial detection and embeddings matching.",
                    "Smart Board Integration: Optimized real-time attendance visual dashboard for classroom smart boards and faculty devices.",
                    "Timetable & Substitution Engine: Restricts attendance access strictly to scheduled faculty or approved substitutes.",
                    "Complete ERP Workflow: Student & faculty profiles, leave management, attendance dispute corrections, and audit logging."
                ],
                "architecture_notes": {
                    "frontend": "Next.js 14, TypeScript, Tailwind CSS, shadcn/ui",
                    "backend_api": "Python, FastAPI with SQLAlchemy ORM",
                    "ai_vision": "OpenCV, face_recognition, NumPy",
                    "database": "PostgreSQL with Session Management via Redis",
                    "security": "JWT, Argon2 / bcrypt password hashing, encrypted biometric vectors",
                    "devops": "Docker, Docker Compose, GitHub Actions CI/CD",
                    "my_role": "Full-Stack Developer / AI Developer",
                    "future_scope": "Enhanced liveness anti-spoofing detection, multi-campus scalability, and ERP syncing"
                },
                "github_url": "",
                "demo_url": "",
                "image_url": "/assets/smartattend.png",
                "display_order": 3
            },
            {
                "title": "Smart Energy Generation System",
                "slug": "smart-energy-generation-system",
                "status": "In Progress",
                "is_featured": False,
                "tagline": "Real-time energy monitoring, storage telemetry, and intelligent efficiency optimization",
                "description": (
                    "Explores technology-based energy generation and monitoring, with an engineering focus on energy awareness, storage telemetry, and efficient utilization."
                ),
                "stack": ["Energy Monitoring", "Energy Storage", "Embedded Analytics"],
                "bullets": [
                    "Real-time energy monitoring and continuous consumption tracking.",
                    "Explores technology-based energy generation, storage awareness, and efficient use."
                ],
                "architecture_notes": {
                    "focus": "Energy awareness, storage optimization, and efficient utilization"
                },
                "github_url": "",
                "demo_url": "",
                "image_url": "/assets/smart_energy.png",
                "display_order": 4
            }
        ]
        Project.objects.all().delete()
        for item in projects_data:
            Project.objects.create(**item)
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(projects_data)} Projects seeded."))

        # 4. Achievements
        achievements_data = [
            {
                "title": "Paper Presentation",
                "event": "CARE Tech Fest '26",
                "organization": "CARE College of Engineering, Tiruchirappalli",
                "date_str": "2026",
                "rank_badge": "1st Prize",
                "is_major": True,
                "is_collapsed_only": False,
                "certificate_url": "",
                "display_order": 1
            },
            {
                "title": "Project Expo 2026",
                "event": "Engineers' Day Celebrations",
                "organization": "Indra Ganesan College of Engineering",
                "date_str": "15 Sep 2026",
                "rank_badge": "1st Place",
                "is_major": True,
                "is_collapsed_only": False,
                "certificate_url": "",
                "display_order": 2
            },
            {
                "title": "Idea Presentation",
                "event": "WARTECH '26",
                "organization": "Parisutham Institute of Technology & Science",
                "date_str": "28 Aug 2026",
                "rank_badge": "Certificate of Appreciation",
                "is_major": True,
                "is_collapsed_only": False,
                "certificate_url": "",
                "display_order": 3
            },
            {
                "title": "Esports (Free Fire)",
                "event": "AIROX 2026 National-Level Technical Symposium",
                "organization": "J.J. College of Engineering and Technology",
                "date_str": "22 Aug 2026",
                "rank_badge": "2nd Place",
                "is_major": False,
                "is_collapsed_only": True,
                "certificate_url": "",
                "display_order": 4
            }
        ]
        Achievement.objects.all().delete()
        for item in achievements_data:
            Achievement.objects.create(**item)
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(achievements_data)} Achievements seeded."))

        self.stdout.write(self.style.SUCCESS("All portfolio facts successfully populated!"))
