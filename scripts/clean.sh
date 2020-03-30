#!/bin/sh -e

if [[ -d "node_modules" ]]; then
    echo "Removing generated files..."
    rm -rf node_modules packages/*/node_modules
    echo ""
fi

container_ids=$(docker ps -qf name=tripsit)
if [[ ! -z "$container_ids" ]]; then
    echo "Removing docker containers and volumes..."
    docker stop $container_ids
    docker rm $container_ids
    docker volume rm $(docker volume ls -qf name=tripsit)
    echo ""
fi

echo "Install base dependencies..."
npm i
echo ""

echo "Running clean tasks in packages..."
npx lerna run clean
echo ""

echo "Bootstrapping packages..."
npx lerna bootstrap
echo ""
