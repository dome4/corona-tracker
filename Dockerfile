# Pull a base image
FROM python:3.8

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create a working directory for the django project
RUN mkdir /code
WORKDIR /code

# Copy requirements to the container
COPY requirements.txt /code/

# Install the requirements to the container
RUN pip install -r requirements.txt

# Copy the project files into the working directory
COPY . /code/