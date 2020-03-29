#!/bin/sh -e

CONTINER_COUNT=1;

# Install node_modules if not already
if [[ ! -d "node_modules" ]]; then
    npm i
fi

# Start Docker containers if not already up
docker-compose up -d
