# syntax=docker/dockerfile:1

FROM python:3.8-bullseye

WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip install pip==20.1.1
RUN pip install -r requirements.txt

COPY . .

CMD ["python","server.py"]
