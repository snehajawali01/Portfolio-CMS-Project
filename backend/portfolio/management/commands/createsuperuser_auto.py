import os

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = "Create a Django superuser from environment variables"

    def handle(self, *args, **kwargs):
        User = get_user_model()

        username = os.environ.get("ADMIN_USERNAME")
        email = os.environ.get("ADMIN_EMAIL")
        password = os.environ.get("ADMIN_PASSWORD")

        if not username or not email or not password:
            self.stdout.write(
                self.style.ERROR(
                    "ADMIN_USERNAME, ADMIN_EMAIL and ADMIN_PASSWORD are required."
                )
            )
            return

        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                "email": email,
                "is_staff": True,
                "is_superuser": True,
            },
        )

        user.email = email
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()

        if created:
            self.stdout.write(
                self.style.SUCCESS("Admin user created successfully.")
            )
        else:
            self.stdout.write(
                self.style.SUCCESS("Admin user password updated successfully.")
            )