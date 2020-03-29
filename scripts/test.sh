#!/bin/sh -e

docker-compose up -d
npx lerna run test
