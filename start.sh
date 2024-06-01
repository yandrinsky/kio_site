#!/bin/bash

cd packages/frontend
npm install
cd ../..
docker-compose -f backend.docker-compose.yaml up