#!/bin/bash

minikube stop

docker-compose -f backend.docker-compose.yaml down
