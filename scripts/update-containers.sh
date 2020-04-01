#!/bin/sh -e

if [[ "$(docker pull postgres:12-alpine)" == *"up to date"* ]]; then
    echo "All containers are up to date...."
else
    echo "Updating containers..."
    docker-compose down
    docker-compose up -d
fi
