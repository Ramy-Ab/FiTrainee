from django.contrib.auth import get_user_model

User = get_user_model()


def create_admins(User, username, email, password):
    u = User.objects.create_superuser(username, email, password)
    print("User " + username + " created with default password'")


create_admins(User, "ramy-admin", "admin@gym.dz", "blackholE")
