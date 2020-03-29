#!/bin/sh

psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE tripsit;

    CREATE USER migration WITH PASSWORD 'migration_P@ssw0rd';
    GRANT ALL PRIVILEGES ON DATABASE tripsit TO migration;

    CREATE USER api_gql WITH PASSWORD 'api_gql_P@ssw0rd';
    GRANT ALL PRIVILEGES ON DATABSE tripsit TO api_gql;

    CREATE USER tripbot WITH PASSWORD 'tripbot_P@ssw0rd';
    GRANT ALL PRIVILEGES ON DATABASE tripsit TO tripbot;
EOSQL

eval $(egrep -v '^#' .env | xargs) npx knex migrate:latest
