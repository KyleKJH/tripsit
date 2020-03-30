#!/bin/sh -e

if [[ "$(docker pull postgres:12-alpine)" == *"up to date"* ]]; then
    docker-compose down
    docker-compose up -d
fi
