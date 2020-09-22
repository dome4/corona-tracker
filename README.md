# Corona Tracker

## Run mirgrations

1. Launch docker containers with `docker-compose up`
2. Display docker running containers: `docker ps`
3. Get the CONTAINER ID of you django app and log into: `docker exec -t -i 66175bfd6ae6 bash`
4. Show which migrations exist: `python manage.py showmigrations`
5. And now, each time you edit your models, run in your container: `python manage.py makemigrations` and `python manage.py migrate`

## Creating an admin user¶

1. First we’ll need to create a user who can login to the admin site. Run the following command: `python manage.py createsuperuser`
2. Enter your desired username, mail address and password.
