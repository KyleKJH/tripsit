#!/bin/sh -e

echo "Bootstrapping..."
npx lerna bootstrap


echo "Setting up symlinks..."

api_graphql_knexfile_path="packages/api-graphql/knexfile.js"
if [[ -f "$api_graphql_knexfile_path" ]]; then
    ln -s knexfile.js "$api_graphql_knexfile_path"
fi

api_graphql_env_path="packages/api-graphql/.env"
if [[ -f "$api_graphql_env_path" ]]; then
    ln -s .env "$api_graphql_env_path"
fi
