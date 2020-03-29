#!/bin/sh

if [[ ! -d "node_modules" ]]; then
    echo "Removing generated files..."
    rm -rf node_modules
fi

container_ids=$(docker ps -qf name=tripsit)
if [[ ! -z "$container_ids" ]]; then
    echo "\nRemoving docker containers and volumes..."
    docker stop $container_ids
    docker rm $container_ids
    docker volume rm $(docker volume ls -qf name=tripsit)
fi
