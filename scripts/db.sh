#!/bin/sh -e

USAGE_ERROR="
Usage:\n
\tdb.sh latest\n
\tdb.sh rollback\n
\tdb.sh create new-migration-name
"

subcommand=$1
if [[ -z "$subcommand" ]]; then
    >&2 echo $USAGE_ERROR
    exit 1
fi

case "$1" in
    # Migrate to latest version of schema
    latest)
        command="npx knex migrate:latest"
        ;;
    # Rollback to previous version of schema
    rollback)
        command="npx knex migrate:rollback"
        ;;
    # Create a new migration
    create)
        migration_name=$2
        if [[ -z "$migration_name" ]]; then
            >&2 echo "Must provide a migration name.\nUsage: db.sh create new-migration-name"
            exit 1
        fi
        command="npx knex migrate:make $migration_name"
        ;;
    *)
        >&2 echo $USAGE_ERROR
        exit 1
        ;;
esac

# Ensure DB is running
if [[ ! -z $(docker ps -f name=tripsit_db) ]]; then
    docker-compose up -d db
    sleep 1
fi

# Run command
eval $(egrep -v '^#' .env | xargs) eval "$command"

exit 0
