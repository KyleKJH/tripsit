#!/bin/sh -e

# Install all dependencies
lerna bootstrap

# Copy default .env files
function copy_env_example {
    if [[ ! -f "$1.env" ]]; then
        cp "$1.env-example" "$1.env"
        echo "Copied $1.env-example to $1.env"
    fi
}

copy_env_example ./
copy_env_example packages/api-graphql/
copy_env_example packages/tripbot/
