#!/bin/bash

#rush update
cd packages/frontend
npm install

cd ../..
docker-compose -f backend.docker-compose.yaml up --build &

cd packages/frontend
npm start &

cd packages/task-manager
npm run dev